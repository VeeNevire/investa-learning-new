import DownloadsTable from '@/components/admin/downloads-table';
import type { DownloadFile } from '@/components/admin/downloads-table';
import type { ServerTable } from '@/components/admin/types';
import { PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

export default function UnduhPeraturan({
    table,
}: {
    table: ServerTable<DownloadFile>;
}) {
    return (
        <AdminLayout title="Unduh Peraturan">
            <PageIntro description="File peraturan pasar modal untuk diunduh peserta." />
            <DownloadsTable kind="peraturan" table={table} />
        </AdminLayout>
    );
}
