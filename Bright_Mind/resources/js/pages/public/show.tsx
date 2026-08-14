import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { home } from '@/routes';

type PublicPageProps = {
    title: string;
    description: string;
};

export default function PublicPage({ title, description }: PublicPageProps) {
    return (
        <main className="grid min-h-screen place-items-center bg-white px-6 py-16 text-[#17344d]">
            <div className="w-full max-w-5xl border-x border-neutral-200 px-6 py-20 sm:px-12 lg:px-20">
                <Link
                    href={home()}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#237ca8]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Bright Mind
                </Link>
                <p className="mt-20 text-xs font-semibold tracking-[.2em] text-[#237ca8] uppercase">
                    Bright Mind
                </p>
                <Head title={title} />
                <h1 className="mt-6 max-w-4xl text-5xl leading-[.96] font-medium tracking-[-.05em] text-neutral-950 sm:text-7xl">
                    {title}
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600">
                    {description}
                </p>
            </div>
        </main>
    );
}
