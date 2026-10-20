import { Strong } from '@/components/admin/cells';
import DataTable from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import type { ServerTable } from '@/components/admin/types';
import { PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

type GuestMessage = {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    date: string;
};

const columns: Column<GuestMessage>[] = [
    { label: 'Nama', render: (row) => <Strong>{row.name}</Strong> },
    { label: 'Email', render: (row) => row.email || '-' },
    { label: 'No Telpon', render: (row) => row.phone || '-' },
    {
        label: 'Pesan',
        render: (row) => (
            <span className="line-clamp-2 max-w-xs">{row.message}</span>
        ),
    },
    {
        label: 'Tanggal',
        render: (row) => row.date,
        className: 'whitespace-nowrap',
    },
];

export default function BukuTamu({
    table,
}: {
    table: ServerTable<GuestMessage>;
}) {
    return (
        <AdminLayout title="Buku Tamu">
            <PageIntro description="Pesan yang dikirim pengunjung melalui buku tamu, terbaru lebih dulu." />
            <DataTable
                title="Pesan buku tamu"
                table={table}
                columns={columns}
                rowKey={(row) => String(row.id)}
                search
            />
        </AdminLayout>
    );
}
