import { router } from '@inertiajs/react';
import { Mono, Strong } from '@/components/admin/cells';
import DataTable, {
    RowActions,
    StatusToggle,
} from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import type { ServerTable } from '@/components/admin/types';
import { Button, PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';
import admin from '@/routes/admin';

type Subject = { code: string; name: string; active: boolean };

const columns: Column<Subject>[] = [
    { label: 'Kd Pelajaran', render: (row) => <Mono>{row.code}</Mono> },
    { label: 'Mata Pelajaran', render: (row) => <Strong>{row.name}</Strong> },
    {
        label: 'Status',
        render: (row) => (
            <StatusToggle
                initial={row.active}
                label={`Pelajaran ${row.name}`}
            />
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

export default function DataPelajaran({
    table,
}: {
    table: ServerTable<Subject>;
}) {
    return (
        <AdminLayout title="Data Pelajaran">
            <PageIntro description="Mata pelajaran yang menjadi dasar bank soal dan TryOut." />
            <DataTable
                title="Daftar mata pelajaran"
                table={table}
                columns={columns}
                rowKey={(row) => row.code}
                actions={
                    <Button
                        icon="plus"
                        onClick={() =>
                            router.visit(admin.tambahPelajaran.url())
                        }
                    >
                        Tambah Pelajaran
                    </Button>
                }
            />
        </AdminLayout>
    );
}
