import Gallery from '@/components/admin/gallery';
import { PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

type CardBackground = {
    id: number;
    uid: string;
    institution: string;
    image: string | null;
};

export default function CardBackground({ cards }: { cards: CardBackground[] }) {
    return (
        <AdminLayout title="Card Background">
            <PageIntro description="Gambar latar kartu peserta per instansi yang dipakai saat mencetak kartu." />
            <Gallery
                title="Background kartu peserta"
                addLabel="Upload Background"
                ratio="aspect-[85/54]"
                items={cards.map((card) => ({
                    id: card.id,
                    name: card.institution,
                    sub: card.uid,
                    image: card.image,
                }))}
            />
        </AdminLayout>
    );
}
