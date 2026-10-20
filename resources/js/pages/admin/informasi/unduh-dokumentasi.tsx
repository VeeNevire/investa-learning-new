import DownloadsTable from '@/components/admin/downloads-table';
import type { DownloadFile } from '@/components/admin/downloads-table';
import type { ServerTable } from '@/components/admin/types';
import { PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

export default function UnduhDokumentasi({
    table,
}: {
    table: ServerTable<DownloadFile>;
}) {
    return (
        <AdminLayout title="Unduh Dokumentasi">
            <PageIntro description="File dokumentasi kegiatan untuk diunduh peserta." />
            <DownloadsTable kind="dokumentasi" table={table} />
        </AdminLayout>
    );
}
