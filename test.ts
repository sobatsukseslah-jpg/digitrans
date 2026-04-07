import { GoogleGenAI } from "@google/genai";

async function test() {
    try {
        const ai = new GoogleGenAI({ apiKey: "AIzaSyB8nSXTaASXRZHeK0EA4zGycicu1Tsis0o" });
        const response = await ai.models.generateContent({
            model: 'gemini-3.1-pro-preview',
            contents: "hello"
        });
        console.log("SUCCESS:", response.text);
    } catch (e: any) {
        console.error("ERROR:", e.message);
        console.error("DETAILS:", JSON.stringify(e));
    }
}
test();
