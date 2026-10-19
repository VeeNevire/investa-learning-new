import type { ReactNode } from 'react';

export default function PageContent({ children }: { children: ReactNode }) {
    return (
        <section className="pb-20">
            <div className="mx-auto max-w-5xl px-6 lg:px-12">
                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft sm:p-10">
                    {children}
                </div>
            </div>
        </section>
    );
}
