import {
    ArrowRight,
    Award,
    BookOpen,
    Brain,
    ChevronDown,
    CircleGauge,
    Compass,
    Flag,
    GitBranch,
    GraduationCap,
    Lightbulb,
    Plus,
    RefreshCw,
    Route,
    Settings2,
    Sparkles,
    Target,
    Users,
    WandSparkles,
    Zap,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useMemo, useState } from 'react';

import {
    ProgressBar,
    Specimen,
    Status,
} from '@/components/design-system/primitives';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PathwayNodeType =
    | 'course'
    | 'assessment'
    | 'challenge'
    | 'reflection'
    | 'choice'
    | 'achievement';
type NodeState = 'completed' | 'current' | 'future' | 'optional' | 'locked';
interface PathwayNode {
    id: string;
    title: string;
    type: PathwayNodeType;
    state: NodeState;
    x: number;
    y: number;
}
interface Pathway {
    id: string;
    title: string;
    description: string;
    icon: typeof Brain;
    color: string;
    soft: string;
    score: number;
    duration: string;
    skills: string[];
}

const pathways: Pathway[] = [
    {
        id: 'memory',
        title: 'Memory Mastery',
        description:
            'Build durable recall through retrieval, spacing and confidence checks.',
        icon: Brain,
        color: '#6d4fd1',
        soft: '#efeaff',
        score: 94,
        duration: '6 weeks',
        skills: ['Active Recall', 'Retention'],
    },
    {
        id: 'exam',
        title: 'Exam Ready',
        description:
            'Plan, practise and respond calmly under assessment conditions.',
        icon: Target,
        color: '#155eef',
        soft: '#e8f1ff',
        score: 89,
        duration: '5 weeks',
        skills: ['Mastery', 'Confidence'],
    },
    {
        id: 'systems',
        title: 'Study System Builder',
        description:
            'Create a sustainable personal system for planning and review.',
        icon: Settings2,
        color: '#148777',
        soft: '#e1f5ee',
        score: 86,
        duration: '7 weeks',
        skills: ['Planning', 'Reflection'],
    },
    {
        id: 'focus',
        title: 'Focus & Consistency',
        description:
            'Strengthen attention and build a meaningful weekly rhythm.',
        icon: CircleGauge,
        color: '#c1544b',
        soft: '#ffebe8',
        score: 82,
        duration: '4 weeks',
        skills: ['Focus', 'Habits'],
    },
    {
        id: 'independent',
        title: 'Independent Learner',
        description:
            'Set goals, choose strategies and evaluate your own progress.',
        icon: Compass,
        color: '#0d7895',
        soft: '#e1f3f7',
        score: 79,
        duration: '8 weeks',
        skills: ['Agency', 'Planning'],
    },
    {
        id: 'creative',
        title: 'Creative Problem Solver',
        description: 'Move from empathy and questions to tested, useful ideas.',
        icon: Lightbulb,
        color: '#b5790c',
        soft: '#fff3d5',
        score: 76,
        duration: '8 weeks',
        skills: ['Design Thinking', 'Creativity'],
    },
    {
        id: 'collaborative',
        title: 'Collaborative Learner',
        description:
            'Learn through explanation, feedback and shared challenges.',
        icon: Users,
        color: '#148777',
        soft: '#e1f5ee',
        score: 72,
        duration: '6 weeks',
        skills: ['Peer learning', 'Teamwork'],
    },
    {
        id: 'reflective',
        title: 'Reflective Learner',
        description:
            'Notice how you learn and turn reflection into better choices.',
        icon: RefreshCw,
        color: '#c1544b',
        soft: '#ffebe8',
        score: 69,
        duration: '5 weeks',
        skills: ['Metacognition', 'Growth'],
    },
    {
        id: 'confidence',
        title: 'Confidence Builder',
        description:
            'Use small evidence-based wins to rebuild learning confidence.',
        icon: Sparkles,
        color: '#6d4fd1',
        soft: '#efeaff',
        score: 66,
        duration: '5 weeks',
        skills: ['Confidence', 'Mastery'],
    },
    {
        id: 'project',
        title: 'Project-Based Learner',
        description: 'Organise sustained inquiry around a meaningful outcome.',
        icon: Flag,
        color: '#155eef',
        soft: '#e8f1ff',
        score: 63,
        duration: '9 weeks',
        skills: ['Projects', 'Inquiry'],
    },
    {
        id: 'learning',
        title: 'Learning How to Learn',
        description:
            'Combine recall, reflection, focus and collaboration strategies.',
        icon: GraduationCap,
        color: '#0d7895',
        soft: '#e1f3f7',
        score: 60,
        duration: '10 weeks',
        skills: ['Learning science', 'Strategy'],
    },
    {
        id: 'explorer',
        title: 'Bright Mind Explorer',
        description:
            'Sample the four methodologies and discover your strongest route.',
        icon: WandSparkles,
        color: '#7351b8',
        soft: '#f0eaff',
        score: 57,
        duration: '6 weeks',
        skills: ['Exploration', 'Choice'],
    },
];

