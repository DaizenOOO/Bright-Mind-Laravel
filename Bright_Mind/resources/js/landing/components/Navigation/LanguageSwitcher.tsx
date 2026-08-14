import { router, usePage } from '@inertiajs/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { localeDefinition, supportedLocales } from '@/i18n/locales';
import type { LocaleCode } from '@/i18n/locales';
import { useTranslation } from '@/i18n/use-translation';

export function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
    const locale = usePage<{ locale: string }>().props.locale;
    const current = localeDefinition(locale);
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const reduceMotion = useReducedMotion();
    const t = useTranslation();

    useEffect(() => {
        const outside = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        const keydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && open) {
                setOpen(false);
                triggerRef.current?.focus();
            }
        };
        document.addEventListener('pointerdown', outside);
        document.addEventListener('keydown', keydown);

        return () => {
            document.removeEventListener('pointerdown', outside);
            document.removeEventListener('keydown', keydown);
        };
    }, [open]);

    const selectLocale = (nextLocale: LocaleCode) => {
        setOpen(false);
        window.localStorage.setItem('bm_locale', nextLocale);
        router.post(
            '/locale',
            { locale: nextLocale },
            { preserveScroll: true },
        );
    };

    const focusOption = (index: number) => {
        optionRefs.current[
            (index + supportedLocales.length) % supportedLocales.length
        ]?.focus();
    };

    const onMenuKeyDown = (event: React.KeyboardEvent) => {
        const index = optionRefs.current.indexOf(
            document.activeElement as HTMLButtonElement,
        );

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            focusOption(index + 1);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            focusOption(index - 1);
        } else if (event.key === 'Home') {
            event.preventDefault();
            focusOption(0);
        } else if (event.key === 'End') {
            event.preventDefault();
            focusOption(supportedLocales.length - 1);
        }
    };

    return (
        <div
            ref={rootRef}
            className={mobile ? 'relative w-full' : 'relative shrink-0'}
        >
            <button
                ref={triggerRef}
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
                onKeyDown={(event) => {
                    if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        setOpen(true);
                        window.setTimeout(() => focusOption(0), 0);
                    }
                }}
                className={`flex min-h-10 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 text-sm font-bold text-[#17344d] transition-colors hover:border-[#8dbed0] hover:bg-[#f5fafc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d6fea] ${mobile ? 'w-full justify-between py-3' : ''}`}
            >
                <span className="flex min-w-0 items-center gap-2">
                    <img
                        src={current.flag}
                        alt=""
                        className="h-4 w-6 rounded-[2px] object-cover shadow-sm"
                    />
                    <span className="truncate">{current.name}</span>
                </span>
                <ChevronDown
                    aria-hidden="true"
                    className={`h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        role="menu"
                        aria-label={t('Choose language')}
                        initial={
                            reduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: -6, scale: 0.98 }
                        }
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={
                            reduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: -4, scale: 0.98 }
                        }
                        transition={{
                            duration: reduceMotion ? 0.01 : 0.16,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        onKeyDown={onMenuKeyDown}
                        className={`${mobile ? 'relative mt-2 w-full' : 'absolute top-[calc(100%+8px)] right-0 z-[120] w-56'} overflow-hidden rounded-xl border border-neutral-200 bg-white p-1.5 shadow-[0_18px_50px_rgba(23,52,77,0.16)]`}
                    >
                        {supportedLocales.map((option, index) => {
                            const selected = option.code === current.code;

                            return (
                                <button
                                    key={option.code}
                                    ref={(element) => {
                                        optionRefs.current[index] = element;
                                    }}
                                    type="button"
                                    role="menuitemradio"
                                    aria-checked={selected}
                                    onClick={() => selectLocale(option.code)}
                                    className={`flex min-h-10 w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#1d6fea] ${selected ? 'bg-[#eaf5f8] text-[#123f5a]' : 'text-[#29465d] hover:bg-neutral-50'}`}
                                >
                                    <img
                                        src={option.flag}
                                        alt=""
                                        className="h-4 w-6 rounded-[2px] object-cover shadow-sm"
                                    />
                                    <span className="min-w-0 flex-1 break-words">
                                        {option.name}
                                    </span>
                                    {selected && (
                                        <Check
                                            aria-hidden="true"
                                            className="h-4 w-4 shrink-0 text-[#087f8c]"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
