import { useState } from 'react';
import type { ReactNode } from 'react';
import Icon from '@/components/admin/icon';
import type { IconName } from '@/components/admin/icon';
import { cn } from '@/lib/utils';

export const DEMO_TOAST_EVENT = 'admin-demo-toast';

// Saving, editing and deleting are not connected to the backend yet, so those
// actions only show a notice.
export function demoToast(
    message = 'Belum tersambung: perubahan tidak disimpan.',
) {
    window.dispatchEvent(
        new CustomEvent<string>(DEMO_TOAST_EVENT, { detail: message }),
    );
}

export function Card({
    title,
    action,
    className,
    children,
}: {
    title?: string;
    action?: ReactNode;
    className?: string;
    children: ReactNode;
}) {
    return (
        <section
            className={cn(
                'rounded-2xl border border-line bg-white p-5 shadow-sm',
                className,
            )}
        >
            {(title || action) && (
                <div className="mb-4 flex items-center justify-between gap-3">
                    {title && (
                        <h2 className="text-sm font-semibold text-ink">
                            {title}
                        </h2>
                    )}
                    {action && <div className="ml-auto">{action}</div>}
                </div>
            )}
            {children}
        </section>
    );
}

export function PageIntro({
    description,
    actions,
}: {
    description: string;
    actions?: ReactNode;
}) {
    return (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="max-w-2xl text-sm text-slate-500">{description}</p>
            {actions && (
                <div className="flex flex-wrap items-center gap-2">
                    {actions}
                </div>
            )}
        </div>
    );
}

export function Button({
    children,
    icon,
    variant = 'primary',
    onClick = () => demoToast(),
    className,
}: {
    children: ReactNode;
    icon?: IconName;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    onClick?: () => void;
    className?: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'inline-flex items-center gap-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition',
                variant === 'primary' &&
                    'bg-brand px-4 py-2 text-white shadow-sm hover:bg-brand-hover',
                variant === 'secondary' &&
                    'border border-line bg-white px-4 py-2 text-slate-700 shadow-sm hover:bg-slate-50',
                variant === 'ghost' &&
                    'px-2 py-1 text-brand hover:bg-brand-soft',
                variant === 'danger' &&
                    'px-2 py-1 text-red-600 hover:bg-red-50',
                className,
            )}
        >
            {icon && <Icon name={icon} className="h-4 w-4" />}
            {children}
        </button>
    );
}

const badgeTones = {
    green: 'bg-emerald-50 text-emerald-700',
    red: 'bg-red-50 text-red-700',
    amber: 'bg-amber-50 text-amber-700',
    brand: 'bg-brand-soft text-brand',
    slate: 'bg-slate-100 text-slate-600',
} as const;

export type BadgeTone = keyof typeof badgeTones;

export function Badge({
    tone = 'slate',
    children,
}: {
    tone?: BadgeTone;
    children: ReactNode;
}) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap',
                badgeTones[tone],
            )}
        >
            {children}
        </span>
    );
}

export function Toggle({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={() => onChange(!checked)}
            className={cn(
                'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors',
                checked ? 'bg-brand' : 'bg-slate-300',
            )}
        >
            <span
                className={cn(
                    'inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
                    checked ? 'translate-x-4.5' : 'translate-x-0.5',
                )}
            />
        </button>
    );
}

export function StatTile({
    label,
    value,
    icon,
    hint,
}: {
    label: string;
    value: string;
    icon: IconName;
    hint?: string;
}) {
    return (
        <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-slate-500">{label}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon name={icon} className="h-4.5 w-4.5" />
                </span>
            </div>
            <p className="text-2xl font-extrabold tracking-tight text-ink tabular-nums">
                {value}
            </p>
            {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
        </div>
    );
}

// An image uploaded through the old site. Falls back to a labelled
// placeholder when there is no file or it fails to load.
export function RemoteImage({
    src,
    alt,
    ratio = 'aspect-video',
    fit = 'cover',
}: {
    src: string | null;
    alt: string;
    ratio?: string;
    fit?: 'cover' | 'contain';
}) {
    const [failed, setFailed] = useState(false);

    if (!src || failed) {
        return <ImagePlaceholder label={alt} ratio={ratio} tone="slate" />;
    }

    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className={cn(
                'w-full rounded-xl bg-slate-50',
                ratio,
                fit === 'cover' ? 'object-cover' : 'object-contain p-2',
            )}
        />
    );
}

// Flat placeholder for images that are missing.
export function ImagePlaceholder({
    label,
    ratio = 'aspect-video',
    tone = 'brand',
}: {
    label: string;
    ratio?: string;
    tone?: 'brand' | 'ink' | 'slate';
}) {
    return (
        <div
            className={cn(
                'flex w-full items-center justify-center rounded-xl p-4 text-center',
                ratio,
                tone === 'brand' && 'bg-brand-soft text-brand',
                tone === 'ink' && 'bg-ink text-white',
                tone === 'slate' && 'bg-slate-100 text-slate-500',
            )}
        >
            <span className="text-sm font-bold tracking-tight">{label}</span>
        </div>
    );
}

export const fieldClass =
    'w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/15';

export function FormField({
    label,
    hint,
    className,
    children,
}: {
    label: string;
    hint?: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <label className={cn('block', className)}>
            <span className="mb-1.5 block text-sm font-semibold text-ink">
                {label}
            </span>
            {children}
            {hint && (
                <span className="mt-1 block text-xs text-slate-400">
                    {hint}
                </span>
            )}
        </label>
    );
}
