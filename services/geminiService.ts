
import { GoogleGenAI, Modality, Part, Type, GenerateContentResponse } from '@google/genai';
import { 
  ImageData, 
  UploadedImage,
  BrollIdea
} from '../types';

// Helper: Convert UploadedImage or ImageData to Gemini Part
function toPart(image: UploadedImage | ImageData | null): Part {
    if (!image) return { text: "" };
    
    const base64 = 'base64' in image 
        ? image.base64 
        : (image as any).dataUrl?.split(',')[1];
    
    // Safety check: Gemini API rejects parts with empty or missing data/text
    if (!base64 || base64.trim() === "") {
        return { text: "" };
    }

    return {
        inlineData: {
            mimeType: image.mimeType || 'image/jpeg',
            data: base64,
        },
    };
}

// Helper: Retry with Exponential Backoff
async function retryWithBackoff<T>(fn: () => Promise<T>, retries = 4, delay = 3000): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    const errorMsg = error?.message || "";
    const isRetryable = 
      error?.status === 429 || 
      error?.status === 503 || 
      error?.status === 504 || 
      error?.status === 500 ||
      error?.code === 429 ||
      errorMsg.includes("Rpc failed") ||
      errorMsg.includes("xhr error");

    if (retries > 0 && isRetryable) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryWithBackoff<T>(fn, retries - 1, delay * 1.5);
    }
    throw error;
  }
}

// Helper: Extract image from Gemini response
async function extractImageFromResponse(response: GenerateContentResponse): Promise<string> {
    if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        
        let textContent = "";
        for (const part of response.candidates[0].content.parts) {
            if (part.text) textContent += part.text + " ";
        }
        
        if (textContent.trim()) {
            const cleanText = textContent.trim().toLowerCase();
            if (cleanText.includes("sorry") || cleanText.includes("cannot") || cleanText.includes("unable")) {
                throw new Error("AI menolak merender visual ini. Coba gunakan deskripsi yang lebih deskriptif.");
            }
            throw new Error("AI memberikan deskripsi teks tapi gagal menghasilkan gambar.");
        }
    }
    throw new Error("Model tidak menghasilkan gambar. Silakan coba lagi.");
}

// Helper: Get API Key
export function getApiKey(): string {
    if (typeof window !== 'undefined') {
        const customKey = localStorage.getItem('custom_gemini_api_key');
        if (customKey && customKey.trim() !== '') {
            return customKey.trim();
        }
    }
    // Use import.meta.env for Vite or fallback to process.env if available
    if (typeof process !== 'undefined' && process.env) {
        if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
        if (process.env.API_KEY) return process.env.API_KEY;
    }
    return '';
}

// =================== Digi B-Roll Services ===================

export const generateBrollDescription = async (productImages: UploadedImage[], modelImage: UploadedImage | null): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const systemInstruction = `Anda adalah Technical Vision Analyst di agensi produksi visual profesional.
    Tugas Anda: Identifikasi elemen teknis produk secara presisi (warna, material, tekstur, detail desain seperti logo/tulisan).
    Identifikasi model (jika ada): etnis, fitur wajah, gaya rambut.
    JANGAN menulis narasi pemasaran. Langsung berikan deskripsi teknis padat dalam 2-3 kalimat Bahasa Indonesia agar AI eksekutor tahu aset apa yang ia proses secara akurat.`;
    
    const parts: Part[] = [...productImages.map(img => toPart(img))];
    if (modelImage) parts.push(toPart(modelImage));
    parts.push({ text: "Berikan identifikasi teknis aset ini secara objektif dan mendetail." });

    const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: { parts },
        config: { systemInstruction }
    });
    return response.text?.trim() || "";
};

