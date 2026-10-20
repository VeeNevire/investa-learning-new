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

export default function LogoSertifikat({ items }: { items: Item[] }) {
    return (
        <AdminLayout title="Logo Sertifikat">
            <PageIntro description="Logo instansi yang dicetak pada sertifikat." />
            <Gallery
                title="Logo instansi"
                addLabel="Tambah Logo"
                ratio="aspect-[3/1]"
                fit="contain"
                items={items.map((item) => ({ ...item, sub: item.position }))}
            />
        </AdminLayout>
    );
}
