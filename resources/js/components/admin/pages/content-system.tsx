import DataTable, {
    RowActions,
    StatusToggle,
} from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import {
    adminUsers,
    announcements,
    backgrounds,
    certificates,
    certificateTemplates,
    documentationFiles,
    examTypes,
    floatingVideos,
    guestBook,
    institutionLogos,
    materialFiles,
    regulationFiles,
    runningTexts,
    signatures,
    slides,
    visitorStats,
} from '@/components/admin/dummy';
import type {
    AdminUser,
    Announcement,
    Certificate,
    CertificateTemplate,
    DownloadFile,
    GuestMessage,
} from '@/components/admin/dummy';
import Icon from '@/components/admin/icon';
import type { AdminPageMap } from '@/components/admin/pages/types';
import {
    Badge,
    Button,
    Card,
    ImagePlaceholder,
    StatTile,
} from '@/components/admin/ui';

const announcementColumns: Column<Announcement>[] = [
    { label: 'No', render: (row) => row.id },
    {
        label: 'Judul Info',
        render: (row) => (
            <span className="font-semibold text-ink">{row.title}</span>
        ),
    },
    { label: 'Tanggal', render: (row) => row.date },
    {
        label: 'Status',
        render: (row) => (
            <StatusToggle initial={row.active} label={`Info ${row.id}`} />
        ),
    },
    {
        label: 'Menu',
        render: () => (
            <RowActions>
                <Button variant="ghost">Ubah</Button>
                <Button variant="danger">Hapus</Button>
            </RowActions>
        ),
    },
];

function AnnouncementsPage() {
    return (
        <DataTable
            title="Informasi untuk peserta"
            rows={announcements}
            columns={announcementColumns}
            rowKey={(row) => String(row.id)}
            searchText={(row) => row.title}
            actions={<Button icon="plus">Tambah Informasi</Button>}
        />
    );
}

const fileColumns: Column<DownloadFile>[] = [
    {
        label: 'Jenis Ujian',
        render: (row) => <Badge tone="brand">{row.exam}</Badge>,
    },
    { label: 'Topik', render: (row) => row.topic },
    {
        label: 'File Name',
        render: (row) => (
            <span className="flex items-center gap-2 text-ink">
                <Icon name="document" className="h-4 w-4 text-slate-400" />
                {row.fileName}
            </span>
        ),
    },
    {
        label: 'Status',
        render: (row) => (
            <StatusToggle initial={row.active} label={row.fileName} />
        ),
    },
    {
        label: 'Link',
        render: () => (
            <RowActions>
                <Button variant="ghost">Unduh</Button>
                <Button variant="ghost">Ubah</Button>
            </RowActions>
        ),
    },
];

function downloadsPage(rows: DownloadFile[], kind: string) {
    return function DownloadsPage() {
        return (
            <DataTable
                title={`Daftar file ${kind}`}
                rows={rows}
                columns={fileColumns}
                rowKey={(row) => row.id}
                searchText={(row) => `${row.fileName} ${row.topic}`}
                filters={[
                    {
                        label: 'Jenis Ujian',
                        options: [...examTypes],
                        value: (row) => row.exam,
                    },
                ]}
                actions={<Button icon="plus">Upload File</Button>}
            />
        );
    };
}

const guestColumns: Column<GuestMessage>[] = [
    {
        label: 'Nama',
        render: (row) => (
            <span className="font-semibold text-ink">{row.name}</span>
        ),
    },
    { label: 'Email', render: (row) => row.email },
    { label: 'No Telpon', render: (row) => row.phone },
    {
        label: 'Pesan',
        render: (row) => (
            <span className="line-clamp-2 max-w-xs">{row.message}</span>
        ),
    },
    { label: 'Tanggal', render: (row) => row.date },
];

function GuestBookPage() {
    return (
        <DataTable
            title="Pesan buku tamu"
            rows={guestBook}
            columns={guestColumns}
            rowKey={(row) => String(row.id)}
            searchText={(row) => `${row.name} ${row.email} ${row.message}`}
        />
    );
}

const certificateColumns: Column<Certificate>[] = [
    { label: 'No', render: (row) => row.id },
    {
        label: 'Nama',
        render: (row) => (
            <span className="font-semibold text-ink">{row.name}</span>
        ),
    },
    { label: 'Judul Sertifikat', render: (row) => row.title },
    { label: 'Pengajar', render: (row) => row.teacher },
    { label: 'Tanda Tangan', render: (row) => row.signer },
    {
        label: 'QR Code',
        render: () => (
            <span className="grid h-8 w-8 grid-cols-3 gap-px rounded bg-white p-0.5 ring-1 ring-line">
                {[1, 0, 1, 0, 1, 1, 1, 0, 1].map((cell, index) => (
                    <span
                        key={index}
                        className={cell ? 'bg-ink' : 'bg-transparent'}
                    />
                ))}
            </span>
        ),
    },
    {
        label: 'Aksi',
        render: () => (
            <RowActions>
                <Button variant="ghost">Cetak PDF</Button>
                <Button variant="ghost">Ubah</Button>
            </RowActions>
        ),
    },
];

