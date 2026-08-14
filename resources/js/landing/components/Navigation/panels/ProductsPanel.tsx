import { ArrowRight, Box } from 'lucide-react';
import { productCards } from '../navigation.data';
import { MediaPlaceholder } from '../MediaPlaceholder';
export function ProductsPanel() {
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {productCards.map((card, index) => (
                <a
                    key={card.id}
                    href={card.href}
                    className={`${card.backgroundClass} ${index === 0 || index === productCards.length - 1 ? '!text-white' : ''} group overflow-hidden rounded-2xl border border-neutral-200 p-7 transition duration-200 hover:-translate-y-[3px]`}
                >
                    <div className="flex items-center gap-2 text-sm font-semibold">
                        <Box className="h-5 w-5" />
                        {card.name}
                    </div>
                    <h3 className="mt-8 text-2xl leading-tight font-semibold">
                        {card.headline}
                    </h3>
                    <p className="mt-3 text-sm opacity-70">
                        {card.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
                        {card.ctaLabel}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                    <MediaPlaceholder
                        src={card.image}
                        fit={card.imageFit}
                        assetName={`${card.name} preview`}
                        dimensions="1200 × 800 px"
                        aspectRatio="3:2"
                        className="mt-7 h-52 rounded-xl"
                    />
                </a>
            ))}
        </div>
    );
}
