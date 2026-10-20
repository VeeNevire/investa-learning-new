import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { mainSections, systemSection } from '@/components/admin/admin-nav';
import type { NavGroup, NavSection } from '@/components/admin/admin-nav';
import Icon from '@/components/admin/icon';
import { DEMO_TOAST_EVENT } from '@/components/admin/ui';
import { cn } from '@/lib/utils';
import { login } from '@/routes';
import { destroy as adminLogout } from '@/actions/App/Http/Controllers/Admin/AdminAuthController';

export default function AdminLayout({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        let timer: number | undefined;

        const onToast = (event: Event) => {
            setToast((event as CustomEvent<string>).detail);
            window.clearTimeout(timer);
            timer = window.setTimeout(() => setToast(null), 2500);
        };

        window.addEventListener(DEMO_TOAST_EVENT, onToast);

        return () => {
            window.removeEventListener(DEMO_TOAST_EVENT, onToast);
            window.clearTimeout(timer);
        };
    }, []);

    return (
        <>
            <Head title={`${title} · Admin`} />
            {toast && (
                <div
                    role="status"
                    className="fixed right-4 bottom-4 z-[60] flex max-w-sm animate-slide-in items-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm text-white shadow-floating motion-reduce:animate-none"
                >
                    <Icon
                        name="clipboard"
                        className="h-4 w-4 text-brand-soft"
                    />
                    {toast}
                </div>
            )}
            <div className="min-h-screen bg-canvas text-ink antialiased selection:bg-brand/25">
                <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-line bg-white lg:flex">
                    <Sidebar />
                </aside>

                {drawerOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <button
                            type="button"
                            aria-label="Tutup menu"
                            onClick={() => setDrawerOpen(false)}
                            className="absolute inset-0 bg-ink/40"
                        />
                        <aside className="relative flex h-full w-72 max-w-[85%] bg-white shadow-floating">
                            <Sidebar onNavigate={() => setDrawerOpen(false)} />
                        </aside>
                    </div>
                )}

                <div className="lg:pl-64">
                    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-line bg-white/80 px-4 backdrop-blur-md sm:px-8">
                        <div className="flex min-w-0 items-center gap-3">
                            <button
                                type="button"
                                aria-label="Buka menu"
                                onClick={() => setDrawerOpen(true)}
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white text-slate-600 lg:hidden"
                            >
                                <Icon name="menu" />
                            </button>
                            <h1 className="truncate text-lg font-bold text-ink sm:text-xl">
                                {title}
                            </h1>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                            <button
                                type="button"
                                aria-label="Notifikasi"
                                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-ink"
                            >
                                <Icon name="bell" className="h-4.5 w-4.5" />
                                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                            </button>
                            <div className="flex items-center gap-2 rounded-xl border border-line bg-white p-1 pr-3 shadow-sm">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-xs font-bold text-white">
                                    AD
                                </span>
                                <span className="hidden text-sm font-semibold sm:inline">
                                    Admin
                                </span>
                            </div>
                            <Link
                                href={adminLogout.url()}
                                method="post"
                                as="button"
                                className="text-sm font-semibold text-slate-600 hover:text-ink"
                            >
                                Keluar
                            </Link>
                        </div>
                    </header>

                    <main className="p-4 sm:p-8">{children}</main>
                </div>
            </div>
        </>
    );
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
    const { url } = usePage();
    const [query, setQuery] = useState('');

    const path = url.split(/[?#]/)[0];
    const keyword = query.trim().toLowerCase();

    // While searching, keep only matching items and open their groups.
    const filterSection = (section: NavSection): NavSection => ({
        ...section,
        groups: section.groups
            .map((group) => {
                if (!keyword || group.label.toLowerCase().includes(keyword)) {
                    return group;
                }

                const items = group.items?.filter((item) =>
                    item.label.toLowerCase().includes(keyword),
                );

                return items?.length ? { ...group, items } : null;
            })
            .filter((group): group is NavGroup => group !== null),
    });

    const sections = mainSections
        .map(filterSection)
        .filter((section) => section.groups.length > 0);
    const system = filterSection(systemSection);

    return (
        <div className="flex h-full w-full flex-col">
            <div className="flex flex-col gap-5 p-5">
                <Link
                    href="/"
                    className="flex items-center gap-2.5"
                    onClick={onNavigate}
                >
                    <img
                        src="/images/logo-mark.svg"
                        alt=""
                        className="h-8 w-8"
                    />
                    <span className="text-lg font-extrabold tracking-tight">
                        InvestaLearning
                    </span>
                </Link>

                <label className="relative block">
                    <span className="sr-only">Cari menu</span>
                    <Icon
                        name="search"
                        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Cari menu"
                        className="w-full rounded-xl border border-line bg-slate-50/80 py-2 pr-3 pl-9 text-sm outline-none placeholder:text-slate-400 focus:border-brand focus:ring-1 focus:ring-brand"
                    />
                </label>
            </div>

            <nav
                aria-label="Menu admin"
                className="flex-1 space-y-6 overflow-y-auto px-5 pb-5"
            >
                {sections.map((section) => (
                    <SectionView
                        key={section.label}
                        section={section}
                        path={path}
                        forceOpen={keyword !== ''}
                        onNavigate={onNavigate}
                    />
                ))}
                {keyword && sections.length === 0 && (
                    <p className="px-3 text-sm text-slate-400">
                        Menu tidak ditemukan.
                    </p>
                )}
            </nav>

            <div className="border-t border-line p-5">
                {system.groups.length > 0 && (
                    <SectionView
                        section={system}
                        path={path}
                        forceOpen={keyword !== ''}
                        onNavigate={onNavigate}
                    />
                )}
                <Link
                    href={login()}
                    onClick={onNavigate}
                    className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-ink"
                >
                    <Icon name="logout" className="h-4.5 w-4.5" />
                    Logout
                </Link>
            </div>
        </div>
    );
}

function SectionView({
    section,
    path,
    forceOpen,
    onNavigate,
}: {
    section: NavSection;
    path: string;
    forceOpen: boolean;
    onNavigate?: () => void;
}) {
    return (
        <div>
            <p className="mb-2 px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                {section.label}
            </p>
            <ul className="space-y-1 text-sm font-medium">
                {section.groups.map((group) => (
                    <li key={group.label}>
                        <GroupView
                            group={group}
                            path={path}
                            forceOpen={forceOpen}
                            onNavigate={onNavigate}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function GroupView({
    group,
    path,
    forceOpen,
    onNavigate,
}: {
    group: NavGroup;
    path: string;
    forceOpen: boolean;
    onNavigate?: () => void;
}) {
    const containsActive =
        group.items?.some((item) => item.href === path) ?? false;
    const [open, setOpen] = useState(containsActive);

    if (group.href) {
        const active = group.href === path;

        return (
            <Link
                href={group.href}
                onClick={onNavigate}
                aria-current={active ? 'page' : undefined}
                className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2 transition',
                    active
                        ? 'bg-brand-soft font-semibold text-brand'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-ink',
                )}
            >
                <Icon name={group.icon} className="h-4.5 w-4.5" />
                {group.label}
            </Link>
        );
    }

    const expanded = open || forceOpen;

    return (
        <>
            <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setOpen((value) => !value)}
                className={cn(
                    'flex w-full items-center justify-between rounded-xl px-3 py-2 transition',
                    containsActive
                        ? 'bg-brand-soft font-semibold text-brand'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-ink',
                )}
            >
                <span className="flex items-center gap-3">
                    <Icon name={group.icon} className="h-4.5 w-4.5" />
                    {group.label}
                </span>
                <Icon
                    name="chevronDown"
                    className={cn(
                        'h-4 w-4 transition-transform motion-reduce:transition-none',
                        expanded && 'rotate-180',
                    )}
                />
            </button>

            {expanded && group.items && (
                <div className="relative space-y-2.5 pt-2.5 pb-1 pl-7 text-[13px]">
                    <span
                        aria-hidden="true"
                        className="absolute top-3 bottom-3 left-[23px] w-px bg-line"
                    />
                    {group.items.map((item) => {
                        const active = item.href === path;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onNavigate}
                                aria-current={active ? 'page' : undefined}
                                className={cn(
                                    'relative flex items-center gap-3 pl-3 transition',
                                    active
                                        ? 'font-semibold text-brand'
                                        : 'text-slate-500 hover:text-ink',
                                )}
                            >
                                <span
                                    className={cn(
                                        'absolute -left-[7px] h-1.5 w-1.5 rounded-full',
                                        active
                                            ? 'bg-brand ring-2 ring-brand-soft'
                                            : 'bg-slate-300',
                                    )}
                                />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </>
    );
}
