import { StatusToggle } from '@/components/admin/data-table';
import {
    Badge,
    Button,
    Card,
    PageIntro,
    RemoteImage,
} from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

type Video = {
    id: number;
    title: string;
    url: string;
    thumbnail: string;
    active: boolean;
};

export default function FloatingVideo({
    videos,
    settings,
}: {
    videos: Video[];
    settings: { autoplay: boolean; mute: boolean };
}) {
    return (
        <AdminLayout title="Floating Video">
            <PageIntro description="Video YouTube mengambang yang tampil di halaman website." />
            <Card
                title="Floating video"
                action={
                    <span className="flex flex-wrap items-center gap-2">
                        <Badge tone={settings.autoplay ? 'green' : 'slate'}>
                            Autoplay {settings.autoplay ? 'aktif' : 'mati'}
                        </Badge>
                        <Badge tone={settings.mute ? 'amber' : 'slate'}>
                            Suara {settings.mute ? 'dibisukan' : 'menyala'}
                        </Badge>
                        <Button icon="plus">Tambah Video</Button>
                    </span>
                }
            >
                {videos.length === 0 ? (
                    <p className="py-10 text-center text-sm text-slate-400">
                        Belum ada video.
                    </p>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {videos.map((video) => (
                            <figure
                                key={video.id}
                                className="rounded-2xl border border-line p-3"
                            >
                                <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <RemoteImage
                                        src={video.thumbnail}
                                        alt={video.title}
                                    />
                                </a>
                                <figcaption className="mt-3 space-y-2 text-xs">
                                    <span className="block font-semibold text-ink">
                                        {video.title}
                                    </span>
                                    <span className="flex items-center justify-between">
                                        <StatusToggle
                                            initial={video.active}
                                            label={video.title}
                                        />
                                        <Button variant="danger">Hapus</Button>
                                    </span>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                )}
            </Card>
        </AdminLayout>
    );
}
