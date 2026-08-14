import { GraduationCap, Search } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import { Link } from '@inertiajs/react';
import { dashboard, home, login } from '@/routes';
import { useTranslation } from '@/i18n/use-translation';
import { DropdownShell } from './DropdownShell';
import { NavigationTrigger } from './NavigationTrigger';
import { assets, navigationItems, utilityActions } from './navigation.data';
import { EventsPanel } from './panels/EventsPanel';
import { LanguageSwitcher } from './LanguageSwitcher';
import { PlatformPanel } from './panels/PlatformPanel';
import { ProductsPanel } from './panels/ProductsPanel';
import { ResourcesPanel } from './panels/ResourcesPanel';

const panelMap: Record<string, ReactElement> = {
    platform: <PlatformPanel />,
    products: <ProductsPanel />,
    resources: <ResourcesPanel />,
    events: <EventsPanel />,
};

export function DesktopNavigation({
    isAuthenticated,
}: {
    isAuthenticated: boolean;
}) {
    const t = useTranslation();
    const rootRef = useRef<HTMLDivElement>(null);
    const openTimer = useRef<number | undefined>(undefined);
    const closeTimer = useRef<number | undefined>(undefined);
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);

    const [active, setActive] = useState<number | null>(null);
    const [previous, setPrevious] = useState(0);
    const [firstOpen, setFirstOpen] = useState(false);
    const [dropdownLeft, setDropdownLeft] = useState(16);

    const clearTimers = useCallback(() => {
        window.clearTimeout(openTimer.current);
        window.clearTimeout(closeTimer.current);
    }, []);

    const updateDropdownPosition = useCallback(() => {
        const root = rootRef.current;
        const firstTrigger = buttons.current[0];
        if (!root || !firstTrigger) return;

        const rootRect = root.getBoundingClientRect();
        const triggerRect = firstTrigger.getBoundingClientRect();
        setDropdownLeft(Math.max(16, triggerRect.left - rootRect.left));
    }, []);

    const open = (index: number, delay = 0) => {
        clearTimers();
        openTimer.current = window.setTimeout(() => {
            updateDropdownPosition();
            setFirstOpen(active === null);
            setPrevious(active ?? index);
            setActive(index);
        }, delay);
    };

    const close = (delay = 180) => {
        clearTimers();
        closeTimer.current = window.setTimeout(() => setActive(null), delay);
    };

    useEffect(() => {
        updateDropdownPosition();
        window.addEventListener('resize', updateDropdownPosition);

        const outside = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node))
                setActive(null);
        };

        const key = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActive(null);
                if (active !== null) buttons.current[active]?.focus();
            }
        };

        document.addEventListener('pointerdown', outside);
        document.addEventListener('keydown', key);

        return () => {
            clearTimers();
            window.removeEventListener('resize', updateDropdownPosition);
            document.removeEventListener('pointerdown', outside);
            document.removeEventListener('keydown', key);
        };
    }, [active, clearTimers, updateDropdownPosition]);

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;

        event.preventDefault();
        const current = document.activeElement;
        const triggerButtons = navigationItems.map(
            (_, index) => buttons.current[index],
        );
        const currentIndex = triggerButtons.indexOf(
            current as HTMLButtonElement,
        );
        const nextIndex =
            event.key === 'ArrowRight'
                ? (currentIndex + 1) % triggerButtons.length
                : (currentIndex - 1 + triggerButtons.length) %
                  triggerButtons.length;

        triggerButtons[nextIndex]?.focus();
    };

    const activeItem = active === null ? null : navigationItems[active];
    const direction = active === null ? 1 : active > previous ? 1 : -1;

    return (
        <div
            ref={rootRef}
            className="relative hidden lg:block"
            onMouseLeave={() => close()}
            onFocusCapture={clearTimers}
            onBlurCapture={(event) => {
                if (
                    !event.currentTarget.contains(event.relatedTarget as Node)
                ) {
                    setActive(null);
                }
            }}
        >
            <header className="h-[68px] border-b border-neutral-200 bg-white">
                <div className="mx-auto flex h-full w-full max-w-[1440px] items-center gap-8 px-5 sm:px-8 lg:px-12">
                    <Link
                        href={home()}
                        className="flex shrink-0 items-center gap-2"
                    >
                        <img
                            src={assets.logo}
                            alt="Bright Mind logo"
                            className="h-10 w-12 object-contain"
                        />
                        <span className="text-xl font-black tracking-[-.04em] text-[#17344d]">
                            Bright Mind
                        </span>
                    </Link>

                    <nav
                        aria-label="Primary"
                        onKeyDown={onKeyDown}
                        className="flex flex-1 items-center gap-1"
                    >
                        {navigationItems.map((item, index) => (
                            <NavigationTrigger
                                key={item.id}
                                item={{ ...item, label: t(item.label) }}
                                active={active === index}
                                buttonRef={(element) => {
                                    buttons.current[index] = element;
                                    if (index === 0 && element) {
                                        window.requestAnimationFrame(
                                            updateDropdownPosition,
                                        );
                                    }
                                }}
                                onClick={() =>
                                    active === index
                                        ? setActive(null)
                                        : open(index)
                                }
                                onFocus={() => undefined}
                                onMouseEnter={() =>
                                    item.type === 'panel' &&
                                    open(index, active === null ? 80 : 0)
                                }
                            />
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <LanguageSwitcher />

                        <Link
                            href={isAuthenticated ? dashboard() : login()}
                            className="flex min-h-12 items-center gap-2.5 rounded-xl bg-[#1d6fea] px-5 py-3 text-base font-bold text-white shadow-[0_8px_22px_rgba(29,111,234,.22)] transition hover:bg-[#155dca] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d6fea] active:scale-[0.98]"
                        >
                            <GraduationCap className="h-5 w-5 text-white" />
                            {t('Start learning')}
                        </Link>

                        <label className="flex w-44 items-center gap-2 rounded-xl border px-3 py-2 transition-[width] focus-within:w-52">
                            <Search className="h-4 w-4 text-neutral-400" />
                            <input
                                aria-label="Search courses and resources"
                                placeholder={t(
                                    utilityActions.searchPlaceholder,
                                )}
                                className="min-w-0 flex-1 border-0 bg-transparent text-sm outline-none"
                            />
                        </label>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {activeItem?.type === 'panel' && (
                    <DropdownShell
                        activeId={activeItem.id}
                        direction={direction}
                        firstOpen={firstOpen}
                        anchorLeft={dropdownLeft}
                        onMouseEnter={clearTimers}
                        onMouseLeave={() => close()}
                    >
                        {panelMap[activeItem.id]}
                    </DropdownShell>
                )}
            </AnimatePresence>
        </div>
    );
}
