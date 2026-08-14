import { Head } from '@inertiajs/react';
import {
    BookOpenCheck,
    GraduationCap,
    School,
    TrendingUp,
    Users,
} from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';

import { Button } from '@/components/ui/button';
import {
    WorkspaceCard,
    WorkspaceHeader,
    WorkspaceMetric,
} from '@/components/workspace/workspace-ui';

export default function SchoolDashboard({
    metrics,
}: {
    metrics: {
        students: number;
        teachers: number;
        classes: number;
        completion: number;
    };
}) {
    const data = [
        { name: 'Sep', value: 42 },
        { name: 'Oct', value: 54 },
        { name: 'Nov', value: 61 },
        { name: 'Dec', value: 68 },
        { name: 'Jan', value: 76 },
    ];

    return (
        <div className="space-y-7 p-4 sm:p-7">
            <Head title="School Workspace" />
            <WorkspaceHeader
                eyebrow="School workspace"
                title="European Learning School"
                description="Privacy-conscious adoption, learning progress and teacher support across the school."
                actions={
                    <Button className="rounded-xl bg-[#155eef]">
                        Invite people
                    </Button>
                }
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <WorkspaceMetric
                    icon={GraduationCap}
                    label="Students"
                    value={metrics.students}
                    note="Active school memberships"
                />
                <WorkspaceMetric
                    icon={Users}
                    label="Teachers"
                    value={metrics.teachers}
                    note="Across all classes"
                    tone="teal"
                />
                <WorkspaceMetric
                    icon={School}
                    label="Classes"
                    value={metrics.classes}
                    note="Current academic year"
                    tone="gold"
                />
                <WorkspaceMetric
                    icon={BookOpenCheck}
                    label="Completion"
                    value={`${metrics.completion}%`}
                    note="Aggregate course progress"
                    tone="coral"
                />
            </div>
            <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
                <WorkspaceCard title="Learning activity">
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid
                                    vertical={false}
                                    stroke="#e2e8ef"
                                />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis axisLine={false} tickLine={false} />
                                <Bar
                                    dataKey="value"
                                    fill="#155eef"
                                    radius={[8, 8, 0, 0]}
                                    maxBarSize={48}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </WorkspaceCard>
                <WorkspaceCard title="School priorities">
                    <div className="space-y-4">
                        {[
                            ['Teacher development', '6 of 8 teachers active'],
                            [
                                'Adaptive pathways',
                                '1 recommended pathway running',
                            ],
                            ['Translation access', 'Six languages available'],
                            ['Credentials', '12 badges awarded'],
                        ].map(([title, note]) => (
                            <div
                                key={title}
                                className="rounded-xl border border-[#e1e8ef] p-4"
                            >
                                <p className="font-bold text-[#10233f]">
                                    {title}
                                </p>
                                <p className="mt-1 text-sm text-[#718095]">
                                    {note}
                                </p>
                            </div>
                        ))}
                    </div>
                </WorkspaceCard>
            </div>
            <WorkspaceCard title="Responsible analytics">
                <div className="flex items-start gap-4">
                    <span className="grid size-12 place-items-center rounded-xl bg-[#e1f5ee] text-[#148777]">
                        <TrendingUp />
                    </span>
                    <p className="max-w-3xl text-sm leading-6 text-[#657487]">
                        School reporting uses aggregate participation and
                        completion signals. Individual learner detail remains
                        restricted to authorized educators with a legitimate
                        support need.
                    </p>
                </div>
            </WorkspaceCard>
        </div>
    );
}
