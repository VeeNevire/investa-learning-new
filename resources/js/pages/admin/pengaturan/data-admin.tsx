import { Mono, Strong } from '@/components/admin/cells';
import DataTable, {
    RowActions,
    StatusToggle,
} from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import type { ServerTable } from '@/components/admin/types';
import { Badge, Button, PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

type AdminUser = {
    id: string;
    name: string;
    userId: string;
    access: string;
    active: boolean;
};

const columns: Column<AdminUser>[] = [
    { label: 'UID', render: (row) => <Mono>{row.id}</Mono> },
    { label: 'Nama', render: (row) => <Strong>{row.name}</Strong> },
    { label: 'User ID', render: (row) => row.userId },
    {
        label: 'Access',
        render: (row) => (
            <Badge tone={row.access === 'Admin' ? 'brand' : 'slate'}>
                {row.access}
            </Badge>
        ),
    },
    {
        label: 'Status',
        render: (row) => (
            <StatusToggle initial={row.active} label={`Admin ${row.name}`} />
        ),
    },
    {
        label: 'Aksi',
        render: () => (
            <RowActions>
                <Button variant="ghost">Ubah</Button>
                <Button variant="danger">Hapus</Button>
            </RowActions>
        ),
    },
];

export default function DataAdmin({
    table,
}: {
    table: ServerTable<AdminUser>;
}) {
    return (
        <AdminLayout title="Data Admin">
            <PageIntro description="Akun admin, koordinator, dan editor beserta hak aksesnya." />
            <DataTable
                title="Data admin"
                table={table}
                columns={columns}
                rowKey={(row) => row.id}
                actions={<Button icon="plus">Tambah Admin</Button>}
            />
        </AdminLayout>
    );
}
