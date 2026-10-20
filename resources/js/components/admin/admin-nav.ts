import type { IconName } from '@/components/admin/icon';
import admin from '@/routes/admin';

export type NavItem = { label: string; href: string };

export type NavGroup = {
    label: string;
    icon: IconName;
    // A group either links straight to a page or opens a list of items.
    href?: string;
    items?: NavItem[];
};

export type NavSection = { label: string; groups: NavGroup[] };

// Menu adapted from the old /admin panel (news menus left out on purpose).
export const mainSections: NavSection[] = [
    {
        label: 'Utama',
        groups: [
            {
                label: 'Dashboard',
                icon: 'home',
                href: admin.dashboard.url(),
            },
            {
                label: 'Peserta',
                icon: 'users',
                items: [
                    { label: 'Data Peserta', href: admin.dataPeserta.url() },
                    {
                        label: 'Card Background',
                        href: admin.cardBackground.url(),
                    },
                ],
            },
            {
                label: 'Pelajaran',
                icon: 'book',
                items: [
                    {
                        label: 'Data Pelajaran',
                        href: admin.dataPelajaran.url(),
                    },
                    {
                        label: 'Detail Latihan',
                        href: admin.detailLatihan.url(),
                    },
                    { label: 'Detail Tryout', href: admin.detailTryout.url() },
                    {
                        label: 'Video Conference',
                        href: admin.videoConference.url(),
                    },
                    {
                        label: 'Tambah Pelajaran',
                        href: admin.tambahPelajaran.url(),
                    },
                ],
            },
            {
                label: 'Bank Soal',
                icon: 'database',
                items: [
                    { label: 'Data Soal', href: admin.dataSoal.url() },
                    { label: 'Tambah Soal', href: admin.tambahSoal.url() },
                    { label: 'Upload Excel', href: admin.uploadExcel.url() },
                    { label: 'Soal Latihan', href: admin.soalLatihan.url() },
                    { label: 'Soal Tryout', href: admin.soalTryout.url() },
                ],
            },
            {
                label: 'Hasil Ujian',
                icon: 'chart',
                items: [
                    {
                        label: 'Informasi Hasil',
                        href: admin.informasiHasil.url(),
                    },
                    {
                        label: 'Laporan Tryout',
                        href: admin.laporanTryout.url(),
                    },
                ],
            },
            {
                label: 'Koordinator',
                icon: 'clipboard',
                items: [
                    { label: 'Materi Topik', href: admin.materiTopik.url() },
                    {
                        label: 'Materi Topik Detail',
                        href: admin.materiTopikDetail.url(),
                    },
                    {
                        label: 'Summary Hasil Peserta',
                        href: admin.summaryHasilPeserta.url(),
                    },
                ],
            },
        ],
    },
    {
        label: 'Konten',
        groups: [
            {
                label: 'Informasi',
                icon: 'document',
                items: [
                    { label: 'Data Informasi', href: admin.informasi.url() },
                    { label: 'Unduh Materi', href: admin.unduhMateri.url() },
                    {
                        label: 'Unduh Peraturan',
                        href: admin.unduhPeraturan.url(),
                    },
                    {
                        label: 'Unduh Dokumentasi',
                        href: admin.unduhDokumentasi.url(),
                    },
                ],
            },
            {
                label: 'Sertifikat',
                icon: 'badge',
                items: [
                    {
                        label: 'Data Sertifikat',
                        href: admin.dataSertifikat.url(),
                    },
                    { label: 'Template', href: admin.templateSertifikat.url() },
                    {
                        label: 'Background',
                        href: admin.backgroundSertifikat.url(),
                    },
                    { label: 'Logo', href: admin.logoSertifikat.url() },
                    { label: 'Tanda Tangan', href: admin.tandaTangan.url() },
                ],
            },
            {
                label: 'Buku Tamu',
                icon: 'book2',
                href: admin.bukuTamu.url(),
            },
        ],
    },
];

export const systemSection: NavSection = {
    label: 'Sistem',
    groups: [
        {
            label: 'Pengaturan',
            icon: 'cog',
            items: [
                { label: 'Data Admin', href: admin.dataAdmin.url() },
                { label: 'Visitor', href: admin.visitor.url() },
                { label: 'Image Slide', href: admin.imageSlide.url() },
                { label: 'Running Text', href: admin.runningText.url() },
                { label: 'Floating Video', href: admin.floatingVideo.url() },
            ],
        },
    ],
};
