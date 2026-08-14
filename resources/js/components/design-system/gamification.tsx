import {
    Award,
    BookCheck,
    Brain,
    Check,
    ChevronLeft,
    ChevronRight,
    CircleHelp,
    Flame,
    Focus,
    GraduationCap,
    HandHeart,
    Lightbulb,
    LockKeyhole,
    MessageCircleHeart,
    Route,
    ShieldCheck,
    Sparkles,
    Star,
    Target,
    TrendingUp,
    Trophy,
    Users,
    X,
    Zap,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
    ProgressBar,
    ProgressRing,
    Specimen,
    Status,
} from '@/components/design-system/primitives';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export type AchievementTier =
    'bronze' | 'silver' | 'gold' | 'platinum' | 'aurora';
export type AchievementState = 'locked' | 'unlocked' | 'hidden' | 'progress';
export type AchievementCategory =
    | 'courses'
    | 'recall'
    | 'design'
    | 'peer'
    | 'reflection'
    | 'consistency'
    | 'mastery'
    | 'community'
    | 'focus'
    | 'pathway'
    | 'special';

export interface AchievementDefinition {
    id: string;
    title: string;
    reason: string;
    category: AchievementCategory;
    tier: AchievementTier;
    state: AchievementState;
    current: number;
    target: number;
    xp: number;
}

const tierOrder: AchievementTier[] = [
    'bronze',
    'silver',
    'gold',
    'platinum',
    'aurora',
];
const tiers: Record<
    AchievementTier,
    { label: string; shell: string; ring: string; glow: string }
> = {
    bronze: {
        label: 'Bronze',
        shell: 'from-[#d9945c] to-[#9d5834]',
        ring: '#b96d40',
        glow: 'shadow-[#bd7548]/25',
    },
    silver: {
        label: 'Silver',
        shell: 'from-[#dce4ec] to-[#8797a8]',
        ring: '#8a9aab',
        glow: 'shadow-[#91a0b0]/25',
    },
    gold: {
        label: 'Gold',
        shell: 'from-[#ffd96f] to-[#d99b18]',
        ring: '#d7a326',
        glow: 'shadow-[#e7b432]/30',
    },
    platinum: {
        label: 'Platinum',
        shell: 'from-[#d7f3ef] via-[#8fcfc8] to-[#5b8e98]',
        ring: '#65a69f',
        glow: 'shadow-[#75b5ae]/30',
    },
    aurora: {
        label: 'Aurora',
        shell: 'from-[#75e0cf] via-[#648bf1] to-[#9e75dc]',
        ring: '#6b7ee2',
        glow: 'shadow-[#6e84e8]/35',
    },
};

const categories: Record<
    AchievementCategory,
    { label: string; icon: typeof Award; color: string; soft: string }
> = {
    courses: {
        label: 'Course milestones',
        icon: GraduationCap,
        color: '#155eef',
        soft: '#e8f1ff',
    },
    recall: {
        label: 'Active Recall',
        icon: Brain,
        color: '#6d4fd1',
        soft: '#efeaff',
    },
    design: {
        label: 'Design Thinking',
        icon: Lightbulb,
        color: '#b5790c',
        soft: '#fff3d5',
    },
    peer: {
        label: 'Peer-to-Peer',
        icon: Users,
        color: '#0d897b',
        soft: '#e1f5ee',
    },
    reflection: {
        label: 'Metacognition',
        icon: TrendingUp,
        color: '#c1544b',
        soft: '#ffebe8',
    },
    consistency: {
        label: 'Consistency',
        icon: Flame,
        color: '#c75a43',
        soft: '#fff0ea',
    },
    mastery: {
        label: 'Mastery',
        icon: Target,
        color: '#155eef',
        soft: '#e8f1ff',
    },
    community: {
        label: 'Community',
        icon: HandHeart,
        color: '#148777',
        soft: '#e1f5ee',
    },
    focus: {
        label: 'Learning habits',
        icon: Focus,
        color: '#6d4fd1',
        soft: '#efeaff',
    },
    pathway: {
        label: 'Pathways',
        icon: Route,
        color: '#0d7895',
        soft: '#e1f3f7',
    },
    special: {
        label: 'Special',
        icon: Sparkles,
        color: '#7351b8',
        soft: '#f0eaff',
    },
};

