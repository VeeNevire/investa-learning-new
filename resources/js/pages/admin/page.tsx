import { Link } from '@inertiajs/react';
import { findNavLabel } from '@/components/admin/admin-nav';
import Icon from '@/components/admin/icon';
import { adminPages } from '@/components/admin/pages';
import { PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';
import admin from '@/routes/admin';

export default function AdminPage({ page }: { page: string }) {
    const title = findNavLabel(page) ?? 'Halaman';
    const definition = adminPages[page];

    if (!definition) {
        return (
            <AdminLayout title={title}>
                <NotReady title={title} />
            </AdminLayout>
        );
    }

    const { Component, description } = definition;

    return (
        <AdminLayout title={title}>
            <PageIntro description={description} />
            <Component />
        </AdminLayout>
    );
}

function NotReady({ title }: { title: string }) {
    return (
        <div className="flex min-h-[60vh] items-center justify-center rounded-2xl border border-dashed border-line bg-white p-8 text-center">
            <div className="max-w-sm">
                <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                    <Icon name="clipboard" />
                </span>
                <h2 className="mb-2 text-lg font-bold text-ink">
                    Halaman {title} belum tersedia
                </h2>
                <p className="mb-6 text-sm text-slate-500">
                    Halaman ini belum ada di panel admin.
                </p>
                <Link
                    href={admin.dashboard()}
                    className="inline-flex rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-hover"
                >
                    Kembali ke Dashboard
                </Link>
            </div>
        </div>
    );
}
