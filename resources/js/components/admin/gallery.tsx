import type { ReactNode } from 'react';
import { RowActions, StatusToggle } from '@/components/admin/data-table';
import { Button, Card, RemoteImage } from '@/components/admin/ui';

export type GalleryItem = {
    id: number;
    name: string;
    image: string | null;
    sub?: string;
    active?: boolean;
};

// Image cards for uploaded files: certificate backgrounds, logos, signatures,
// participant card backgrounds and front page slides.
export default function Gallery({
    title,
    addLabel,
    items,
    ratio = 'aspect-video',
    fit = 'cover',
    footer,
}: {
    title: string;
    addLabel: string;
    items: GalleryItem[];
    ratio?: string;
    fit?: 'cover' | 'contain';
    footer?: ReactNode;
}) {
    return (
        <Card title={title} action={<Button icon="plus">{addLabel}</Button>}>
            {items.length === 0 ? (
                <p className="py-10 text-center text-sm text-slate-400">
                    Belum ada data.
                </p>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {items.map((item) => (
                        <figure
                            key={item.id}
                            className="rounded-2xl border border-line p-3"
                        >
                            <RemoteImage
                                src={item.image}
                                alt={item.name}
                                ratio={ratio}
                                fit={fit}
                            />
                            <figcaption className="mt-3 flex items-center justify-between gap-2 text-xs">
                                <span className="min-w-0">
                                    <span className="block truncate font-semibold text-ink">
                                        {item.name}
                                    </span>
                                    {item.sub && (
                                        <span className="block truncate text-slate-500">
                                            {item.sub}
                                        </span>
                                    )}
                                </span>
                                <RowActions>
                                    <Button variant="ghost">Ubah</Button>
                                    <Button variant="danger">Hapus</Button>
                                </RowActions>
                            </figcaption>
                            {item.active !== undefined && (
                                <div className="mt-2 border-t border-line pt-2">
                                    <StatusToggle
                                        initial={item.active}
                                        label={item.name}
                                    />
                                </div>
                            )}
                        </figure>
                    ))}
                </div>
            )}
            {footer}
        </Card>
    );
}