const coreAchievements: AchievementDefinition[] = [
    {
        id: 'course-1',
        title: 'First Chapter',
        reason: 'Complete your first meaningful course.',
        category: 'courses',
        tier: 'bronze',
        state: 'unlocked',
        current: 1,
        target: 1,
        xp: 100,
    },
    {
        id: 'course-3',
        title: 'Learning Momentum',
        reason: 'Complete 3 courses.',
        category: 'courses',
        tier: 'silver',
        state: 'progress',
        current: 2,
        target: 3,
        xp: 180,
    },
    {
        id: 'course-10',
        title: 'Knowledge Builder',
        reason: 'Complete 10 courses.',
        category: 'courses',
        tier: 'gold',
        state: 'locked',
        current: 2,
        target: 10,
        xp: 350,
    },
    {
        id: 'course-25',
        title: 'Dedicated Scholar',
        reason: 'Complete 25 courses.',
        category: 'courses',
        tier: 'platinum',
        state: 'locked',
        current: 2,
        target: 25,
        xp: 650,
    },
    {
        id: 'course-50',
        title: 'Bright Mind Luminary',
        reason: 'Complete 50 courses.',
        category: 'courses',
        tier: 'aurora',
        state: 'hidden',
        current: 2,
        target: 50,
        xp: 1200,
    },
    {
        id: 'recall-10',
        title: 'Memory Architect',
        reason: 'Finish 10 focused recall sessions.',
        category: 'recall',
        tier: 'silver',
        state: 'progress',
        current: 7,
        target: 10,
        xp: 160,
    },
    {
        id: 'design-10',
        title: 'Thoughtful Maker',
        reason: 'Complete 10 design-thinking tasks.',
        category: 'design',
        tier: 'gold',
        state: 'progress',
        current: 8,
        target: 10,
        xp: 240,
    },
    {
        id: 'peer-10',
        title: 'Learning Partner',
        reason: 'Complete 10 collaborative learning tasks.',
        category: 'peer',
        tier: 'gold',
        state: 'progress',
        current: 6,
        target: 10,
        xp: 250,
    },
    {
        id: 'reflection-14',
        title: 'Reflective Learner',
        reason: 'Write 14 substantive learning reflections.',
        category: 'reflection',
        tier: 'gold',
        state: 'progress',
        current: 11,
        target: 14,
        xp: 220,
    },
    {
        id: 'streak-7',
        title: 'Steady Week',
        reason: 'Learn meaningfully for 7 consecutive days.',
        category: 'consistency',
        tier: 'silver',
        state: 'unlocked',
        current: 7,
        target: 7,
        xp: 150,
    },
    {
        id: 'streak-30',
        title: 'Lasting Rhythm',
        reason: 'Build a 30-day meaningful-learning rhythm.',
        category: 'consistency',
        tier: 'platinum',
        state: 'progress',
        current: 18,
        target: 30,
        xp: 500,
    },
    {
        id: 'mastery-5',
        title: 'Growth Mindset',
        reason: 'Improve across 5 reassessments.',
        category: 'mastery',
        tier: 'gold',
        state: 'progress',
        current: 4,
        target: 5,
        xp: 260,
    },
    {
        id: 'community-10',
        title: 'Helpful Voice',
        reason: 'Have 10 contributions marked helpful.',
        category: 'community',
        tier: 'gold',
        state: 'progress',
        current: 8,
        target: 10,
        xp: 280,
    },
    {
        id: 'focus-20',
        title: 'Deep Focus',
        reason: 'Complete 20 distraction-free focus sessions.',
        category: 'focus',
        tier: 'gold',
        state: 'progress',
        current: 16,
        target: 20,
        xp: 240,
    },
    {
        id: 'path-1',
        title: 'Pathfinder',
        reason: 'Complete a full Bright Mind learning pathway.',
        category: 'pathway',
        tier: 'platinum',
        state: 'progress',
        current: 5,
        target: 6,
        xp: 600,
    },
    {
        id: 'special',
        title: 'A New Perspective',
        reason: 'Discover a hidden way to connect learning across subjects.',
        category: 'special',
        tier: 'aurora',
        state: 'hidden',
        current: 0,
        target: 1,
        xp: 500,
    },
];

const categoryPrograms: Record<
    AchievementCategory,
    { titles: string[]; action: string; thresholds: number[] }
