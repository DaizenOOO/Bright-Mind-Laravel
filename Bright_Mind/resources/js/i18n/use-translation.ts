import { usePage } from '@inertiajs/react';

export function useTranslation() {
    const translations = usePage<{ translations: Record<string, string> }>()
        .props.translations;

    return (key: string) => translations[key] ?? key;
}
