import { Mono, Strong } from '@/components/admin/cells';
import DataTable, {
    RowActions,
    StatusToggle,
} from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import type { Option, ServerTable } from '@/components/admin/types';
import { Badge, Button, PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

type Participant = {
    uid: string;
    userId: string;
    name: string;
    institution: string;
    class: string;
    exam: string;
    registered: string;
    status: 'aktif' | 'nonaktif';
};

const columns: Column<Participant>[] = [
    { label: 'No.', render: (_, index) => index + 1 },
    { label: 'UID', render: (row) => <Mono>{row.uid}</Mono> },
    { label: 'User ID', render: (row) => row.userId },
    { label: 'Nama', render: (row) => <Strong>{row.name}</Strong> },
    { label: 'Institusi', render: (row) => row.institution || '-' },
    { label: 'Kelas', render: (row) => row.class },
    {
        label: 'Jenis Ujian',
        render: (row) => <Badge tone="brand">{row.exam}</Badge>,
    },
    {
        label: 'Tgl. Registrasi',
        render: (row) => row.registered,
        className: 'whitespace-nowrap',
    },
    {
        label: 'Status',
        render: (row) => (
            <StatusToggle
                initial={row.status === 'aktif'}
                label={`Akun ${row.name}`}
            />
        ),
    },
    {
        label: 'Menu',
        render: () => (
            <RowActions>
                <Button variant="ghost">Detail</Button>
                <Button variant="ghost">Log</Button>
            </RowActions>
        ),
    },
];

export default function DataPeserta({
    table,
    examOptions,
    classOptions,
}: {
    table: ServerTable<Participant>;
    examOptions: Option[];
    classOptions: Option[];
}) {
    return (
        <AdminLayout title="Data Peserta">
            <PageIntro description="Daftar peserta terdaftar beserta jenis ujian, kelas, dan status akun." />
            <DataTable
                table={table}
                columns={columns}
                rowKey={(row) => row.uid}
                search
                filters={[
                    {
                        key: 'examId',
                        label: 'Jenis Ujian',
                        options: examOptions,
                    },
                    { key: 'classId', label: 'Kelas', options: classOptions },
                    {
                        key: 'status',
                        label: 'Status',
                        options: [
                            { value: 'aktif', label: 'Aktif' },
                            { value: 'nonaktif', label: 'Nonaktif' },
                        ],
                    },
                ]}
                actions={
                    <Button variant="secondary" icon="document">
                        Ekspor Excel
                    </Button>
                }
            />
        </AdminLayout>
    );
}