export const generateBrollIdeas = async (productImages: UploadedImage[], productDesc: string, modelImage: UploadedImage | null, photoTheme: string, aspectRatio: string): Promise<BrollIdea[]> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    
    const systemInstruction = `You are a professional product photographer's AI assistant with a specialization in elegant and cinematic commercial photography. Your task is to analyze a product from an image and description, and optionally a model's photo. 
    
    A user may also provide a specific photo theme: "${photoTheme}". You MUST strictly adhere to the user's theme if provided. 
    
    Generate 6 distinct, creative, and professional 'poses' or 'shots'. 
    If a model's photo is provided, you MUST incorporate the model naturally interacting with or presenting the product. 
    
    PROMPT ENGINEERING RULES:
    1. COMPACTNESS: Each prompt must be a single, dense, professional paragraph (max 60 words).
    2. VISUAL FOCUS: Describe the product accurately based on the provided description. Ensure it remains the central focus.
    3. CINEMATOGRAPHY: Use technical terms (rim lighting, shallow depth of field, 8k resolution, cinematic composition).
    4. CONSISTENCY: Ensure the product's identity is preserved across all shots.
    
    Respond ONLY with a valid JSON array of 6 objects with properties "title" (Indonesian) and "prompt" (English).`;
    
    const parts: Part[] = [
        ...productImages.map(img => toPart(img)),
        { text: `Aset Produk: ${productDesc}. Tema Visual: ${photoTheme}. Rasio: ${aspectRatio}.` }
    ];
    if (modelImage) parts.push(toPart(modelImage));

    const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: { parts },
        config: { 
            systemInstruction, 
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: { title: { type: Type.STRING }, prompt: { type: Type.STRING } },
                    required: ["title", "prompt"]
                }
            }
        }
    });
    
    try {
        return JSON.parse(response.text || '[]');
    } catch (e) {
        throw new Error("Gagal merancang ide kreatif. Silakan coba lagi.");
    }
};

export const generateBrollImageFromIdea = async (prompt: string, productImages: UploadedImage[], modelImage: UploadedImage | null, aspectRatio: string): Promise<{ imageUrl: string }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    
    const systemInstruction = `You are a Senior Digital Imaging Specialist and Master Photographer.
    Your task: Execute a photorealistic photoshoot based on the provided concept.
    
    STRICT ANTI-STICKER & ANTI-ANOMALY PROTOCOLS:
    1. OPTICAL COHESION: The product (clothing/item) MUST NOT look like a flat sticker. Use 'Global Illumination', 'Ambient Occlusion', and 'Contact Shadows'. The light must wrap around the product and interact naturally with the model's body or the environment.
    2. FABRIC PHYSICS: If the product is clothing, it MUST follow the natural draping, folds, and contours of the wearer's body. Shadows on the fabric must match the environment's light source. The logo/print on the shirt must distort realistically according to the fabric folds.
    3. ANATOMICAL INTEGRITY: Ensure the human body, fingers, and posture are 100% anatomically correct. No extra limbs or distorted proportions.
    4. IDENTITY PRESERVATION: If a model reference is provided, maintain the exact facial features and identity with absolute precision.
    5. IMAGE QUALITY: Output must be indistinguishable from a professional 8k RAW photograph. No digital AI artifacts. Cinematic commercial lighting only.`;
    
    let finalPrompt = `ULTRA-REALISTIC COMMERCIAL PHOTOGRAPHY: ${prompt}. High-fidelity textures, professional rim lighting, soft depth of field, accurate fabric draping physics, perfectly integrated shadows. Aspect Ratio: ${aspectRatio}.`;
    
    const parts: Part[] = [
        ...productImages.map(img => toPart(img)),
        { text: finalPrompt }
    ];
    if (modelImage) parts.push(toPart(modelImage));

    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: { 
            systemInstruction,
            imageConfig: { aspectRatio: aspectRatio as any } 
        }
    }));
    
    return { imageUrl: await extractImageFromResponse(response) };
};

export const generateBrollVideoPrompt = async (image: { base64: string, mimeType: string }, productDesc: string, title: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const systemInstruction = `You are a World-Class AI Video Prompt Engineer. 
    Your goal is to transform a "Reference Image" and "Product Context" into a high-end, professional one-liner video prompt optimized for Image-to-Video models (Luma, Runway Gen-3, Veo).
    
    ENGINEERING RULES:
    1. VISUAL ANCHORING: Analyze the provided image. Describe the subject exactly as it appears. Ensure the video keeps 100% subject consistency.
    2. CINEMATOGRAPHY: Use technical terms (orbital pan, slow push-in, low-angle tracking, shallow depth-of-field, 4k cinematic render).
    3. PHYSICS & MOTION: Describe fluid, realistic movement. No morphing. 
    4. COMPACTNESS: The output MUST be a single, dense, professional paragraph (max 50 words).
    5. NO INTRO/OUTRO: Respond ONLY with the engineered prompt. Do not add explanations or quotes.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: { parts: [
            { inlineData: { data: image.base64, mimeType: image.mimeType } }, 
            { text: `Product context: ${productDesc}. Scene: ${title}. Create a cinematic video motion prompt for this image.` }
        ] },
        config: { systemInstruction }
    });
    return response.text?.trim() || "";
};

export const generateBrollCaption = async (image: { base64: string, mimeType: string }, productDesc: string, title: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const systemInstruction = `Anda adalah Instagram Marketing Expert. Berdasarkan foto produk komersial yang diunggah, buatlah caption Instagram yang sangat menarik, persuasif, and elegan dalam Bahasa Indonesia. Sertakan emoji yang relevan dan 5 hashtag populer di akhir.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [
            { inlineData: { data: image.base64, mimeType: image.mimeType } }, 
            { text: `Context: ${productDesc}. Scene: ${title}.` }
        ] },
        config: { systemInstruction }
    });
    return response.text?.trim() || "";
};

