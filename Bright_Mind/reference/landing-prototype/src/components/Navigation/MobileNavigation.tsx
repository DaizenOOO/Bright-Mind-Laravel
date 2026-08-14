import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { assets, events, navigationItems, productCards, resourceGroups } from "./navigation.data";
import { MediaPlaceholder } from "./MediaPlaceholder";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  };

  return <div className="lg:hidden">
    <header className="flex h-[68px] items-center justify-between border-b px-5">
      <a href="#" className="flex items-center gap-2"><img src={assets.logo} alt="Bright Mind logo" className="h-10 w-12 object-contain"/><span className="text-lg font-black tracking-[-.04em] text-[#17344d]">Bright Mind</span></a>
      <button ref={triggerRef} aria-label="Open navigation" aria-expanded={open} onClick={()=>setOpen(true)} className="rounded-xl border p-2 active:scale-[.98]"><Menu className="h-5 w-5"/></button>
    </header>
    <AnimatePresence>{open && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[100] bg-white">
      <div className="flex h-[68px] items-center justify-between border-b px-5"><span className="text-lg font-black tracking-[-.04em] text-[#17344d]">Bright Mind</span><button aria-label="Close navigation" onClick={close} className="rounded-xl border p-2"><X className="h-5 w-5"/></button></div>
      <div className="h-[calc(100vh-68px)] overflow-y-auto p-4">
        <label className="mb-4 flex items-center gap-2 rounded-xl border px-3 py-3"><Search className="h-4 w-4 text-neutral-400"/><input aria-label="Search documentation" placeholder="Search courses" className="min-w-0 flex-1 outline-none"/></label>
        {navigationItems.map(item => item.type === "link" ? <a key={item.id} href={item.href} onClick={close} className="block border-b py-4 font-medium">{item.label}</a> : <section key={item.id} className="border-b">
          <button onClick={()=>setSection(section===item.id?null:item.id)} aria-expanded={section===item.id} className="flex w-full items-center justify-between py-4 font-medium"><span>{item.label}</span><ChevronDown className={`h-4 w-4 transition ${section===item.id?"rotate-180":""}`}/></button>
          <AnimatePresence initial={false}>{section===item.id && <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden"><MobileSection id={item.id} onNavigate={close}/></motion.div>}</AnimatePresence>
        </section>)}
      </div>
    </motion.div>}</AnimatePresence>
  </div>;
}

function MobileSection({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  if (id === "products") return <div className="space-y-3 pb-4">{productCards.map(card=><a key={card.id} href={card.href} onClick={onNavigate} className="block rounded-xl border p-3"><p className="font-medium">{card.name}</p><p className="mt-1 text-sm text-neutral-500">{card.headline}</p><MediaPlaceholder src={card.image} assetName={`${card.name} preview`} dimensions="1200 × 800 px" aspectRatio="3:2" className="mt-3 h-36 rounded-lg"/></a>)}</div>;
  if (id === "events") return <div className="space-y-2 pb-4">{events.map(event=><a key={event.id} href={event.href} onClick={onNavigate} className="flex gap-3 rounded-xl border p-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--menu-accent)] text-xs font-bold text-white">{event.day}<br/>{event.month}</span><span><span className="font-medium">{event.title}</span><span className="block text-sm text-neutral-500">{event.location}</span></span></a>)}</div>;
  const generic = id === "resources" ? resourceGroups.flatMap(group=>group.items) : resourceGroups[0].items.concat(resourceGroups[1].items);
  return <div className="grid gap-2 pb-4">{generic.map(item=><a key={item.id} href={item.href} onClick={onNavigate} className="rounded-xl bg-neutral-50 p-3"><span className="font-medium">{item.title}</span><span className="block text-sm text-neutral-500">{item.description}</span></a>)}</div>;
}
