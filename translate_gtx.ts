import { translations } from './translations';
import fs from 'fs';

async function translateText(text: string): Promise<string> {
    try {
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=en&dt=t&q=${encodeURIComponent(text)}`);
        const data = await res.json();
        if (data && data[0] && data[0][0] && data[0][0][0]) {
            return data[0].map((item: any) => item[0]).join('');
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
            await new Promise(r => setTimeout(r, 50)); // Small delay
        } else if (typeof obj[key] === 'object') {
            result[key] = await translateObject(obj[key]);
        }
    }
    return result;
}

async function main() {
    console.log('Translating...');
    const translated = await translateObject(translations);
    
    const newFileContent = `
type Translations = {
  [key: string]: string | Translations;
};

export const translations: { id: Translations, en: Translations } = {
  id: ${JSON.stringify(translations, null, 2)},
  en: ${JSON.stringify(translated, null, 2)}
};

export function getTranslation(key: string, source: any): string {
  const keys = key.split('.');
  let result = source;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return key;
    }
  }
  
  if (typeof result === 'string') {
      return result;
  }

  return key;
}
`;
    fs.writeFileSync('translations.ts', newFileContent);
    console.log('Done!');
}

main();