> = {
    courses: {
        titles: [
            'Ready to Learn',
            'Course Navigator',
            'Subject Explorer',
            'Cross-Curricular Thinker',
            'Independent Learner',
            'Committed Scholar',
            'Knowledge Connector',
            'Learning Portfolio',
            'European Explorer',
            'Lifelong Learner',
        ],
        action: 'substantial course completions',
        thresholds: [2, 4, 6, 8, 12, 18, 24, 32, 40, 60],
    },
    recall: {
        titles: [
            'First Retrieval',
            'Recall Starter',
            'Memory Routine',
            'Question Builder',
            'Confident Recall',
            'Recall Strategist',
            'Knowledge Retriever',
            'Memory Mapper',
            'Recall Mentor',
            'Recall Master',
        ],
        action: 'focused Active Recall sessions',
        thresholds: [1, 3, 5, 10, 15, 25, 40, 60, 80, 120],
    },
    design: {
        titles: [
            'Curious Observer',
            'Empathy Listener',
            'Problem Framer',
            'Idea Generator',
            'Prototype Starter',
            'Thoughtful Tester',
            'Iteration Builder',
            'Creative Facilitator',
            'Solution Designer',
            'Design Catalyst',
        ],
        action: 'meaningful Design Thinking stages completed',
        thresholds: [1, 3, 5, 8, 12, 18, 25, 35, 50, 75],
    },
    peer: {
        titles: [
            'Learning Pair',
            'Clear Explainer',
            'Feedback Partner',
            'Team Contributor',
            'Peer Coach',
            'Collaborative Thinker',
            'Group Facilitator',
            'Shared Success',
            'Learning Connector',
            'Peer Learning Champion',
        ],
        action: 'substantive peer-learning activities completed',
        thresholds: [1, 3, 5, 10, 15, 25, 40, 60, 80, 100],
    },
    reflection: {
        titles: [
            'First Reflection',
            'Learning Observer',
            'Strategy Spotter',
            'Goal Reviewer',
            'Thoughtful Journaler',
            'Self-Aware Learner',
            'Learning Strategist',
            'Reflective Guide',
            'Insight Builder',
            'Metacognitive Mentor',
        ],
        action: 'substantive learning reflections',
        thresholds: [1, 3, 7, 10, 20, 30, 50, 75, 100, 150],
    },
    consistency: {
        titles: [
            'Three-Day Start',
            'Steady Seven',
            'Two-Week Rhythm',
            'Three-Week Habit',
            'Monthly Momentum',
            'Six-Week Practice',
            'Sixty-Day Strength',
            'Season of Learning',
            'Hundred-Day Journey',
            'Enduring Rhythm',
        ],
        action: 'consecutive days of meaningful learning',
        thresholds: [3, 7, 14, 21, 30, 42, 60, 75, 100, 150],
    },
    mastery: {
        titles: [
            'Assessment Starter',
            'Concept Check',
            'Growing Confidence',
            'Improvement Step',
            'Mastery Builder',
            'Resilient Learner',
            'Evidence of Growth',
            'Knowledge Strengthener',
            'Assessment Strategist',
            'Mastery Mentor',
        ],
        action: 'mastery or measurable assessment improvements',
        thresholds: [1, 3, 5, 8, 12, 18, 25, 35, 50, 75],
    },
    community: {
        titles: [
            'Helpful Start',
            'Useful Reply',
            'Resource Sharer',
            'Community Supporter',
            'Trusted Contributor',
            'Thoughtful Guide',
            'Community Builder',
            'Helpful Mentor',
            'Network Connector',
            'Community Steward',
        ],
        action: 'contributions confirmed as helpful',
        thresholds: [1, 3, 5, 10, 15, 25, 40, 60, 80, 100],
    },
    focus: {
        titles: [
            'Focus Starter',
            'Quiet Ten',
            'Distraction Tamer',
            'Deep Work Learner',
            'Focus Routine',
            'Attention Builder',
            'Study Planner',
            'Concentration Guide',
            'Focus Practitioner',
            'Learning Habit Mentor',
        ],
        action: 'focused learning sessions with a clear goal',
        thresholds: [1, 3, 5, 10, 15, 25, 40, 60, 80, 120],
    },
    pathway: {
        titles: [
            'First Milestone',
            'Pathway Starter',
            'Route Explorer',
            'Milestone Maker',
            'Pathway Finisher',
            'Connected Learner',
            'Multi-Path Explorer',
            'Learning Navigator',
            'Pathway Guide',
            'Bright Mind Pathfinder',
        ],
        action: 'pathway milestones completed',
        thresholds: [1, 3, 5, 8, 12, 18, 25, 35, 50, 75],
    },
    special: {
        titles: [
            'Unexpected Connection',
            'Curiosity Detour',
            'New Point of View',
            'Cross-Border Insight',
            'Creative Combination',
            'Learning Discovery',
            'Hidden Pattern',
            'Perspective Shift',
            'Aurora Moment',
            'Bright Mind Discovery',
        ],
        action: 'hidden, meaningful learning moments discovered',
        thresholds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
};

const additionalAchievements: AchievementDefinition[] = Object.entries(
    categoryPrograms,
).flatMap(([categoryKey, program]) =>
    program.titles.map((title, index) => {
        const category = categoryKey as AchievementCategory;
        const target = program.thresholds[index];
        const tier = tierOrder[Math.min(4, Math.floor(index / 2))];
        const isHidden = category === 'special' && index >= 4;
        const isUnlocked = index < 2;
        const current = isUnlocked
            ? target
            : Math.max(0, Math.round(target * (0.28 + (index % 4) * 0.13)));

        return {
            id: `${category}-extended-${index + 1}`,
            title,
            reason: `${target} verified ${program.action}.`,
            category,
            tier,
            state: isHidden
                ? 'hidden'
                : isUnlocked
                  ? 'unlocked'
                  : index > 7
                    ? 'locked'
                    : 'progress',
            current,
            target,
            xp: 80 + index * 55,
        } satisfies AchievementDefinition;
    }),
);

const achievements: AchievementDefinition[] = [
    ...coreAchievements,
    ...additionalAchievements,
];

type DemoKind = 'xp' | 'unlock' | 'upgrade' | 'pathway' | 'multiple' | 'level';
type DemoStage = 'idle' | 'xp' | 'level' | 'reveal' | 'summary';

export function BadgeEmblem({
    achievement,
    size = 'md',
    animated = false,
}: {
    achievement: AchievementDefinition;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    animated?: boolean;
}) {
    const category = categories[achievement.category];
    const tier = tiers[achievement.tier];
    const Icon = category.icon;
    const sizes = {
        sm: 'size-12',
        md: 'size-16',
        lg: 'size-24',
        xl: 'size-32',
    };
    const iconSizes = {
        sm: 'size-5',
        md: 'size-7',
        lg: 'size-10',
        xl: 'size-14',
    };
    const hidden = achievement.state === 'hidden';
    const locked = achievement.state === 'locked';

    return (
        <div
            className={cn(
                'relative grid shrink-0 place-items-center',
                sizes[size],
            )}
            aria-label={`${tier.label} ${achievement.title} badge, ${achievement.state}`}
        >
            {animated && (
                <motion.span
                    className="absolute inset-[-12%] rounded-full border-2"
                    style={{ borderColor: tier.ring }}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{
                        scale: [0.7, 1.18, 1],
                        opacity: [0, 0.55, 0.18],
                    }}
                    transition={{ duration: 1.1 }}
                />
            )}
            <div
                className={cn(
                    'absolute inset-0 rotate-45 rounded-[28%] bg-gradient-to-br shadow-lg',
                    tier.shell,
                    tier.glow,
                    locked && 'opacity-45 grayscale',
                    hidden && 'bg-[#cbd3dc] bg-none shadow-none',
                )}
            />
            <div className="absolute inset-[8%] rotate-45 rounded-[25%] border border-white/55" />
            <span
                className={cn(
                    'relative grid size-[62%] place-items-center rounded-full bg-white/90',
                    hidden && 'bg-[#e6ebf0]',
                )}
                style={{ color: hidden ? '#7a8795' : category.color }}
            >
                {hidden ? (
                    <CircleHelp className={iconSizes[size]} />
                ) : locked ? (
                    <LockKeyhole className={iconSizes[size]} />
                ) : (
                    <Icon className={iconSizes[size]} />
                )}
            </span>
            {achievement.state === 'unlocked' && (
                <span className="absolute -right-1 -bottom-1 grid size-6 place-items-center rounded-full border-2 border-white bg-[#149b8e] text-white">
                    <Check className="size-3.5" />
                </span>
            )}
        </div>
    );
}

