import { GoogleGenAI } from "@google/genai";

async function test() {
    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent?key=AIzaSyB8nSXTaASXRZHeK0EA4zGycicu1Tsis0o", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "https://ais-dev-3tbyvrfbfcg75zw5lq5th5-222610174794.asia-southeast1.run.app",
                "Referer": "https://ais-dev-3tbyvrfbfcg75zw5lq5th5-222610174794.asia-southeast1.run.app/"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "hello" }] }]
            })
        });
        const data = await response.json();
        console.log("STATUS:", response.status);
        console.log("RESPONSE:", JSON.stringify(data));
    } catch (e: any) {
        console.error("ERROR:", e.message);
    }
}
test();
