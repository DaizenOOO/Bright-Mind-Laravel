import { Head, router, useForm } from '@inertiajs/react';
import {
    Check,
    ChevronDown,
    Copy,
    Eye,
    GripVertical,
    Languages,
    Monitor,
    Plus,
    Save,
    Smartphone,
    Tablet,
    Trash2,
    X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import { ProgressBar } from '@/components/design-system/primitives';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    GrayMedia,
    WorkspaceCard,
    WorkspaceHeader,
} from '@/components/workspace/workspace-ui';
import { publish, update } from '@/routes/admin/courses';
import { destroy, duplicate, store } from '@/routes/admin/courses/blocks';

type Translation = {
    locale: string;
    title: string;
    short_description: string;
    description: string;
    status: string;
};
type Block = {
    id: number;
    type: string;
    position: number;
    xp_reward: number;
    translations: {
        locale: string;
        content: Record<string, unknown>;
        status: string;
    }[];
};
type Section = { id: number; title: string; position: number; blocks: Block[] };
type Course = {
    id: number;
    status: string;
    source_locale: string;
    category: string;
    methodology: string;
    difficulty: string;
    audience: string;
    estimated_minutes: number;
    xp_reward: number;
    translations: Translation[];
    sections: Section[];
};
type Readiness = {
    score: number;
    checks: { key: string; label: string; complete: boolean }[];
};

const blockLabels: Record<string, string> = {
    heading: 'Heading',
    rich_text: 'Rich text',
    key_concept: 'Key concept',
    callout: 'Callout',
    quote: 'Quote',
    checklist: 'Checklist',
    table: 'Table',
    image: 'Image',
    gallery: 'Image gallery',
    audio: 'Audio',
    download: 'Downloadable file',
    resource_list: 'Resource list',
    video: 'Video',
    youtube: 'YouTube',
    vimeo: 'Vimeo',
    google_embed: 'Google embed',
    canva: 'Canva',
    genially: 'Genially',
    h5p: 'H5P',
    miro: 'Miro',
    single_choice: 'Single choice',
    multiple_choice: 'Multiple choice',
    true_false: 'True / false',
    fill_blank: 'Fill blank',
    matching: 'Matching',
    sorting: 'Sorting',
    sequencing: 'Sequencing',
    categorization: 'Categorization',
    flashcards: 'Flashcards',
    timed_recall: 'Timed recall',
    reflection: 'Reflection',
    scenario: 'Scenario',
    active_recall: 'Active Recall',
    peer_task: 'Peer task',
    design_thinking: 'Design Thinking',
    metacognition: 'Metacognition',
    assignment: 'Assignment',
    checkpoint: 'Checkpoint',
    assessment: 'Assessment',
    prerequisite: 'Prerequisite',
    milestone: 'Milestone',
    achievement_reward: 'Achievement reward',
    xp_reward: 'XP reward',
    completion: 'Completion',
};

