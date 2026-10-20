import { Strong } from '@/components/admin/cells';
import DataTable, { RowActions } from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import type { ServerTable } from '@/components/admin/types';
import { Button, PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

type Announcement = { id: number; title: string; text: string };

const columns: Column<Announcement>[] = [
    { label: 'No', render: (_, index) => index + 1 },
    { label: 'Judul', render: (row) => <Strong>{row.title || '-'}</Strong> },
    {
        label: 'Isi Informasi',
        render: (row) => (
            <span className="line-clamp-2 max-w-lg">{row.text}</span>
        ),
    },
    {
        label: 'Menu',
        render: () => (
            <RowActions>
                <Button variant="ghost">Ubah</Button>
                <Button variant="danger">Hapus</Button>
            </RowActions>
        ),
    },
];

export default function DataInformasi({
    table,
}: {
    table: ServerTable<Announcement>;
}) {
    return (
        <AdminLayout title="Data Informasi">
            <PageIntro description="Pengumuman yang tampil di halaman peserta." />
            <DataTable
                title="Informasi untuk peserta"
                table={table}
                columns={columns}
                rowKey={(row) => String(row.id)}
                search
                emptyText="Belum ada informasi."
                actions={<Button icon="plus">Tambah Informasi</Button>}
            />
        </AdminLayout>
    );
}