// =================== Digi Voice Services ===================

export const generateVoiceover = async (text: string, voice: string, speed: string, pitch: string, mood?: string): Promise<{ base64Audio: string, sampleRate: number }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response: any = await retryWithBackoff(() => ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: text }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    // Fix: Corrected structure to include prebuiltVoiceConfig wrapper for voiceName
                    prebuiltVoiceConfig: { voiceName: voice } 
                }
            }
        }
    }));
    const part = response.candidates?.[0]?.content?.parts?.[0];
    const base64Audio = part?.inlineData?.data;
    const mimeType = part?.inlineData?.mimeType;
    const sampleRateMatch = mimeType?.match(/rate=(\d+)/);
    const sampleRate = sampleRateMatch ? parseInt(sampleRateMatch[1], 10) : 24000;
    return { base64Audio, sampleRate };
};

export const generateVoiceSample = async (voice: string): Promise<{ base64Audio: string, sampleRate: number }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: "Halo, ini pratinjau suara saya." }] }],
        config: { 
            responseModalities: [Modality.AUDIO], 
            speechConfig: { 
                voiceConfig: { 
                    // Fix: Corrected structure to include prebuiltVoiceConfig wrapper for voiceName
                    prebuiltVoiceConfig: { voiceName: voice } 
                } 
            } 
        }
    });
    const part = response.candidates?.[0]?.content?.parts?.[0];
    const base64Audio = part?.inlineData?.data || "";
    const mimeType = part?.inlineData?.mimeType || "";
    const sampleRateMatch = mimeType.match(/rate=(\d+)/);
    const sampleRate = sampleRateMatch ? parseInt(sampleRateMatch[1], 10) : 24000;
    return { base64Audio, sampleRate };
};

export const generateAIScript = async (type: string, tone: string, input: string, addTags: boolean): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const systemInstruction = `You are a professional Voice-Over Scriptwriter for advertising. 
    Your task is to write a script based on the provided details. 
    CRITICAL RULE: Return ONLY the final script text. Do not include any greetings, explanations, "Here is your script", or closing remarks. 
    Output should be raw text only. 
    If tags are requested, insert them naturally in square brackets like [excited] or [pause].`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [{ text: `Tulis naskah voice over ${type} dengan tone ${tone} untuk: "${input}". ${addTags ? "Tambahkan tag emosi seperti [excited], [pause], [warm] di dalam naskah." : ""}` }] },
        config: { systemInstruction }
    });
    return response.text?.trim() || "";
};

export const translateScript = async (text: string, lang: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const systemInstruction = `You are a professional translator. Translate the provided text into ${lang}. 
    CRITICAL RULE: Return ONLY the translated text. Do not include any "Translated version:", greetings, or introductory fluff.`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [{ text: `Translate the following text to ${lang}:\n\n${text}` }] },
        config: { systemInstruction }
    });
    return response.text?.trim() || "";
};

export const analyzeAndTagScript = async (text: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const systemInstruction = `You are a professional Voice-Over Director. 
    Your task is to take a provided script and insert emotion tags such as [excited], [calm], [serious], [pause], [happy], [whisper], [warm] to guide the voice actor. 
    CRITICAL RULE: Return ONLY the script with the inserted tags. Do not include any introductory remarks like "Certainly, here is the script" or concluding sentences. 
    Do not use markdown blocks or quotes. Just plain text with tags.`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [{ text: `Insert emotion tags into this script for a better voice-over performance:\n\n${text}` }] },
        config: { systemInstruction }
    });
    return response.text?.trim() || text;
};

// =================== Digi Product Services ===================

