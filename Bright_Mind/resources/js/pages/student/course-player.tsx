import { Head, router } from '@inertiajs/react';
import { BookOpen, ChevronRight, Play, Zap } from 'lucide-react';
import { useState } from 'react';

import { ProgressBar } from '@/components/design-system/primitives';
import { Button } from '@/components/ui/button';
import {
    GrayMedia,
    useLightWorkspaceTheme,
} from '@/components/workspace/workspace-ui';
import { complete } from '@/routes/student/blocks';

type Block = {
    id: number;
    type: string;
    xp_reward: number;
    translations: { locale: string; content: Record<string, unknown> }[];
};
type Section = { id: number; title: string; blocks: Block[] };
type Course = {
    slug: string;
    xp_reward: number;
    translations: { locale: string; title: string; description: string }[];
    sections: Section[];
};
export default function CoursePlayer({
    course,
    enrollment,
}: {
    course: Course;
    enrollment: { progress_percent: number };
}) {
    useLightWorkspaceTheme();

    const blocks = course.sections.flatMap((s) => s.blocks);
    const [active, setActive] = useState(blocks[0]?.id);
    const block = blocks.find((b) => b.id === active);
    const content =
        block?.translations.find((t) => t.locale === 'en')?.content ?? {};
    const title = course.translations.find((t) => t.locale === 'en');

    return (
        <div className="min-h-screen bg-[#eef3f7]">
            <Head title={title?.title} />
            <header className="flex min-h-16 items-center justify-between gap-4 border-b bg-white px-4 sm:px-7">
                <div>
                    <p className="text-xs font-bold text-[#155eef] uppercase">
                        Course player
                    </p>
                    <h1 className="font-bold text-[#10233f]">{title?.title}</h1>
                </div>
                <div className="w-48">
                    <ProgressBar value={enrollment.progress_percent} />
                    <p className="mt-1 text-right text-xs font-bold text-[#718095]">
                        {enrollment.progress_percent}% complete
                    </p>
                </div>
            </header>
            <main className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[1fr_340px]">
                <div className="p-4 sm:p-8">
                    <div className="mx-auto max-w-4xl rounded-2xl border border-[#dce4ec] bg-white p-5 sm:p-8">
                        {block?.type === 'video' ? (
                            <div className="relative">
                                <GrayMedia className="aspect-video" />
                                <span className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#155eef]">
                                    <Play className="fill-current" />
                                </span>
                            </div>
                        ) : (
                            <>
                                <p className="text-xs font-bold tracking-[.12em] text-[#155eef] uppercase">
                                    {block?.type.replaceAll('_', ' ')}
                                </p>
                                <h2 className="mt-3 text-3xl font-bold text-[#10233f]">
                                    {String(
                                        content.title ??
                                            content.text ??
                                            content.prompt ??
                                            'Learning activity',
                                    )}
                                </h2>
                                <p className="mt-5 leading-8 text-[#5f6f82]">
                                    {String(
                                        content.body ??
                                            content.message ??
                                            'Complete this learning block and reflect on what changed in your understanding.',
                                    )}
                                </p>
                                {block?.type === 'reflection' && (
                                    <textarea
                                        className="mt-6 min-h-36 w-full rounded-xl border border-[#cbd5df] p-4"
                                        placeholder="Write your reflection…"
                                    />
                                )}
                            </>
                        )}
                        <div className="mt-8 flex items-center justify-between border-t pt-5">
                            <span className="flex items-center gap-2 text-sm font-bold text-[#a06d0c]">
                                <Zap className="size-4" />+{block?.xp_reward} XP
                            </span>
                            {block && (
                                <Button
                                    onClick={() =>
                                        router.post(
                                            complete({
                                                course: course.slug,
                                                block: block.id,
                                            }).url,
                                            { response: { completed: true } },
                                            {
                                                preserveScroll: true,
                                                onSuccess: () => {
                                                    const index =
                                                        blocks.findIndex(
                                                            (b) =>
                                                                b.id ===
                                                                block.id,
                                                        );
                                                    setActive(
                                                        blocks[
                                                            Math.min(
                                                                index + 1,
                                                                blocks.length -
                                                                    1,
                                                            )
                                                        ]?.id,
                                                    );
                                                },
                                            },
                                        )
                                    }
                                    className="rounded-xl bg-[#155eef]"
                                >
                                    Complete & continue
                                    <ChevronRight />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <aside className="border-l border-[#d6e0ea] bg-white p-4">
                    <div className="mb-4 flex items-center gap-3">
                        <BookOpen className="text-[#155eef]" />
                        <strong className="text-[#10233f]">
                            Course content
                        </strong>
                    </div>
                    {course.sections.map((section) => (
                        <div key={section.id} className="mb-5">
                            <p className="mb-2 text-xs font-bold tracking-[.1em] text-[#718095] uppercase">
                                {section.title}
                            </p>
                            {section.blocks.map((item, index) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActive(item.id)}
                                    className={`mb-1 flex min-h-11 w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-bold ${active === item.id ? 'bg-[#e8f1ff] text-[#155eef]' : 'text-[#536376] hover:bg-[#f2f5f8]'}`}
                                >
                                    <span className="grid size-7 place-items-center rounded-full bg-[#e6ebf1] text-xs">
                                        {index + 1}
                                    </span>
                                    {item.type.replaceAll('_', ' ')}
                                </button>
                            ))}
                        </div>
                    ))}
                </aside>
            </main>
        </div>
    );
}
