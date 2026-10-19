import { Head, Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import FeaturePreview from '@/components/auth/feature-preview';
import { home } from '@/routes';

export default function AuthLayout({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <>
            <Head title={title} />
            <div className="flex min-h-screen flex-col bg-canvas text-ink antialiased selection:bg-brand/25">
                <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-6 sm:px-6 lg:px-0">
                    <Link href={home()} className="flex items-center gap-2">
                        <img
                            src="/images/logo-mark.svg"
                            alt=""
                            className="h-8 w-8"
                        />
                        <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
                            InvestaLearning
                        </span>
                    </Link>
                    <Link
                        href={home()}
                        className="shrink-0 text-sm font-semibold whitespace-nowrap text-slate-600 hover:text-ink"
                    >
                        ← <span className="hidden sm:inline">Kembali ke </span>
                        Beranda
                    </Link>
                </header>

                <main className="flex flex-1 items-start justify-center px-4 pb-16 sm:px-6 lg:items-center lg:px-0">
                    <div className="grid w-full max-w-5xl overflow-clip rounded-3xl border border-line bg-white shadow-soft lg:grid-cols-5">
                        <section className="p-6 sm:p-10 lg:col-span-3 lg:p-12">
                            {children}
                        </section>

                        {/* The register form is long, so the preview sticks to
                            the top of the viewport instead of floating mid-panel. */}
                        <aside className="hidden bg-brand-soft p-10 lg:col-span-2 lg:block">
                            <div className="sticky top-10">
                                <FeaturePreview />
                            </div>
                        </aside>
                    </div>
                </main>

                <footer className="pb-8 text-center text-xs text-slate-400">
                    © 2014–{new Date().getFullYear()} PT. Biner Investa
                    Berkembang (Investa Group)
                </footer>
            </div>
        </>
    );
}
