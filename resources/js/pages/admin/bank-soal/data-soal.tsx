import { router } from '@inertiajs/react';
import { Mono, QuestionText } from '@/components/admin/cells';
import DataTable, { RowActions } from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import type { ServerTable } from '@/components/admin/types';
import { Badge, Button, PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';
import admin from '@/routes/admin';

type Question = {
    code: string;
    staticCode: string;
    text: string;
    answer: string;
    note: string;
};

const columns: Column<Question>[] = [
    { label: 'Kd Soal', render: (row) => <Mono>{row.code}</Mono> },
    { label: 'Kd Statis', render: (row) => <Mono>{row.staticCode}</Mono> },
    { label: 'Soal', render: (row) => <QuestionText>{row.text}</QuestionText> },
    {
        label: 'Kunci',
        render: (row) => <Badge tone="brand">{row.answer}</Badge>,
    },
    { label: 'Keterangan', render: (row) => row.note || '-' },
    {
        label: 'Pilihan',
        render: () => (
            <RowActions>
                <Button variant="ghost">Ubah</Button>
                <Button variant="danger">Hapus</Button>
            </RowActions>
        ),
    },
];

export default function DataSoal({
    table,
    groupOptions,
}: {
    table: ServerTable<Question>;
    groupOptions: string[];
}) {
    return (
        <AdminLayout title="Data Soal">
            <PageIntro description="Seluruh soal di bank soal beserta kunci dan keterangannya." />
            <DataTable
                title="Daftar soal"
                table={table}
                columns={columns}
                rowKey={(row) => row.code}
                filters={[
                    {
                        key: 'kelompok',
                        label: 'Kelompok Soal',
                        options: groupOptions.map((group) => ({
                            value: group,
                            label: group,
                        })),
                    },
                ]}
                actions={
                    <Button
                        icon="plus"
                        onClick={() => router.visit(admin.tambahSoal.url())}
                    >
                        Tambah Soal
                    </Button>
                }
            />
        </AdminLayout>
    );
}