function CertificatesPage() {
    return (
        <DataTable
            title="Data sertifikat"
            rows={certificates}
            columns={certificateColumns}
            rowKey={(row) => String(row.id)}
            searchText={(row) => `${row.name} ${row.title}`}
            actions={<Button icon="plus">Buat Sertifikat</Button>}
        />
    );
}

const templateColumns: Column<CertificateTemplate>[] = [
    { label: 'No', render: (row) => row.id },
    {
        label: 'Judul',
        render: (row) => (
            <span className="font-semibold text-ink">{row.title}</span>
        ),
    },
    { label: 'Pengajar', render: (row) => row.teacher },
    { label: 'Tanda Tangan', render: (row) => row.signer },
    {
        label: 'Aksi',
        render: () => (
            <RowActions>
                <Button variant="ghost">Lihat</Button>
                <Button variant="ghost">Ubah</Button>
            </RowActions>
        ),
    },
];

function TemplatesPage() {
    return (
        <DataTable
            title="Template sertifikat"
            rows={certificateTemplates}
            columns={templateColumns}
            rowKey={(row) => String(row.id)}
            actions={<Button icon="plus">Tambah Template</Button>}
        />
    );
}

function Gallery({
    title,
    addLabel,
    items,
}: {
    title: string;
    addLabel: string;
    items: {
        key: string;
        label: string;
        caption: string;
        sub?: string;
        ratio?: string;
        tone?: 'brand' | 'ink' | 'slate';
    }[];
}) {
    return (
        <Card title={title} action={<Button icon="plus">{addLabel}</Button>}>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                    <figure
                        key={item.key}
                        className="rounded-2xl border border-line p-3"
                    >
                        <ImagePlaceholder
                            label={item.label}
                            ratio={item.ratio}
                            tone={item.tone}
                        />
                        <figcaption className="mt-3 flex items-center justify-between gap-2 text-xs">
                            <span className="min-w-0">
                                <span className="block truncate font-semibold text-ink">
                                    {item.caption}
                                </span>
                                {item.sub && (
                                    <span className="text-slate-500">
                                        {item.sub}
                                    </span>
                                )}
                            </span>
                            <RowActions>
                                <Button variant="ghost">Ubah</Button>
                                <Button variant="danger">Hapus</Button>
                            </RowActions>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </Card>
    );
}

function BackgroundsPage() {
    return (
        <Gallery
            title="Background sertifikat"
            addLabel="Tambah Background"
            items={backgrounds.map((name, index) => ({
                key: name,
                label: name,
                caption: name,
                ratio: 'aspect-[297/210]',
                tone: (['brand', 'slate', 'ink'] as const)[index % 3],
            }))}
        />
    );
}

function LogosPage() {
    return (
        <Gallery
            title="Logo instansi"
            addLabel="Tambah Logo"
            items={institutionLogos.map((name) => ({
                key: name,
                label: name,
                caption: name,
                ratio: 'aspect-[3/1]',
                tone: 'slate',
            }))}
        />
    );
}

function SignaturesPage() {
    return (
        <Gallery
            title="Tanda tangan"
            addLabel="Tambah Tanda Tangan"
            items={signatures.map((signature) => ({
                key: signature.name,
                label: signature.name,
                caption: signature.name,
                sub: signature.position,
                ratio: 'aspect-[3/1]',
                tone: 'slate',
            }))}
        />
    );
}