const nodes: PathwayNode[] = [
    {
        id: 'start',
        title: 'How memory works',
        type: 'course',
        state: 'completed',
        x: 8,
        y: 50,
    },
    {
        id: 'check',
        title: 'Recall checkpoint',
        type: 'assessment',
        state: 'completed',
        x: 25,
        y: 50,
    },
    {
        id: 'practice',
        title: 'Retrieval practice',
        type: 'challenge',
        state: 'current',
        x: 42,
        y: 50,
    },
    {
        id: 'booster',
        title: 'Confidence booster',
        type: 'course',
        state: 'optional',
        x: 58,
        y: 22,
    },
    {
        id: 'accelerate',
        title: 'Advanced spacing',
        type: 'choice',
        state: 'future',
        x: 60,
        y: 72,
    },
    {
        id: 'reflect',
        title: 'Strategy reflection',
        type: 'reflection',
        state: 'future',
        x: 76,
        y: 50,
    },
    {
        id: 'award',
        title: 'Memory Architect',
        type: 'achievement',
        state: 'locked',
        x: 93,
        y: 50,
    },
];
const nodeIcons: Record<PathwayNodeType, typeof BookOpen> = {
    course: BookOpen,
    assessment: Target,
    challenge: Zap,
    reflection: RefreshCw,
    choice: GitBranch,
    achievement: Award,
};
const nodeLabels: Record<PathwayNodeType, string> = {
    course: 'Course',
    assessment: 'Checkpoint',
    challenge: 'Challenge',
    reflection: 'Reflection',
    choice: 'Learner choice',
    achievement: 'Achievement',
};

