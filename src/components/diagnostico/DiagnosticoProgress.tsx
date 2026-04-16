'use client';

type Props = {
    currentIndex: number;
    total: number;
    areaName: string;
    areaOfTemplate: string;
    percent: number;
};

export default function DiagnosticoProgress({
    currentIndex,
    total,
    areaName,
    areaOfTemplate,
    percent,
}: Props) {
    const label = areaOfTemplate
        .replace('{current}', String(currentIndex))
        .replace('{total}', String(total));
    const clamped = Math.max(0, Math.min(1, percent));

    return (
        <div className="w-full">
            <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    {label}
                </span>
                <span aria-hidden="true" className="font-mono text-ink-muted">·</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember">
                    {areaName}
                </span>
            </div>

            <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(clamped * 100)}
                className="relative h-[3px] w-full bg-cream-dark"
            >
                <div
                    className="absolute inset-y-0 left-0 bg-ember transition-[width] duration-300 ease-out"
                    style={{ width: `${clamped * 100}%` }}
                />
            </div>
        </div>
    );
}
