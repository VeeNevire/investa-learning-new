import { RowActions, StatusToggle } from '@/components/admin/data-table';
import { Button, Card, PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

type RunningText = { id: number; text: string; active: boolean };

export default function RunningTextPage({ items }: { items: RunningText[] }) {
    return (
        <AdminLayout title="Running Text">
            <PageIntro description="Teks berjalan yang tampil di website." />
            <Card
                title="Daftar running text"
                action={<Button icon="plus">Tambah Text</Button>}
            >
                {items.length === 0 ? (
                    <p className="py-10 text-center text-sm text-slate-400">
                        Belum ada running text.
                    </p>
                ) : (
                    <ul className="divide-y divide-line">
                        {items.map((item, index) => (
                            <li
                                key={item.id}
                                className="flex flex-wrap items-center justify-between gap-4 py-3"
                            >
                                <span className="flex min-w-0 flex-1 gap-3 text-sm text-ink">
                                    <span className="text-slate-400">
                                        {index + 1}.
                                    </span>
                                    {item.text}
                                </span>
                                <span className="flex items-center gap-3">
                                    <StatusToggle
                                        initial={item.active}
                                        label={`Running text ${index + 1}`}
                                    />
                                    <RowActions>
                                        <Button variant="danger">Hapus</Button>
                                    </RowActions>
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </Card>
        </AdminLayout>
    );
}
