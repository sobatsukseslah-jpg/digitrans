import { translations } from './translations';
import { translate } from '@vitalets/google-translate-api';
import fs from 'fs';

async function translateObject(obj: any): Promise<any> {
    const result: any = {};
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            try {
                const res = await translate(obj[key], { from: 'id', to: 'en' });
                result[key] = res.text;
                console.log(`Translated: ${obj[key]} -> ${res.text}`);
                // Add a small delay to avoid rate limiting
                await new Promise(r => setTimeout(r, 100));
            } catch (e) {
                console.error(`Error translating ${obj[key]}:`, e);
                result[key] = obj[key]; // Fallback to original
            }
        } else if (typeof obj[key] === 'object') {
            result[key] = await translateObject(obj[key]);
        }
    }
    return result;
}

async function main() {
    console.log('Translating...');
    try {
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
    } catch (e) {
        console.error(e);
    }
}

main();
