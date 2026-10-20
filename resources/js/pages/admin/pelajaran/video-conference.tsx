import { Count, Mono, Strong } from '@/components/admin/cells';
import DataTable, { RowActions } from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import type { ServerTable } from '@/components/admin/types';
import { Badge, Button, PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

type VideoConference = {
    id: number;
    title: string;
    participants: number;
    status: string;
    schedule: string;
    teacher: string;
    room: string;
};

const columns: Column<VideoConference>[] = [
    { label: 'No.', render: (_, index) => index + 1 },
    { label: 'Title', render: (row) => <Strong>{row.title}</Strong> },
    {
        label: 'Total Peserta',
        render: (row) => <Count value={row.participants} />,
    },
    {
        label: 'Status',
        render: (row) => (
            <Badge tone={row.status === 'Selesai' ? 'slate' : 'brand'}>
                {row.status}
            </Badge>
        ),
    },
    { label: 'Jadwal', render: (row) => row.schedule },
    { label: 'Guru', render: (row) => row.teacher },
    { label: 'Code Room', render: (row) => <Mono>{row.room}</Mono> },
    {
        label: 'Aksi',
        render: () => (
            <RowActions>
                <Button variant="ghost">Peserta</Button>
                <Button variant="ghost">Ubah</Button>
            </RowActions>
        ),
    },
];

export default function VideoConferencePage({
    table,
    statusOptions,
}: {
    table: ServerTable<VideoConference>;
    statusOptions: string[];
}) {
    return (
        <AdminLayout title="Video Conference">
            <PageIntro description="Jadwal kelas video conference beserta pengajar dan peserta." />
            <DataTable
                table={table}
                columns={columns}
                rowKey={(row) => String(row.id)}
                search
                filters={[
                    {
                        key: 'status',
                        label: 'Status',
                        options: statusOptions.map((status) => ({
                            value: status,
                            label: status,
                        })),
                    },
                ]}
                actions={<Button icon="plus">Buat Video Conference</Button>}
            />
        </AdminLayout>
    );
}
