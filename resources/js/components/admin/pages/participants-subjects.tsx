import { router } from '@inertiajs/react';
import DataTable, {
    RowActions,
    StatusToggle,
} from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import {
    cardBackgrounds,
    examTypes,
    packages,
    participants,
    practiceDetails,
    subjects,
    tryoutDetails,
    videoConferences,
} from '@/components/admin/dummy';
import type {
    Participant,
    Subject,
    SubjectDetail,
    VideoConference,
} from '@/components/admin/dummy';
import type { AdminPageMap } from '@/components/admin/pages/types';
import admin from '@/routes/admin';
import {
    Badge,
    Button,
    Card,
    demoToast,
    fieldClass,
    FormField,
    ImagePlaceholder,
} from '@/components/admin/ui';

const participantColumns: Column<Participant>[] = [
    { label: 'No.', render: (_, index) => index + 1 },
    {
        label: 'UID',
        render: (row) => (
            <span className="font-mono text-xs text-slate-500">{row.uid}</span>
        ),
    },
    { label: 'User ID', render: (row) => row.userId },
    {
        label: 'Nama',
        render: (row) => (
            <span className="font-semibold text-ink">{row.name}</span>
        ),
    },
    { label: 'Institusi', render: (row) => row.institution },
    { label: 'Kelas', render: (row) => row.plan },
    {
        label: 'Jenis Ujian',
        render: (row) => <Badge tone="brand">{row.exam}</Badge>,
    },
    { label: 'Tgl. Registrasi', render: (row) => row.registered },
    {
        label: 'Status',
        render: (row) => (
            <StatusToggle initial={row.active} label={`Akun ${row.name}`} />
        ),
    },
    {
        label: 'Menu',
        render: () => (
            <RowActions>
                <Button variant="ghost">Detail</Button>
                <Button variant="ghost">Log</Button>
            </RowActions>
        ),
    },
];

function ParticipantsPage() {
    return (
        <DataTable
            rows={participants}
            columns={participantColumns}
            rowKey={(row) => row.uid}
            searchText={(row) =>
                `${row.name} ${row.userId} ${row.uid} ${row.institution}`
            }
            filters={[
                {
                    label: 'Jenis Ujian',
                    options: [...examTypes],
                    value: (row) => row.exam,
                },
                {
                    label: 'Kelas',
                    options: [...packages],
                    value: (row) => row.plan,
                },
                {
                    label: 'Status',
                    options: ['Aktif', 'Nonaktif'],
                    value: (row) => (row.active ? 'Aktif' : 'Nonaktif'),
                },
            ]}
            actions={
                <Button variant="secondary" icon="document">
                    Ekspor Excel
                </Button>
            }
        />
    );
}