export const generateDigiProductConcepts = async (productImage: UploadedImage, isBooster: boolean, style: string, modelImage?: UploadedImage | null): Promise<any[]> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const count = isBooster ? 10 : 4;

    const systemInstruction = `You are a Senior Creative Director at a high-end commercial advertising agency. 
    Analyze the provided product image (and optional model image). 
    Generate ${count} creative, photorealistic, and highly engaging photoshoot concepts for the product in a "${style}" style.
    Each concept must have a short, catchy Indonesian title ("name") and a detailed English prompt ("prompt") optimized for a high-quality AI image generator.
    The prompts should focus on lighting, composition, mood, and realistic integration of the product into the scene.
    Respond only with a valid JSON array of objects.`;

    const parts: Part[] = [toPart(productImage)];
    if (modelImage) {
        parts.push(toPart(modelImage));
        parts.push({ text: `Analyze the model above. Incorporate this specific person into the photoshoot concepts naturally.` });
    }
    parts.push({ text: `Generate ${count} concepts for photoshoot using style: ${style}. Return a JSON array.` });

    const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: { parts },
        config: { 
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING, description: "Short Indonesian title" },
                        prompt: { type: Type.STRING, description: "Detailed English image generation prompt" }
                    },
                    required: ["name", "prompt"]
                }
            }
        }
    });

    try {
        return JSON.parse(response.text || '[]');
    } catch (e) {
        console.error("Failed to parse AI concepts:", e);
        // Fallback for UI stability
        return Array.from({ length: count }).map((_, i) => ({
            name: `Konsep ${i + 1}`,
            prompt: `A professional commercial photograph of the product, ${style} aesthetic, high-end studio lighting, 8k resolution.`
        }));
    }
};

export const generateDigiProductImage = async (productImage: UploadedImage, prompt: string, aspectRatio: string, logoImage?: UploadedImage | null): Promise<{ imageUrl: string }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    
    // Technical instructions for high fidelity
    const systemInstruction = "Execute a photorealistic commercial photoshoot. Ensure the product from the reference image is integrated perfectly into the scene described in the prompt. Match lighting, shadows, and perspective precisely. High fidelity textures required.";

    const parts: Part[] = [toPart(productImage)];
    if (logoImage) parts.push(toPart(logoImage));
    parts.push({ text: `GENERATE IMAGE: ${prompt}. Aspect ratio: ${aspectRatio}.` });

    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: { 
            systemInstruction,
            imageConfig: { aspectRatio: aspectRatio as any } 
        }
    }));
    return { imageUrl: await extractImageFromResponse(response) };
};

export const generateStyloImage = async (prompt: string, modelImage: UploadedImage, productImage: UploadedImage | null, logoImage: UploadedImage | null, aspectRatio: string): Promise<{ imageUrl: string }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    
    const systemInstruction = "Senior Digital Imaging Specialist: Perform a high-fidelity virtual try-on or photoshoot. Maintain 100% face identity of the model and exact details of the product. The clothing/product must follow the body contours and fabric physics perfectly. No floating parts or distorted anatomy.";

    const parts = [toPart(modelImage)];
    if (productImage) parts.push(toPart(productImage));
    if (logoImage) parts.push(toPart(logoImage));
    parts.push({ text: `EXECUTIVE PHOTOSHOOT: ${prompt}. Aspect ratio: ${aspectRatio}.` });

    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: { 
            systemInstruction,
            imageConfig: { aspectRatio: aspectRatio as any } 
        }
    }));
    return { imageUrl: await extractImageFromResponse(response) };
};

export const generateFaceSwap = async (targetImage: ImageData, faceImage: ImageData, aspectRatio: string = "1:1"): Promise<{ imageUrl: string }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    
    // Step 1: Analisis wajah referensi (faceImage) & Identifikasi Selebriti
    const analysisPrompt = "Analyze this face. If this person is a recognizable celebrity, actor, musician, or public figure, you MUST state their exact name clearly at the very beginning. Then, describe their gender, age, facial structure, eye shape and color, nose shape, lips, jawline, cheekbones, skin tone, facial hair, hairstyle, and any distinctive features. Provide a highly detailed forensic description in English.";
    
    const analysisResponse = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
            parts: [
                toPart(faceImage),
                { text: analysisPrompt }
            ]
        }
    }));
    
    const faceDescription = analysisResponse.text?.trim() || "A natural face.";

    // Step 2: Generate Face Swap (Image Editing)
    const swapPrompt = `IMAGE EDITING INSTRUCTION:
You are an expert photo retoucher. Modify the provided image by replacing ONLY the face of the person.

CRITICAL RULES:
1. PRESERVE EVERYTHING ELSE: The background, clothing, body, pose, lighting, and image composition MUST remain exactly 100% identical to the original image. DO NOT alter the shirt, the text on the shirt, or the room.
2. REPLACE FACE: Change the facial features to match this exact description: "${faceDescription}". If a celebrity name is mentioned in the description, make the new face look EXACTLY like that celebrity.
3. SEAMLESS BLEND: Ensure the new face matches the lighting direction, shadows, and skin tone of the original person's neck and body. The edit must be photorealistic and undetectable.`;

    const parts: Part[] = [
        toPart(targetImage),
        { text: swapPrompt }
    ];

    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: { 
            imageConfig: { aspectRatio: aspectRatio as any }
        }
    }));
    
    return { imageUrl: await extractImageFromResponse(response) };
};

