import { Head } from '@inertiajs/react';
import type { Activity } from 'lucide-react';
import {
    ArrowLeft,
    ArrowRight,
    Award,
    Bell,
    BookOpen,
    Bookmark,
    ChartNoAxesCombined,
    Check,
    ChevronDown,
    ChevronRight,
    CircleAlert,
    CircleCheck,
    Download,
    Flame,
    FolderOpen,
    GraduationCap,
    Heart,
    LayoutGrid,
    List,
    LockKeyhole,
    Menu,
    MessageCircle,
    MoreHorizontal,
    Pencil,
    Play,
    Plus,
    Search,
    Settings2,
    ShieldCheck,
    Sparkles,
    Star,
    Target,
    Trophy,
    Users,
    X,
    Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip as ChartTooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { toast } from 'sonner';

import { GamificationShowcase } from '@/components/design-system/gamification';
import { PathwaysShowcase } from '@/components/design-system/pathways';
import {
    CourseCard,
    IconTile,
    MediaPlaceholder,
    palette,
    PlayerPlaceholder,
    ProgressBar,
    ProgressRing,
    SectionShell,
    Specimen,
    Status,
} from '@/components/design-system/primitives';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const sections = [
    ['foundations', 'Foundations'],
    ['controls', 'Controls'],
    ['cards', 'Cards'],
    ['student', 'Student'],
    ['courses', 'Courses'],
    ['community', 'Community'],
    ['teacher', 'Teacher'],
    ['admin', 'Admin / CMS'],
    ['pathways', 'Pathways'],
    ['gamification', 'Data & rewards'],
    ['feedback', 'System states'],
] as const;
const chartData = [
    { name: 'Mon', value: 32 },
    { name: 'Tue', value: 52 },
    { name: 'Wed', value: 43 },
    { name: 'Thu', value: 76 },
    { name: 'Fri', value: 68 },
    { name: 'Sat', value: 86 },
    { name: 'Sun', value: 74 },
];
const curriculum = [
    'Welcome to active learning',
    'Learning through questions',
    'Building a collaborative challenge',
    'Reflection and final activity',
];

function Brand({ inverse = false }: { inverse?: boolean }) {
    return (
        <a
            href="#top"
            className={cn(
                'flex items-center gap-3 font-bold',
                inverse ? 'text-white' : 'text-[#10233f]',
            )}
        >
            <span className="grid size-10 place-items-center rounded-xl bg-[#155eef] text-white">
                <Sparkles className="size-5" />
            </span>
            <span>
                <span className="block text-base leading-none">
                    Bright Mind
                </span>
                <span
                    className={cn(
                        'mt-1 block text-[10px] font-bold tracking-[.14em] uppercase',
                        inverse ? 'text-white/55' : 'text-[#718095]',
                    )}
                >
                    UI playground
                </span>
            </span>
        </a>
    );
}
function MiniAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    return (
        <MediaPlaceholder
            circle
            className={cn(
                size === 'sm'
                    ? 'size-7'
                    : size === 'lg'
                      ? 'size-14'
                      : 'size-10',
                'shrink-0',
            )}
            label="Avatar placeholder"
        />
    );
}
function Toggle({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: () => void;
    label: string;
}) {
    return (
        <button
            role="switch"
            aria-checked={checked}
            onClick={onChange}
            className="flex min-h-11 items-center gap-3 text-sm font-semibold text-[#263951]"
        >
            <motion.span
                className={cn(
                    'relative h-6 w-11 rounded-full',
                    checked ? 'bg-[#155eef]' : 'bg-[#cbd4de]',
                )}
            >
                <motion.span
                    className="absolute top-1 size-4 rounded-full bg-white shadow"
                    animate={{ left: checked ? 24 : 4 }}
                />
            </motion.span>
            {label}
        </button>
    );
}
function Tabs({
    items,
    active,
    setActive,
}: {
    items: string[];
    active: string;
    setActive: (v: string) => void;
}) {
    return (
        <div
            role="tablist"
            className="flex gap-1 overflow-x-auto border-b border-[#dce4ec]"
        >
            {items.map((item) => (
                <button
                    role="tab"
                    aria-selected={active === item}
                    onClick={() => setActive(item)}
                    key={item}
                    className={cn(
                        'relative min-h-11 shrink-0 px-4 text-sm font-bold',
                        active === item
                            ? 'text-[#155eef]'
                            : 'text-[#657487] hover:text-[#10233f]',
                    )}
                >
                    {item}
                    {active === item && (
                        <motion.span
                            layoutId="active-tab"
                            className="absolute inset-x-2 bottom-0 h-0.5 bg-[#155eef]"
                        />
                    )}
                </button>
            ))}
        </div>
    );
}
function Metric({
    icon: Icon,
    label,
    value,
    change,
    tone = 'blue',
}: {
    icon: typeof Activity;
    label: string;
    value: string;
    change: string;
    tone?: 'blue' | 'teal' | 'gold' | 'coral';
}) {
    return (
        <motion.div
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-[#dce4ec] bg-white p-5"
        >
            <IconTile icon={Icon} label={label} tone={tone} />
            <div className="mt-5 flex items-end justify-between">
                <strong className="text-3xl text-[#10233f]">{value}</strong>
                <span className="text-xs font-bold text-[#16836f]">
                    {change}
                </span>
            </div>
        </motion.div>
    );
}
function Assignment({
    title,
    due,
    state,
}: {
    title: string;
    due: string;
    state: 'active' | 'completed' | 'overdue';
}) {
    return (
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[#dce4ec] bg-white p-4">
            <span
                className={cn(
                    'grid size-11 place-items-center rounded-xl',
                    state === 'completed'
                        ? 'bg-[#e1f5ee] text-[#157d68]'
                        : state === 'overdue'
                          ? 'bg-[#ffebe8] text-[#b43d35]'
                          : 'bg-[#e8f1ff] text-[#155eef]',
                )}
            >
                <BookOpen className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
                <h4 className="truncate font-bold text-[#10233f]">{title}</h4>
                <p className="mt-1 text-xs text-[#6b7889]">{due}</p>
            </div>
            <Status
                tone={
                    state === 'completed'
                        ? 'green'
                        : state === 'overdue'
                          ? 'red'
                          : 'blue'
                }
            >
                {state}
            </Status>
        </div>
    );
}
function AvatarGroup() {
    return (
        <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-full border-2 border-white">
                    <MiniAvatar size="sm" />
                </div>
            ))}
            <span className="grid size-7 place-items-center rounded-full border-2 border-white bg-[#10233f] text-[9px] font-bold text-white">
                +8
            </span>
        </div>
    );
}

