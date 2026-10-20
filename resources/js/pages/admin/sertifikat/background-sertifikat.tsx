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

export default function BackgroundSertifikat({ items }: { items: Item[] }) {
    return (
        <AdminLayout title="Background Sertifikat">
            <PageIntro description="Gambar latar yang dipakai pada sertifikat." />
            <Gallery
                title="Background sertifikat"
                addLabel="Tambah Background"
                ratio="aspect-[297/210]"
                fit="cover"
                items={items.map((item) => ({ ...item, sub: item.position }))}
            />
        </AdminLayout>
    );
}