export const generateVirtualTryOn = async (productImage: ImageData, modelImage: ImageData, aspectRatio: string): Promise<{ imageUrl: string }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    
    const precisePrompt = "Dengan menggunakan foto produk dan foto model yang tersedia, buatlah sebuah gambar fotorealistis baru di mana model tersebut sedang mengenakan atau menggunakan produk tersebut. Pastikan hasilnya berkualitas tinggi dan terlihat seperti sesi pemotretan profesional. Pertahankan penampilan model dan detail produk secara konsisten.";

    const parts: Part[] = [
        toPart(modelImage),
        toPart(productImage),
        { text: precisePrompt }
    ];

    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: { 
            imageConfig: { aspectRatio: aspectRatio as any }
        }
    }));
    
    return { imageUrl: await extractImageFromResponse(response) };
};

export const generateAdImage = async (productImage: ImageData, adCopy: any, referenceImage?: ImageData | null): Promise<{ imageUrls: string[] }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const parts = [toPart(productImage)];
    if (referenceImage) parts.push(toPart(referenceImage));
    parts.push({ text: `Ad poster: ${adCopy.headline}. ${adCopy.description}. Style reference attached if any.` });

    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts }
    }));
    return { imageUrls: [await extractImageFromResponse(response)] };
};

export const generateAdCopySuggestions = async (productName: string, keywords: string): Promise<any> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate 3 catchy ad copy options (headlines, descriptions, CTAs) for product "${productName}" with features: "${keywords}". Return as JSON.`,
        config: { 
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    headlines: { type: Type.ARRAY, items: { type: Type.STRING } },
                    descriptions: { type: Type.ARRAY, items: { type: Type.STRING } },
                    ctas: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["headlines", "descriptions", "ctas"]
            }
        }
    });
    return JSON.parse(response.text || '{}');
};

export const generateStudioPoses = async (modelImage: ImageData, mode: any, options: any): Promise<{ imageUrls: string[] }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [toPart(modelImage), { text: `New pose: ${options.theme}, ${options.angle}, ${options.framing}. ${options.instructions}` }] }
    }));
    return { imageUrls: [await extractImageFromResponse(response)] };
};

export const resizeImage = async (image: ImageData): Promise<{ imageUrls: string[] }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [toPart(image), { text: "Outpaint and expand this image to fill the canvas naturally." }] }
    }));
    return { imageUrls: [await extractImageFromResponse(response)] };
};

export const editImageWithMask = async (maskedImage: ImageData, prompt: string): Promise<{ imageUrls: string[] }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [toPart(maskedImage), { text: `Inpaint instruction: ${prompt}` }] }
    }));
    return { imageUrls: [await extractImageFromResponse(response)] };
};

export const editImage = async (original: UploadedImage, mask: UploadedImage, prompt: string): Promise<{ imageUrl: string }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [toPart(original), toPart(mask), { text: `Edit instructions: ${prompt}` }] }
    }));
    return { imageUrl: await extractImageFromResponse(response) };
};

export const generateVideo = async (prompt: string, image?: ImageData | UploadedImage, aspectRatio?: '16:9' | '9:16'): Promise<string | undefined> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    
    const payload: any = {
        model: 'veo-3.1-fast-generate-preview',
        prompt,
        config: { 
            numberOfVideos: 1,
            aspectRatio: aspectRatio || '16:9',
            resolution: '720p'
        }
    };

    if (image) {
        const base64 = 'base64' in image ? image.base64 : image.dataUrl.split(',')[1];
        payload.image = { imageBytes: base64, mimeType: image.mimeType };
    }

    let operation = await ai.models.generateVideos(payload);
    
    while (!operation.done) {
        await new Promise(r => setTimeout(r, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    return operation.response?.generatedVideos?.[0]?.video?.uri;
};

export const suggestMotionPrompt = async (image: ImageData): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [toPart(image), { text: "Suggest a short, cinematic motion prompt for this image." }] }
    });
    return response.text?.trim() || "";
};

export const generateMotionPrompt = async (image: ImageData, keywords: string): Promise<{ prompts: string[] }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [toPart(image), { text: `Generate 3 motion prompts based on keywords: ${keywords}. Return JSON array.` }] },
        config: { 
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    prompts: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["prompts"]
            }
        }
    });
    return JSON.parse(response.text || '{"prompts":[]}');
};

export const generateMergePrompt = async (images: UploadedImage[], existingScenario: string = ""): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [...images.map(img => toPart(img)), { text: `Based on images above, create a detailed cinematic prompt for merging them. Context: ${existingScenario}` }] }
    });
    return response.text?.trim() || "";
};

export const generateMergedImage = async (images: UploadedImage[], prompt: string, aspectRatio: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [...images.map(img => toPart(img)), { text: prompt }] },
        config: { imageConfig: { aspectRatio: aspectRatio as any } }
    }));
    const dataUrl = await extractImageFromResponse(response);
    return dataUrl.split(',')[1];
};

export const generateLifestylePhotoshoot = async (product: ImageData, model: ImageData | null, params: any, interaction: string): Promise<{ imageUrls: string[] }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const parts = [toPart(product)];
    if (model) parts.push(toPart(model));
    parts.push({ text: `Lifestyle photoshoot: ${interaction}. Model params: ${JSON.stringify(params)}` });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts }
    }));
    return { imageUrls: [await extractImageFromResponse(response)] };
};

export const generateDigitalImaging = async (product: ImageData, options: any): Promise<{ imageUrls: string[] }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [toPart(product), { text: `Digital imaging art: ${options.theme}. Props: ${options.props}. Instructions: ${options.instructions}` }] }
    }));
    return { imageUrls: [await extractImageFromResponse(response)] };
};

export const generateDigitalImagingConcepts = async (product: ImageData): Promise<any> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [toPart(product), { text: "Suggest 3 unique digital imaging art concepts for this product. Return JSON array." }] },
        config: { 
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    concepts: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["concepts"]
            }
        }
    });
    return JSON.parse(response.text || '{"concepts":[]}');
};

export const generateDigitalImagingFromConcept = async (product: ImageData, concept: string): Promise<{ imageUrls: string[] }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [toPart(product), { text: concept }] }
    }));
    return { imageUrls: [await extractImageFromResponse(response)] };
};

export const generatePovShot = async (product: ImageData, options: any, background?: ImageData | null): Promise<{ imageUrls: string[] }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const parts = [toPart(product)];
    if (background) parts.push(toPart(background));
    parts.push({ text: `POV shot holding product. Hand style: ${options.handStyle}. Background theme: ${options.theme}. Instructions: ${options.instructions}` });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts }
    }));
    return { imageUrls: [await extractImageFromResponse(response)] };
};

export const generateMirrorSelfie = async (product: ImageData, options: any, model?: ImageData | null): Promise<{ imageUrls: string[] }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const parts = [toPart(product)];
    if (model) parts.push(toPart(model));
    parts.push({ text: `Mirror selfie: ${options.frame}. Model info: ${options.gender}, ${options.ethnicity}. Location: ${options.theme}. ${options.customTheme}` });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts }
    }));
    return { imageUrls: [await extractImageFromResponse(response)] };
};

export const generateListingImage = async (product: ImageData, options: any): Promise<{ imageUrls: string[] }> => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  const response = await retryWithBackoff(() => ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [toPart(product), { text: `Ecommerce listing infographic. Style: ${options.style}. Features: ${options.features.join(', ')}` }] }
  }));
  return { imageUrls: [await extractImageFromResponse(response)] };
};

export const generatePerspectiveSet = async (grid: any, options: any): Promise<any> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const results: any = {};
    for (const key of Object.keys(grid)) {
        if (!grid[key]) continue;
        const response = await retryWithBackoff(() => ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [toPart(grid[key]), { text: `Perspective view (${key}) with theme: ${options.theme}. ${options.instructions}` }] },
            config: { imageConfig: { aspectRatio: '1:1' } }
        }));
        results[key] = await extractImageFromResponse(response);
    }
    return results;
};

export const generateBackgroundChange = async (product: ImageData, background: ImageData | null, options: any): Promise<{ imageUrls: string[] }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const parts = [toPart(product)];
    if (background) parts.push(toPart(background));
    parts.push({ text: `Change background: ${options.prompt || "Professional studio setting"}. Instructions: ${options.instructions}` });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts }
    }));
    return { imageUrls: [await extractImageFromResponse(response)] };
};

export const removeBackground = async (product: ImageData): Promise<{ imageUrls: string[] }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [toPart(product), { text: "Remove the background and return the subject on a pure white background." }] }
    }));
    return { imageUrls: [await extractImageFromResponse(response)] };
};

export const generateCarouselDetails = async (image: UploadedImage): Promise<any> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [toPart(image), { text: "Analyze the product in this image and provide a product name and short description. Return JSON." }] },
        config: { 
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    productName: { type: Type.STRING },
                    shortDescription: { type: Type.STRING }
                },
                required: ["productName", "shortDescription"]
            }
        }
    });
    return JSON.parse(response.text || '{}');
};

export const generateCarouselScript = async (name: string, desc: string, type: string, count: number): Promise<string[]> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a ${count}-slide carousel script for "${name}" (${desc}) with style "${type}". Indonesian language. Return JSON array of strings.`,
        config: { 
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    scripts: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["scripts"]
            }
        }
    });
    const data = JSON.parse(response.text || '{"scripts":[]}');
    return data.scripts;
};

