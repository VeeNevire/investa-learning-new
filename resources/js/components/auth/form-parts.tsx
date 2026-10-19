import type { FormEvent, ReactNode } from 'react';

export const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/15';

// Design only for now: the forms are not wired to a backend yet.
export const preventSubmit = (event: FormEvent) => event.preventDefault();

export function Field({
    label,
    htmlFor,
    aside,
    className,
    children,
}: {
    label: string;
    htmlFor: string;
    aside?: ReactNode;
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={className}>
            <div className="mb-2 flex items-center justify-between">
                <label
                    htmlFor={htmlFor}
                    className="text-sm font-semibold text-ink"
                >
                    {label}
                </label>
                {aside}
            </div>
            {children}
        </div>
    );
}

export function SubmitButton({ children }: { children: ReactNode }) {
    return (
        <button
            type="submit"
            className="w-full rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover"
        >
            {children}
        </button>
    );
}
