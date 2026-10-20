import { Mono, Strong } from '@/components/admin/cells';
import DataTable from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import type { ExamResult, ServerTable } from '@/components/admin/types';
import { Badge, PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';
import { cn } from '@/lib/utils';

const columns: Column<ExamResult>[] = [
    { label: 'No', render: (_, index) => index + 1 },
    { label: 'No Ujian', render: (row) => <Mono>{row.number}</Mono> },
    { label: 'Nama Ujian', render: (row) => <Strong>{row.examName}</Strong> },
    { label: 'Jenis Ujian', render: (row) => row.exam },
    { label: 'Kelas', render: (row) => row.class },
    { label: 'UID', render: (row) => <Mono>{row.uid}</Mono> },
    { label: 'Nama Peserta', render: (row) => row.name },
    {
        label: 'Nilai',
        render: (row) => (
            <span
                className={cn(
                    'font-bold tabular-nums',
                    row.passed ? 'text-emerald-600' : 'text-red-600',
                )}
            >
                {row.score}
                <span className="ml-1 text-xs font-normal text-slate-400">
                    / {row.passing}
                </span>
            </span>
        ),
    },
    {
        label: 'Status',
        render: (row) => (
            <Badge tone={row.passed ? 'green' : 'red'}>
                {row.passed ? 'Lulus' : 'Tidak lulus'}
            </Badge>
        ),
    },
];

export default function InformasiHasil({
    table,
}: {
    table: ServerTable<ExamResult>;
}) {
    return (
        <AdminLayout title="Informasi Hasil">
            <PageIntro description="Hasil ujian peserta, terbaru lebih dulu. Nilai dihitung 1 poin per jawaban benar dan dibandingkan dengan batas lulus jenis ujiannya." />
            <DataTable
                title="Peserta yang menyelesaikan ujian"
                table={table}
                columns={columns}
                rowKey={(row) => row.number}
            />
        </AdminLayout>
    );
}
