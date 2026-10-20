import DataTable, { StatusToggle } from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import Icon from '@/components/admin/icon';
import type { ServerTable } from '@/components/admin/types';
import { Badge, Button } from '@/components/admin/ui';

export type DownloadFile = {
    id: number;
    exam: string;
    topic: string;
    fileName: string;
    url: string | null;
    active: boolean;
};

const columns: Column<DownloadFile>[] = [
    {
        label: 'Jenis Ujian',
        render: (row) => <Badge tone="brand">{row.exam}</Badge>,
    },
    { label: 'Topik', render: (row) => row.topic || '-' },
    {
        label: 'File Name',
        render: (row) => (
            <span className="flex items-center gap-2 text-ink">
                <Icon name="document" className="h-4 w-4 text-slate-400" />
                {row.fileName || '-'}
            </span>
        ),
    },
    {
        label: 'Status',
        render: (row) => (
            <StatusToggle
                initial={row.active}
                label={row.fileName || `File ${row.id}`}
            />
        ),
    },
    {
        label: 'Link',
        render: (row) =>
            row.url ? (
                <a
                    href={row.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-brand hover:text-brand-hover"
                >
                    Unduh
                </a>
            ) : (
                <span className="text-xs text-slate-400">Tidak ada file</span>
            ),
    },
];

// Materials, regulations and documentation share this table.
export default function DownloadsTable({
    kind,
    table,
}: {
    kind: string;
    table: ServerTable<DownloadFile>;
}) {
    return (
        <DataTable
            title={`Daftar file ${kind}`}
            table={table}
            columns={columns}
            rowKey={(row) => String(row.id)}
            actions={<Button icon="plus">Upload File</Button>}
        />
    );
}