function CardBackgroundsPage() {
    return (
        <Card
            title="Background kartu peserta"
            action={<Button icon="plus">Upload Background</Button>}
        >
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {cardBackgrounds.map((item, index) => (
                    <figure
                        key={item.institution}
                        className="rounded-2xl border border-line p-3"
                    >
                        <ImagePlaceholder
                            label={`Kartu ${item.institution}`}
                            ratio="aspect-[85/54]"
                            tone={index % 2 === 0 ? 'brand' : 'ink'}
                        />
                        <figcaption className="mt-3 flex items-center justify-between text-xs">
                            <span>
                                <span className="block font-semibold text-ink">
                                    {item.institution}
                                </span>
                                <span className="text-slate-500">
                                    Diunggah oleh {item.uploader}
                                </span>
                            </span>
                            <Button variant="danger">Hapus</Button>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </Card>
    );
}

const subjectColumns: Column<Subject>[] = [
    {
        label: 'Kd Pelajaran',
        render: (row) => (
            <span className="font-mono text-xs text-slate-500">{row.code}</span>
        ),
    },
    {
        label: 'Mata Pelajaran',
        render: (row) => (
            <span className="font-semibold text-ink">{row.name}</span>
        ),
    },
    {
        label: 'Status',
        render: (row) => (
            <StatusToggle
                initial={row.active}
                label={`Pelajaran ${row.name}`}
            />
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

function SubjectsPage() {
    return (
        <DataTable
            title="Daftar mata pelajaran"
            rows={subjects}
            columns={subjectColumns}
            rowKey={(row) => row.code}
            searchText={(row) => `${row.code} ${row.name}`}
            actions={
                <Button
                    icon="plus"
                    onClick={() =>
                        router.visit(admin.page.url('tambah-pelajaran'))
                    }
                >
                    Tambah Pelajaran
                </Button>
            }
        />
    );
}

const detailColumns = (kind: string): Column<SubjectDetail>[] => [
    {
        label: 'Mata Pelajaran',
        render: (row) => (
            <span className="font-semibold text-ink">{row.subject}</span>
        ),
    },
    {
        label: 'Jenis Ujian',
        render: (row) => <Badge tone="brand">{row.exam}</Badge>,
    },
    { label: 'Paket', render: (row) => row.plan },
    {
        label: 'Jumlah Soal',
        render: (row) => <span className="tabular-nums">{row.questions}</span>,
    },
    { label: 'Waktu', render: (row) => `${row.minutes} menit` },
    {
        label: 'Menu',
        render: () => (
            <RowActions>
                <Button variant="ghost">Lihat Soal {kind}</Button>
                <Button variant="ghost">Excel</Button>
            </RowActions>
        ),
    },
];

function detailPage(rows: SubjectDetail[], kind: string) {
    return function DetailPage() {
        return (
            <DataTable
                title={`Daftar mata pelajaran ${kind.toLowerCase()}`}
                rows={rows}
                columns={detailColumns(kind)}
                rowKey={(row) => row.id}
                searchText={(row) => `${row.subject} ${row.exam}`}
                filters={[
                    {
                        label: 'Jenis Ujian',
                        options: [...examTypes],
                        value: (row) => row.exam,
                    },
                ]}
            />
        );
    };
}

const conferenceTones = {
    Terjadwal: 'brand',
    Berlangsung: 'green',
    Selesai: 'slate',
} as const;

const conferenceColumns: Column<VideoConference>[] = [
    { label: 'No.', render: (row) => row.id },
    {
        label: 'Title',
        render: (row) => (
            <span className="font-semibold text-ink">{row.title}</span>
        ),
    },
    {
        label: 'Total Peserta',
        render: (row) => (
            <span className="tabular-nums">{row.participants}</span>
        ),
    },
    {
        label: 'Status',
        render: (row) => (
            <Badge tone={conferenceTones[row.status]}>{row.status}</Badge>
        ),
    },
    { label: 'Jadwal', render: (row) => row.schedule },
    { label: 'Guru', render: (row) => row.teacher },
    {
        label: 'Code Room',
        render: (row) => <span className="font-mono text-xs">{row.room}</span>,
    },
    {
        label: 'Aksi',
        render: () => (
            <RowActions>
                <Button variant="ghost">Peserta</Button>
                <Button variant="ghost">Ubah</Button>
            </RowActions>
        ),
    },
];

function VideoConferencePage() {
    return (
        <DataTable
            rows={videoConferences}
            columns={conferenceColumns}
            rowKey={(row) => String(row.id)}
            searchText={(row) => `${row.title} ${row.teacher} ${row.room}`}
            filters={[
                {
                    label: 'Status',
                    options: ['Terjadwal', 'Berlangsung', 'Selesai'],
                    value: (row) => row.status,
                },
            ]}
            actions={<Button icon="plus">Buat Video Conference</Button>}
        />
    );
}

function AddSubjectPage() {
    return (
        <Card className="max-w-2xl">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    demoToast('Pelajaran tersimpan (mode demo).');
                }}
                className="space-y-5"
            >
                <FormField label="Kode Pelajaran" hint="Contoh: PL09">
                    <input
                        type="text"
                        name="code"
                        defaultValue="PL09"
                        className={fieldClass}
                    />
                </FormField>
                <FormField label="Nama Pelajaran">
                    <input
                        type="text"
                        name="name"
                        placeholder="Contoh: Perpajakan Efek"
                        className={fieldClass}
                    />
                </FormField>
                <FormField label="Status">
                    <select name="status" className={fieldClass}>
                        <option>Aktif</option>
                        <option>Nonaktif</option>
                    </select>
                </FormField>
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover"
                    >
                        Simpan
                    </button>
                    <Button variant="secondary">Batal</Button>
                </div>
            </form>
        </Card>
    );
}

export const participantSubjectPages: AdminPageMap = {
    'data-peserta': {
        description:
            'Daftar peserta terdaftar beserta jenis ujian, kelas, dan status akun.',
        Component: ParticipantsPage,
    },
    'card-background': {
        description:
            'Gambar latar kartu peserta per instansi yang dipakai saat mencetak kartu.',
        Component: CardBackgroundsPage,
    },
    'data-pelajaran': {
        description: 'Mata pelajaran yang menjadi dasar bank soal dan TryOut.',
        Component: SubjectsPage,
    },
    'detail-latihan': {
        description:
            'Paket soal latihan per mata pelajaran, jenis ujian, dan paket.',
        Component: detailPage(practiceDetails, 'Latihan'),
    },
    'detail-tryout': {
        description:
            'Paket soal TryOut per mata pelajaran, jenis ujian, dan paket.',
        Component: detailPage(tryoutDetails, 'Tryout'),
    },
    'video-conference': {
        description:
            'Jadwal kelas video conference beserta pengajar dan peserta.',
        Component: VideoConferencePage,
    },
    'tambah-pelajaran': {
        description: 'Tambahkan mata pelajaran baru.',
        Component: AddSubjectPage,
    },
};
