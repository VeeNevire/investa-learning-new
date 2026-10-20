import { TableFooter, visitTable } from '@/components/admin/data-table';
import Gallery from '@/components/admin/gallery';
import type { ServerTable } from '@/components/admin/types';
import { PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

type Slide = {
    id: number;
    name: string;
    image: string | null;
    active: boolean;
};

export default function ImageSlide({ table }: { table: ServerTable<Slide> }) {
    return (
        <AdminLayout title="Image Slide">
            <PageIntro description="Gambar slide yang tampil di halaman depan." />
            <Gallery
                title="Image slide halaman depan"
                addLabel="Tambah Slide"
                ratio="aspect-[16/6]"
                items={table.rows}
                footer={
                    <TableFooter
                        meta={table.meta}
                        shown={table.rows.length}
                        onPage={(page) => visitTable(table.query, { page })}
                    />
                }
            />
        </AdminLayout>
    );
}
