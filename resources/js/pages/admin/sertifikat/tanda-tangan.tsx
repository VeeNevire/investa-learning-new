import Gallery from '@/components/admin/gallery';
import { PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

type Item = {
    id: number;
    name: string;
    position?: string;
    image: string | null;
    active: boolean;
};

export default function TandaTangan({ items }: { items: Item[] }) {
    return (
        <AdminLayout title="Tanda Tangan">
            <PageIntro description="Tanda tangan pejabat yang dicetak pada sertifikat." />
            <Gallery
                title="Tanda tangan"
                addLabel="Tambah Tanda Tangan"
                ratio="aspect-[3/1]"
                fit="contain"
                items={items.map((item) => ({ ...item, sub: item.position }))}
            />
        </AdminLayout>
    );
}
