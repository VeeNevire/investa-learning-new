import DownloadsTable from '@/components/admin/downloads-table';
import type { DownloadFile } from '@/components/admin/downloads-table';
import type { ServerTable } from '@/components/admin/types';
import { PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

export default function UnduhMateri({
    table,
}: {
    table: ServerTable<DownloadFile>;
}) {
    return (
        <AdminLayout title="Unduh Materi">
            <PageIntro description="File materi yang bisa diunduh peserta per topik." />
            <DownloadsTable kind="materi" table={table} />
        </AdminLayout>
    );
}
