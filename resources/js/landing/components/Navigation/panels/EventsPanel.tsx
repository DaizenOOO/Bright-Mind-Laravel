import { ArrowRight } from 'lucide-react';
import { events, eventPosters } from '../navigation.data';
import { MediaPlaceholder } from '../MediaPlaceholder';
export function EventsPanel() {
    return (
        <div className="grid grid-cols-[350px_1fr] divide-x divide-neutral-200">
            <aside className="p-6">
                <p className="mb-4 text-sm font-medium text-[var(--menu-accent)]">
                    Upcoming events
                </p>
                <div className="space-y-2">
                    {events.map((e) => (
                        <a
                            key={e.id}
                            href={e.href}
                            className="group flex gap-4 rounded-xl p-2 transition hover:bg-neutral-50"
                        >
                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[var(--menu-accent)] text-white">
                                <span className="text-center text-sm leading-none font-bold">
                                    {e.day}
                                    <span className="mt-0.5 block text-[9px]">
                                        {e.month}
                                    </span>
                                </span>
                            </span>
                            <span>
                                <span className="font-medium">{e.title}</span>
                                <span className="block text-sm text-neutral-500">
                                    {e.location}
                                </span>
                            </span>
                        </a>
                    ))}
                </div>
                <a
                    href={events[0].href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--menu-accent)]"
                >
                    View all <ArrowRight className="h-4 w-4" />
                </a>
            </aside>
            <div className="grid grid-cols-3 gap-4 p-4">
                {eventPosters.map((p) => (
                    <a
                        key={p.id}
                        href={p.href}
                        className="group relative overflow-hidden rounded-2xl border bg-neutral-900 transition hover:-translate-y-0.5"
                    >
                        <MediaPlaceholder
                            src={p.image}
                            assetName={`${p.name} poster`}
                            dimensions="900 × 1200 px"
                            aspectRatio="3:4"
                            className="h-[360px] border-0"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-neutral-950/85 p-5 text-white backdrop-blur">
                            <h3 className="font-semibold">{p.name}</h3>
                            <p className="mt-1 text-sm text-white/70">
                                {p.date}
                            </p>
                            <p className="text-sm text-white/70">
                                {p.location}
                            </p>
                            <span className="mt-3 inline-flex items-center gap-1 text-sm">
                                {p.ctaLabel}
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
