import {
    ArrowRight,
    Check,
    Clock3,
    LockKeyhole,
    Play,
    Star,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { ComponentType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

export const palette = [
    ['Ink', '#10233F'],
    ['Atlantic', '#155EEF'],
    ['Sky', '#46A4F3'],
    ['Teal', '#149B8E'],
    ['Mint', '#DFF5EE'],
    ['Sun', '#F5C451'],
    ['Coral', '#ED766D'],
    ['Canvas', '#F4F7FA'],
    ['Line', '#DDE4EC'],
] as const;

export function SectionShell({
    id,
    eyebrow,
    title,
    description,
    children,
}: {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <section
            id={id}
            className="scroll-mt-24 border-b border-[#dce4ec] py-16 sm:py-20"
        >
            <div className="mb-10 max-w-3xl">
                <p className="mb-3 text-xs font-bold tracking-[.16em] text-[#155eef] uppercase">
                    {eyebrow}
                </p>
                <h2 className="text-3xl leading-tight font-bold text-balance text-[#10233f] sm:text-5xl">
                    {title}
                </h2>
                <p className="mt-4 text-base leading-7 text-[#5a697b] sm:text-lg">
                    {description}
                </p>
            </div>
            {children}
        </section>
    );
}

export function Specimen({
    title,
    note,
    children,
    className,
}: {
    title: string;
    note?: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'rounded-2xl border border-[#dce4ec] bg-white p-5 shadow-[0_12px_36px_rgba(16,35,63,.06)] sm:p-6',
                className,
            )}
        >
            <div className="mb-5">
                <h3 className="text-base font-bold text-[#10233f]">{title}</h3>
                {note && (
                    <p className="mt-1 text-sm leading-6 text-[#6b7787]">
                        {note}
                    </p>
                )}
            </div>
            {children}
        </div>
    );
}

export function MediaPlaceholder({
    className,
    circle = false,
    label = 'Media placeholder',
}: {
    className?: string;
    circle?: boolean;
    label?: string;
}) {
    return (
        <div
            role="img"
            aria-label={label}
            className={cn(
                'bg-[#d9dee5]',
                circle ? 'rounded-full' : 'rounded-xl',
                className,
            )}
        />
    );
}

export function Status({
    children,
    tone = 'blue',
}: {
    children: ReactNode;
    tone?: 'blue' | 'green' | 'amber' | 'red' | 'gray' | 'violet';
}) {
    const tones = {
        blue: 'bg-[#e8f1ff] text-[#155eef]',
        green: 'bg-[#e1f5ee] text-[#157d68]',
        amber: 'bg-[#fff3d5] text-[#8b6110]',
        red: 'bg-[#ffebe8] text-[#b43d35]',
        gray: 'bg-[#edf1f5] text-[#596777]',
        violet: 'bg-[#efeaff] text-[#6d4fd1]',
    };

    return (
        <span
            className={cn(
                'inline-flex min-h-7 items-center rounded-full px-3 text-xs font-bold',
                tones[tone],
            )}
        >
            {children}
        </span>
    );
}

export function ProgressBar({
    value,
    tone = 'blue',
}: {
    value: number;
    tone?: 'blue' | 'teal' | 'gold';
}) {
    const tones = {
        blue: 'bg-[#155eef]',
        teal: 'bg-[#149b8e]',
        gold: 'bg-[#e6aa25]',
    };

    return (
        <div
            className="h-2 overflow-hidden rounded-full bg-[#e8edf2]"
            aria-label={`${value}% complete`}
        >
            <motion.div
                className={cn('h-full rounded-full', tones[tone])}
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
            />
        </div>
    );
}

