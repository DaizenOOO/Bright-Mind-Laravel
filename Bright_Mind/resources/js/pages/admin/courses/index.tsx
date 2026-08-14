import { Head, Link } from '@inertiajs/react';
import { BookOpen, CheckCircle2, Languages, Plus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    WorkspaceCard,
    WorkspaceHeader,
    WorkspaceMetric,
} from '@/components/workspace/workspace-ui';
import { edit } from '@/routes/admin/courses';

type CourseRow = {
    id: number;
    slug: string;
    title: string;
    status: string;
    readiness: number;
    updatedAt: string;
    translations: number;
};
export default function CourseIndex({ courses }: { courses: CourseRow[] }) {
    return (
        <div className="space-y-7 p-4 sm:p-7">
            <Head title="Courses · Partner CMS" />
            <WorkspaceHeader
                eyebrow="Partner CMS"
                title="Courses"
                description="Create, translate, review and publish reusable Bright Mind learning experiences."
                actions={
                    <Button className="rounded-xl bg-[#155eef]">
                        <Plus />
                        New course
                    </Button>
                }
            />
            <div className="grid gap-4 sm:grid-cols-3">
                <WorkspaceMetric
                    icon={BookOpen}
                    label="Courses"
                    value={courses.length}
                    note="Across all publication states"
                />
                <WorkspaceMetric
                    icon={Languages}
                    label="Approved translations"
                    value={courses.reduce((sum, c) => sum + c.translations, 0)}
                    note="Six launch languages"
                    tone="teal"
                />
                <WorkspaceMetric
                    icon={CheckCircle2}
                    label="Ready to publish"
                    value={courses.filter((c) => c.readiness === 100).length}
                    note="Readiness checklist complete"
                    tone="gold"
                />
            </div>
            <WorkspaceCard title="Content library">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] text-left text-sm">
                        <thead>
                            <tr className="border-y bg-[#f7f9fb] text-xs tracking-[.08em] text-[#718095] uppercase">
                                <th className="p-3">Course</th>
                                <th>Status</th>
                                <th>Languages</th>
                                <th>Readiness</th>
                                <th>Updated</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr
                                    key={course.id}
                                    className="border-b border-[#e5ebf1]"
                                >
                                    <td className="p-3 font-bold text-[#10233f]">
                                        {course.title}
                                    </td>
                                    <td>
                                        <Badge
                                            variant="secondary"
                                            className="capitalize"
                                        >
                                            {course.status}
                                        </Badge>
                                    </td>
                                    <td>{course.translations} / 6</td>
                                    <td>
                                        <strong className="text-[#155eef]">
                                            {course.readiness}%
                                        </strong>
                                    </td>
                                    <td className="text-[#718095]">
                                        {course.updatedAt}
                                    </td>
                                    <td>
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="rounded-xl"
                                        >
                                            <Link href={edit(course.id)}>
                                                Edit course
                                            </Link>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </WorkspaceCard>
        </div>
    );
}