const adminColumns: Column<AdminUser>[] = [
    {
        label: 'UID',
        render: (row) => (
            <span className="font-mono text-xs text-slate-500">{row.uid}</span>
        ),
    },
    {
        label: 'Nama',
        render: (row) => (
            <span className="font-semibold text-ink">{row.name}</span>
        ),
    },
    { label: 'User ID', render: (row) => row.userId },
    {
        label: 'Access',
        render: (row) => (
            <Badge
                tone={
                    row.access === 'Admin'
                        ? 'brand'
                        : row.access === 'Koordinator'
                          ? 'amber'
                          : 'slate'
                }
            >
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

function AdminsPage() {
    return (
        <DataTable
            title="Data admin"
            rows={adminUsers}
            columns={adminColumns}
            rowKey={(row) => row.uid}
            searchText={(row) => `${row.name} ${row.userId}`}
            filters={[
                {
                    label: 'Access',
                    options: ['Admin', 'Koordinator', 'Editor'],
                    value: (row) => row.access,
                },
            ]}
            actions={<Button icon="plus">Tambah Admin</Button>}
        />
    );
}

function VisitorsPage() {
    const total = visitorStats.reduce((sum, row) => sum + row.total, 0);
    const max = Math.max(...visitorStats.map((row) => row.total));

    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
                <StatTile
                    label="Total akses"
                    value={total.toLocaleString('id-ID')}
                    icon="chart"
                    hint="Sejak 1 Januari 2026"
                />
                <StatTile
                    label="Pengunjung hari ini"
                    value="1.246"
                    icon="users"
                />
                <StatTile
                    label="Halaman terpopuler"
                    value={visitorStats[0].category}
                    icon="home"
                />
            </div>
            <Card title="Akses per halaman">
                <ul className="space-y-4">
                    {visitorStats.map((row) => (
                        <li key={row.category}>
                            <div className="mb-1.5 flex justify-between text-sm">
                                <span className="font-medium text-slate-700">
                                    {row.category}
                                </span>
                                <span className="text-slate-500 tabular-nums">
                                    {row.total.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-brand"
                                    style={{
                                        width: `${(row.total / max) * 100}%`,
                                    }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
}

function SlidesPage() {
    return (
        <Card
            title="Image slide halaman depan"
            action={<Button icon="plus">Tambah Slide</Button>}
        >
            <div className="grid gap-5 sm:grid-cols-2">
                {slides.map((slide, index) => (
                    <figure
                        key={slide.fileName}
                        className="rounded-2xl border border-line p-3"
                    >
                        <ImagePlaceholder
                            label={`Slide ${index + 1}`}
                            ratio="aspect-[16/6]"
                            tone={index % 2 === 0 ? 'brand' : 'ink'}
                        />
                        <figcaption className="mt-3 flex items-center justify-between gap-2 text-xs">
                            <span className="min-w-0">
                                <span className="block truncate font-semibold text-ink">
                                    {slide.fileName}
                                </span>
                                <span className="text-slate-500">
                                    Link: {slide.link}
                                </span>
                            </span>
                            <StatusToggle
                                initial={slide.active}
                                label={slide.fileName}
                            />
                        </figcaption>
                    </figure>
                ))}
            </div>
        </Card>
    );
}

function RunningTextPage() {
    return (
        <Card
            title="Daftar running text"
            action={<Button icon="plus">Tambah Text</Button>}
        >
            <ul className="divide-y divide-line">
                {runningTexts.map((item) => (
                    <li
                        key={item.id}
                        className="flex items-center justify-between gap-4 py-3"
                    >
                        <span className="flex gap-3 text-sm text-ink">
                            <span className="text-slate-400">{item.id}.</span>
                            {item.text}
                        </span>
                        <StatusToggle
                            initial={item.active}
                            label={`Running text ${item.id}`}
                        />
                    </li>
                ))}
            </ul>
        </Card>
    );
}

function FloatingVideosPage() {
    return (
        <Card
            title="Floating video"
            action={<Button icon="plus">Tambah Video</Button>}
        >
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {floatingVideos.map((video) => (
                    <figure
                        key={video.id}
                        className="rounded-2xl border border-line p-3"
                    >
                        <ImagePlaceholder label="▶  Video" tone="ink" />
                        <figcaption className="mt-3 space-y-2 text-xs">
                            <span className="block font-semibold text-ink">
                                {video.title}
                            </span>
                            <span className="block truncate text-slate-500">
                                {video.link}
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
        </Card>
    );
}

export const contentSystemPages: AdminPageMap = {
    informasi: {
        description: 'Pengumuman yang tampil di halaman peserta.',
        Component: AnnouncementsPage,
    },
    'unduh-materi': {
        description: 'File materi yang bisa diunduh peserta per topik.',
        Component: downloadsPage(materialFiles, 'materi'),
    },
    'unduh-peraturan': {
        description: 'File peraturan pasar modal untuk diunduh peserta.',
        Component: downloadsPage(regulationFiles, 'peraturan'),
    },
    'unduh-dokumentasi': {
        description: 'File dokumentasi kegiatan untuk diunduh peserta.',
        Component: downloadsPage(documentationFiles, 'dokumentasi'),
    },
    'buku-tamu': {
        description: 'Pesan yang dikirim pengunjung melalui buku tamu.',
        Component: GuestBookPage,
    },
    'data-sertifikat': {
        description: 'Sertifikat yang sudah diterbitkan untuk peserta.',
        Component: CertificatesPage,
    },
    'template-sertifikat': {
        description: 'Template sertifikat per program pelatihan.',
        Component: TemplatesPage,
    },
    'background-sertifikat': {
        description: 'Gambar latar yang dipakai pada sertifikat.',
        Component: BackgroundsPage,
    },
    'logo-sertifikat': {
        description: 'Logo instansi yang dicetak pada sertifikat.',
        Component: LogosPage,
    },
    'tanda-tangan': {
        description: 'Tanda tangan pejabat yang dicetak pada sertifikat.',
        Component: SignaturesPage,
    },
    'data-admin': {
        description:
            'Akun admin, koordinator, dan editor beserta hak aksesnya.',
        Component: AdminsPage,
    },
    visitor: {
        description: 'Statistik kunjungan per halaman website.',
        Component: VisitorsPage,
    },
    'image-slide': {
        description: 'Gambar slide yang tampil di halaman depan.',
        Component: SlidesPage,
    },
    'running-text': {
        description: 'Teks berjalan yang tampil di website.',
        Component: RunningTextPage,
    },
    'floating-video': {
        description: 'Video mengambang yang tampil di halaman website.',
        Component: FloatingVideosPage,
    },
};
