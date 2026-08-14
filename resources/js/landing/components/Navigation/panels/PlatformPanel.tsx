import { ArrowRight, FileCode2 } from 'lucide-react';
import {
    documentationLinks,
    platformPackages,
    platformPrimary,
} from '../navigation.data';

const Row = ({ item }: { item: (typeof platformPrimary)[number] }) => {
    const Icon = item.icon;
    return (
        <a
            href={item.href}
            className="group flex gap-3 rounded-xl p-3 transition hover:bg-neutral-50"
        >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border bg-white">
                <Icon className="h-5 w-5 transition group-hover:scale-[1.04]" />
            </span>
            <span>
                <span className="font-medium">{item.title}</span>
                <span className="mt-0.5 block text-sm text-neutral-500">
                    {item.description}
                </span>
            </span>
        </a>
    );
};
export function PlatformPanel() {
    return (
        <div className="grid min-h-[340px] grid-cols-4 divide-x divide-neutral-200">
            <section className="p-6">
                <p className="mb-3 text-sm font-medium text-[var(--menu-accent)]">
                    Framework
                </p>
                {platformPrimary.map((i) => (
                    <Row key={i.id} item={i} />
                ))}
            </section>
            <section className="p-6">
                <p className="mb-3 text-sm font-medium text-[var(--menu-accent)]">
                    Learning framework
                </p>
                {platformPackages.map((i) => (
                    <Row key={i.id} item={i} />
                ))}
            </section>
            <section className="p-6">
                <p className="mb-4 text-sm font-medium text-[var(--menu-accent)]">
                    Platform features
                </p>
                <div className="space-y-1">
                    {documentationLinks.map(({ label, href, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            className="group flex items-center gap-3 rounded-lg px-2 py-2.5 transition hover:bg-neutral-50"
                        >
                            <Icon className="h-4 w-4 text-[var(--menu-accent)]" />
                            <span>{label}</span>
                        </a>
                    ))}
                </div>
                <a
                    href={documentationLinks[0].href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--menu-accent)]"
                >
                    View all{' '}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </a>
            </section>
            <section className="relative overflow-hidden bg-[radial-gradient(circle_at_1px_1px,#e5e5e5_1px,transparent_0)] [background-size:16px_16px] p-6">
                <p className="text-sm font-medium text-[var(--menu-accent)]">
                    Connected learning
                </p>
                <div className="relative mx-auto mt-8 h-56 max-w-[260px]">
                    {[0, 1, 2, 3].map((n) => (
                        <div
                            key={n}
                            className="absolute top-0 left-0 flex h-20 w-full items-center gap-3 rounded-xl border bg-white px-4 shadow-sm"
                            style={{
                                transform: `translate(${n * 14}px, ${n * 44}px)`,
                            }}
                        >
                            <FileCode2 className="h-5 w-5 text-neutral-400" />
                            <span className="font-mono text-sm">
                                {
                                    [
                                        'Courses',
                                        'Teachers',
                                        'Focus',
                                        'Europass',
                                    ][n]
                                }
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
