import { GoogleGenAI } from "@google/genai";
import { translations } from './translations';
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
    console.log('Translating with Gemini...');
    
    const prompt = `Translate the following JSON object values from Indonesian to English. Keep the keys exactly the same. Return ONLY the translated JSON object.
    
    ${JSON.stringify(translations, null, 2)}
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.1-pro-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        
        const translatedText = response.text;
        const translated = JSON.parse(translatedText);
        
        const newFileContent = "type Translations = {\n" +
"  [key: string]: string | Translations;\n" +
"};\n\n" +
"export const translations: { id: Translations, en: Translations } = {\n" +
"  id: " + JSON.stringify(translations, null, 2) + ",\n" +
"  en: " + JSON.stringify(translated, null, 2) + "\n" +
"};\n\n" +
"export function getTranslation(key: string, source: any): string {\n" +
"  const keys = key.split('.');\n" +
"  let result = source;\n" +
"  for (const k of keys) {\n" +
"    if (result && typeof result === 'object' && k in result) {\n" +
"      result = result[k];\n" +
"    } else {\n" +
"      return key;\n" +
"    }\n" +
"  }\n" +
"  \n" +
"  if (typeof result === 'string') {\n" +
"      return result;\n" +
"  }\n\n" +
"  return key;\n" +
"}\n";

        fs.writeFileSync('translations.ts', newFileContent);
        console.log('Done!');
    } catch (e) {
        console.error(e);
    }
}

main();
