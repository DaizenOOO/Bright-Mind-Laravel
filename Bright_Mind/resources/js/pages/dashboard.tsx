import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Building2,
    GraduationCap,
    PencilRuler,
    School,
    ShieldCheck,
} from 'lucide-react';

import {
    WorkspaceCard,
    WorkspaceHeader,
} from '@/components/workspace/workspace-ui';
import { dashboard } from '@/routes';
import adminCourses from '@/routes/admin/courses';
import school from '@/routes/school';
import student from '@/routes/student';
import teacher from '@/routes/teacher';

type Membership = {
    id: number;
    role: string;
    organization: { name: string; type: string };
};

const roleDetails: Record<
    string,
    { label: string; description: string; icon: typeof School; href: string }
> = {
    student: {
        label: 'Student application',
        description:
            'Continue learning, pathways, assignments and recognition.',
        icon: GraduationCap,
        href: student.dashboard().url,
    },
    teacher: {
        label: 'Teacher workspace',
        description: 'Guide classes, review work and support learner progress.',
        icon: PencilRuler,
        href: teacher.dashboard().url,
    },
    school_admin: {
        label: 'School workspace',
        description:
            'Manage people and understand responsible school-level progress.',
        icon: School,
        href: school.dashboard().url,
    },
    partner_editor: {
        label: 'Partner content CMS',
        description:
            'Create, translate, review and publish learning experiences.',
        icon: Building2,
        href: adminCourses.index().url,
    },
    translator: {
        label: 'Translation workspace',
        description: 'Complete and review multilingual educational content.',
        icon: Building2,
        href: adminCourses.index().url,
    },
    reviewer: {
        label: 'Review workspace',
        description: 'Check quality, readiness and learner-facing content.',
        icon: ShieldCheck,
        href: adminCourses.index().url,
    },
    approver: {
        label: 'Publishing workspace',
        description: 'Approve complete content and manage publication.',
        icon: ShieldCheck,
        href: adminCourses.index().url,
    },
    platform_admin: {
        label: 'Platform administration',
        description: 'Oversee partner content and platform operations.',
        icon: ShieldCheck,
        href: adminCourses.index().url,
    },
};

export default function Dashboard({
    memberships,
}: {
    memberships: Membership[];
}) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="space-y-7 p-4 sm:p-7">
                <WorkspaceHeader
                    eyebrow="Bright Mind"
                    title="Choose your workspace"
                    description="Your account can hold several scoped roles. Each workspace shows only the tools and information permitted for that organization."
                />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {memberships.map((membership) => {
                        const detail = roleDetails[membership.role];

                        if (!detail) {
return null;
}

                        const Icon = detail.icon;

                        return (
                            <Link
                                key={membership.id}
                                href={detail.href}
                                className="group"
                            >
                                <WorkspaceCard className="h-full transition group-hover:-translate-y-1 group-hover:border-[#155eef]">
                                    <span className="grid size-12 place-items-center rounded-xl bg-[#e8f1ff] text-[#155eef]">
                                        <Icon />
                                    </span>
                                    <p className="mt-5 text-xs font-bold tracking-[.1em] text-[#718095] uppercase">
                                        {membership.organization.name}
                                    </p>
                                    <h2 className="mt-2 text-xl font-bold text-[#10233f]">
                                        {detail.label}
                                    </h2>
                                    <p className="mt-2 text-sm leading-6 text-[#657487]">
                                        {detail.description}
                                    </p>
                                    <span className="mt-5 flex items-center gap-2 text-sm font-bold text-[#155eef]">
                                        Open workspace{' '}
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </WorkspaceCard>
                            </Link>
                        );
                    })}
                </div>
                {memberships.length === 0 && (
                    <WorkspaceCard>
                        <p className="font-bold text-[#10233f]">
                            No workspace membership yet
                        </p>
                        <p className="mt-2 text-sm text-[#657487]">
                            Ask your school or Bright Mind partner administrator
                            for an invitation.
                        </p>
                    </WorkspaceCard>
                )}
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
