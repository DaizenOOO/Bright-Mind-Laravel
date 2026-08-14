import {
    Award,
    BookOpen,
    Brain,
    CalendarDays,
    CircleHelp,
    ClipboardCheck,
    FileText,
    Focus,
    GraduationCap,
    Lightbulb,
    MapPinned,
    MessageSquare,
    School,
    Sparkles,
    Trophy,
    Users,
    Video,
} from 'lucide-react';
import type {
    EventData,
    EventPosterData,
    MenuEntry,
    NavigationItem,
    ProductCardData,
} from './navigation.types';
import { show as publicShow } from '@/routes/public';

export const assets = {
    logo: '/placeholders/bright-mind-logo.png',
    productOnePreview: '/placeholders/product-one.png',
    productTwoPreview: '/placeholders/product-two.png',
    productThreePreview: '/placeholders/product-three.png',
    eventOnePoster: '/placeholders/event-one.jpg',
    eventTwoPoster: '/placeholders/event-two.jpg',
    eventThreePoster: '/placeholders/event-three.jpg',
};

export const navigationItems: NavigationItem[] = [
    { id: 'platform', label: 'Framework', type: 'panel' },
    { id: 'products', label: 'Platform', type: 'panel' },
    { id: 'resources', label: 'Resources', type: 'panel' },
    { id: 'events', label: 'Network', type: 'panel' },
];

export const platformPrimary: MenuEntry[] = [
    {
        id: 'overview',
        title: 'Overview',
        description: 'Explore the complete Bright Mind framework',
        href: publicShow.url('framework-overview'),
        icon: Sparkles,
    },
    {
        id: 'updates',
        title: 'Updates',
        description: 'Follow the latest framework developments',
        href: publicShow.url('framework-updates'),
        icon: FileText,
    },
    {
        id: 'user-guide',
        title: 'User Guide',
        description: 'Learn how to use Bright Mind',
        href: publicShow.url('user-guide'),
        icon: BookOpen,
    },
];

export const platformPackages: MenuEntry[] = [
    {
        id: 'student-corner',
        title: 'Student Corner',
        description: 'Learning activities, resources and progress',
        href: publicShow.url('student-corner'),
        icon: BookOpen,
    },
    {
        id: 'teacher-toolkit',
        title: 'Teacher Toolkit',
        description: 'Resources for active-learning delivery',
        href: publicShow.url('teacher-toolkit'),
        icon: Users,
    },
    {
        id: 'school-workspace',
        title: 'School Workspace',
        description: 'Manage groups, programmes and collaboration',
        href: publicShow.url('school-workspace'),
        icon: School,
    },
];

export const documentationLinks = [
    {
        label: 'Multilingual Interactive Courses',
        href: publicShow.url('multilingual-interactive-courses'),
        icon: BookOpen,
    },
    {
        label: 'Gamification of Active Learning',
        href: publicShow.url('gamification-active-learning'),
        icon: Trophy,
    },
    {
        label: 'Digital Badges and Europass Integration',
        href: publicShow.url('digital-badges-europass'),
        icon: GraduationCap,
    },
    {
        label: 'Community Based Content',
        href: publicShow.url('community-content'),
        icon: Users,
    },
    {
        label: 'Progressive Learning Pathways',
        href: publicShow.url('progressive-pathways'),
        icon: Sparkles,
    },
];

export const productCards: ProductCardData[] = [
    {
        id: 'student',
        name: 'Student learning',
        headline: 'Courses, quizzes and progress in one clear dashboard',
        description:
            'Text and video courses in partner languages with active-learning activities and visible progress.',
        ctaLabel: 'Explore student learning',
        href: publicShow.url('student-learning'),
        image: assets.productOnePreview,
        imageFit: 'contain',
        backgroundClass: 'bg-[#17344d] text-white',
    },
    {
        id: 'teacher',
        name: 'Teacher workspace',
        headline: 'Create content and guide every learning group',
        description:
            'Manage students, assign courses, monitor progress and coordinate schools and partner groups.',
        ctaLabel: 'Explore teacher tools',
        href: publicShow.url('teacher-workspace'),
        image: assets.productTwoPreview,
        imageFit: 'contain',
        backgroundClass: 'bg-[#eef9fb] text-[#17344d]',
    },
    {
        id: 'focus',
        name: 'Focus companion',
        headline: 'Build concentration and regular learning habits',
        description:
            'A Forest-inspired focus experience with sessions, streaks, goals and motivating achievements.',
        ctaLabel: 'Explore focus tools',
        href: publicShow.url('focus-companion'),
        image: assets.productThreePreview,
        imageFit: 'cover',
        backgroundClass: 'bg-[#237ca8] text-white',
    },
];

