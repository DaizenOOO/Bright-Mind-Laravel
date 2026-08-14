import type { LucideIcon } from 'lucide-react';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function useLightWorkspaceTheme() {
    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove('dark');
        root.classList.add('light');
        root.style.colorScheme = 'light';
    }, []);
}

export function WorkspaceHeader({
    eyebrow,
    title,
    description,
    actions,
}: {
    eyebrow: string;
    title: string;
    description: string;
    actions?: ReactNode;
}) {
    useLightWorkspaceTheme();

    return (
        <header className="flex flex-wrap items-end justify-between gap-5 border-b border-[#dce4ec] pb-7">
            <div>
                <p className="text-xs font-bold tracking-[.14em] text-[#155eef] uppercase">
                    {eyebrow}
                </p>
                <h1 className="mt-2 text-3xl font-bold text-[#10233f] sm:text-4xl">
                    {title}
                </h1>
                <p className="mt-3 max-w-2xl leading-7 text-[#657487]">
                    {description}
                </p>
            </div>
            {actions}
        </header>
    );
}
export function WorkspaceCard({
    title,
    children,
    className,
}: {
    title?: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <section
            className={cn(
                'rounded-2xl border border-[#dce4ec] bg-white p-5 shadow-[0_10px_30px_rgba(16,35,63,.05)]',
                className,
            )}
        >
            {title && (
                <h2 className="mb-5 text-lg font-bold text-[#10233f]">
                    {title}
                </h2>
            )}
            {children}
        </section>
    );
}
export function WorkspaceMetric({
    icon: Icon,
    label,
    value,
    note,
    tone = 'blue',
}: {
    icon: LucideIcon;
    label: string;
    value: string | number;
    note: string;
    tone?: 'blue' | 'teal' | 'gold' | 'coral';
}) {
    const tones = {
        blue: 'bg-[#e8f1ff] text-[#155eef]',
        teal: 'bg-[#e1f5ee] text-[#148777]',
        gold: 'bg-[#fff3d5] text-[#a06d0c]',
        coral: 'bg-[#ffebe8] text-[#c1544b]',
    };

    return (
        <WorkspaceCard>
            <span
                className={cn(
                    'grid size-11 place-items-center rounded-xl',
                    tones[tone],
                )}
            >
                <Icon className="size-5" />
            </span>
            <p className="mt-4 text-sm font-bold text-[#657487]">{label}</p>
            <strong className="mt-1 block text-3xl text-[#10233f]">
                {value}
            </strong>
            <p className="mt-2 text-xs text-[#7c8998]">{note}</p>
        </WorkspaceCard>
    );
}
export function GrayMedia({ className = '' }: { className?: string }) {
    return (
        <div
            role="img"
            aria-label="Editable media placeholder"
            className={cn('rounded-xl bg-[#d9dee5]', className)}
        />
    );
}
