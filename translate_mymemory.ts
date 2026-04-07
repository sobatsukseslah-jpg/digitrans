import { translations } from './translations';
import fs from 'fs';

async function translateText(text: string): Promise<string> {
    try {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|en`);
        const data = await res.json();
        if (data && data.responseData && data.responseData.translatedText) {
            return data.responseData.translatedText;
        }
    } catch (e) {
        console.error(e);
    }
    return text;
}

async function translateObject(obj: any): Promise<any> {
    const result: any = {};
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            result[key] = await translateText(obj[key]);
            console.log(`Translated: ${obj[key]} -> ${result[key]}`);
            await new Promise(r => setTimeout(r, 500)); // Rate limit
        } else if (typeof obj[key] === 'object') {
            result[key] = await translateObject(obj[key]);
        }
    }
    return result;
}

async function main() {
    console.log('Translating...');
    const translated = await translateObject(translations);
    fs.writeFileSync('translations_en.json', JSON.stringify(translated, null, 2));
    console.log('Done!');
}

main();