export const generateCarouselSlide = async (image: UploadedImage, slide: number, style: string, ratio: string, isText: boolean): Promise<{ imageUrl: string }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [toPart(image), { text: `Carousel slide #${slide} for high-end commerce. Style: ${style}.` }] },
        config: { imageConfig: { aspectRatio: ratio as any } }
    }));
    return { imageUrl: await extractImageFromResponse(response) };
};

export const generateProductPhoto = async (product: UploadedImage, prompt: string, logo: UploadedImage | null, aspectRatio: string): Promise<{ imageUrl: string }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const parts = [toPart(product)];
    if (logo) parts.push(toPart(logo));
    parts.push({ text: prompt });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: { imageConfig: { aspectRatio: aspectRatio as any } }
    }));
    return { imageUrl: await extractImageFromResponse(response) };
};

export const generateModelImages = async (prompt: string, ratio: string, count: number): Promise<{ imageUrls: string[] }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: prompt,
        config: { imageConfig: { aspectRatio: ratio as any } }
    }));
    return { imageUrls: [await extractImageFromResponse(response)] };
};

export const changeModelPose = async (image: UploadedImage, pose: string, ratio: string): Promise<{ imageUrl: string }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [toPart(image), { text: `Change pose to: ${pose}` }] },
        config: { imageConfig: { aspectRatio: ratio as any } }
    }));
    return { imageUrl: await extractImageFromResponse(response) };
};

