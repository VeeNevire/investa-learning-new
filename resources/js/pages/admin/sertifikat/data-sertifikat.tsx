import { Strong } from '@/components/admin/cells';
import DataTable, {
    RowActions,
    StatusToggle,
} from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import type { ServerTable } from '@/components/admin/types';
import { Button, PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

type Certificate = {
    id: number;
    name: string;
    userId: string;
    title: string;
    teacher: string;
    signers: string;
    active: boolean;
};

const columns: Column<Certificate>[] = [
    { label: 'No', render: (_, index) => index + 1 },
    {
        label: 'Nama',
        render: (row) => (
            <span>
                <Strong>{row.name}</Strong>
                <span className="block text-xs text-slate-400">
                    {row.userId}
                </span>
            </span>
        ),
    },
    { label: 'Judul Sertifikat', render: (row) => row.title },
    { label: 'Pengajar', render: (row) => row.teacher || '-' },
    { label: 'Tanda Tangan', render: (row) => row.signers || '-' },
    {
        label: 'Status',
        render: (row) => (
            <StatusToggle
                initial={row.active}
                label={`Sertifikat ${row.name}`}
            />
        ),
    },
    {
        label: 'Aksi',
        render: () => (
            <RowActions>
                <Button variant="ghost">Cetak PDF</Button>
                <Button variant="ghost">Ubah</Button>
            </RowActions>
        ),
    },
];

export default function DataSertifikat({
    table,
}: {
    table: ServerTable<Certificate>;
}) {
    return (
        <AdminLayout title="Data Sertifikat">
            <PageIntro description="Sertifikat yang sudah diterbitkan untuk peserta, terbaru lebih dulu." />
            <DataTable
                title="Data sertifikat"
                table={table}
                columns={columns}
                rowKey={(row) => String(row.id)}
                search
                actions={<Button icon="plus">Buat Sertifikat</Button>}
            />
        </AdminLayout>
    );
}