function PathwayCard({
    pathway,
    selected,
    onSelect,
}: {
    pathway: Pathway;
    selected: boolean;
    onSelect: () => void;
}) {
    const Icon = pathway.icon;

    return (
        <motion.button
            layout
            whileHover={{ y: -4 }}
            onClick={onSelect}
            className={cn(
                'w-full rounded-2xl border bg-white p-5 text-left shadow-[0_8px_28px_rgba(16,35,63,.06)]',
                selected
                    ? 'border-[#155eef] ring-2 ring-[#155eef]/15'
                    : 'border-[#dce4ec]',
            )}
        >
            <div className="flex items-start justify-between gap-4">
                <span
                    className="grid size-12 place-items-center rounded-xl"
                    style={{ background: pathway.soft, color: pathway.color }}
                >
                    <Icon className="size-6" />
                </span>
                {pathway.score >= 85 && (
                    <Status tone="green">Top match · {pathway.score}%</Status>
                )}
            </div>
            <h3 className="mt-5 text-xl font-bold text-[#10233f]">
                {pathway.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#687789]">
                {pathway.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
                {pathway.skills.map((skill) => (
                    <span
                        key={skill}
                        className="rounded-full bg-[#edf2f6] px-3 py-1.5 text-xs font-bold text-[#59697b]"
                    >
                        {skill}
                    </span>
                ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t pt-4 text-xs font-bold text-[#718095]">
                <span>{pathway.duration}</span>
                <span
                    className="flex items-center gap-1"
                    style={{ color: pathway.color }}
                >
                    Explore <ArrowRight className="size-4" />
                </span>
            </div>
        </motion.button>
    );
}

function Constellation({ onSelect }: { onSelect: (pathway: Pathway) => void }) {
    const reduced = useReducedMotion();
    const featured = pathways.slice(0, 8);

    return (
        <div className="relative min-h-[560px] overflow-hidden rounded-3xl bg-[#081b34] text-white">
            <div className="absolute inset-0 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:28px_28px] opacity-25" />
            <svg
                className="absolute inset-0 h-full w-full opacity-35"
                aria-hidden="true"
            >
                {featured.slice(1).map((_, i) => (
                    <motion.line
                        key={i}
                        x1={`${18 + (i % 3) * 30}%`}
                        y1={`${20 + Math.floor(i / 3) * 32}%`}
                        x2={`${18 + ((i + 1) % 3) * 30}%`}
                        y2={`${20 + Math.floor((i + 1) / 3) * 32}%`}
                        stroke="#6ea7ff"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ delay: i * 0.08 }}
                    />
                ))}
            </svg>
            <div className="relative z-10 p-6 sm:p-9">
                <Status tone="blue">Learning compass</Status>
                <h3 className="mt-4 max-w-2xl text-3xl font-bold sm:text-5xl">
                    Find the route that fits how you want to grow.
                </h3>
                <p className="mt-4 max-w-xl leading-7 text-white/65">
                    Recommendations guide your choice. Every available pathway
                    remains open to explore.
                </p>
            </div>
            {featured.map((path, i) => {
                const Icon = path.icon;
                const positions = [
                    [15, 58],
                    [39, 44],
                    [68, 24],
                    [80, 62],
                    [53, 76],
                    [23, 82],
                    [62, 51],
                    [88, 84],
                ][i];

                return (
                    <motion.button
                        key={path.id}
                        onClick={() => onSelect(path)}
                        className="absolute z-10 -translate-x-1/2 -translate-y-1/2 text-left"
                        style={{
                            left: `${positions[0]}%`,
                            top: `${positions[1]}%`,
                        }}
                        animate={reduced ? undefined : { y: [-3, 3, -3] }}
                        transition={{
                            duration: 4 + i * 0.3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        whileHover={{ scale: 1.08 }}
                    >
                        <span
                            className={cn(
                                'grid place-items-center rounded-full border-2 border-white/35 shadow-[0_0_35px_rgba(79,139,244,.35)]',
                                i < 3
                                    ? 'size-16 bg-[#155eef]'
                                    : 'size-12 bg-[#17365d]',
                            )}
                        >
                            <Icon className={i < 3 ? 'size-7' : 'size-5'} />
                        </span>
                        <span className="mt-2 block max-w-28 text-center text-[11px] leading-4 font-bold">
                            {path.title}
                        </span>
                    </motion.button>
                );
            })}
        </div>
    );
}

function JourneyMap() {
    const [adapted, setAdapted] = useState(false);
    const [outcome, setOutcome] = useState('accelerate');

    return (
        <Specimen
            title="Adaptive pathway journey"
            note="A graph combines core learning, choices, checks, support and achievement outcomes."
        >
            <div className="flex flex-wrap gap-2">
                {[
                    'continue',
                    'accelerate',
                    'reinforce',
                    'branch',
                    'learner choice',
                ].map((item) => (
                    <button
                        key={item}
                        onClick={() => {
                            setOutcome(item);
                            setAdapted(item !== 'continue');
                        }}
                        className={cn(
                            'rounded-full px-3 py-2 text-xs font-bold capitalize',
                            outcome === item
                                ? 'bg-[#155eef] text-white'
                                : 'bg-[#edf1f5] text-[#5d6c7e]',
                        )}
                    >
                        {item}
                    </button>
                ))}
            </div>
            <AnimatePresence>
                {adapted && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-5 flex gap-3 rounded-xl border border-[#bcd6ff] bg-[#edf4ff] p-4"
                    >
                        <Sparkles className="size-5 shrink-0 text-[#155eef]" />
                        <p className="text-sm leading-6 text-[#385473]">
                            Your last checkpoint showed strong recall, so your
                            next step has been adjusted to the{' '}
                            <strong>{outcome}</strong> route.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="relative mt-7 h-[430px] overflow-x-auto rounded-2xl bg-[#f3f6f9]">
                <div className="relative h-full min-w-[900px]">
                    <svg className="absolute inset-0 h-full w-full">
                        {nodes.slice(0, -1).map((node, i) => {
                            const next = nodes[i + 1];

                            return (
                                <motion.line
                                    key={node.id}
                                    x1={`${node.x}%`}
                                    y1={`${node.y}%`}
                                    x2={`${next.x}%`}
                                    y2={`${next.y}%`}
                                    stroke={i < 2 ? '#155eef' : '#c7d1dc'}
                                    strokeWidth={i < 2 ? 5 : 3}
                                    strokeDasharray={i >= 2 ? '7 7' : undefined}
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: i * 0.08,
                                    }}
                                />
                            );
                        })}
                    </svg>
                    {nodes.map((node) => {
                        const Icon = nodeIcons[node.type];

                        return (
                            <motion.button
                                key={`${node.id}-${adapted}`}
                                initial={
                                    adapted && node.id === 'booster'
                                        ? { opacity: 0, scale: 0.6 }
                                        : { opacity: 1 }
                                }
                                animate={{
                                    opacity: 1,
                                    scale:
                                        node.state === 'current'
                                            ? [1, 1.08, 1]
                                            : 1,
                                }}
                                transition={{ duration: 0.7 }}
                                className="absolute w-36 -translate-x-1/2 -translate-y-1/2 text-center"
                                style={{
                                    left: `${node.x}%`,
                                    top: `${node.y}%`,
                                }}
                            >
                                <span
                                    className={cn(
                                        'mx-auto grid size-14 place-items-center rounded-2xl border-2 bg-white shadow-lg',
                                        node.state === 'completed'
                                            ? 'border-[#149b8e] text-[#149b8e]'
                                            : node.state === 'current'
                                              ? 'border-[#155eef] bg-[#155eef] text-white'
                                              : node.state === 'optional'
                                                ? 'border-dashed border-[#b5790c] text-[#b5790c]'
                                                : node.state === 'locked'
                                                  ? 'border-[#c7d0da] bg-[#e5eaf0] text-[#8793a0]'
                                                  : 'border-[#c9d4df] text-[#5f6f82]',
                                    )}
                                >
                                    <Icon className="size-6" />
                                </span>
                                <span className="mt-2 block text-[10px] font-bold tracking-[.08em] text-[#7b8898] uppercase">
                                    {nodeLabels[node.type]}
                                </span>
                                <span className="mt-1 block text-xs font-bold text-[#10233f]">
                                    {node.title}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </Specimen>
    );
}

function AssessmentReveal() {
    const [revealed, setRevealed] = useState(false);

    return (
        <Specimen title="Assessment → recommendation reveal">
            <div className="grid gap-3 sm:grid-cols-4">
                {['Recall', 'Focus', 'Collaboration', 'Reflection'].map(
                    (label, i) => (
                        <div
                            key={label}
                            className="rounded-xl bg-[#edf3fa] p-3"
                        >
                            <p className="text-xs font-bold text-[#718095]">
                                {label}
                            </p>
                            <div className="mt-2">
                                <ProgressBar value={[92, 64, 78, 71][i]} />
                            </div>
                        </div>
                    ),
                )}
            </div>
            <Button
                onClick={() => setRevealed(!revealed)}
                className="mt-5 rounded-xl bg-[#155eef]"
            >
                <Compass />
                Map my answers
            </Button>
            <AnimatePresence>
                {revealed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-5 grid gap-3 sm:grid-cols-3"
                    >
                        {pathways.slice(0, 3).map((path, i) => (
                            <motion.div
                                key={path.id}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: i * 0.12 }}
                                className="rounded-xl border border-[#bcd6ff] bg-[#f7faff] p-4"
                            >
                                <Status tone={i === 0 ? 'green' : 'blue'}>
                                    {i === 0
                                        ? 'Top recommendation'
                                        : 'Alternative'}
                                </Status>
                                <p className="mt-3 font-bold text-[#10233f]">
                                    {path.title}
                                </p>
                                <p className="mt-1 text-sm text-[#155eef]">
                                    {path.score}% match
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </Specimen>
    );
}

function PathwayBuilder() {
    const [preview, setPreview] = useState(false);

    return (
        <Specimen
            title="Partner CMS · Visual Pathway Builder"
            note="Partners assemble a graph and conditions visually; learners never see implementation rules or JSON."
        >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
                <div className="flex gap-2">
                    <Button className="rounded-xl bg-[#155eef]">
                        <Plus />
                        Add node
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                        <GitBranch />
                        Connect
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                        <Settings2 />
                        Conditions
                    </Button>
                </div>
                <Button
                    onClick={() => setPreview(!preview)}
                    variant="outline"
                    className="rounded-xl"
                >
                    {preview ? 'Edit graph' : 'Preview learner journey'}
                </Button>
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[220px_1fr_260px]">
                <div className="space-y-2">
                    {Object.entries(nodeLabels).map(([type, label]) => {
                        const Icon = nodeIcons[type as PathwayNodeType];

                        return (
                            <button
                                key={type}
                                className="flex min-h-11 w-full items-center gap-3 rounded-xl border border-[#dce4ec] bg-white px-3 text-left text-sm font-bold hover:border-[#155eef]"
                            >
                                <Icon className="size-4 text-[#155eef]" />
                                {label}
                            </button>
                        );
                    })}
                </div>
                <div className="relative min-h-[390px] overflow-hidden rounded-xl border border-[#dce4ec] bg-[#f3f6f9] [background-image:radial-gradient(circle,#cad4df_1px,transparent_1px)] [background-size:20px_20px]">
                    {nodes.slice(0, 5).map((node, i) => {
                        const Icon = nodeIcons[node.type];

                        return (
                            <motion.div
                                drag
                                dragConstraints={{
                                    left: -40,
                                    right: 280,
                                    top: -30,
                                    bottom: 270,
                                }}
                                key={node.id}
                                className="absolute w-32 cursor-grab rounded-xl border border-[#cbd6e1] bg-white p-3 shadow-lg active:cursor-grabbing"
                                style={{
                                    left: 20 + (i % 3) * 145,
                                    top: 30 + Math.floor(i / 3) * 150,
                                }}
                            >
                                <span className="grid size-8 place-items-center rounded-lg bg-[#e8f1ff] text-[#155eef]">
                                    <Icon className="size-4" />
                                </span>
                                <p className="mt-2 text-xs font-bold text-[#10233f]">
                                    {node.title}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
                <div className="rounded-xl border border-[#dce4ec] bg-white p-4">
                    <p className="text-xs font-bold tracking-[.12em] text-[#718095] uppercase">
                        Node settings
                    </p>
                    <label className="mt-4 block text-xs font-bold">
                        Outcome
                        <ChevronDown className="float-right size-4" />
                        <span className="mt-2 block rounded-lg border p-3 text-sm font-semibold">
                            Accelerate route
                        </span>
                    </label>
                    <label className="mt-4 block text-xs font-bold">
                        Condition
                        <span className="mt-2 block rounded-lg border p-3 text-sm font-semibold">
                            Checkpoint ≥ 80%
                        </span>
                    </label>
                    <div className="mt-4 rounded-lg bg-[#edf4ff] p-3 text-xs leading-5 text-[#47627f]">
                        If recall mastery is strong, skip the booster and offer
                        Advanced spacing.
                    </div>
                </div>
            </div>
        </Specimen>
    );
}

export function PathwaysShowcase({
    standalone = false,
}: {
    standalone?: boolean;
}) {
    const [selected, setSelected] = useState(pathways[0]);
    const [filter, setFilter] = useState('Recommended');
    const displayed = useMemo(
        () =>
            filter === 'Recommended'
                ? [...pathways].sort((a, b) => b.score - a.score)
                : pathways,
        [filter],
    );

    return (
        <div className="space-y-6">
            <Constellation onSelect={setSelected} />
            <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
                <AssessmentReveal />
                <Specimen title="Selected pathway">
                    <div className="flex items-start gap-4">
                        <span
                            className="grid size-14 place-items-center rounded-xl"
                            style={{
                                background: selected.soft,
                                color: selected.color,
                            }}
                        >
                            <selected.icon className="size-7" />
                        </span>
                        <div>
                            <Status tone="green">
                                {selected.score}% match
                            </Status>
                            <h3 className="mt-3 text-2xl font-bold text-[#10233f]">
                                {selected.title}
                            </h3>
                        </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-[#657487]">
                        {selected.description}
                    </p>
                    <Button className="mt-5 w-full rounded-xl bg-[#155eef]">
                        Choose this pathway
                        <ArrowRight />
                    </Button>
                </Specimen>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-[#10233f]">
                        Explore all 12 pathways
                    </h3>
                    <p className="mt-2 text-sm text-[#718095]">
                        Recommendations explain fit without restricting learner
                        choice.
                    </p>
                </div>
                <button
                    onClick={() =>
                        setFilter(
                            filter === 'Recommended' ? 'All' : 'Recommended',
                        )
                    }
                    className="rounded-full border border-[#cbd6e1] bg-white px-4 py-2 text-sm font-bold"
                >
                    {filter}
                </button>
            </div>
            <motion.div
                layout
                className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
                {displayed.map((path) => (
                    <PathwayCard
                        key={path.id}
                        pathway={path}
                        selected={selected.id === path.id}
                        onSelect={() => setSelected(path)}
                    />
                ))}
            </motion.div>
            <JourneyMap />
            <div className="grid gap-5 lg:grid-cols-3">
                <Specimen title="Student dashboard · Next step">
                    <Status tone="blue">Active pathway</Status>
                    <h4 className="mt-4 text-xl font-bold text-[#10233f]">
                        Memory Mastery
                    </h4>
                    <p className="mt-2 text-sm text-[#718095]">
                        Next: Retrieval practice · 18 min
                    </p>
                    <div className="mt-4">
                        <ProgressBar value={42} />
                    </div>
                    <Button className="mt-5 w-full rounded-xl bg-[#155eef]">
                        Continue next step
                        <ArrowRight />
                    </Button>
                </Specimen>
                <Specimen title="Adaptation notification">
                    <span className="grid size-12 place-items-center rounded-xl bg-[#e8f1ff] text-[#155eef]">
                        <GitBranch />
                    </span>
                    <h4 className="mt-4 font-bold text-[#10233f]">
                        Your route was adjusted
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-[#718095]">
                        Strong recall at your checkpoint opened an accelerated
                        option. You can still choose the booster.
                    </p>
                    <button className="mt-4 text-sm font-bold text-[#155eef]">
                        Review change
                    </button>
                </Specimen>
                <Specimen title="Pathway achievement">
                    <div className="flex items-center gap-4">
                        <span className="grid size-16 place-items-center rounded-[22px] bg-gradient-to-br from-[#d7f3ef] to-[#5b8e98] text-white shadow-lg">
                            <Route className="size-7" />
                        </span>
                        <div>
                            <Status tone="violet">Platinum</Status>
                            <p className="mt-2 font-bold text-[#10233f]">
                                Memory Pathfinder
                            </p>
                            <p className="mt-1 text-xs text-[#718095]">
                                Complete the pathway
                            </p>
                        </div>
                    </div>
                </Specimen>
            </div>
            <PathwayBuilder />
            {standalone && (
                <div className="rounded-2xl bg-[#10233f] p-7 text-white">
                    <h3 className="text-2xl font-bold">
                        Rule-based now, AI-ready later
                    </h3>
                    <p className="mt-3 max-w-3xl leading-7 text-white/65">
                        Recommendations consume versioned learner signals, graph
                        conditions and explainable outcomes. A future
                        recommendation provider can rank the same pathway
                        contracts without replacing the graph, progress or
                        explanation UI.
                    </p>
                </div>
            )}
        </div>
    );
}

export { pathways };
