import { Head } from '@inertiajs/react';
import {
    BookOpen,
    CalendarDays,
    ClipboardCheck,
    TrendingUp,
    Users,
} from 'lucide-react';

import { ProgressBar, Status } from '@/components/design-system/primitives';
import { Button } from '@/components/ui/button';
import {
    WorkspaceCard,
    WorkspaceHeader,
    WorkspaceMetric,
} from '@/components/workspace/workspace-ui';

type Progress = {
    id: number;
    progress_percent: number;
    status: string;
    user: { name: string };
    course: { translations: { locale: string; title: string }[] };
};
export default function TeacherDashboard({
    students,
    progress,
}: {
    students: { id: number; name: string; email: string }[];
    progress: Progress[];
}) {
    return (
        <div className="space-y-7 p-4 sm:p-7">
            <Head title="Teacher Workspace" />
            <WorkspaceHeader
                eyebrow="Teacher workspace"
                title="Good afternoon, Elena"
                description="Review what needs attention, understand class progress and guide the next useful learning step."
                actions={
                    <div className="flex gap-2">
                        <Button variant="outline" className="rounded-xl">
                            Create assignment
                        </Button>
                        <Button className="rounded-xl bg-[#155eef]">
                            Assign course
                        </Button>
                    </div>
                }
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <WorkspaceMetric
                    icon={Users}
                    label="Students"
                    value={students.length}
                    note="European Changemakers · Group A"
                />
                <WorkspaceMetric
                    icon={ClipboardCheck}
                    label="Needs review"
                    value="4"
                    note="Reflections and submissions"
                    tone="gold"
                />
                <WorkspaceMetric
                    icon={BookOpen}
                    label="Active courses"
                    value={progress.length}
                    note="Assigned to your classes"
                    tone="teal"
                />
                <WorkspaceMetric
                    icon={CalendarDays}
                    label="Upcoming"
                    value="3"
                    note="Activities this week"
                    tone="coral"
                />
            </div>
            <div className="grid gap-5 xl:grid-cols-[1.3fr_.7fr]">
                <WorkspaceCard title="Student progress">
                    <div className="space-y-3">
                        {progress.map((item) => (
                            <div
                                key={item.id}
                                className="grid gap-3 rounded-xl border border-[#e1e8ef] p-4 sm:grid-cols-[180px_1fr_auto] sm:items-center"
                            >
                                <div>
                                    <p className="font-bold text-[#10233f]">
                                        {item.user.name}
                                    </p>
                                    <p className="mt-1 text-xs text-[#718095]">
                                        {
                                            item.course.translations.find(
                                                (t) => t.locale === 'en',
                                            )?.title
                                        }
                                    </p>
                                </div>
                                <div>
                                    <div className="mb-2 flex justify-between text-xs font-bold">
                                        <span>Course progress</span>
                                        <span>{item.progress_percent}%</span>
                                    </div>
                                    <ProgressBar
                                        value={item.progress_percent}
                                    />
                                </div>
                                <Status
                                    tone={
                                        item.progress_percent < 40
                                            ? 'amber'
                                            : 'green'
                                    }
                                >
                                    {item.progress_percent < 40
                                        ? 'Check in'
                                        : 'On track'}
                                </Status>
                            </div>
                        ))}
                    </div>
                </WorkspaceCard>
                <div className="space-y-5">
                    <WorkspaceCard title="Needs attention">
                        <div className="space-y-4">
                            {[
                                'Review Sofia’s reflection',
                                'Publish Group B checkpoint',
                                'Respond to pathway request',
                            ].map((item, index) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3"
                                >
                                    <span className="grid size-9 place-items-center rounded-lg bg-[#fff3d5] text-[#a06d0c]">
                                        {index + 1}
                                    </span>
                                    <div>
                                        <p className="text-sm font-bold text-[#10233f]">
                                            {item}
                                        </p>
                                        <p className="mt-1 text-xs text-[#718095]">
                                            Due this week
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </WorkspaceCard>
                    <WorkspaceCard title="Class signal">
                        <div className="flex items-center gap-4">
                            <span className="grid size-12 place-items-center rounded-xl bg-[#e1f5ee] text-[#148777]">
                                <TrendingUp />
                            </span>
                            <div>
                                <strong className="text-2xl text-[#10233f]">
                                    78%
                                </strong>
                                <p className="text-xs text-[#718095]">
                                    Average completion
                                </p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-[#657487]">
                            Progress is aggregated for support planning, never
                            presented as a public student ranking.
                        </p>
                    </WorkspaceCard>
                </div>
            </div>
        </div>
    );
}
