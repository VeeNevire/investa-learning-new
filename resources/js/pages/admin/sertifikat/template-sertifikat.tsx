import { Strong } from '@/components/admin/cells';
import DataTable, { RowActions } from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import type { ServerTable } from '@/components/admin/types';
import { Button, PageIntro, RemoteImage } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

type Template = {
    id: number;
    title: string;
    teacher: string;
    signers: string;
    background: string;
    image: string | null;
};

const columns: Column<Template>[] = [
    { label: 'No', render: (_, index) => index + 1 },
    {
        label: 'Background',
        render: (row) => (
            <span className="block w-24">
                <RemoteImage
                    src={row.image}
                    alt={row.background || 'Background'}
                    ratio="aspect-[297/210]"
                />
            </span>
        ),
    },
    { label: 'Judul', render: (row) => <Strong>{row.title}</Strong> },
    { label: 'Pengajar', render: (row) => row.teacher || '-' },
    { label: 'Tanda Tangan', render: (row) => row.signers || '-' },
    {
        label: 'Aksi',
        render: () => (
            <RowActions>
                <Button variant="ghost">Lihat</Button>
                <Button variant="ghost">Ubah</Button>
            </RowActions>
        ),
    },
];

export default function TemplateSertifikat({
    table,
}: {
    table: ServerTable<Template>;
}) {
    return (
        <AdminLayout title="Template Sertifikat">
            <PageIntro description="Template sertifikat per program pelatihan." />
            <DataTable
                title="Template sertifikat"
                table={table}
                columns={columns}
                rowKey={(row) => String(row.id)}
                search
                actions={<Button icon="plus">Tambah Template</Button>}
            />
        </AdminLayout>
    );
}
