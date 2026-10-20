import { cn } from '@/lib/utils';

// Small building blocks for table cells shared by several admin pages.

export function Mono({ children }: { children: string }) {
    return <span className="font-mono text-xs text-slate-500">{children}</span>;
}

export function Strong({ children }: { children: string }) {
    return <span className="font-semibold text-ink">{children}</span>;
}

// Question text arrives as plain text (the server strips the HTML).
export function QuestionText({ children }: { children: string }) {
    return <span className="line-clamp-2 max-w-md text-ink">{children}</span>;
}

export function Count({ value }: { value: number }) {
    return (
        <span className="tabular-nums">{value.toLocaleString('id-ID')}</span>
    );
}

// Share bar, e.g. how many participants answered a question correctly.
export function Percent({ value }: { value: number }) {
    return (
        <span className="flex items-center gap-2">
            <span className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                <span
                    className={cn(
                        'block h-full rounded-full',
                        value >= 50 ? 'bg-brand' : 'bg-amber-400',
                    )}
                    style={{ width: `${value}%` }}
                />
            </span>
            <span className="text-xs font-semibold text-ink tabular-nums">
                {value}%
            </span>
        </span>
    );
}
