import { MegaNavigation } from './components/Navigation/MegaNavigation';
import { HeroSection } from './components/landing/HeroSection';
import { PartnerMarquee } from './components/landing/PartnerMarquee';
import { AiFrameworkSection } from './components/landing/AiFrameworkSection';
import { FrameworkShowcase } from './components/landing/FrameworkShowcase';
import { CloudFeaturesGrid } from './components/landing/CloudFeaturesGrid';
import { CommunitySection } from './components/landing/CommunitySection';
import { FocusGardenSection } from './components/focus/FocusGardenSection';
import { pageContainer } from './layout.constants';
import { ArrowUpRight } from 'lucide-react';

export default function App({ isAuthenticated }: { isAuthenticated: boolean }) {
    return (
        <div className="bright-mind-landing min-h-screen overflow-x-clip bg-white text-[var(--menu-text)]">
            <MegaNavigation isAuthenticated={isAuthenticated} />
            <main>
                <HeroSection />
                <PartnerMarquee />
                <AiFrameworkSection />
                <FrameworkShowcase />
                <CloudFeaturesGrid />
                <FocusGardenSection />
                <CommunitySection />
            </main>
            <footer className="bg-[#17344d] py-16 text-white">
                <div
                    className={`${pageContainer} grid gap-10 md:grid-cols-[1fr_auto] md:items-end`}
                >
                    <div>
                        <a
                            href="#"
                            className="flex items-center gap-3 text-2xl font-black tracking-[-.04em]"
                        >
                            <img
                                src="/placeholders/bright-mind-logo.png"
                                alt="Bright Mind"
                                className="h-12 w-12 object-contain"
                            />
                            Bright Mind
                        </a>
                        <p className="mt-5 max-w-lg text-sm leading-6 text-white/65">
                            An Erasmus+ learning framework for school students,
                            teachers and partner organisations across Europe.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/70">
                        {[
                            'Framework',
                            'Courses',
                            'Teachers',
                            'Schools',
                            'Europass',
                        ].map((x) => (
                            <a
                                key={x}
                                href="#"
                                className="group inline-flex items-center gap-1 hover:text-white"
                            >
                                {x}
                                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        ))}
                    </div>
                </div>
                <div
                    className={`${pageContainer} mt-12 border-t border-white/10 pt-6 text-xs text-white/40`}
                >
                    © 2026 Bright Mind · Erasmus+ project.
                </div>
            </footer>
        </div>
    );
}