export const enhanceImage = async (image: UploadedImage, prompt: string, ratio: string): Promise<{ imageUrl: string }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [toPart(image), { text: prompt }] },
        config: { imageConfig: { aspectRatio: ratio as any } }
    }));
    return { imageUrl: await extractImageFromResponse(response) };
};

export const generateStoryboardScenes = async (script: string, reference: UploadedImage | null): Promise<any[]> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const parts = [];
    if (reference) parts.push(toPart(reference));
    parts.push({ text: `Break this script into 4 visual storyboard panels: "${script}". Return JSON array.` });

    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config: { 
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        visual_prompt: { type: Type.STRING },
                        narration: { type: Type.STRING }
                    },
                    required: ["visual_prompt", "narration"]
                }
            }
        }
    }));
    return JSON.parse(response.text || '[]');
};

export const visualizeStoryboardScene = async (scene: any, ratio: string, index: number, reference: UploadedImage | null, previous?: UploadedImage | null): Promise<{ imageUrl: string }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const parts = [];
    if (reference) parts.push(toPart(reference));
    if (previous) parts.push(toPart(previous));
    parts.push({ text: `Storyboard Scene #${index + 1}: ${scene.visual_prompt}. Maintain visual consistency.` });

    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: { imageConfig: { aspectRatio: ratio as any } }
    }));
    return { imageUrl: await extractImageFromResponse(response) };
};