function AchievementCard({
    achievement,
    compact = false,
    onSelect,
}: {
    achievement: AchievementDefinition;
    compact?: boolean;
    onSelect?: (achievement: AchievementDefinition) => void;
}) {
    const category = categories[achievement.category];
    const percent = Math.min(
        100,
        Math.round((achievement.current / achievement.target) * 100),
    );

    return (
        <motion.button
            type="button"
            onClick={() => onSelect?.(achievement)}
            whileHover={{ y: -3 }}
            className={cn(
                'relative w-full overflow-hidden rounded-2xl border border-[#dce4ec] bg-white text-left shadow-[0_8px_26px_rgba(16,35,63,.06)] focus-visible:ring-2 focus-visible:ring-[#155eef] focus-visible:outline-none',
                compact ? 'p-4' : 'p-5',
                achievement.state === 'locked' && 'bg-[#f7f9fb] opacity-65',
            )}
        >
            <div className="flex gap-4">
                <BadgeEmblem
                    achievement={achievement}
                    size={compact ? 'sm' : 'md'}
                />
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2">
                        <Status
                            tone={
                                achievement.state === 'unlocked'
                                    ? 'green'
                                    : achievement.state === 'hidden'
                                      ? 'gray'
                                      : 'blue'
                            }
                        >
                            {achievement.state === 'hidden'
                                ? 'Hidden achievement'
                                : tiers[achievement.tier].label}
                        </Status>
                    </div>
                    <h4 className="mt-2 font-bold text-[#10233f]">
                        {achievement.state === 'hidden'
                            ? 'Secret achievement'
                            : achievement.title}
                    </h4>
                    <p className="mt-1 text-xs leading-5 text-[#6b7889]">
                        {achievement.state === 'hidden'
                            ? 'Keep exploring meaningful learning experiences.'
                            : achievement.reason}
                    </p>
                </div>
            </div>
            {achievement.state === 'progress' && (
                <div className="mt-4">
                    <div className="mb-2 flex justify-between text-xs font-bold">
                        <span style={{ color: category.color }}>
                            {achievement.current} / {achievement.target}
                        </span>
                        <span className="text-[#718095]">{percent}%</span>
                    </div>
                    <ProgressBar
                        value={percent}
                        tone={
                            achievement.category === 'community'
                                ? 'teal'
                                : 'blue'
                        }
                    />
                </div>
            )}
            <div className="mt-4 flex items-center justify-between border-t border-[#edf1f5] pt-3 text-xs font-bold text-[#718095]">
                <span className="flex items-center gap-1.5">
                    <Zap className="size-3.5 text-[#d69b1c]" />+{achievement.xp}{' '}
                    XP
                </span>
                <span style={{ color: category.color }}>
                    {achievement.state === 'locked'
                        ? 'Not achieved yet'
                        : category.label}
                </span>
            </div>
        </motion.button>
    );
}

