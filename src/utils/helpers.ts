import { Request } from 'express';
import { languages } from './enums';

export function getLanguageFromHeader(req: Request): string {
    if (!req.headers['language']) {
        return 'en'; // default language
    }
    const lang = req.headers['language'].toString().toLowerCase();
    if (languages.includes(lang)) {
        return lang;
    }
    return 'en'; // default language

}