export default function CourseEditor({
    course,
    readiness,
    blockTypes,
    locales,
}: {
    course: Course;
    readiness: Readiness;
    blockTypes: { category: string; types: string[] }[];
    locales: string[];
}) {
    const [locale, setLocale] = useState(course.source_locale);
    const [picker, setPicker] = useState(false);
    const [sectionId, setSectionId] = useState(course.sections[0]?.id);
    const [preview, setPreview] = useState<
        'desktop' | 'tablet' | 'mobile' | null
    >(null);
    const translation =
        course.translations.find((item) => item.locale === locale) ??
        course.translations[0];
    const form = useForm({
        locale,
        title: translation?.title ?? '',
        short_description: translation?.short_description ?? '',
        description: translation?.description ?? '',
        category: course.category,
        methodology: course.methodology,
        difficulty: course.difficulty,
        audience: course.audience,
        estimated_minutes: course.estimated_minutes,
        xp_reward: course.xp_reward,
    });
    const addBlock = (type: string) =>
        router.post(
            store(course.id).url,
            {
                section_id: sectionId,
                type,
                content:
                    type === 'video'
                        ? { url: '', provider: 'youtube' }
                        : { text: 'New content' },
            },
            { preserveScroll: true, onSuccess: () => setPicker(false) },
        );

    return (
        <div className="space-y-6 p-4 sm:p-7">
            <Head title={`${translation?.title} · Course Builder`} />
            <WorkspaceHeader
                eyebrow="Visual course builder"
                title={translation?.title ?? 'Untitled course'}
                description="Build the learner experience from reusable sections and blocks. Every visible field supports translation."
                actions={
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setPreview('desktop')}
                            className="rounded-xl"
                        >
                            <Eye />
                            Student preview
                        </Button>
                        <Button
                            onClick={() =>
                                form.patch(update(course.id).url, {
                                    preserveScroll: true,
                                })
                            }
                            className="rounded-xl bg-[#155eef]"
                        >
                            <Save />
                            {form.processing ? 'Saving…' : 'Save changes'}
                        </Button>
                    </div>
                }
            />
            <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
                <main className="space-y-5">
                    <WorkspaceCard>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <Languages className="size-5 text-[#155eef]" />
                                <strong className="text-[#10233f]">
                                    Language
                                </strong>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {locales.map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => {
                                            setLocale(item);
                                            const next =
                                                course.translations.find(
                                                    (t) => t.locale === item,
                                                );
                                            form.setData((data) => ({
                                                ...data,
                                                locale: item,
                                                title: next?.title ?? '',
                                                short_description:
                                                    next?.short_description ??
                                                    '',
                                                description:
                                                    next?.description ?? '',
                                            }));
                                        }}
                                        className={`rounded-lg px-3 py-2 text-xs font-bold uppercase ${locale === item ? 'bg-[#155eef] text-white' : 'bg-[#edf1f5] text-[#5f6f82]'}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mt-5 grid gap-4">
                            <div>
                                <Label>Course title</Label>
                                <Input
                                    value={form.data.title}
                                    onChange={(e) =>
                                        form.setData('title', e.target.value)
                                    }
                                    className="mt-2 h-11 rounded-xl"
                                />
                            </div>
                            <div>
                                <Label>Short description</Label>
                                <Input
                                    value={form.data.short_description}
                                    onChange={(e) =>
                                        form.setData(
                                            'short_description',
                                            e.target.value,
                                        )
                                    }
                                    className="mt-2 h-11 rounded-xl"
                                />
                            </div>
                            <div>
                                <Label>Full description</Label>
                                <textarea
                                    value={form.data.description}
                                    onChange={(e) =>
                                        form.setData(
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                    className="mt-2 min-h-28 w-full rounded-xl border border-[#cbd5df] p-3 text-sm"
                                />
                            </div>
                        </div>
                    </WorkspaceCard>
                    {course.sections.map((section) => (
                        <WorkspaceCard key={section.id}>
                            <div className="flex items-center gap-3">
                                <GripVertical className="size-5 text-[#8a97a6]" />
                                <button className="flex flex-1 items-center justify-between text-left">
                                    <span>
                                        <span className="text-xs font-bold tracking-[.1em] text-[#718095] uppercase">
                                            Section {section.position}
                                        </span>
                                        <strong className="mt-1 block text-lg text-[#10233f]">
                                            {section.title}
                                        </strong>
                                    </span>
                                    <ChevronDown />
                                </button>
                                <Button variant="ghost" size="icon">
                                    <Copy />
                                </Button>
                            </div>
                            <div className="mt-5 space-y-3">
                                {section.blocks.map((block) => (
                                    <motion.div
                                        layout
                                        key={block.id}
                                        className="flex items-center gap-3 rounded-xl border border-[#dce4ec] bg-[#f9fbfc] p-4"
                                    >
                                        <GripVertical className="size-5 shrink-0 cursor-grab text-[#8b98a7]" />
                                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e8f1ff] text-sm font-bold text-[#155eef]">
                                            {block.position}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-bold text-[#10233f]">
                                                {blockLabels[block.type] ??
                                                    block.type}
                                            </p>
                                            <p className="mt-1 truncate text-xs text-[#718095]">
                                                {JSON.stringify(
                                                    block.translations.find(
                                                        (t) =>
                                                            t.locale === locale,
                                                    )?.content ?? {},
                                                )}
                                            </p>
                                        </div>
                                        <Button
                                            onClick={() =>
                                                router.post(
                                                    duplicate({
                                                        course: course.id,
                                                        block: block.id,
                                                    }).url,
                                                    {},
                                                    { preserveScroll: true },
                                                )
                                            }
                                            variant="ghost"
                                            size="icon"
                                        >
                                            <Copy />
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                router.delete(
                                                    destroy({
                                                        course: course.id,
                                                        block: block.id,
                                                    }).url,
                                                    { preserveScroll: true },
                                                )
                                            }
                                            variant="ghost"
                                            size="icon"
                                        >
                                            <Trash2 className="text-[#b43d35]" />
                                        </Button>
                                    </motion.div>
                                ))}
                                <Button
                                    onClick={() => {
                                        setSectionId(section.id);
                                        setPicker(true);
                                    }}
                                    variant="outline"
                                    className="h-12 w-full rounded-xl border-dashed border-[#8ca4bd] text-[#155eef]"
                                >
                                    <Plus />
                                    Add content
                                </Button>
                            </div>
                        </WorkspaceCard>
                    ))}
                </main>
                <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
                    <WorkspaceCard title="Content readiness">
                        <div className="flex items-end justify-between">
                            <strong className="text-4xl text-[#10233f]">
                                {readiness.score}%
                            </strong>
                            <span className="text-sm font-bold text-[#718095]">
                                Publication check
                            </span>
                        </div>
                        <div className="mt-4">
                            <ProgressBar value={readiness.score} />
                        </div>
                        <div className="mt-5 space-y-3">
                            {readiness.checks.map((check) => (
                                <div
                                    key={check.key}
                                    className="flex items-start gap-3 text-sm"
                                >
                                    <span
                                        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${check.complete ? 'bg-[#149b8e] text-white' : 'bg-[#e4e9ef] text-[#8793a0]'}`}
                                    >
                                        {check.complete && (
                                            <Check className="size-3" />
                                        )}
                                    </span>
                                    {check.label}
                                </div>
                            ))}
                        </div>
                        <Button
                            disabled={
                                readiness.score !== 100 ||
                                course.status === 'published'
                            }
                            onClick={() => router.post(publish(course.id).url)}
                            className="mt-6 w-full rounded-xl bg-[#10233f]"
                        >
                            {course.status === 'published'
                                ? 'Published'
                                : 'Publish course'}
                        </Button>
                    </WorkspaceCard>
                    <WorkspaceCard title="Course settings">
                        <div className="space-y-4">
                            {(
                                [
                                    'category',
                                    'methodology',
                                    'difficulty',
                                    'audience',
                                ] as const
                            ).map((field) => (
                                <div key={field}>
                                    <Label className="capitalize">
                                        {field}
                                    </Label>
                                    <Input
                                        value={form.data[field]}
                                        onChange={(e) =>
                                            form.setData(field, e.target.value)
                                        }
                                        className="mt-2 rounded-xl"
                                    />
                                </div>
                            ))}
                        </div>
                    </WorkspaceCard>
                </aside>
            </div>
            <AnimatePresence>
                {picker && (
                    <motion.div
                        className="fixed inset-0 z-50 grid place-items-end bg-[#10233f]/45 p-0 sm:place-items-center sm:p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ y: 30 }}
                            animate={{ y: 0 }}
                            className="max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-white p-6 sm:rounded-2xl"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#10233f]">
                                        Add content
                                    </h2>
                                    <p className="mt-2 text-sm text-[#718095]">
                                        Choose a block. Its friendly editor
                                        opens next.
                                    </p>
                                </div>
                                <Button
                                    onClick={() => setPicker(false)}
                                    variant="ghost"
                                    size="icon"
                                >
                                    <X />
                                </Button>
                            </div>
                            <div className="mt-6 space-y-7">
                                {blockTypes.map((group) => (
                                    <section key={group.category}>
                                        <h3 className="text-sm font-bold text-[#10233f]">
                                            {group.category}
                                        </h3>
                                        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                            {group.types.map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() =>
                                                        addBlock(type)
                                                    }
                                                    className="min-h-20 rounded-xl border border-[#dce4ec] p-4 text-left font-bold text-[#263951] transition hover:border-[#155eef] hover:bg-[#f5f9ff]"
                                                >
                                                    {blockLabels[type] ?? type}
                                                </button>
                                            ))}
                                        </div>
                                    </section>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {preview && (
                <div className="fixed inset-0 z-50 bg-[#10233f]/70 p-4">
                    <div className="mx-auto flex h-full max-w-6xl flex-col rounded-2xl bg-[#eef3f7] p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => setPreview('desktop')}
                                    variant="outline"
                                    size="icon"
                                >
                                    <Monitor />
                                </Button>
                                <Button
                                    onClick={() => setPreview('tablet')}
                                    variant="outline"
                                    size="icon"
                                >
                                    <Tablet />
                                </Button>
                                <Button
                                    onClick={() => setPreview('mobile')}
                                    variant="outline"
                                    size="icon"
                                >
                                    <Smartphone />
                                </Button>
                            </div>
                            <Button
                                onClick={() => setPreview(null)}
                                variant="outline"
                                size="icon"
                            >
                                <X />
                            </Button>
                        </div>
                        <div
                            className={`mx-auto flex-1 overflow-y-auto bg-white shadow-xl ${preview === 'mobile' ? 'w-[390px]' : preview === 'tablet' ? 'w-[760px]' : 'w-full'}`}
                        >
                            <GrayMedia className="aspect-[16/6] rounded-none" />
                            <div className="p-7">
                                <h1 className="text-3xl font-bold text-[#10233f]">
                                    {form.data.title}
                                </h1>
                                <p className="mt-3 leading-7 text-[#657487]">
                                    {form.data.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