export default function DesignSystem() {
    useEffect(() => {
        const root = document.documentElement;
        const wasDark = root.classList.contains('dark');

        root.classList.remove('dark');
        root.classList.add('light');

        return () => {
            root.classList.toggle('dark', wasDark);
            root.classList.toggle('light', !wasDark);
        };
    }, []);

    const [activeTab, setActiveTab] = useState('Overview');
    const [courseTab, setCourseTab] = useState('Overview');
    const [segment, setSegment] = useState('Grid');
    const [switchOn, setSwitchOn] = useState(true);
    const [range, setRange] = useState(68);
    const [filter, setFilter] = useState('All');
    const [chart, setChart] = useState('Week');
    const [expanded, setExpanded] = useState(0);
    const [faq, setFaq] = useState(0);
    const [progress, setProgress] = useState(64);
    const [saved, setSaved] = useState(false);
    const [mobileNav, setMobileNav] = useState(false);
    const displayedCourses = useMemo(
        () => (filter === 'All' ? 3 : 2),
        [filter],
    );

    return (
        <div
            id="top"
            className="bm-design-system min-h-screen bg-[#f4f7fa] font-sans text-[#263951] selection:bg-[#cfe0ff]"
        >
            <Head title="Design System" />
            <header className="sticky top-0 z-50 border-b border-[#dce4ec] bg-white/95 backdrop-blur">
                <div className="mx-auto flex h-18 max-w-[1600px] items-center justify-between px-4 sm:px-7">
                    <Brand />
                    <nav
                        className="hidden items-center gap-1 lg:flex"
                        aria-label="Design system sections"
                    >
                        {sections.map(([id, label]) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                className="rounded-lg px-3 py-2 text-xs font-bold text-[#637286] transition hover:bg-[#edf3fa] hover:text-[#155eef]"
                            >
                                {label}
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center gap-2">
                        <Status tone="green">Draft system</Status>
                        <button
                            onClick={() => setMobileNav(!mobileNav)}
                            className="grid size-11 place-items-center rounded-xl border border-[#dce4ec] lg:hidden"
                            aria-label="Toggle section navigation"
                        >
                            {mobileNav ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                <AnimatePresence>
                    {mobileNav && (
                        <motion.nav
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden border-t border-[#dce4ec] bg-white lg:hidden"
                        >
                            <div className="grid grid-cols-2 gap-1 p-4">
                                {sections.map(([id, label]) => (
                                    <a
                                        onClick={() => setMobileNav(false)}
                                        key={id}
                                        href={`#${id}`}
                                        className="rounded-lg px-3 py-3 text-sm font-bold hover:bg-[#edf3fa]"
                                    >
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </header>
            <main className="mx-auto max-w-[1500px] px-4 sm:px-7">
                <section className="grid min-h-[430px] items-end gap-10 border-b border-[#dce4ec] py-14 lg:grid-cols-[1.2fr_.8fr] lg:py-20">
                    <div>
                        <Status tone="blue">
                            Platform design language · 01
                        </Status>
                        <h1 className="mt-6 max-w-4xl text-5xl leading-[1.02] font-bold text-balance text-[#10233f] sm:text-7xl">
                            Learning feels clearer when every detail works
                            together.
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#637286]">
                            A reusable, accessible system for Bright Mind
                            students, educators, schools and European project
                            partners.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 self-end">
                        <Metric
                            icon={Users}
                            label="Audiences"
                            value="4"
                            change="One system"
                        />
                        <Metric
                            icon={LayoutGrid}
                            label="Patterns"
                            value="60+"
                            change="Reusable"
                            tone="teal"
                        />
                    </div>
                </section>

                <SectionShell
                    id="foundations"
                    eyebrow="01 · Foundations"
                    title="A bright, structured learning environment"
                    description="Navy establishes trust and hierarchy, vivid blue carries action, while teal and warm accents make progress and recognition easy to scan."
                >
                    <div className="grid gap-5 lg:grid-cols-2">
                        <Specimen
                            title="Core palette"
                            className="lg:col-span-2"
                        >
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-9">
                                {palette.map(([name, color]) => (
                                    <div key={name}>
                                        <div
                                            className="aspect-square rounded-xl border border-black/5"
                                            style={{ background: color }}
                                        />
                                        <p className="mt-2 text-xs font-bold text-[#10233f]">
                                            {name}
                                        </p>
                                        <p className="text-[11px] text-[#778497]">
                                            {color}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Specimen>
                        <Specimen
                            title="Typography"
                            note="Editorial clarity for public moments; compact confidence inside workspaces."
                        >
                            <p className="text-5xl leading-tight font-bold text-[#10233f]">
                                Learn with purpose.
                            </p>
                            <p className="mt-5 text-2xl font-bold text-[#10233f]">
                                Workspace heading
                            </p>
                            <p className="mt-3 max-w-xl leading-7 text-[#627185]">
                                Bright Mind helps learners build knowledge
                                through active, collaborative experiences across
                                Europe.
                            </p>
                            <p className="mt-4 text-sm font-semibold">
                                Interface label · 14/20 semibold
                            </p>
                            <p className="mt-2 text-xs font-bold tracking-[.14em] text-[#155eef] uppercase">
                                Category label
                            </p>
                        </Specimen>
                        <Specimen title="Geometry & elevation">
                            <div className="grid grid-cols-3 gap-3">
                                {['8 px', '12 px', '16 px'].map((x, i) => (
                                    <div
                                        key={x}
                                        className="grid h-24 place-items-center border border-[#dce4ec] bg-[#f8fafc] text-sm font-bold"
                                        style={{
                                            borderRadius: [8, 12, 16][i],
                                            boxShadow:
                                                i === 2
                                                    ? '0 12px 28px rgba(16,35,63,.10)'
                                                    : 'none',
                                        }}
                                    >
                                        {x}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 flex items-end justify-between gap-4">
                                {[16, 24, 32, 44].map((x) => (
                                    <div
                                        key={x}
                                        className="grid place-items-center rounded-lg bg-[#e8f1ff] text-[10px] font-bold text-[#155eef]"
                                        style={{ width: x, height: x }}
                                    >
                                        {x}
                                    </div>
                                ))}
                            </div>
                            <p className="mt-5 text-sm leading-6 text-[#697789]">
                                8 px spatial rhythm · 12–16 px interface radii ·
                                1 px cool borders · restrained elevation.
                            </p>
                        </Specimen>
                        <Specimen
                            title="Layout rules"
                            className="lg:col-span-2"
                        >
                            <div className="grid gap-3 lg:grid-cols-[220px_1fr_300px]">
                                <div className="h-24 rounded-xl bg-[#dfe8f2]" />
                                <div className="h-24 rounded-xl bg-[#cbdcf4]" />
                                <div className="h-24 rounded-xl bg-[#dfe8f2]" />
                            </div>
                            <div className="mt-3 grid grid-cols-4 gap-3">
                                {[1, 2, 3, 4].map((x) => (
                                    <div
                                        key={x}
                                        className="h-10 rounded-lg border border-dashed border-[#91a2b5]"
                                    />
                                ))}
                            </div>
                            <p className="mt-4 text-sm text-[#697789]">
                                Max content 1500 px · workspaces use 12-column
                                grids · detail pages support a 300–360 px action
                                rail · minimum 44 px touch targets.
                            </p>
                        </Specimen>
                    </div>
                </SectionShell>

                <SectionShell
                    id="controls"
                    eyebrow="02 · Controls"
                    title="Controls that feel precise, not clinical"
                    description="Every action has a clear hierarchy, accessible focus treatment and enough geometry for touch and translated labels."
                >
                    <div className="grid gap-5 xl:grid-cols-2">
                        <Specimen title="Buttons & actions">
                            <div className="flex flex-wrap gap-3">
                                <Button className="rounded-xl bg-[#155eef] hover:bg-[#0f4fd1]">
                                    Primary action
                                </Button>
                                <Button className="rounded-xl bg-[#10233f]">
                                    Start learning <ArrowRight />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="rounded-xl border-[#b9c6d4]"
                                >
                                    Secondary
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="rounded-xl text-[#155eef]"
                                >
                                    Quiet action
                                </Button>
                                <Button disabled className="rounded-xl">
                                    Disabled
                                </Button>
                            </div>
                            <div className="mt-5 flex flex-wrap items-center gap-3">
                                <Button
                                    size="sm"
                                    className="rounded-lg bg-[#155eef]"
                                >
                                    Small
                                </Button>
                                <Button
                                    size="lg"
                                    className="rounded-xl bg-[#155eef]"
                                >
                                    Large CTA
                                </Button>
                                {[Search, Bookmark, MoreHorizontal].map(
                                    (Icon, i) => (
                                        <Tooltip key={i}>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="rounded-xl"
                                                >
                                                    <Icon />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {
                                                    [
                                                        'Search',
                                                        'Save',
                                                        'More actions',
                                                    ][i]
                                                }
                                            </TooltipContent>
                                        </Tooltip>
                                    ),
                                )}
                            </div>
                        </Specimen>
                        <Specimen title="Fields">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="name">Course title</Label>
                                    <Input
                                        id="name"
                                        className="mt-2 h-11 rounded-xl"
                                        placeholder="Enter a clear title"
                                    />
                                </div>
                                <div>
                                    <Label>Methodology</Label>
                                    <Select defaultValue="project">
                                        <SelectTrigger className="mt-2 h-11 w-full rounded-xl">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="project">
                                                Project-based learning
                                            </SelectItem>
                                            <SelectItem value="inquiry">
                                                Inquiry learning
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="relative sm:col-span-2">
                                    <Search className="absolute top-3 left-3 size-5 text-[#7b8999]" />
                                    <Input
                                        aria-label="Search courses"
                                        className="h-11 rounded-xl pl-10"
                                        placeholder="Search courses, skills or resources"
                                    />
                                </div>
                                <textarea
                                    aria-label="Description"
                                    className="min-h-28 rounded-xl border border-[#cbd5df] bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-[#155eef] sm:col-span-2"
                                    placeholder="Write a description…"
                                />
                            </div>
                        </Specimen>
                        <Specimen title="Selection & range">
                            <div className="flex flex-wrap gap-x-7 gap-y-4">
                                <label className="flex min-h-11 items-center gap-3 text-sm font-semibold">
                                    <Checkbox defaultChecked />
                                    Email updates
                                </label>
                                <label className="flex min-h-11 items-center gap-3 text-sm font-semibold">
                                    <input
                                        type="radio"
                                        defaultChecked
                                        name="level"
                                        className="size-5 accent-[#155eef]"
                                    />
                                    Beginner
                                </label>
                                <label className="flex min-h-11 items-center gap-3 text-sm font-semibold">
                                    <input
                                        type="radio"
                                        name="level"
                                        className="size-5 accent-[#155eef]"
                                    />
                                    Advanced
                                </label>
                                <Toggle
                                    checked={switchOn}
                                    onChange={() => setSwitchOn(!switchOn)}
                                    label="Learning reminders"
                                />
                            </div>
                            <div className="mt-5">
                                <div className="mb-2 flex justify-between text-sm font-bold">
                                    <span>Daily goal</span>
                                    <span>{range} min</span>
                                </div>
                                <input
                                    aria-label="Daily learning goal"
                                    type="range"
                                    min="10"
                                    max="120"
                                    value={range}
                                    onChange={(e) =>
                                        setRange(Number(e.target.value))
                                    }
                                    className="w-full accent-[#155eef]"
                                />
                            </div>
                        </Specimen>
                        <Specimen title="Tabs, segments & menus">
                            <Tabs
                                items={['Overview', 'Curriculum', 'Reviews']}
                                active={activeTab}
                                setActive={setActiveTab}
                            />
                            <div className="mt-5 inline-flex rounded-xl bg-[#edf1f5] p-1">
                                {['Grid', 'List'].map((x) => (
                                    <button
                                        key={x}
                                        onClick={() => setSegment(x)}
                                        className={cn(
                                            'flex min-h-10 items-center gap-2 rounded-lg px-4 text-sm font-bold',
                                            segment === x
                                                ? 'bg-white text-[#155eef] shadow-sm'
                                                : 'text-[#6a7889]',
                                        )}
                                    >
                                        {x === 'Grid' ? (
                                            <LayoutGrid className="size-4" />
                                        ) : (
                                            <List className="size-4" />
                                        )}
                                        {x}
                                    </button>
                                ))}
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="ml-3 rounded-xl"
                                    >
                                        Sort: Recommended <ChevronDown />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        Recommended
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Newest</DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Progress
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Specimen>
                        <Specimen
                            title="Navigation helpers"
                            className="xl:col-span-2"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-6">
                                <nav
                                    aria-label="Breadcrumb"
                                    className="flex items-center gap-2 text-sm font-semibold text-[#718095]"
                                >
                                    <span>Courses</span>
                                    <ChevronRight className="size-4" />
                                    <span>Active learning</span>
                                    <ChevronRight className="size-4" />
                                    <strong className="text-[#10233f]">
                                        Lesson 3
                                    </strong>
                                </nav>
                                <div className="flex gap-1">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-lg"
                                    >
                                        <ArrowLeft />
                                    </Button>
                                    {[1, 2, 3].map((x) => (
                                        <Button
                                            key={x}
                                            variant={
                                                x === 2 ? 'default' : 'ghost'
                                            }
                                            size="icon"
                                            className={cn(
                                                'rounded-lg',
                                                x === 2 && 'bg-[#155eef]',
                                            )}
                                        >
                                            {x}
                                        </Button>
                                    ))}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-lg"
                                    >
                                        <ArrowRight />
                                    </Button>
                                </div>
                            </div>
                        </Specimen>
                    </div>
                </SectionShell>

                <SectionShell
                    id="cards"
                    eyebrow="03 · Cards"
                    title="A flexible card language for the whole platform"
                    description="Cards preserve strong content hierarchy across discovery, progress, people, community and administration without turning every section into a floating panel."
                >
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        <CourseCard
                            title="Designing solutions together"
                            category="Collaboration"
                        />
                        <CourseCard
                            title="Media literacy in action"
                            category="Digital skills"
                            state="selected"
                        />
                        <CourseCard
                            title="Climate choices"
                            category="Citizenship"
                            state="progress"
                        />
                        <CourseCard
                            title="Advanced facilitation"
                            category="Teacher"
                            state="locked"
                        />
                    </div>
                    <div className="mt-5 grid gap-5 lg:grid-cols-3">
                        <Specimen title="Learning path">
                            <div className="flex items-center justify-between">
                                <Status tone="violet">Pathway</Status>
                                <span className="text-sm font-bold">3 / 6</span>
                            </div>
                            <h4 className="mt-4 text-xl font-bold text-[#10233f]">
                                Become a community problem solver
                            </h4>
                            <div className="mt-5 space-y-3">
                                {['Understand', 'Collaborate', 'Create'].map(
                                    (x, i) => (
                                        <div
                                            key={x}
                                            className="flex items-center gap-3"
                                        >
                                            <span
                                                className={cn(
                                                    'grid size-8 place-items-center rounded-full text-xs font-bold',
                                                    i < 2
                                                        ? 'bg-[#155eef] text-white'
                                                        : 'bg-[#e7edf3]',
                                                )}
                                            >
                                                {i < 2 ? (
                                                    <Check className="size-4" />
                                                ) : (
                                                    i + 1
                                                )}
                                            </span>
                                            <span className="text-sm font-semibold">
                                                {x}
                                            </span>
                                        </div>
                                    ),
                                )}
                            </div>
                        </Specimen>
                        <Specimen title="Achievement">
                            <div className="mx-auto grid size-24 place-items-center rounded-full bg-[#fff3d5] text-[#c08413]">
                                <Trophy className="size-11" />
                            </div>
                            <div className="mt-5 text-center">
                                <Status tone="amber">Rare badge</Status>
                                <h4 className="mt-3 text-xl font-bold text-[#10233f]">
                                    Curious Collaborator
                                </h4>
                                <p className="mt-2 text-sm text-[#6b7889]">
                                    Complete five team learning activities.
                                </p>
                            </div>
                        </Specimen>
                        <Specimen title="Community discussion">
                            <div className="flex gap-3">
                                <MiniAvatar />
                                <div>
                                    <h4 className="font-bold text-[#10233f]">
                                        How do you start a student-led project?
                                    </h4>
                                    <p className="mt-1 text-xs text-[#748194]">
                                        Elena García · 18 min ago
                                    </p>
                                </div>
                            </div>
                            <p className="mt-4 text-sm leading-6 text-[#5f6f82]">
                                Share practical approaches that have helped your
                                group move from ideas to action.
                            </p>
                            <div className="mt-5 flex items-center justify-between">
                                <AvatarGroup />
                                <span className="flex items-center gap-2 text-xs font-bold">
                                    <MessageCircle className="size-4" />
                                    24 replies
                                </span>
                            </div>
                        </Specimen>
                    </div>
                </SectionShell>

                <SectionShell
                    id="student"
                    eyebrow="04 · Student product"
                    title="Momentum, clarity and a sense of progress"
                    description="The student workspace balances the next useful action with discovery, personal progress and quiet encouragement."
                >
                    <div className="overflow-hidden rounded-2xl border border-[#d6e0ea] bg-[#eef3f7]">
                        <div className="flex h-16 items-center justify-between border-b border-[#d6e0ea] bg-white px-5">
                            <Brand />
                            <div className="flex items-center gap-3">
                                <button className="grid size-10 place-items-center rounded-xl bg-[#edf3fa]">
                                    <Bell className="size-5" />
                                </button>
                                <MiniAvatar />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-[220px_1fr]">
                            <aside className="hidden border-r border-[#d6e0ea] bg-[#10233f] p-4 text-white lg:block">
                                <p className="px-3 py-4 text-xs font-bold tracking-[.13em] text-white/55 uppercase">
                                    Student space
                                </p>
                                {[
                                    ['Dashboard', LayoutGrid],
                                    ['My learning', BookOpen],
                                    ['Assignments', Target],
                                    ['Community', Users],
                                    ['Achievements', Award],
                                ].map(([x, I], i) => {
                                    const Icon = I as typeof Activity;

                                    return (
                                        <div
                                            key={String(x)}
                                            className={cn(
                                                'mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold',
                                                i === 0
                                                    ? 'bg-white/12'
                                                    : 'text-white/70',
                                            )}
                                        >
                                            <Icon className="size-5" />
                                            {String(x)}
                                        </div>
                                    );
                                })}
                            </aside>
                            <div className="min-w-0 p-4 sm:p-7">
                                <div className="flex flex-wrap items-end justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-bold text-[#155eef]">
                                            Saturday, 8 August
                                        </p>
                                        <h3 className="mt-1 text-3xl font-bold text-[#10233f]">
                                            Good afternoon, Sofia
                                        </h3>
                                        <p className="mt-2 text-[#6a788a]">
                                            You are one activity away from your
                                            weekly goal.
                                        </p>
                                    </div>
                                    <Button className="rounded-xl bg-[#10233f]">
                                        View learning plan <ArrowRight />
                                    </Button>
                                </div>
                                <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                    <Metric
                                        icon={Zap}
                                        label="Total XP"
                                        value="2,480"
                                        change="+120"
                                    />
                                    <Metric
                                        icon={Flame}
                                        label="Learning streak"
                                        value="9 days"
                                        change="Best: 14"
                                        tone="coral"
                                    />
                                    <Metric
                                        icon={Target}
                                        label="Weekly goal"
                                        value="4 / 5"
                                        change="80%"
                                        tone="teal"
                                    />
                                    <Metric
                                        icon={Award}
                                        label="Badges"
                                        value="12"
                                        change="2 new"
                                        tone="gold"
                                    />
                                </div>
                                <div className="mt-6 grid gap-5 xl:grid-cols-[1.4fr_.8fr]">
                                    <div className="space-y-5">
                                        <Specimen title="Continue learning">
                                            <CourseCard
                                                horizontal
                                                title="Think, test, improve"
                                                category="Active learning"
                                                state="progress"
                                            />
                                        </Specimen>
                                        <Specimen title="Recommended for you">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <CourseCard
                                                    title="Question everything"
                                                    category="Critical thinking"
                                                />
                                                <CourseCard
                                                    title="Build better teams"
                                                    category="Collaboration"
                                                />
                                            </div>
                                        </Specimen>
                                        <Specimen title="Assignments">
                                            <div className="space-y-3">
                                                <Assignment
                                                    title="Community interview reflection"
                                                    due="Due Monday · 20 min"
                                                    state="active"
                                                />
                                                <Assignment
                                                    title="Team challenge proposal"
                                                    due="Completed yesterday"
                                                    state="completed"
                                                />
                                                <Assignment
                                                    title="Media source check"
                                                    due="Due 2 days ago"
                                                    state="overdue"
                                                />
                                            </div>
                                        </Specimen>
                                    </div>
                                    <div className="space-y-5">
                                        <Specimen title="Level 8 · Explorer">
                                            <div className="flex items-center gap-5">
                                                <ProgressRing value={72} />
                                                <div>
                                                    <strong className="text-2xl text-[#10233f]">
                                                        520 XP
                                                    </strong>
                                                    <p className="mt-1 text-sm text-[#6d7988]">
                                                        until Level 9
                                                    </p>
                                                </div>
                                            </div>
                                        </Specimen>
                                        <Specimen title="Upcoming">
                                            <div className="space-y-4">
                                                {[
                                                    [
                                                        '12',
                                                        'Workshop: Better questions',
                                                    ],
                                                    [
                                                        '16',
                                                        'Assignment deadline',
                                                    ],
                                                    [
                                                        '21',
                                                        'Partner school exchange',
                                                    ],
                                                ].map(([d, t]) => (
                                                    <div
                                                        key={d}
                                                        className="flex gap-3"
                                                    >
                                                        <span className="grid size-11 place-items-center rounded-xl bg-[#e8f1ff] font-bold text-[#155eef]">
                                                            {d}
                                                        </span>
                                                        <div>
                                                            <p className="text-sm font-bold text-[#10233f]">
                                                                {t}
                                                            </p>
                                                            <p className="mt-1 text-xs text-[#718095]">
                                                                August · 15:00
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </Specimen>
                                        <Specimen title="Recent activity">
                                            <div className="space-y-4">
                                                {[
                                                    'Earned Curious Mind badge',
                                                    'Saved a new resource',
                                                    'Replied in Community',
                                                ].map((x, i) => (
                                                    <div
                                                        key={x}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <span className="grid size-9 place-items-center rounded-full bg-[#edf3fa]">
                                                            {i === 0 ? (
                                                                <Award className="size-4" />
                                                            ) : i === 1 ? (
                                                                <Bookmark className="size-4" />
                                                            ) : (
                                                                <MessageCircle className="size-4" />
                                                            )}
                                                        </span>
                                                        <p className="text-sm font-semibold">
                                                            {x}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </Specimen>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionShell>

                <SectionShell
                    id="courses"
                    eyebrow="05 · Course experience"
                    title="From discovery to meaningful completion"
                    description="A complete course language for catalogues, details, enrolment, lesson delivery, resources, assessment and recognized outcomes."
                >
                    <div className="rounded-2xl bg-[#10233f] p-5 text-white sm:p-8">
                        <div className="grid items-center gap-8 lg:grid-cols-[1fr_.9fr]">
                            <div>
                                <Status tone="amber">Featured course</Status>
                                <h3 className="mt-5 text-3xl font-bold sm:text-5xl">
                                    Turn local challenges into shared solutions
                                </h3>
                                <p className="mt-4 max-w-2xl leading-7 text-white/70">
                                    Use inquiry, teamwork and reflection to
                                    design an idea that creates real value in
                                    your community.
                                </p>
                                <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-white/75">
                                    <span>Project-based</span>
                                    <span>Intermediate</span>
                                    <span>8 lessons</span>
                                    <span>2h 20m</span>
                                </div>
                                <div className="mt-7 flex flex-wrap gap-3">
                                    <Button
                                        size="lg"
                                        className="rounded-xl bg-[#155eef] hover:bg-[#2770ff]"
                                    >
                                        <Play />
                                        Start learning
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        onClick={() => setSaved(!saved)}
                                        className="rounded-xl border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                                    >
                                        <Bookmark
                                            className={
                                                saved ? 'fill-current' : ''
                                            }
                                        />
                                        {saved ? 'Saved' : 'Save course'}
                                    </Button>
                                </div>
                            </div>
                            <MediaPlaceholder
                                className="aspect-[4/3] bg-[#8b96a3]"
                                label="Featured course media"
                            />
                        </div>
                    </div>
                    <div className="mt-6 grid gap-5 lg:grid-cols-[260px_1fr]">
                        <Specimen title="Find courses">
                            <div className="relative">
                                <Search className="absolute top-3 left-3 size-5 text-[#7b8999]" />
                                <Input
                                    className="h-11 rounded-xl pl-10"
                                    placeholder="Search"
                                />
                            </div>
                            {[
                                'All',
                                'Active learning',
                                'Digital skills',
                                'Citizenship',
                            ].map((x) => (
                                <button
                                    key={x}
                                    onClick={() => setFilter(x)}
                                    className={cn(
                                        'mt-2 flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm font-bold',
                                        filter === x
                                            ? 'bg-[#e8f1ff] text-[#155eef]'
                                            : 'hover:bg-[#f2f5f8]',
                                    )}
                                >
                                    {x}
                                    <span className="text-xs">
                                        {x === 'All' ? 12 : 4}
                                    </span>
                                </button>
                            ))}
                            <div className="mt-5 border-t pt-5">
                                <p className="text-xs font-bold tracking-[.12em] text-[#718095] uppercase">
                                    Level
                                </p>
                                {['Beginner', 'Intermediate', 'Advanced'].map(
                                    (x, i) => (
                                        <label
                                            key={x}
                                            className="mt-2 flex min-h-10 items-center gap-3 text-sm"
                                        >
                                            <Checkbox
                                                defaultChecked={i === 0}
                                            />
                                            {x}
                                        </label>
                                    ),
                                )}
                            </div>
                        </Specimen>
                        <div>
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                <p className="font-bold text-[#10233f]">
                                    {displayedCourses} courses selected
                                </p>
                                <Select defaultValue="recommended">
                                    <SelectTrigger className="w-48 rounded-xl bg-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="recommended">
                                            Recommended
                                        </SelectItem>
                                        <SelectItem value="new">
                                            Newest first
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <motion.div
                                layout
                                className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
                            >
                                {Array.from({ length: displayedCourses }).map(
                                    (_, i) => (
                                        <CourseCard
                                            key={`${filter}-${i}`}
                                            title={
                                                [
                                                    'Ask better questions',
                                                    'Create with your community',
                                                    'Collaborate across cultures',
                                                ][i]
                                            }
                                            category={
                                                filter === 'All'
                                                    ? [
                                                          'Inquiry',
                                                          'Community',
                                                          'Collaboration',
                                                      ][i]
                                                    : filter
                                            }
                                        />
                                    ),
                                )}
                            </motion.div>
                        </div>
                    </div>
                    <div className="mt-12 border-t border-[#dce4ec] pt-12">
                        <div className="grid gap-7 xl:grid-cols-[1fr_340px]">
                            <div>
                                <div className="overflow-hidden rounded-2xl border border-[#dce4ec] bg-white">
                                    <MediaPlaceholder
                                        className="aspect-[16/7] rounded-none"
                                        label="Course detail hero media"
                                    />
                                    <div className="p-6 sm:p-8">
                                        <div className="flex flex-wrap gap-2">
                                            <Status tone="blue">
                                                Project-based learning
                                            </Status>
                                            <Status tone="green">
                                                Intermediate
                                            </Status>
                                        </div>
                                        <h3 className="mt-5 text-3xl font-bold text-[#10233f] sm:text-5xl">
                                            Designing solutions together
                                        </h3>
                                        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#637286]">
                                            A guided learning journey from
                                            observation and inquiry to
                                            collaborative action.
                                        </p>
                                        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                            {[
                                                ['Duration', '2h 20m'],
                                                ['Lessons', '8'],
                                                ['Languages', '6'],
                                                ['Rating', '4.8 / 5'],
                                            ].map(([a, b]) => (
                                                <div key={a}>
                                                    <p className="text-xs font-bold tracking-[.1em] text-[#8190a1] uppercase">
                                                        {a}
                                                    </p>
                                                    <p className="mt-1 font-bold text-[#10233f]">
                                                        {b}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 rounded-2xl border border-[#dce4ec] bg-white">
                                    <div className="px-5 pt-2">
                                        <Tabs
                                            items={[
                                                'Overview',
                                                'Curriculum',
                                                'Resources',
                                                'Reviews',
                                                'FAQ',
                                            ]}
                                            active={courseTab}
                                            setActive={setCourseTab}
                                        />
                                    </div>
                                    <div className="p-5 sm:p-8">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={courseTab}
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                {courseTab === 'Overview' && (
                                                    <div className="grid gap-8 lg:grid-cols-2">
                                                        <div>
                                                            <h4 className="text-xl font-bold text-[#10233f]">
                                                                What you will
                                                                learn
                                                            </h4>
                                                            <div className="mt-4 space-y-3">
                                                                {[
                                                                    'Frame a meaningful local challenge',
                                                                    'Use evidence to test assumptions',
                                                                    'Collaborate and reflect constructively',
                                                                ].map((x) => (
                                                                    <p
                                                                        key={x}
                                                                        className="flex gap-3 text-sm leading-6"
                                                                    >
                                                                        <Check className="mt-0.5 size-5 shrink-0 text-[#149b8e]" />
                                                                        {x}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xl font-bold text-[#10233f]">
                                                                About this
                                                                course
                                                            </h4>
                                                            <p className="mt-4 text-sm leading-7 text-[#617184]">
                                                                Move through
                                                                short
                                                                explanations,
                                                                real examples
                                                                and practical
                                                                group
                                                                activities. Each
                                                                lesson ends with
                                                                a reflection you
                                                                can use in your
                                                                portfolio.
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                                {courseTab === 'Curriculum' && (
                                                    <Curriculum
                                                        expanded={expanded}
                                                        setExpanded={
                                                            setExpanded
                                                        }
                                                    />
                                                )}{' '}
                                                {courseTab === 'Resources' && (
                                                    <ResourceList />
                                                )}
                                                {courseTab === 'Reviews' && (
                                                    <Reviews />
                                                )}
                                                {courseTab === 'FAQ' && (
                                                    <Faq
                                                        faq={faq}
                                                        setFaq={setFaq}
                                                    />
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                            <aside className="xl:sticky xl:top-24 xl:self-start">
                                <Specimen title="Continue your course">
                                    <div className="flex items-center justify-between">
                                        <ProgressRing value={progress} />
                                        <div>
                                            <p className="text-sm text-[#6b7889]">
                                                Course progress
                                            </p>
                                            <strong className="text-2xl text-[#10233f]">
                                                {progress}%
                                            </strong>
                                        </div>
                                    </div>
                                    <ProgressBar value={progress} />
                                    <Button
                                        onClick={() =>
                                            setProgress(
                                                Math.min(progress + 8, 100),
                                            )
                                        }
                                        className="mt-6 h-12 w-full rounded-xl bg-[#155eef]"
                                    >
                                        <Play />
                                        Continue learning
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="mt-3 h-11 w-full rounded-xl"
                                    >
                                        <Download />
                                        Course guide
                                    </Button>
                                    <div className="mt-6 border-t pt-5">
                                        <InstructorMini />
                                    </div>
                                </Specimen>
                                <Specimen title="Outcome" className="mt-5">
                                    <div className="flex items-center gap-4">
                                        <span className="grid size-14 place-items-center rounded-full bg-[#fff3d5] text-[#b67b0b]">
                                            <Award className="size-7" />
                                        </span>
                                        <div>
                                            <p className="font-bold text-[#10233f]">
                                                Community Innovator
                                            </p>
                                            <p className="mt-1 text-xs text-[#718095]">
                                                Badge + certificate
                                            </p>
                                        </div>
                                    </div>
                                </Specimen>
                            </aside>
                        </div>
                    </div>
                    <div className="mt-12 grid gap-6 xl:grid-cols-[280px_1fr]">
                        <Specimen title="Lesson navigation">
                            <p className="text-xs font-bold tracking-[.12em] text-[#718095] uppercase">
                                Module 2 · Inquiry
                            </p>
                            <div className="mt-4 space-y-2">
                                {curriculum.map((x, i) => (
                                    <button
                                        key={x}
                                        className={cn(
                                            'flex min-h-12 w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-semibold',
                                            i === 1
                                                ? 'bg-[#e8f1ff] text-[#155eef]'
                                                : 'hover:bg-[#f2f5f8]',
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                'grid size-7 shrink-0 place-items-center rounded-full text-xs',
                                                i === 0
                                                    ? 'bg-[#149b8e] text-white'
                                                    : 'bg-[#e7edf3]',
                                            )}
                                        >
                                            {i === 0 ? (
                                                <Check className="size-4" />
                                            ) : (
                                                i + 1
                                            )}
                                        </span>
                                        {x}
                                    </button>
                                ))}
                            </div>
                        </Specimen>
                        <div className="space-y-6">
                            <PlayerPlaceholder />
                            <Specimen title="Lesson content">
                                <p className="leading-7 text-[#607084]">
                                    Good questions help a team move beyond first
                                    impressions. In this activity, you will turn
                                    observations into open questions and compare
                                    them with your group.
                                </p>
                                <div className="mt-6 rounded-xl border-l-4 border-[#155eef] bg-[#eaf2ff] p-5">
                                    <p className="font-bold text-[#10233f]">
                                        Try it now
                                    </p>
                                    <p className="mt-2 text-sm leading-6">
                                        Write three questions that begin with
                                        “How might we…?” and choose the one that
                                        opens the most possibilities.
                                    </p>
                                </div>
                            </Specimen>
                            <Specimen title="Knowledge check">
                                <p className="font-bold text-[#10233f]">
                                    Which question creates the strongest
                                    inquiry?
                                </p>
                                <div className="mt-4 grid gap-3">
                                    {[
                                        'Why is this a problem?',
                                        'How might we help more people take part?',
                                        'Who made this happen?',
                                    ].map((x, i) => (
                                        <button
                                            key={x}
                                            className={cn(
                                                'rounded-xl border p-4 text-left text-sm font-semibold transition',
                                                i === 1
                                                    ? 'border-[#155eef] bg-[#eaf2ff] text-[#155eef]'
                                                    : 'border-[#dce4ec] hover:border-[#91a9c2]',
                                            )}
                                        >
                                            {x}
                                        </button>
                                    ))}
                                </div>
                                <Button className="mt-5 rounded-xl bg-[#10233f]">
                                    Check answer
                                </Button>
                            </Specimen>
                        </div>
                    </div>
                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        <CourseCard
                            title="Ideas into action"
                            category="Next course"
                            state="completed"
                        />
                        <CourseCard
                            title="Reflective teamwork"
                            category="Recommended"
                        />
                        <Specimen title="Locked pathway">
                            <div className="flex items-start gap-4">
                                <span className="grid size-12 place-items-center rounded-xl bg-[#edf1f5]">
                                    <LockKeyhole />
                                </span>
                                <div>
                                    <h4 className="font-bold text-[#10233f]">
                                        Advanced community lab
                                    </h4>
                                    <p className="mt-2 text-sm leading-6 text-[#6c798a]">
                                        Complete Designing solutions together to
                                        unlock.
                                    </p>
                                </div>
                            </div>
                            <ProgressBar value={75} />
                        </Specimen>
                    </div>
                </SectionShell>

                <SectionShell
                    id="community"
                    eyebrow="06 · Community"
                    title="Conversation with context and belonging"
                    description="Discussion patterns emphasize useful questions, trusted participation and connection across schools without mimicking social-media noise."
                >
                    <div className="overflow-hidden rounded-2xl bg-[#e7f1ff] p-6 sm:p-10">
                        <div className="grid items-center gap-8 lg:grid-cols-[1fr_360px]">
                            <div>
                                <Status tone="blue">Bright Mind network</Status>
                                <h3 className="mt-4 text-3xl font-bold text-[#10233f] sm:text-4xl">
                                    What are you learning together?
                                </h3>
                                <p className="mt-3 max-w-2xl text-[#637286]">
                                    Ask a question, compare classroom practice,
                                    or find a partner for your next project.
                                </p>
                                <div className="relative mt-6 max-w-2xl">
                                    <Search className="absolute top-3.5 left-4 size-5 text-[#748398]" />
                                    <Input
                                        className="h-12 rounded-xl border-white bg-white pl-11 shadow-sm"
                                        placeholder="Search community discussions"
                                    />
                                </div>
                            </div>
                            <MediaPlaceholder
                                className="aspect-[4/3]"
                                label="Community illustration placeholder"
                            />
                        </div>
                    </div>
                    <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_320px]">
                        <div className="space-y-4">
                            {[
                                'Student-led projects that worked',
                                'Ideas for multilingual group reflection',
                                'How our class reduced food waste',
                            ].map((x, i) => (
                                <motion.article
                                    whileHover={{ x: 3 }}
                                    key={x}
                                    className="rounded-2xl border border-[#dce4ec] bg-white p-5"
                                >
                                    <div className="flex gap-4">
                                        <MiniAvatar />
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-start justify-between gap-3">
                                                <div>
                                                    <Status
                                                        tone={
                                                            i === 0
                                                                ? 'blue'
                                                                : i === 1
                                                                  ? 'violet'
                                                                  : 'green'
                                                        }
                                                    >
                                                        {
                                                            [
                                                                'Teaching practice',
                                                                'Language exchange',
                                                                'Project showcase',
                                                            ][i]
                                                        }
                                                    </Status>
                                                    <h3 className="mt-3 text-lg font-bold text-[#10233f]">
                                                        {x}
                                                    </h3>
                                                </div>
                                                <button className="grid size-10 place-items-center rounded-xl hover:bg-[#edf3fa]">
                                                    <MoreHorizontal />
                                                </button>
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-[#637286]">
                                                We would love to compare
                                                approaches with other Bright
                                                Mind schools and hear what
                                                learners found most useful.
                                            </p>
                                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                                <AvatarGroup />
                                                <div className="flex gap-4 text-xs font-bold text-[#718095]">
                                                    <span className="flex gap-1">
                                                        <MessageCircle className="size-4" />
                                                        {18 + i * 7}
                                                    </span>
                                                    <span className="flex gap-1">
                                                        <Heart className="size-4" />
                                                        {12 + i}
                                                    </span>
                                                    <span>
                                                        Updated {i + 1}h ago
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                        <div className="space-y-5">
                            <Specimen title="Popular spaces">
                                {[
                                    'Educator exchange',
                                    'Student projects',
                                    'Digital citizenship',
                                    'Partner school lounge',
                                ].map((x, i) => (
                                    <div
                                        key={x}
                                        className="flex items-center justify-between border-b border-[#edf1f5] py-3 last:border-0"
                                    >
                                        <p className="text-sm font-bold">{x}</p>
                                        <span className="text-xs text-[#718095]">
                                            {24 + i * 13}
                                        </span>
                                    </div>
                                ))}
                            </Specimen>
                            <Specimen title="Empty state">
                                <div className="py-4 text-center">
                                    <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#edf3fa] text-[#155eef]">
                                        <MessageCircle className="size-7" />
                                    </span>
                                    <h4 className="mt-4 font-bold text-[#10233f]">
                                        No saved discussions yet
                                    </h4>
                                    <p className="mt-2 text-sm leading-6 text-[#718095]">
                                        Save useful conversations to find them
                                        here.
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-4 rounded-xl"
                                    >
                                        Explore community
                                    </Button>
                                </div>
                            </Specimen>
                        </div>
                    </div>
                </SectionShell>

                <SectionShell
                    id="teacher"
                    eyebrow="07 · Teacher workspace"
                    title="Guidance at class and learner level"
                    description="Teacher tools prioritize next actions, progress signals and meaningful support over dense reporting."
                >
                    <div className="grid gap-5 xl:grid-cols-4">
                        <Metric
                            icon={Users}
                            label="Active students"
                            value="124"
                            change="+8 this month"
                        />
                        <Metric
                            icon={BookOpen}
                            label="Live courses"
                            value="6"
                            change="2 drafts"
                            tone="teal"
                        />
                        <Metric
                            icon={Target}
                            label="Due this week"
                            value="14"
                            change="4 reviewed"
                            tone="gold"
                        />
                        <Metric
                            icon={ChartNoAxesCombined}
                            label="Completion"
                            value="78%"
                            change="+6%"
                            tone="coral"
                        />
                    </div>
                    <div className="mt-5 grid gap-5 xl:grid-cols-[1.3fr_.7fr]">
                        <Specimen title="Class progress">
                            <div className="flex flex-wrap justify-between gap-3">
                                <div>
                                    <h4 className="text-xl font-bold text-[#10233f]">
                                        European Changemakers · Group A
                                    </h4>
                                    <p className="mt-1 text-sm text-[#718095]">
                                        28 students · Current module: Inquiry
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    className="rounded-xl"
                                >
                                    Open class <ArrowRight />
                                </Button>
                            </div>
                            <div className="mt-6 space-y-3">
                                {[
                                    ['Sofia Nowak', 86],
                                    ['Mateo García', 72],
                                    ['Eleni Papadopoulou', 48],
                                    ['Luca Romano', 31],
                                ].map(([name, val]) => (
                                    <div
                                        key={String(name)}
                                        className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border border-[#e4eaf0] p-3"
                                    >
                                        <MiniAvatar size="sm" />
                                        <div>
                                            <div className="mb-2 flex justify-between text-sm font-semibold">
                                                <span>{name}</span>
                                                <span>{val}%</span>
                                            </div>
                                            <ProgressBar
                                                value={Number(val)}
                                                tone={
                                                    Number(val) < 40
                                                        ? 'gold'
                                                        : 'blue'
                                                }
                                            />
                                        </div>
                                        <button className="grid size-9 place-items-center rounded-lg hover:bg-[#edf3fa]">
                                            <MoreHorizontal className="size-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Specimen>
                        <div className="space-y-5">
                            <Specimen title="Upcoming activities">
                                <div className="space-y-3">
                                    <Assignment
                                        title="Review project proposals"
                                        due="Today · 14 submissions"
                                        state="active"
                                    />
                                    <Assignment
                                        title="Publish reflection prompt"
                                        due="Tomorrow · Group B"
                                        state="active"
                                    />
                                </div>
                            </Specimen>
                            <Specimen title="Class health">
                                <div className="h-52">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient
                                                    id="teacher"
                                                    x1="0"
                                                    y1="0"
                                                    x2="0"
                                                    y2="1"
                                                >
                                                    <stop
                                                        offset="0"
                                                        stopColor="#149b8e"
                                                        stopOpacity=".35"
                                                    />
                                                    <stop
                                                        offset="1"
                                                        stopColor="#149b8e"
                                                        stopOpacity="0"
                                                    />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid
                                                stroke="#e7edf3"
                                                vertical={false}
                                            />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#149b8e"
                                                strokeWidth={3}
                                                fill="url(#teacher)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Specimen>
                        </div>
                    </div>
                </SectionShell>

                <SectionShell
                    id="admin"
                    eyebrow="08 · Admin & partner CMS"
                    title="Serious content operations, clearly expressed"
                    description="Partner workspaces support multilingual review and publishing with compact tables, explicit states and traceable actions."
                >
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        <Metric
                            icon={FolderOpen}
                            label="Content items"
                            value="248"
                            change="12 drafts"
                        />
                        <Metric
                            icon={GraduationCap}
                            label="Published courses"
                            value="34"
                            change="6 languages"
                            tone="teal"
                        />
                        <Metric
                            icon={ShieldCheck}
                            label="In review"
                            value="18"
                            change="4 overdue"
                            tone="gold"
                        />
                        <Metric
                            icon={Users}
                            label="Partners"
                            value="9"
                            change="6 countries"
                            tone="coral"
                        />
                    </div>
                    <Specimen title="Content library" className="mt-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-1 gap-2">
                                <div className="relative max-w-sm flex-1">
                                    <Search className="absolute top-3 left-3 size-5 text-[#718095]" />
                                    <Input
                                        className="h-11 rounded-xl pl-10"
                                        placeholder="Search content"
                                    />
                                </div>
                                <Button
                                    variant="outline"
                                    className="rounded-xl"
                                >
                                    <Settings2 />
                                    Filters
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="rounded-xl"
                                        >
                                            Bulk actions <ChevronDown />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            Assign reviewer
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Change status
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button className="rounded-xl bg-[#155eef]">
                                    <Plus />
                                    New content
                                </Button>
                            </div>
                        </div>
                        <div className="mt-5 overflow-x-auto">
                            <table className="w-full min-w-[850px] border-collapse text-left text-sm">
                                <thead>
                                    <tr className="border-y border-[#dce4ec] bg-[#f7f9fb] text-xs tracking-[.08em] text-[#718095] uppercase">
                                        <th className="p-3">
                                            <Checkbox />
                                        </th>
                                        <th className="p-3">Content</th>
                                        <th className="p-3">Translation</th>
                                        <th className="p-3">Publication</th>
                                        <th className="p-3">Review</th>
                                        <th className="p-3">Updated</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        [
                                            'Designing solutions together',
                                            '6 / 6',
                                            'Published',
                                            'Approved',
                                        ],
                                        [
                                            'Media literacy basics',
                                            '4 / 6',
                                            'Draft',
                                            'Changes requested',
                                        ],
                                        [
                                            'Community challenge toolkit',
                                            '5 / 6',
                                            'Scheduled',
                                            'In review',
                                        ],
                                    ].map((r, i) => (
                                        <tr
                                            key={r[0]}
                                            className="border-b border-[#e5ebf1] hover:bg-[#f8fafc]"
                                        >
                                            <td className="p-3">
                                                <Checkbox
                                                    defaultChecked={i === 0}
                                                />
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-3">
                                                    <MediaPlaceholder className="size-12 rounded-lg" />
                                                    <div>
                                                        <p className="font-bold text-[#10233f]">
                                                            {r[0]}
                                                        </p>
                                                        <p className="mt-1 text-xs text-[#718095]">
                                                            Course · English
                                                            source
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <Status
                                                    tone={
                                                        i === 0
                                                            ? 'green'
                                                            : 'amber'
                                                    }
                                                >
                                                    {r[1]}
                                                </Status>
                                            </td>
                                            <td className="p-3">
                                                <Status
                                                    tone={
                                                        i === 0
                                                            ? 'green'
                                                            : i === 1
                                                              ? 'gray'
                                                              : 'blue'
                                                    }
                                                >
                                                    {r[2]}
                                                </Status>
                                            </td>
                                            <td className="p-3">
                                                <Status
                                                    tone={
                                                        i === 0
                                                            ? 'green'
                                                            : i === 1
                                                              ? 'red'
                                                              : 'violet'
                                                    }
                                                >
                                                    {r[3]}
                                                </Status>
                                            </td>
                                            <td className="p-3 text-[#718095]">
                                                {i + 1} day ago
                                            </td>
                                            <td>
                                                <button className="grid size-9 place-items-center rounded-lg hover:bg-[#e8eef5]">
                                                    <MoreHorizontal className="size-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Specimen>
                    <div className="mt-5 grid gap-5 lg:grid-cols-2">
                        <Specimen title="Content editor">
                            <div className="grid gap-4">
                                <div>
                                    <Label>Content title</Label>
                                    <Input
                                        className="mt-2 h-11 rounded-xl"
                                        defaultValue="Designing solutions together"
                                    />
                                </div>
                                <div>
                                    <Label>Summary</Label>
                                    <textarea
                                        className="mt-2 min-h-24 w-full rounded-xl border border-[#cbd5df] p-3 text-sm"
                                        defaultValue="A guided learning journey from observation to collaborative action."
                                    />
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label>Content type</Label>
                                        <Select defaultValue="course">
                                            <SelectTrigger className="mt-2 w-full rounded-xl">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="course">
                                                    Course
                                                </SelectItem>
                                                <SelectItem value="resource">
                                                    Resource
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Owner</Label>
                                        <Select defaultValue="poland">
                                            <SelectTrigger className="mt-2 w-full rounded-xl">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="poland">
                                                    Poland partner
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 border-t pt-4">
                                    <Button
                                        variant="outline"
                                        className="rounded-xl"
                                    >
                                        Save draft
                                    </Button>
                                    <Button className="rounded-xl bg-[#155eef]">
                                        Send to review
                                    </Button>
                                </div>
                            </div>
                        </Specimen>
                        <Specimen title="Overlays & media">
                            <div className="grid grid-cols-3 gap-3">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <button
                                        key={i}
                                        className="relative aspect-square rounded-xl border-2 border-transparent focus:border-[#155eef]"
                                    >
                                        <MediaPlaceholder
                                            className="absolute inset-0"
                                            label="Media library placeholder"
                                        />
                                        {i === 2 && (
                                            <Check className="absolute top-2 right-2 size-6 rounded-full bg-[#155eef] p-1 text-white" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-5 flex flex-wrap gap-3">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="rounded-xl"
                                        >
                                            <Pencil />
                                            Open editor drawer
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent className="w-full sm:max-w-lg">
                                        <SheetHeader>
                                            <SheetTitle>
                                                Translation details
                                            </SheetTitle>
                                            <SheetDescription>
                                                Review language coverage and
                                                editorial status.
                                            </SheetDescription>
                                        </SheetHeader>
                                        <div className="space-y-4 p-4">
                                            {[
                                                'Polski',
                                                'Español',
                                                'Български',
                                                'Ελληνικά',
                                                'English',
                                                'Italiano',
                                            ].map((x, i) => (
                                                <div
                                                    key={x}
                                                    className="flex items-center justify-between rounded-xl border p-4"
                                                >
                                                    <span className="font-semibold">
                                                        {x}
                                                    </span>
                                                    <Status
                                                        tone={
                                                            i < 4
                                                                ? 'green'
                                                                : 'amber'
                                                        }
                                                    >
                                                        {i < 4
                                                            ? 'Ready'
                                                            : 'Review'}
                                                    </Status>
                                                </div>
                                            ))}
                                        </div>
                                    </SheetContent>
                                </Sheet>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="rounded-xl bg-[#10233f]">
                                            Publish dialog
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Publish this course?
                                            </DialogTitle>
                                            <DialogDescription>
                                                The approved translations will
                                                become visible to learners
                                                immediately.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button variant="outline">
                                                Keep editing
                                            </Button>
                                            <Button className="bg-[#155eef]">
                                                Publish course
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </Specimen>
                    </div>
                </SectionShell>

                <SectionShell
                    id="pathways"
                    eyebrow="09 · Adaptive learning pathways"
                    title="A learning compass that responds to progress"
                    description="Graph-based journeys combine core learning, choices, checkpoints, support and accelerated routes while keeping every adaptation understandable to the learner."
                >
                    <PathwaysShowcase />
                </SectionShell>

                <SectionShell
                    id="gamification"
                    eyebrow="10 · Data & gamification"
                    title="Progress that motivates without distracting"
                    description="Rewards reinforce meaningful learning habits. Analytics stay simple, legible and connected to action."
                >
                    <GamificationShowcase />
                    <div className="hidden" aria-hidden="true">
                        <div className="grid gap-5 lg:grid-cols-3">
                            <Specimen title="Progress & levels">
                                <div className="flex flex-wrap items-center gap-7">
                                    <ProgressRing value={78} size={108} />
                                    <div>
                                        <Status tone="violet">Level 8</Status>
                                        <h4 className="mt-3 text-2xl font-bold text-[#10233f]">
                                            Curious Explorer
                                        </h4>
                                        <p className="mt-2 text-sm text-[#718095]">
                                            520 XP to the next level
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 space-y-4">
                                    {[
                                        ['Weekly learning', 80],
                                        ['Pathway', 54],
                                        ['Portfolio', 92],
                                    ].map(([x, v]) => (
                                        <div key={String(x)}>
                                            <div className="mb-2 flex justify-between text-sm font-semibold">
                                                <span>{x}</span>
                                                <span>{v}%</span>
                                            </div>
                                            <ProgressBar
                                                value={Number(v)}
                                                tone={
                                                    Number(v) > 85
                                                        ? 'teal'
                                                        : 'blue'
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Specimen>
                            <Specimen title="Streak & milestones">
                                <div className="flex items-center gap-4 rounded-xl bg-[#fff0ea] p-4">
                                    <span className="grid size-14 place-items-center rounded-full bg-[#ed766d] text-white">
                                        <Flame className="size-7" />
                                    </span>
                                    <div>
                                        <strong className="text-2xl text-[#10233f]">
                                            9 day streak
                                        </strong>
                                        <p className="mt-1 text-sm text-[#718095]">
                                            One lesson keeps it going
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-between">
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(
                                        (x, i) => (
                                            <div
                                                key={i}
                                                className="text-center"
                                            >
                                                <span
                                                    className={cn(
                                                        'grid size-9 place-items-center rounded-full text-xs font-bold',
                                                        i < 5
                                                            ? 'bg-[#155eef] text-white'
                                                            : 'bg-[#e6ebf1]',
                                                    )}
                                                >
                                                    {i < 5 ? (
                                                        <Check className="size-4" />
                                                    ) : (
                                                        ''
                                                    )}
                                                </span>
                                                <p className="mt-2 text-xs font-bold text-[#718095]">
                                                    {x}
                                                </p>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </Specimen>
                            <Specimen title="Badge collection">
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        [Award, 'Inquiry', '#e8f1ff'],
                                        [Trophy, 'Teamwork', '#fff3d5'],
                                        [Zap, 'Momentum', '#e1f5ee'],
                                        [Star, 'Creator', '#efeaff'],
                                        [ShieldCheck, 'Trusted', '#ffebe8'],
                                        [LockKeyhole, 'Locked', '#edf1f5'],
                                    ].map(([I, x, bg]) => {
                                        const Icon = I as typeof Award;

                                        return (
                                            <div
                                                key={String(x)}
                                                className="text-center"
                                            >
                                                <span
                                                    className="mx-auto grid size-14 place-items-center rounded-full"
                                                    style={{
                                                        background: String(bg),
                                                    }}
                                                >
                                                    <Icon className="size-6" />
                                                </span>
                                                <p className="mt-2 text-xs font-bold">
                                                    {String(x)}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Specimen>
                        </div>
                        <Specimen title="Learning analytics" className="mt-5">
                            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h4 className="text-xl font-bold text-[#10233f]">
                                        Active learning time
                                    </h4>
                                    <p className="mt-1 text-sm text-[#718095]">
                                        Minutes completed across learning
                                        activities
                                    </p>
                                </div>
                                <div className="inline-flex rounded-xl bg-[#edf1f5] p-1">
                                    {['Week', 'Month'].map((x) => (
                                        <button
                                            key={x}
                                            onClick={() => setChart(x)}
                                            className={cn(
                                                'rounded-lg px-4 py-2 text-sm font-bold',
                                                chart === x
                                                    ? 'bg-white shadow-sm'
                                                    : 'text-[#718095]',
                                            )}
                                        >
                                            {x}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid
                                            vertical={false}
                                            stroke="#e2e8ef"
                                        />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <ChartTooltip
                                            cursor={{ fill: '#eef3f8' }}
                                            contentStyle={{
                                                borderRadius: 12,
                                                border: '1px solid #dce4ec',
                                            }}
                                        />
                                        <Bar
                                            dataKey="value"
                                            fill="#155eef"
                                            radius={[8, 8, 0, 0]}
                                            maxBarSize={48}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Specimen>
                    </div>
                </SectionShell>

                <SectionShell
                    id="feedback"
                    eyebrow="11 · Feedback & system states"
                    title="Calm feedback in every situation"
                    description="System communication remains specific, recoverable and visually consistent from loading through success and error."
                >
                    <div className="grid gap-5 lg:grid-cols-2">
                        <Specimen title="Alerts">
                            <div className="space-y-3">
                                <Alert className="border-[#bcd6ff] bg-[#edf4ff]">
                                    <CircleAlert className="text-[#155eef]" />
                                    <AlertTitle>
                                        Course update available
                                    </AlertTitle>
                                    <AlertDescription>
                                        Your saved progress is safe. Refresh
                                        when you are ready.
                                    </AlertDescription>
                                </Alert>
                                <Alert className="border-[#bce5d9] bg-[#edf9f5]">
                                    <CircleCheck className="text-[#149b8e]" />
                                    <AlertTitle>
                                        Translation approved
                                    </AlertTitle>
                                    <AlertDescription>
                                        The Polish version can now be published.
                                    </AlertDescription>
                                </Alert>
                                <Alert className="border-[#f0dca9] bg-[#fff9e9]">
                                    <CircleAlert className="text-[#9b6b10]" />
                                    <AlertTitle>
                                        Review deadline approaching
                                    </AlertTitle>
                                    <AlertDescription>
                                        Two items need attention before Monday.
                                    </AlertDescription>
                                </Alert>
                            </div>
                        </Specimen>
                        <Specimen title="Toasts & confirmation">
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    onClick={() =>
                                        toast.success('Progress saved')
                                    }
                                    className="rounded-xl bg-[#155eef]"
                                >
                                    Show success toast
                                </Button>
                                <Button
                                    onClick={() =>
                                        toast.error(
                                            'Upload could not be completed',
                                        )
                                    }
                                    variant="outline"
                                    className="rounded-xl"
                                >
                                    Show error toast
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="destructive"
                                            className="rounded-xl"
                                        >
                                            Remove assignment
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Remove this assignment?
                                            </DialogTitle>
                                            <DialogDescription>
                                                Students will no longer see it
                                                in their learning plan. This can
                                                be undone from activity history.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button variant="outline">
                                                Cancel
                                            </Button>
                                            <Button variant="destructive">
                                                Remove assignment
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="mt-8 rounded-xl border border-[#dce4ec] p-5">
                                <div className="flex items-start gap-4">
                                    <span className="grid size-11 place-items-center rounded-full bg-[#e1f5ee] text-[#157d68]">
                                        <Check />
                                    </span>
                                    <div>
                                        <h4 className="font-bold text-[#10233f]">
                                            Lesson complete
                                        </h4>
                                        <p className="mt-1 text-sm text-[#718095]">
                                            Your reflection has been added to
                                            your portfolio.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Specimen>
                        <Specimen title="Loading & disabled">
                            <div className="flex gap-4">
                                <Skeleton className="size-14 rounded-xl" />
                                <div className="flex-1 space-y-3">
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-3 w-full" />
                                    <Skeleton className="h-3 w-4/5" />
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-3 gap-4">
                                <Skeleton className="aspect-video rounded-xl" />
                                <Skeleton className="aspect-video rounded-xl" />
                                <Skeleton className="aspect-video rounded-xl" />
                            </div>
                            <Button disabled className="mt-6 w-full rounded-xl">
                                Action unavailable
                            </Button>
                        </Specimen>
                        <Specimen title="Empty & offline">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="text-center">
                                    <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#edf3fa] text-[#155eef]">
                                        <FolderOpen className="size-7" />
                                    </span>
                                    <h4 className="mt-4 font-bold text-[#10233f]">
                                        Nothing here yet
                                    </h4>
                                    <p className="mt-2 text-sm text-[#718095]">
                                        Create the first resource for this
                                        collection.
                                    </p>
                                    <Button
                                        size="sm"
                                        className="mt-4 rounded-lg bg-[#155eef]"
                                    >
                                        <Plus />
                                        Add resource
                                    </Button>
                                </div>
                                <div className="text-center">
                                    <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#fff3d5] text-[#9b6b10]">
                                        <CircleAlert className="size-7" />
                                    </span>
                                    <h4 className="mt-4 font-bold text-[#10233f]">
                                        You are offline
                                    </h4>
                                    <p className="mt-2 text-sm text-[#718095]">
                                        Downloaded lessons remain available.
                                    </p>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="mt-4 rounded-lg"
                                    >
                                        Try again
                                    </Button>
                                </div>
                            </div>
                        </Specimen>
                    </div>
                </SectionShell>
            </main>
            <footer className="bg-[#10233f] px-5 py-10 text-white">
                <div className="mx-auto flex max-w-[1450px] flex-wrap items-center justify-between gap-5">
                    <Brand inverse />
                    <p className="max-w-lg text-sm leading-6 text-white/60">
                        Bright Mind reusable application language for learners,
                        educators, schools and consortium partners.
                    </p>
                    <a
                        href="#top"
                        className="rounded-xl border border-white/20 px-4 py-3 text-sm font-bold"
                    >
                        Back to top
                    </a>
                </div>
            </footer>
        </div>
    );
}

function Curriculum({
    expanded,
    setExpanded,
}: {
    expanded: number;
    setExpanded: (n: number) => void;
}) {
    return (
        <div className="space-y-3">
            {curriculum.map((x, i) => (
                <Collapsible
                    key={x}
                    open={expanded === i}
                    onOpenChange={() => setExpanded(expanded === i ? -1 : i)}
                >
                    <div className="rounded-xl border border-[#dce4ec]">
                        <CollapsibleTrigger className="flex min-h-14 w-full items-center justify-between gap-3 p-4 text-left font-bold text-[#10233f]">
                            <span>
                                {i + 1}. {x}
                            </span>
                            <ChevronDown
                                className={cn(
                                    'size-5 transition',
                                    expanded === i && 'rotate-180',
                                )}
                            />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="border-t px-4 py-4 text-sm leading-6 text-[#637286]">
                            Video · Guided activity · Reflection prompt{' '}
                            <div className="mt-3">
                                <Status
                                    tone={
                                        i === 0
                                            ? 'green'
                                            : i === 1
                                              ? 'blue'
                                              : 'gray'
                                    }
                                >
                                    {i === 0
                                        ? 'Completed'
                                        : i === 1
                                          ? 'In progress'
                                          : 'Locked'}
                                </Status>
                            </div>
                        </CollapsibleContent>
                    </div>
                </Collapsible>
            ))}
        </div>
    );
}
function ResourceList() {
    return (
        <div className="space-y-3">
            {[
                'Activity worksheet.pdf',
                'Reflection template.docx',
                'Facilitator guide.pdf',
            ].map((x, i) => (
                <div
                    key={x}
                    className="flex items-center gap-4 rounded-xl border p-4"
                >
                    <span className="grid size-11 place-items-center rounded-xl bg-[#e8f1ff] text-[#155eef]">
                        <Download className="size-5" />
                    </span>
                    <div className="flex-1">
                        <p className="font-bold text-[#10233f]">{x}</p>
                        <p className="mt-1 text-xs text-[#718095]">
                            {i + 1}.2 MB · Downloadable resource
                        </p>
                    </div>
                    <Button variant="ghost" size="icon">
                        <Download />
                    </Button>
                </div>
            ))}
        </div>
    );
}
function Reviews() {
    return (
        <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
            <div>
                <strong className="text-5xl text-[#10233f]">4.8</strong>
                <div className="mt-2 flex text-[#e6aa25]">
                    {[1, 2, 3, 4, 5].map((x) => (
                        <Star key={x} className="size-4 fill-current" />
                    ))}
                </div>
                <p className="mt-2 text-sm text-[#718095]">
                    128 learner reviews
                </p>
            </div>
            <div className="space-y-4">
                {[
                    'Clear, practical and easy to use with my class.',
                    'I liked that each activity connected to a real challenge.',
                ].map((x, i) => (
                    <div key={x} className="border-b pb-4">
                        <div className="flex items-center gap-3">
                            <MiniAvatar size="sm" />
                            <div>
                                <p className="text-sm font-bold">
                                    {i ? 'Marco R.' : 'Anna K.'}
                                </p>
                                <p className="text-xs text-[#718095]">
                                    Verified learner
                                </p>
                            </div>
                        </div>
                        <p className="mt-3 text-sm leading-6">{x}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
function Faq({ faq, setFaq }: { faq: number; setFaq: (n: number) => void }) {
    return (
        <div className="space-y-3">
            {[
                'Can I complete this course with my class?',
                'Is the certificate recognized?',
                'Which languages are available?',
            ].map((x, i) => (
                <button
                    key={x}
                    onClick={() => setFaq(faq === i ? -1 : i)}
                    className="w-full rounded-xl border border-[#dce4ec] p-4 text-left"
                >
                    <span className="flex justify-between gap-4 font-bold text-[#10233f]">
                        {x}
                        <ChevronDown
                            className={cn(
                                'size-5 transition',
                                faq === i && 'rotate-180',
                            )}
                        />
                    </span>
                    {faq === i && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-3 text-sm leading-6 text-[#637286]"
                        >
                            Yes. The experience is designed to work for
                            individual learners and facilitated groups, with
                            downloadable support materials.
                        </motion.p>
                    )}
                </button>
            ))}
        </div>
    );
}
function InstructorMini() {
    return (
        <div className="flex items-center gap-3">
            <MiniAvatar size="lg" />
            <div>
                <p className="text-xs font-bold tracking-[.1em] text-[#718095] uppercase">
                    Course facilitator
                </p>
                <p className="mt-1 font-bold text-[#10233f]">
                    Dr. Elena Markou
                </p>
                <p className="mt-1 text-xs text-[#718095]">
                    Active learning specialist
                </p>
            </div>
        </div>
    );
}
