import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import SiteFooter from '@/components/landing/site-footer';
import SiteHeader from '@/components/landing/site-header';

export default function PublicLayout({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen overflow-x-clip bg-canvas text-ink antialiased selection:bg-brand/25 selection:text-ink">
                <SiteHeader />
                <main>{children}</main>
                <SiteFooter />
            </div>
        </>
    );
}