export const resourceGroups = [
    {
        title: 'For students',
        items: [
            {
                id: 'courses',
                title: 'Courses',
                description: 'Multilingual text and video learning paths',
                href: publicShow.url('courses'),
                icon: BookOpen,
            },
            {
                id: 'quizzes',
                title: 'Quizzes',
                description: 'Active-recall checks and final assessments',
                href: publicShow.url('quizzes'),
                icon: ClipboardCheck,
            },
        ],
    },
    {
        title: 'For teachers',
        items: [
            {
                id: 'groups',
                title: 'Group management',
                description: 'Organise learners, classes and assignments',
                href: publicShow.url('group-management'),
                icon: Users,
            },
            {
                id: 'authoring',
                title: 'Course creation',
                description: 'Build lessons, videos, quizzes and activities',
                href: publicShow.url('course-creation'),
                icon: Video,
            },
        ],
    },
    {
        title: 'Recognition',
        items: [
            {
                id: 'badges',
                title: 'Digital badges',
                description: 'Recognise completed skills and milestones',
                href: publicShow.url('digital-badges'),
                icon: Award,
            },
            {
                id: 'europass',
                title: 'Europass',
                description: 'Issue verified digital learning credentials',
                href: publicShow.url('europass'),
                icon: GraduationCap,
            },
        ],
    },
    {
        title: 'Project',
        items: [
            {
                id: 'schools',
                title: 'Partner schools',
                description: 'Explore the European school network',
                href: publicShow.url('partner-schools'),
                icon: MapPinned,
            },
            {
                id: 'support',
                title: 'Project support',
                description: 'Guidance for students, teachers and partners',
                href: publicShow.url('project-support'),
                icon: CircleHelp,
            },
        ],
    },
];

export const events: EventData[] = [
    {
        id: 'one',
        day: '08',
        month: 'OCT',
        title: 'Student Learning Lab',
        location: 'Partner school network',
        category: 'Workshop',
        href: publicShow.url('network-events'),
    },
    {
        id: 'two',
        day: '17',
        month: 'NOV',
        title: 'Teacher Academy',
        location: 'European partner network',
        category: 'Training',
        href: publicShow.url('network-events'),
    },
    {
        id: 'three',
        day: '11',
        month: 'MAR',
        title: 'Bright Mind Exchange',
        location: 'Erasmus+ school community',
        category: 'Exchange',
        href: publicShow.url('network-events'),
    },
    {
        id: 'four',
        day: '22',
        month: 'APR',
        title: 'Peer Learning Forum',
        location: 'Online and partner schools',
        category: 'Forum',
        href: publicShow.url('network-events'),
    },
];

export const eventPosters: EventPosterData[] = [
    {
        id: 'poster-one',
        name: 'Student Learning Lab',
        date: 'Oct 8–10, 2026',
        location: 'Partner school',
        ctaLabel: 'View activity',
        href: publicShow.url('network-events'),
        image: assets.eventOnePoster,
    },
    {
        id: 'poster-two',
        name: 'Teacher Academy',
        date: 'Nov 17–19, 2026',
        location: 'European network',
        ctaLabel: 'View activity',
        href: publicShow.url('network-events'),
        image: assets.eventTwoPoster,
    },
    {
        id: 'poster-three',
        name: 'Bright Mind Exchange',
        date: 'Mar 11–13, 2027',
        location: 'Erasmus+ community',
        ctaLabel: 'View activity',
        href: publicShow.url('network-events'),
        image: assets.eventThreePoster,
    },
];

export const utilityActions = {
    searchPlaceholder: 'Search courses',
};