export function ProgressRing({
    value,
    size = 88,
}: {
    value: number;
    size?: number;
}) {
    const r = 42;
    const c = 2 * Math.PI * r;

    return (
        <div
            className="relative grid place-items-center"
            style={{ width: size, height: size }}
        >
            <svg className="-rotate-90" viewBox="0 0 96 96">
                <circle
                    cx="48"
                    cy="48"
                    r={r}
                    fill="none"
                    stroke="#e7edf3"
                    strokeWidth="8"
                />
                <motion.circle
                    cx="48"
                    cy="48"
                    r={r}
                    fill="none"
                    stroke="#155eef"
                    strokeLinecap="round"
                    strokeWidth="8"
                    strokeDasharray={c}
                    initial={{ strokeDashoffset: c }}
                    whileInView={{ strokeDashoffset: c * (1 - value / 100) }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                />
            </svg>
            <strong className="absolute text-sm text-[#10233f]">
                {value}%
            </strong>
        </div>
    );
}

export type CourseState =
    'default' | 'selected' | 'completed' | 'locked' | 'progress';
export function CourseCard({
    title,
    category,
    state = 'default',
    horizontal = false,
}: {
    title: string;
    category: string;
    state?: CourseState;
    horizontal?: boolean;
}) {
    const MetaIcon =
        state === 'locked'
            ? LockKeyhole
            : state === 'completed'
              ? Check
              : Clock3;

    return (
        <motion.article
            whileHover={state === 'locked' ? undefined : { y: -4 }}
            transition={{ duration: 0.18 }}
            className={cn(
                'group overflow-hidden rounded-2xl border bg-white shadow-[0_10px_30px_rgba(16,35,63,.06)]',
                state === 'selected'
                    ? 'border-[#155eef] ring-2 ring-[#155eef]/15'
                    : 'border-[#dce4ec]',
                horizontal && 'grid sm:grid-cols-[180px_1fr]',
            )}
        >
            <div className={cn('relative', horizontal ? 'min-h-40' : 'h-40')}>
                <MediaPlaceholder
                    className="absolute inset-0 rounded-none"
                    label={`${title} course media`}
                />
                {state === 'locked' && (
                    <div className="absolute inset-0 grid place-items-center bg-[#10233f]/45">
                        <span className="grid size-11 place-items-center rounded-full bg-white">
                            <LockKeyhole className="size-5 text-[#10233f]" />
                        </span>
                    </div>
                )}
                <Status tone="blue">
                    <span className="absolute top-3 left-3">{category}</span>
                </Status>
            </div>
            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <h4 className="text-lg leading-snug font-bold text-[#10233f]">
                        {title}
                    </h4>
                    <button
                        aria-label="Save course"
                        className="grid size-9 shrink-0 place-items-center rounded-full border border-[#dce4ec] text-[#526274] transition hover:border-[#155eef] hover:text-[#155eef]"
                    >
                        <Star className="size-4" />
                    </button>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#697789]">
                    Practical, collaborative learning through guided activities.
                </p>
                {state === 'progress' && (
                    <div className="mt-4">
                        <ProgressBar value={64} />
                    </div>
                )}
                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[#687689]">
                    <span className="inline-flex items-center gap-1.5">
                        <MetaIcon className="size-4" />
                        {state === 'completed'
                            ? 'Completed'
                            : state === 'locked'
                              ? 'Prerequisite required'
                              : '8 lessons · 2h 20m'}
                    </span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </motion.article>
    );
}

export function IconTile({
    icon: Icon,
    label,
    tone = 'blue',
}: {
    icon: ComponentType<{ className?: string }>;
    label: string;
    tone?: 'blue' | 'teal' | 'gold' | 'coral';
}) {
    const tones = {
        blue: 'bg-[#e8f1ff] text-[#155eef]',
        teal: 'bg-[#e1f5ee] text-[#148777]',
        gold: 'bg-[#fff3d5] text-[#9b6b10]',
        coral: 'bg-[#ffebe8] text-[#c1544b]',
    };

    return (
        <div className="flex items-center gap-3">
            <span
                className={cn(
                    'grid size-11 shrink-0 place-items-center rounded-xl',
                    tones[tone],
                )}
            >
                <Icon className="size-5" />
            </span>
            <span className="text-sm font-semibold text-[#263951]">
                {label}
            </span>
        </div>
    );
}

export function PlayerPlaceholder() {
    return (
        <div
            className="relative aspect-video overflow-hidden rounded-2xl bg-[#d9dee5]"
            role="img"
            aria-label="Video player placeholder"
        >
            <button
                aria-label="Play lesson"
                className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#155eef] shadow-xl transition hover:scale-105"
            >
                <Play className="ml-1 size-7 fill-current" />
            </button>
            <div className="absolute inset-x-5 bottom-5 h-1.5 rounded-full bg-white/60">
                <div className="h-full w-1/3 rounded-full bg-[#155eef]" />
            </div>
        </div>
    );
}
