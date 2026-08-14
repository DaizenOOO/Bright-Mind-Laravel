import { ImageIcon, Upload } from 'lucide-react';

type Props = {
    src?: string;
    assetName: string;
    dimensions: string;
    aspectRatio: string;
    instruction?: string;
    fit?: 'cover' | 'contain';
    className?: string;
};

export function MediaPlaceholder({
    src,
    assetName,
    dimensions,
    aspectRatio,
    instruction = 'Replace this asset in navigation.data.ts',
    fit = 'cover',
    className = '',
}: Props) {
    return (
        <div
            className={`relative overflow-hidden border border-dashed border-neutral-300 bg-neutral-100 ${className}`}
        >
            {src ? (
                <img
                    src={src}
                    alt={`${assetName} placeholder`}
                    className={`h-full w-full object-${fit}`}
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
            ) : null}
            <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_1px_1px,#d4d4d4_1px,transparent_0)] [background-size:14px_14px] p-5 text-center">
                <div className="rounded-xl bg-white/90 p-4 shadow-sm backdrop-blur">
                    <ImageIcon className="mx-auto mb-2 h-5 w-5" />
                    <p className="font-medium">{assetName}</p>
                    <p className="mt-1 text-xs text-neutral-500">
                        Recommended: {dimensions}
                    </p>
                    <p className="text-xs text-neutral-500">
                        Aspect ratio: {aspectRatio}
                    </p>
                    <p className="mt-2 flex items-center justify-center gap-1 text-xs text-neutral-600">
                        <Upload className="h-3 w-3" />
                        {instruction}
                    </p>
                </div>
            </div>
        </div>
    );
}
