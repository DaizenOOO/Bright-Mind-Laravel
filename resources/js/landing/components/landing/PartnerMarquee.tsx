import { pageContainer } from "../../layout.constants";
import { partners } from "../../landing.data";

export function PartnerMarquee() { const items = [...partners,...partners]; return <section aria-label="Erasmus partner network" className="border-b border-neutral-200 bg-white">
  <div className={`${pageContainer} grid md:grid-cols-[260px_1fr]`}>
    <div className="flex min-h-28 items-center border-x border-neutral-200 px-7 font-mono text-xs uppercase leading-5 tracking-wide">Learning together<br/>across Europe</div>
    <div className="marquee-mask group overflow-hidden border-r border-neutral-200"><div className="marquee-track flex w-max">{items.map((name,i)=><div key={`${name}-${i}`} className="grid h-28 w-52 place-items-center border-r border-neutral-200 px-5 text-center text-base font-bold tracking-[-.03em] text-neutral-500 transition hover:text-[var(--menu-accent)]">{name}</div>)}</div></div>
  </div>
 </section>; }
