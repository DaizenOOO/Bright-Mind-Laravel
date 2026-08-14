import { useState } from "react";

type Props = { src: string; name: string; size: string; ratio: string; className?: string; alt?: string; eager?: boolean };

export function AssetPlaceholder({ src, name, size, ratio, className = "", alt = "", eager = false }: Props) {
  const [failed, setFailed] = useState(false);
  return <div className={`relative overflow-hidden bg-[#f5f5f3] ${className}`}>
    {!failed && <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} onError={() => setFailed(true)} className="h-full w-full object-cover" />}
    {failed && <div className="absolute inset-0 grid place-items-center p-5 text-center">
      <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-neutral-800">{name}</p><p className="mt-2 text-[11px] leading-5 text-neutral-500">{size} · {ratio}<br/>Podmień plik: {src}</p></div>
    </div>}
  </div>;
}