function AchievementDetail({
    items,
    selected,
    onSelect,
    onClose,
}: {
    items: AchievementDefinition[];
    selected: AchievementDefinition | null;
    onSelect: (achievement: AchievementDefinition) => void;
    onClose: () => void;
}) {
    const index = selected
        ? items.findIndex((item) => item.id === selected.id)
        : -1;
    const move = (direction: number) =>
        onSelect(items[(index + direction + items.length) % items.length]);

    return (
        <Dialog
            open={selected !== null}
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}
        >
            <DialogContent className="max-h-[92vh] overflow-y-auto border-0 bg-[#f4f7fa] p-0 sm:max-w-2xl">
                <DialogHeader className="sr-only">
                    <DialogTitle>
                        {selected?.title ?? 'Achievement details'}
                    </DialogTitle>
                    <DialogDescription>
                        Achievement requirements and progress
                    </DialogDescription>
                </DialogHeader>
                {selected && (
                    <div>
                        <div
                            className={cn(
                                'relative overflow-hidden bg-[#10233f] px-12 py-10 text-center text-white',
                                selected.state === 'locked' && 'bg-[#586574]',
                            )}
                        >
                            <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:18px_18px] opacity-20" />
                            <motion.div
                                key={selected.id}
                                initial={{ opacity: 0, scale: 0.82, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="relative"
                            >
                                <BadgeEmblem
                                    achievement={selected}
                                    size="xl"
                                    animated={selected.state === 'unlocked'}
                                />
                                <p className="mt-7 text-xs font-bold tracking-[.18em] text-[#78e0d0] uppercase">
                                    {selected.state === 'unlocked'
                                        ? 'Achievement earned'
                                        : selected.state === 'hidden'
                                          ? 'Hidden achievement'
                                          : 'Not achieved yet'}
                                </p>
                                <h3 className="mt-3 text-3xl font-bold">
                                    {selected.state === 'hidden'
                                        ? 'Secret achievement'
                                        : selected.title}
                                </h3>
                                <p className="mx-auto mt-3 max-w-lg leading-7 text-white/70">
                                    {selected.state === 'hidden'
                                        ? 'Keep exploring meaningful learning activities to discover this achievement.'
                                        : selected.reason}
                                </p>
                            </motion.div>
                            <button
                                type="button"
                                onClick={() => move(-1)}
                                className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white hover:bg-white/20"
                                aria-label="Previous achievement"
                            >
                                <ChevronLeft />
                            </button>
                            <button
                                type="button"
                                onClick={() => move(1)}
                                className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white hover:bg-white/20"
                                aria-label="Next achievement"
                            >
                                <ChevronRight />
                            </button>
                        </div>
                        <div className="p-6 sm:p-8">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex gap-2">
                                    <Status
                                        tone={
                                            selected.state === 'unlocked'
                                                ? 'green'
                                                : 'gray'
                                        }
                                    >
                                        {selected.state === 'unlocked'
                                            ? 'Earned'
                                            : 'Locked · Not achieved yet'}
                                    </Status>
                                    <Status tone="violet">
                                        {tiers[selected.tier].label}
                                    </Status>
                                </div>
                                <span className="flex items-center gap-2 font-bold text-[#a66e08]">
                                    <Zap className="size-4" />+{selected.xp} XP
                                </span>
                            </div>
                            <div className="mt-7 rounded-2xl border border-[#dce4ec] bg-white p-5">
                                <p className="text-xs font-bold tracking-[.12em] text-[#718095] uppercase">
                                    What to do
                                </p>
                                <h4 className="mt-2 text-lg font-bold text-[#10233f]">
                                    {selected.state === 'hidden'
                                        ? 'Continue exploring Bright Mind'
                                        : 'Complete the learning requirement'}
                                </h4>
                                <p className="mt-2 text-sm leading-6 text-[#627185]">
                                    {selected.state === 'hidden'
                                        ? 'Hidden achievements appear through thoughtful exploration, not repetitive activity.'
                                        : selected.reason}
                                </p>
                                {selected.state !== 'hidden' && (
                                    <div className="mt-5">
                                        <div className="mb-2 flex justify-between text-sm font-bold">
                                            <span>
                                                {selected.current} completed
                                            </span>
                                            <span>
                                                {selected.target} required
                                            </span>
                                        </div>
                                        <ProgressBar
                                            value={Math.min(
                                                100,
                                                (selected.current /
                                                    selected.target) *
                                                    100,
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mt-6 flex items-center justify-between gap-3">
                                <Button
                                    onClick={() => move(-1)}
                                    variant="outline"
                                    className="rounded-xl"
                                >
                                    <ChevronLeft />
                                    Previous
                                </Button>
                                <span className="text-sm font-bold text-[#718095]">
                                    {index + 1} / {items.length}
                                </span>
                                <Button
                                    onClick={() => move(1)}
                                    className="rounded-xl bg-[#155eef]"
                                >
                                    Next
                                    <ChevronRight />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

function XpMeter({ xp, level }: { xp: number; level: number }) {
    const floor = (level - 1) * 500;
    const value = Math.min(100, ((xp - floor) / 500) * 100);

    return (
        <div className="rounded-2xl bg-[#10233f] p-5 text-white">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-bold tracking-[.13em] text-white/55 uppercase">
                        Level {level}
                    </p>
                    <h4 className="mt-1 text-xl font-bold">Curious Explorer</h4>
                </div>
                <span className="grid size-12 place-items-center rounded-xl bg-white/10 text-[#78e0d0]">
                    <Zap className="size-6" />
                </span>
            </div>
            <div className="mt-5 flex justify-between text-sm font-bold">
                <span>{xp.toLocaleString()} XP</span>
                <span className="text-white/55">{level * 500} XP</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/12">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#3f83f8] to-[#68d5c5]"
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                />
            </div>
            <p className="mt-3 text-xs text-white/60">
                {Math.max(0, level * 500 - xp)} XP to Level {level + 1}
            </p>
        </div>
    );
}

function WeeklyRhythm() {
    return (
        <div>
            <div className="flex items-center gap-4 rounded-xl bg-[#fff0ea] p-4">
                <span className="grid size-14 place-items-center rounded-full bg-[#ed766d] text-white">
                    <Flame className="size-7" />
                </span>
                <div>
                    <strong className="text-2xl text-[#10233f]">
                        18 day rhythm
                    </strong>
                    <p className="mt-1 text-sm text-[#718095]">
                        5 meaningful days this week
                    </p>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-7 gap-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <div key={`${day}-${i}`} className="text-center">
                        <motion.span
                            initial={{ scale: 0.8 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className={cn(
                                'mx-auto grid size-9 place-items-center rounded-full text-xs font-bold',
                                i < 5
                                    ? 'bg-[#155eef] text-white'
                                    : i === 5
                                      ? 'border-2 border-dashed border-[#91a1b3] text-[#718095]'
                                      : 'bg-[#edf1f5] text-[#9aa5b1]',
                            )}
                        >
                            {i < 5 ? (
                                <Check className="size-4" />
                            ) : i === 5 ? (
                                <Target className="size-4" />
                            ) : (
                                ''
                            )}
                        </motion.span>
                        <p className="mt-2 text-xs font-bold text-[#718095]">
                            {day}
                        </p>
                    </div>
                ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
                {[3, 7, 14, 30, 60, 100].map((day) => (
                    <Status
                        key={day}
                        tone={
                            day <= 14 ? 'green' : day === 30 ? 'blue' : 'gray'
                        }
                    >
                        {day} days
                    </Status>
                ))}
            </div>
        </div>
    );
}

function Celebration({
    kind,
    stage,
    xp,
    level,
    reduced,
    onDismiss,
}: {
    kind: DemoKind;
    stage: DemoStage;
    xp: number;
    level: number;
    reduced: boolean;
    onDismiss: () => void;
}) {
    const configs: Record<
        Exclude<DemoKind, 'xp'>,
        {
            title: string;
            reason: string;
            tier: AchievementTier;
            category: AchievementCategory;
            xp: number;
        }
    > = {
        unlock: {
            title: 'Memory Architect',
            reason: 'You completed 10 focused Active Recall sessions.',
            tier: 'silver',
            category: 'recall',
            xp: 160,
        },
        upgrade: {
            title: 'Helpful Voice',
            reason: 'Your 10th contribution was marked helpful.',
            tier: 'gold',
            category: 'community',
            xp: 280,
        },
        pathway: {
            title: 'Community Pathfinder',
            reason: 'You completed every milestone in the Community Innovator pathway.',
            tier: 'platinum',
            category: 'pathway',
            xp: 600,
        },
        multiple: {
            title: 'Three achievements earned',
            reason: 'Reflection, collaboration and course milestones completed together.',
            tier: 'aurora',
            category: 'special',
            xp: 520,
        },
        level: {
            title: 'Level 9 reached',
            reason: 'Your consistent learning has opened a new level.',
            tier: 'aurora',
            category: 'special',
            xp: 100,
        },
    };

    if (kind === 'xp') {
        return null;
    }

    const config = configs[kind];
    const badge: AchievementDefinition = {
        id: 'demo',
        title: config.title,
        reason: config.reason,
        category: config.category,
        tier: config.tier,
        state: 'unlocked',
        current: 1,
        target: 1,
        xp: config.xp,
    };
    const showReveal = stage === 'reveal' || stage === 'summary';
    const particles = Array.from({ length: 12 });

    return (
        <AnimatePresence>
            <motion.div
                className="absolute inset-0 z-20 grid place-items-center overflow-hidden rounded-2xl bg-[#08192f]/94 p-5 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="dialog"
                aria-modal="true"
                aria-label="Achievement celebration"
            >
                <button
                    onClick={onDismiss}
                    className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/10 text-white"
                    aria-label="Close celebration"
                >
                    <X />
                </button>
                <div className="relative w-full max-w-xl text-center">
                    {stage === 'xp' && (
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mx-auto"
                        >
                            <span className="mx-auto grid size-24 place-items-center rounded-full bg-[#155eef] text-2xl font-bold shadow-[0_0_60px_rgba(21,94,239,.55)]">
                                +{config.xp}
                            </span>
                            <p className="mt-5 text-lg font-bold">XP earned</p>
                        </motion.div>
                    )}
                    {stage === 'level' && (
                        <motion.div
                            initial={{ scale: 0.75, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <p className="text-sm font-bold tracking-[.2em] text-[#75e0cf] uppercase">
                                Level up
                            </p>
                            <strong className="mt-3 block text-7xl">
                                {level}
                            </strong>
                            <p className="mt-3 text-xl font-bold">
                                Curious Explorer
                            </p>
                        </motion.div>
                    )}
                    {showReveal && (
                        <>
                            <div className="relative mx-auto w-fit">
                                {!reduced &&
                                    particles.map((_, i) => (
                                        <motion.span
                                            key={i}
                                            className="absolute top-1/2 left-1/2 size-1.5 rounded-full bg-[#78e0d0]"
                                            initial={{ x: 0, y: 0, opacity: 0 }}
                                            animate={{
                                                x:
                                                    Math.cos(
                                                        (i / 12) * Math.PI * 2,
                                                    ) *
                                                    (95 + (i % 3) * 18),
                                                y:
                                                    Math.sin(
                                                        (i / 12) * Math.PI * 2,
                                                    ) *
                                                    (95 + (i % 3) * 18),
                                                opacity: [0, 1, 0],
                                            }}
                                            transition={{
                                                duration: 1.25,
                                                delay: i * 0.025,
                                            }}
                                        />
                                    ))}
                                <motion.div
                                    initial={
                                        reduced
                                            ? { opacity: 0 }
                                            : {
                                                  scale: 0.35,
                                                  rotate: -25,
                                                  opacity: 0,
                                              }
                                    }
                                    animate={{
                                        scale: 1,
                                        rotate: 0,
                                        opacity: 1,
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 180,
                                        damping: 16,
                                    }}
                                >
                                    <BadgeEmblem
                                        achievement={badge}
                                        size="xl"
                                        animated={!reduced}
                                    />
                                </motion.div>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: reduced ? 0 : 0.35 }}
                            >
                                <p className="mt-7 text-xs font-bold tracking-[.18em] text-[#75e0cf] uppercase">
                                    {kind === 'upgrade'
                                        ? 'Tier upgraded'
                                        : kind === 'pathway'
                                          ? 'Pathway complete'
                                          : kind === 'multiple'
                                            ? 'Learning momentum'
                                            : 'Achievement unlocked'}
                                </p>
                                <h4 className="mt-3 text-3xl font-bold sm:text-4xl">
                                    {config.title}
                                </h4>
                                <p className="mx-auto mt-3 max-w-md leading-7 text-white/68">
                                    {config.reason}
                                </p>
                                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-bold text-[#ffd96f]">
                                    <Zap className="size-4" />+{config.xp} XP
                                </div>
                                {kind === 'multiple' && (
                                    <div className="mt-5 flex justify-center -space-x-3">
                                        {(
                                            [
                                                'reflection',
                                                'peer',
                                                'courses',
                                            ] as AchievementCategory[]
                                        ).map((cat, i) => (
                                            <BadgeEmblem
                                                key={cat}
                                                size="sm"
                                                achievement={{
                                                    ...badge,
                                                    id: cat,
                                                    category: cat,
                                                    tier: (
                                                        [
                                                            'silver',
                                                            'gold',
                                                            'bronze',
                                                        ] as AchievementTier[]
                                                    )[i],
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                                <div className="mt-7 flex flex-wrap justify-center gap-3">
                                    <Button className="rounded-xl bg-[#155eef]">
                                        View achievement
                                    </Button>
                                    <Button
                                        onClick={onDismiss}
                                        variant="outline"
                                        className="rounded-xl border-white/25 bg-white text-[#10233f]"
                                    >
                                        Continue learning
                                    </Button>
                                </div>
                            </motion.div>
                        </>
                    )}
                    <div className="mx-auto mt-8 max-w-xs">
                        <div className="flex justify-between text-xs font-bold text-white/60">
                            <span>Level {level}</span>
                            <span>{xp} XP</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/12">
                            <motion.div
                                className="h-full bg-[#68d5c5]"
                                animate={{
                                    width: `${Math.min(100, (xp % 500) / 5)}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

function UnlockDemo() {
    const systemReduced = useReducedMotion();
    const [forceReduced, setForceReduced] = useState(false);
    const reduced = Boolean(systemReduced || forceReduced);
    const [kind, setKind] = useState<DemoKind>('unlock');
    const [stage, setStage] = useState<DemoStage>('idle');
    const [xp, setXp] = useState(2180);
    const [level, setLevel] = useState(5);
    const [collectionPulse, setCollectionPulse] = useState(false);
    const timers = useRef<number[]>([]);
    const clear = () => {
        timers.current.forEach(window.clearTimeout);
        timers.current = [];
    };
    useEffect(() => clear, []);
    const trigger = (next: DemoKind) => {
        clear();
        setKind(next);
        setCollectionPulse(false);

        if (next === 'xp') {
            setXp((currentXp) => {
                const nextXp = currentXp + 100;

                if (nextXp >= level * 500) {
                    setLevel((currentLevel) => currentLevel + 1);
                }

                return nextXp;
            });
            setStage('idle');

            return;
        }

        if (next === 'level') {
            setXp(3950);
            setLevel(8);
        }

        setStage('xp');
        const reward =
            next === 'pathway'
                ? 600
                : next === 'multiple'
                  ? 520
                  : next === 'upgrade'
                    ? 280
                    : next === 'level'
                      ? 100
                      : 160;
        const speed = reduced ? 120 : 900;
        timers.current.push(
            window.setTimeout(() => {
                setXp((v) => v + reward);

                if (next === 'level') {
                    setLevel(9);
                    setStage('level');
                } else {
                    setStage('reveal');
                }
            }, speed),
        );

        if (next === 'level') {
            timers.current.push(
                window.setTimeout(
                    () => setStage('reveal'),
                    speed + (reduced ? 120 : 1000),
                ),
            );
        }
    };
    const dismiss = () => {
        clear();
        setStage('idle');
        setCollectionPulse(true);
        timers.current.push(
            window.setTimeout(() => setCollectionPulse(false), 900),
        );
    };

    return (
        <Specimen
            title="Signature achievement unlock"
            note="A single event sequence handles XP, levels, badge reveals, tier upgrades, pathways and grouped rewards."
            className="relative overflow-hidden lg:col-span-2"
        >
            <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
                <div>
                    <XpMeter xp={xp} level={level} />
                    <div className="mt-5 flex items-center justify-between rounded-xl border border-[#dce4ec] p-4">
                        <div>
                            <p className="text-xs font-bold tracking-[.12em] text-[#718095] uppercase">
                                Latest collection
                            </p>
                            <p className="mt-1 font-bold text-[#10233f]">
                                Achievement shelf
                            </p>
                        </div>
                        <motion.div
                            animate={
                                collectionPulse
                                    ? { scale: [1, 1.35, 1], rotate: [0, 8, 0] }
                                    : {}
                            }
                        >
                            <BadgeEmblem
                                size="sm"
                                achievement={achievements[0]}
                            />
                        </motion.div>
                    </div>
                    <label className="mt-4 flex min-h-11 items-center gap-3 text-sm font-bold">
                        <input
                            type="checkbox"
                            checked={forceReduced}
                            onChange={(e) => setForceReduced(e.target.checked)}
                            className="size-5 accent-[#155eef]"
                        />
                        Preview reduced motion
                    </label>
                </div>
                <div>
                    <p className="text-sm font-bold text-[#10233f]">
                        Trigger a mock learning event
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#718095]">
                        Rewards explain the meaningful action that caused them.
                        They never reward passive clicks or raw activity volume.
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {(
                            [
                                ['xp', 'Earn 100 XP', Zap],
                                ['unlock', 'Unlock badge', Award],
                                ['upgrade', 'Upgrade badge tier', TrendingUp],
                                ['level', 'Trigger level up', Star],
                                ['pathway', 'Complete pathway', Route],
                                [
                                    'multiple',
                                    'Trigger 3 achievements',
                                    Sparkles,
                                ],
                            ] as [DemoKind, string, typeof Award][]
                        ).map(([value, label, Icon]) => (
                            <Button
                                key={value}
                                onClick={() => trigger(value)}
                                variant={
                                    value === 'unlock' ? 'default' : 'outline'
                                }
                                className={cn(
                                    'h-12 justify-start rounded-xl',
                                    value === 'unlock' && 'bg-[#155eef]',
                                )}
                            >
                                <Icon />
                                {label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <Celebration
                kind={kind}
                stage={stage}
                xp={xp}
                level={level}
                reduced={reduced}
                onDismiss={dismiss}
            />
        </Specimen>
    );
}

export function GamificationShowcase() {
    const [category, setCategory] = useState<'all' | AchievementCategory>(
        'courses',
    );
    const [tier, setTier] = useState<AchievementTier>('gold');
    const [selectedAchievement, setSelectedAchievement] =
        useState<AchievementDefinition | null>(null);
    const visible = useMemo(
        () =>
            achievements.filter(
                (a) => category === 'all' || a.category === category,
            ),
        [category],
    );
    const tierFamily = [1, 3, 10, 25, 50].map(
        (target, i): AchievementDefinition => ({
            id: `family-${target}`,
            title: [
                'First Chapter',
                'Learning Momentum',
                'Knowledge Builder',
                'Dedicated Scholar',
                'Bright Mind Luminary',
            ][i],
            reason: `Complete ${target} ${target === 1 ? 'course' : 'courses'}.`,
            category: 'courses',
            tier: tierOrder[i],
            state:
                target === 1
                    ? 'unlocked'
                    : target === 3
                      ? 'progress'
                      : target === 50
                        ? 'hidden'
                        : 'locked',
            current: 2,
            target,
            xp: [100, 180, 350, 650, 1200][i],
        }),
    );

    return (
        <div className="space-y-5">
            <div className="grid gap-5 lg:grid-cols-3">
                <Specimen title="XP & level">
                    <XpMeter xp={2480} level={5} />
                    <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                        {[
                            ['Today', '180 XP'],
                            ['This week', '760 XP'],
                            ['Next level', '20 XP'],
                        ].map(([a, b]) => (
                            <div
                                key={a}
                                className="rounded-xl bg-[#f3f6f9] p-3"
                            >
                                <strong className="block text-sm text-[#10233f]">
                                    {b}
                                </strong>
                                <span className="mt-1 block text-[10px] font-bold text-[#7c8998] uppercase">
                                    {a}
                                </span>
                            </div>
                        ))}
                    </div>
                </Specimen>
                <Specimen title="Daily streak & weekly rhythm">
                    <WeeklyRhythm />
                </Specimen>
                <Specimen title="Next to unlock">
                    <div className="space-y-3">
                        {achievements
                            .filter((a) => a.state === 'progress')
                            .slice(0, 3)
                            .map((a) => (
                                <AchievementCard
                                    compact
                                    key={a.id}
                                    achievement={a}
                                />
                            ))}
                    </div>
                </Specimen>
            </div>
            <UnlockDemo />
            <Specimen
                title="One badge geometry, five progressive tiers"
                note="Category supplies meaning; tier supplies visual prestige. The silhouette remains recognizable at dashboard, card and celebration sizes."
            >
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                    {tierFamily.map((a) => (
                        <div key={a.id} className="text-center">
                            <BadgeEmblem
                                achievement={{ ...a, state: 'unlocked' }}
                                size="lg"
                            />
                            <p className="mt-4 font-bold text-[#10233f]">
                                {tiers[a.tier].label}
                            </p>
                            <p className="mt-1 text-xs text-[#718095]">
                                {a.target} course{a.target > 1 ? 's' : ''}
                            </p>
                        </div>
                    ))}
                </div>
            </Specimen>
            <div className="grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
                <Specimen title="Student Progress & Recognition">
                    <div className="grid gap-5 sm:grid-cols-[auto_1fr]">
                        <ProgressRing value={82} size={120} />
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <Status tone="violet">Level 8</Status>
                                <Status tone="green">18 day rhythm</Status>
                            </div>
                            <h4 className="mt-3 text-2xl font-bold text-[#10233f]">
                                Your learning is becoming a habit
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-[#718095]">
                                Two course activities and one reflection will
                                complete this week’s learning goal.
                            </p>
                            <div className="mt-4">
                                <ProgressBar value={82} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {achievements
                            .filter((a) => a.state === 'unlocked')
                            .slice(0, 3)
                            .map((a) => (
                                <AchievementCard
                                    compact
                                    key={a.id}
                                    achievement={a}
                                />
                            ))}
                    </div>
                </Specimen>
                <Specimen title="Class challenge">
                    <div className="flex items-start justify-between gap-4">
                        <span className="grid size-14 place-items-center rounded-xl bg-[#e1f5ee] text-[#148777]">
                            <Users className="size-7" />
                        </span>
                        <Status tone="green">6 days left</Status>
                    </div>
                    <h4 className="mt-5 text-xl font-bold text-[#10233f]">
                        100 thoughtful reflections
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-[#718095]">
                        As a class, complete substantive reflections that
                        connect learning to real experience.
                    </p>
                    <div className="mt-5 flex justify-between text-sm font-bold">
                        <span>78 reflections</span>
                        <span>78%</span>
                    </div>
                    <ProgressBar value={78} tone="teal" />
                    <div className="mt-5 flex items-center justify-between border-t pt-4">
                        <span className="flex items-center gap-2 text-sm font-bold">
                            <Trophy className="size-4 text-[#b5790c]" />
                            Class milestone
                        </span>
                        <span className="text-sm font-bold text-[#155eef]">
                            +150 XP each
                        </span>
                    </div>
                </Specimen>
            </div>
            <Specimen
                title="Course completion family"
                note="Progressive families make long-term growth legible without flooding the learner with unrelated badges."
            >
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    {tierFamily.map((a) => (
                        <AchievementCard compact key={a.id} achievement={a} />
                    ))}
                </div>
            </Specimen>
            <Specimen
                title="Full achievement library"
                note="Filterable, state-aware and ready to receive achievement definitions and learner progress from the backend."
            >
                <div className="flex flex-wrap gap-2">
                    {(
                        [
                            ['all', 'All'],
                            ...Object.entries(categories).map(([id, c]) => [
                                id,
                                c.label,
                            ]),
                        ] as [typeof category, string][]
                    ).map(([id, label]) => (
                        <button
                            key={id}
                            onClick={() => setCategory(id)}
                            className={cn(
                                'min-h-10 rounded-full border px-4 text-sm font-bold transition',
                                category === id
                                    ? 'border-[#155eef] bg-[#155eef] text-white'
                                    : 'border-[#d3dce6] bg-white text-[#536376] hover:border-[#8ca2ba]',
                            )}
                        >
                            {label}{' '}
                            <span className="opacity-65">
                                (
                                {id === 'all'
                                    ? achievements.length
                                    : achievements.filter(
                                          (achievement) =>
                                              achievement.category === id,
                                      ).length}
                                )
                            </span>
                        </button>
                    ))}
                </div>
                <motion.div
                    layout
                    className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
                >
                    {visible.map((a) => (
                        <AchievementCard
                            key={a.id}
                            achievement={a}
                            onSelect={setSelectedAchievement}
                        />
                    ))}
                </motion.div>
            </Specimen>
            <AchievementDetail
                items={visible}
                selected={selectedAchievement}
                onSelect={setSelectedAchievement}
                onClose={() => setSelectedAchievement(null)}
            />
            <div className="grid gap-5 lg:grid-cols-2">
                <Specimen title="Recent achievements">
                    <div className="space-y-3">
                        {achievements
                            .filter((a) => a.state === 'unlocked')
                            .map((a, i) => (
                                <div
                                    key={a.id}
                                    className="flex items-center gap-4 rounded-xl border border-[#e3e9ef] p-4"
                                >
                                    <BadgeEmblem achievement={a} size="sm" />
                                    <div className="min-w-0 flex-1">
                                        <p className="font-bold text-[#10233f]">
                                            {a.title}
                                        </p>
                                        <p className="mt-1 text-xs text-[#718095]">
                                            {i
                                                ? '7 days ago'
                                                : 'Today at 15:42'}{' '}
                                            · +{a.xp} XP
                                        </p>
                                    </div>
                                    <ChevronRight className="size-5 text-[#8a97a6]" />
                                </div>
                            ))}
                    </div>
                </Specimen>
                <Specimen title="Tier upgrade preview">
                    <div className="flex items-center justify-center gap-5 py-4">
                        <BadgeEmblem
                            achievement={{ ...achievements[12], tier }}
                            size="lg"
                        />
                        <ChevronRight className="size-6 text-[#8390a0]" />
                        <BadgeEmblem
                            animated
                            achievement={{
                                ...achievements[12],
                                tier: tierOrder[
                                    Math.min(4, tierOrder.indexOf(tier) + 1)
                                ],
                                state: 'unlocked',
                            }}
                            size="lg"
                        />
                    </div>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                        {tierOrder.map((x) => (
                            <button
                                key={x}
                                onClick={() => setTier(x)}
                                className={cn(
                                    'rounded-full px-3 py-2 text-xs font-bold',
                                    tier === x
                                        ? 'bg-[#10233f] text-white'
                                        : 'bg-[#edf1f5] text-[#5f6f82]',
                                )}
                            >
                                {tiers[x].label}
                            </button>
                        ))}
                    </div>
                    <p className="mt-5 text-center text-sm leading-6 text-[#718095]">
                        Existing identity is preserved while material, border
                        and glow become richer.
                    </p>
                </Specimen>
            </div>
            <Specimen title="Reward integrity">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        [
                            BookCheck,
                            'Completed learning',
                            'Lessons, courses and pathways',
                        ],
                        [
                            Brain,
                            'Demonstrated practice',
                            'Recall, reflection and mastery',
                        ],
                        [
                            MessageCircleHeart,
                            'Helpful contribution',
                            'Quality confirmed by peers or educators',
                        ],
                        [
                            ShieldCheck,
                            'Never rewarded',
                            'Clicks, logins, spam or passive membership',
                        ],
                    ].map(([I, title, text], i) => {
                        const Icon = I as typeof Award;

                        return (
                            <div
                                key={String(title)}
                                className={cn(
                                    'rounded-xl p-4',
                                    i === 3 ? 'bg-[#fff0ea]' : 'bg-[#edf4ff]',
                                )}
                            >
                                <Icon
                                    className={cn(
                                        'size-6',
                                        i === 3
                                            ? 'text-[#c1544b]'
                                            : 'text-[#155eef]',
                                    )}
                                />
                                <p className="mt-3 font-bold text-[#10233f]">
                                    {String(title)}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-[#6b7889]">
                                    {String(text)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Specimen>
        </div>
    );
}
