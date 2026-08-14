import { Head } from '@inertiajs/react';
import { ArrowLeft, Compass } from 'lucide-react';

import { PathwaysShowcase } from '@/components/design-system/pathways';

export default function PathwaysPage() {
    return (
        <div className="bm-design-system min-h-screen bg-[#f4f7fa] text-[#263951]">
            <Head title="Adaptive Learning Pathways" />
            <header className="sticky top-0 z-50 border-b border-[#dce4ec] bg-white/95 backdrop-blur">
                <div className="mx-auto flex h-18 max-w-[1500px] items-center justify-between px-4 sm:px-7">
                    <a
                        href="/design-system#pathways"
                        className="flex items-center gap-2 text-sm font-bold text-[#10233f]"
                    >
                        <ArrowLeft className="size-4" />
                        Design system
                    </a>
                    <span className="flex items-center gap-2 font-bold text-[#10233f]">
                        <Compass className="size-5 text-[#155eef]" />
                        Bright Mind Pathways
                    </span>
                </div>
            </header>
            <main className="mx-auto max-w-[1500px] px-4 py-12 sm:px-7">
                <div className="mb-10 max-w-4xl">
                    <p className="text-xs font-bold tracking-[.16em] text-[#155eef] uppercase">
                        Signature learning experience
                    </p>
                    <h1 className="mt-4 text-4xl leading-tight font-bold text-[#10233f] sm:text-6xl">
                        A pathway that responds to how you learn.
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-[#637286]">
                        Explore recommendations, understand every adaptation,
                        and choose a learning route that grows with your
                        progress.
                    </p>
                </div>
                <PathwaysShowcase standalone />
            </main>
        </div>
    );
}
