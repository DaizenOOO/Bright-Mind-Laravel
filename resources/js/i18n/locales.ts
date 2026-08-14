export const supportedLocales = [
    { code: 'en', name: 'English', flag: '/flags/gb.png' },
    { code: 'pl', name: 'Polski', flag: '/flags/pl.png' },
    { code: 'es', name: 'Español', flag: '/flags/es.png' },
    { code: 'bg', name: 'Български', flag: '/flags/bg.png' },
    { code: 'el', name: 'Ελληνικά', flag: '/flags/gr.png' },
    { code: 'it', name: 'Italiano', flag: '/flags/it.png' },
] as const;

export type LocaleCode = (typeof supportedLocales)[number]['code'];

export function localeDefinition(locale: string) {
    return (
        supportedLocales.find((option) => option.code === locale) ??
        supportedLocales[0]
    );
}
