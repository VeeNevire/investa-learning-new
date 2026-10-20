import { Count, Strong } from '@/components/admin/cells';
import DataTable, { RowActions } from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import type { Option, ServerTable } from '@/components/admin/types';
import { Badge, Button } from '@/components/admin/ui';

export type SubjectDetail = {
    key: string;
    code: string;
    subject: string;
    exam: string;
    class: string;
    questions: number;
    minutes: number;
};

// Practice and TryOut packages: subject, exam type, class, question count.
export default function SubjectDetailTable({
    kind,
    table,
    examOptions,
    classOptions,
}: {
    kind: 'Latihan' | 'Tryout';
    table: ServerTable<SubjectDetail>;
    examOptions: Option[];
    classOptions: Option[];
}) {
    const columns: Column<SubjectDetail>[] = [
        {
            label: 'Mata Pelajaran',
            render: (row) => <Strong>{row.subject}</Strong>,
        },
        {
            label: 'Jenis Ujian',
            render: (row) => <Badge tone="brand">{row.exam}</Badge>,
        },
        { label: 'Kelas', render: (row) => row.class },
        {
            label: 'Jumlah Soal',
            render: (row) => <Count value={row.questions} />,
        },
        { label: 'Waktu', render: (row) => `${row.minutes} menit` },
        {
            label: 'Menu',
            render: () => (
                <RowActions>
                    <Button variant="ghost">Lihat Soal</Button>
                    <Button variant="ghost">Excel</Button>
                </RowActions>
            ),
        },
    ];

    return (
        <DataTable
            title={`Daftar paket ${kind.toLowerCase()}`}
            table={table}
            columns={columns}
            rowKey={(row) => row.key}
            search
            filters={[
                { key: 'examId', label: 'Jenis Ujian', options: examOptions },
                { key: 'classId', label: 'Kelas', options: classOptions },
            ]}
        />
    );
}