export const suggestNextStoryboardScenes = async (lastScene: any, reference: UploadedImage | null): Promise<any[]> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Suggest 4 different next scene options following this panel: "${lastScene.narration}". Return JSON.`,
        config: { 
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        visual_prompt: { type: Type.STRING },
                        narration: { type: Type.STRING }
                    },
                    required: ["visual_prompt", "narration"]
                }
            }
        }
    }));
    return JSON.parse(response.text || '[]');
};

export const generateVideoAIPrompt = async (panel: any): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    // Sanitize data: Remove large base64 strings to prevent payload errors
    const clean = (p: any) => ({ 
        visual_prompt: p?.visual_prompt || "No visual prompt provided", 
        narration: p?.narration || "No narration provided" 
    });
    const sanitizedData = Array.isArray(panel) ? panel.map(clean) : clean(panel);

    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents: `Create a professional, highly detailed one-liner video generation prompt for this storyboard data: ${JSON.stringify(sanitizedData)}. Focus on camera movement, lighting, and subject consistency. Respond ONLY with the prompt.`
    }));
    return response.text?.trim() || "Gagal menghasilkan prompt teknis.";
};

export const generateCreativeDirectorNarration = async (panel: any): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    // Sanitize data: Remove large base64 strings
    const clean = (p: any) => ({ 
        visual_prompt: p?.visual_prompt || "No visual prompt provided", 
        narration: p?.narration || "No narration provided" 
    });
    const sanitizedData = Array.isArray(panel) ? panel.map(clean) : clean(panel);

    const systemInstruction = `Anda adalah seorang Sutradara Kreatif (Creative Director) kelas dunia. 
    Tugas Anda adalah memberikan narasi pengarahan adegan (Image-to-Video) yang puitis, teknis, dan inspiratif dalam Bahasa Indonesia.
    
    STRUKTUR NARASI:
    1. Subjek & Aksi: Jelaskan apa yang terjadi dengan detail emosional.
    2. Pergerakan Kamera: Gunakan istilah sinematografi (zoom in, pan, tilt, dolly).
    3. Atmosfer & Cahaya: Jelaskan mood, warna, dan pendaran cahaya.
    4. Detail Sinematik: Tambahkan elemen partikel, debu, atau tekstur untuk menghidupkan suasana.
    
    Gunakan gaya bahasa yang profesional namun membangkitkan imajinasi. Respond ONLY with the narration in Indonesian.`;

    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents: `Buatkan narasi pengarahan video untuk data storyboard ini: ${JSON.stringify(sanitizedData)}`,
        config: { systemInstruction }
    }));
    return response.text?.trim() || "Gagal membuat narasi sutradara.";
};

export const enhanceVideoPrompt = async (image: UploadedImage, idea: string, hasDialog: boolean, dialog?: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    
    const systemInstruction = `You are a World-Class AI Video Prompt Engineer. 
    Your goal is to transform a "Basic Idea" and a "Reference Image" into a high-end, professional one-liner prompt optimized for Image-to-Video models (Luma, Runway Gen-3, Veo).
    
    ENGINEERING RULES:
    1. VISUAL ANCHORING: Analyze the provided image. Describe the subject exactly as it appears (age, clothing, environment). Ensure the video keeps 100% subject consistency.
    2. CINEMATOGRAPHY: Use technical terms (orbital pan, slow push-in, low-angle tracking, shallow depth-of-field, 4k cinematic render).
    3. PHYSICS & MOTION: Describe fluid, realistic movement. No morphing. Geometry must be consistent. 
    4. DIALOG/LIP-SYNC: If dialog is provided, include technical instructions for accurate phonetic lip-sync movements suitable for the provided text.
    5. COMPACTNESS: The output must be a single, dense, professional paragraph.
    
    Respond ONLY with the engineered prompt. Do not add explanations or quotes.`;

    const parts: Part[] = [
        toPart(image),
        { text: `Basic Idea: ${idea}` }
    ];

    if (hasDialog && dialog) {
        parts.push({ text: `Target Dialog (Bahasa Indonesia): "${dialog}". Ensure lip-sync is technically optimized for these phonemes.` });
    }

    const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: { parts },
        config: { systemInstruction }
    });
    
    return response.text?.trim() || "Gagal membuat prompt video.";
};

export const generateMockupImage = async (design: UploadedImage, mockup: UploadedImage | string, instructions: string): Promise<{ imageUrls: string[] }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const parts = [toPart(design)];
    if (typeof mockup !== 'string') parts.push(toPart(mockup));
    parts.push({ text: `Mockup instruction: Place design on ${typeof mockup === 'string' ? mockup : 'the product above'}. ${instructions}` });

    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts }
    }));
    return { imageUrls: [await extractImageFromResponse(response)] };
};

export const generateSinglePhotoshootImage = async (source: UploadedImage, basePrompt: string, custom: string, ratio: string): Promise<{ imageUrl: string }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [toPart(source), { text: `Photoshoot: ${basePrompt}. Custom theme: ${custom}` }] },
        config: { imageConfig: { aspectRatio: ratio as any } }
    }));
    return { imageUrl: await extractImageFromResponse(response) };
};

export const generateContent = async (prompt: string, images: any[], config: any): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const parts = images.map(img => toPart(img));
    parts.push({ text: prompt });
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config
    });
    return response.text || "";
};

export const generateImage = async (prompt: string, image: any): Promise<{ imageUrl: string }> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await retryWithBackoff(() => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [toPart(image), { text: prompt }] }
    }));
    return { imageUrl: await extractImageFromResponse(response) };
};

export const PHOTOSHOOT_BASE_PROMPTS = [
    "High-end fashion editorial", "Cinematic street style", "Vogue style studio", "Dreamlike atmosphere", "Luxury brand ad",
    "Minimalist Scandinavian", "Commercial Cinematic Lighting", "Vintage 90s aesthetic", "Cyberpunk future", "Moody noir", "Nature fusion",
    "Industrial rugged", "Soft bridal editorial", "Cinematic Editorial Glow", "Cozy lifestyle morning", "Sportswear",
    "Elegant evening wear", "Premium Product Gallery", "Regal luxury", "Fresh summer vibe"
];
