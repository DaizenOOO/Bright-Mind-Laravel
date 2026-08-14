import { Head, Link } from '@inertiajs/react';
import { Award, BookOpen, Flame, Route, Target, Zap } from 'lucide-react';

import { ProgressBar } from '@/components/design-system/primitives';
import { Button } from '@/components/ui/button';
import {
    GrayMedia,
    WorkspaceCard,
    WorkspaceHeader,
    WorkspaceMetric,
} from '@/components/workspace/workspace-ui';
import { show } from '@/routes/student/courses';

type Enrollment = {
    id: number;
    progress_percent: number;
    course: {
        slug: string;
        estimated_minutes: number;
        translations: {
            locale: string;
            title: string;
            short_description: string;
        }[];
    };
};
export default function StudentDashboard({
    enrollments,
    xp,
    pathway,
}: {
    enrollments: Enrollment[];
    xp: number;
    pathway: { title: string; description: string } | null;
}) {
    const current = enrollments[0];
    const title = current?.course.translations.find((t) => t.locale === 'en');

    return (
        <div className="space-y-7 p-4 sm:p-7">
            <Head title="Student Dashboard" />
            <WorkspaceHeader
                eyebrow="Student space"
                title="Good afternoon, Sofia"
                description="Your next useful learning step, progress and recognition in one calm view."
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <WorkspaceMetric
                    icon={Zap}
                    label="Total XP"
                    value={xp}
                    note="Meaningful learning only"
                />
                <WorkspaceMetric
                    icon={Flame}
                    label="Learning streak"
                    value="9 days"
                    note="Five active days this week"
                    tone="coral"
                />
                <WorkspaceMetric
                    icon={Target}
                    label="Weekly goal"
                    value="4 / 5"
                    note="One activity remaining"
                    tone="teal"
                />
                <WorkspaceMetric
                    icon={Award}
                    label="Achievements"
                    value="12"
                    note="Two close to unlocking"
                    tone="gold"
                />
            </div>
            <div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
                <div className="space-y-5">
                    <WorkspaceCard title="Continue learning">
                        {current ? (
                            <div className="grid overflow-hidden rounded-xl border border-[#dce4ec] sm:grid-cols-[220px_1fr]">
                                <GrayMedia className="min-h-48 rounded-none" />
                                <div className="p-5">
                                    <p className="text-xs font-bold tracking-[.12em] text-[#155eef] uppercase">
                                        Current course
                                    </p>
                                    <h2 className="mt-2 text-2xl font-bold text-[#10233f]">
                                        {title?.title}
                                    </h2>
                                    <p className="mt-2 text-sm leading-6 text-[#657487]">
                                        {title?.short_description}
                                    </p>
                                    <div className="mt-5">
                                        <ProgressBar
                                            value={current.progress_percent}
                                        />
                                    </div>
                                    <div className="mt-5 flex items-center justify-between">
                                        <span className="text-sm font-bold text-[#718095]">
                                            {current.progress_percent}% complete
                                        </span>
                                        <Button
                                            asChild
                                            className="rounded-xl bg-[#155eef]"
                                        >
                                            <Link
                                                href={show(current.course.slug)}
                                            >
                                                Continue learning
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>No active courses.</p>
                        )}
                    </WorkspaceCard>
                    <WorkspaceCard title="Today">
                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                [
                                    'Complete retrieval practice',
                                    '18 min · Current pathway',
                                ],
                                [
                                    'Community interview reflection',
                                    'Due Monday',
                                ],
                                ['Review saved flashcards', '10 cards'],
                                ['Partner school exchange', 'Tomorrow · 15:00'],
                            ].map(([a, b]) => (
                                <div
                                    key={a}
                                    className="rounded-xl border border-[#e2e8ef] p-4"
                                >
                                    <p className="font-bold text-[#10233f]">
                                        {a}
                                    </p>
                                    <p className="mt-2 text-xs text-[#718095]">
                                        {b}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </WorkspaceCard>
                </div>
                <div className="space-y-5">
                    <WorkspaceCard title="Adaptive pathway">
                        <span className="grid size-12 place-items-center rounded-xl bg-[#e8f1ff] text-[#155eef]">
                            <Route />
                        </span>
                        <h3 className="mt-4 text-xl font-bold text-[#10233f]">
                            {pathway?.title ?? 'Choose a pathway'}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-[#718095]">
                            {pathway?.description}
                        </p>
                        <div className="mt-4">
                            <ProgressBar value={42} />
                        </div>
                        <Button
                            asChild
                            variant="outline"
                            className="mt-5 w-full rounded-xl"
                        >
                            <Link href="/pathways">View learning map</Link>
                        </Button>
                    </WorkspaceCard>
                    <WorkspaceCard title="Next recognition">
                        <div className="flex items-center gap-4">
                            <span className="grid size-14 place-items-center rounded-[18px] bg-gradient-to-br from-[#dce4ec] to-[#8797a8] text-white">
                                <BookOpen />
                            </span>
                            <div>
                                <p className="font-bold text-[#10233f]">
                                    Memory Architect
                                </p>
                                <p className="mt-1 text-xs text-[#718095]">
                                    7 / 10 recall sessions
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <ProgressBar value={70} />
                        </div>
                    </WorkspaceCard>
                </div>
            </div>
        </div>
    );
}
