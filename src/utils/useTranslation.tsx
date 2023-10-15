import { useAtom } from 'jotai';
import { languageAtom } from '~/Experience';

export function useTranslation(key: string[]) {
    const [language] = useAtom(languageAtom);

    return key[language.id];
}