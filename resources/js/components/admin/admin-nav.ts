import type { IconName } from '@/components/admin/icon';
import admin from '@/routes/admin';

export type NavItem = { label: string; slug: string };

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
                    { label: 'Data Peserta', slug: 'data-peserta' },
                    { label: 'Card Background', slug: 'card-background' },
                ],
            },
            {
                label: 'Pelajaran',
                icon: 'book',
                items: [
                    { label: 'Data Pelajaran', slug: 'data-pelajaran' },
                    { label: 'Detail Latihan', slug: 'detail-latihan' },
                    { label: 'Detail Tryout', slug: 'detail-tryout' },
                    { label: 'Video Conference', slug: 'video-conference' },
                    { label: 'Tambah Pelajaran', slug: 'tambah-pelajaran' },
                ],
            },
            {
                label: 'Bank Soal',
                icon: 'database',
                items: [
                    { label: 'Data Soal', slug: 'data-soal' },
                    { label: 'Tambah Soal', slug: 'tambah-soal' },
                    { label: 'Upload Excel', slug: 'upload-excel' },
                    { label: 'Soal Latihan', slug: 'soal-latihan' },
                    { label: 'Soal Tryout', slug: 'soal-tryout' },
                ],
            },
            {
                label: 'Hasil Ujian',
                icon: 'chart',
                items: [
                    { label: 'Informasi Hasil', slug: 'informasi-hasil' },
                    { label: 'Laporan Tryout', slug: 'laporan-tryout' },
                ],
            },
            {
                label: 'Koordinator',
                icon: 'clipboard',
                items: [
                    { label: 'Materi Topik', slug: 'materi-topik' },
                    {
                        label: 'Materi Topik Detail',
                        slug: 'materi-topik-detail',
                    },
                    {
                        label: 'Summary Hasil Peserta',
                        slug: 'summary-hasil-peserta',
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
                    { label: 'Data Informasi', slug: 'informasi' },
                    { label: 'Unduh Materi', slug: 'unduh-materi' },
                    { label: 'Unduh Peraturan', slug: 'unduh-peraturan' },
                    { label: 'Unduh Dokumentasi', slug: 'unduh-dokumentasi' },
                ],
            },
            {
                label: 'Sertifikat',
                icon: 'badge',
                items: [
                    { label: 'Data Sertifikat', slug: 'data-sertifikat' },
                    { label: 'Template', slug: 'template-sertifikat' },
                    { label: 'Background', slug: 'background-sertifikat' },
                    { label: 'Logo', slug: 'logo-sertifikat' },
                    { label: 'Tanda Tangan', slug: 'tanda-tangan' },
                ],
            },
            {
                label: 'Buku Tamu',
                icon: 'book2',
                href: admin.page.url('buku-tamu'),
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
                { label: 'Data Admin', slug: 'data-admin' },
                { label: 'Visitor', slug: 'visitor' },
                { label: 'Image Slide', slug: 'image-slide' },
                { label: 'Running Text', slug: 'running-text' },
                { label: 'Floating Video', slug: 'floating-video' },
            ],
        },
    ],
};

export const itemUrl = (item: NavItem) => admin.page.url(item.slug);

// Finds the menu label for a placeholder page, e.g. "data-peserta".
export function findNavLabel(slug: string): string | null {
    for (const section of [...mainSections, systemSection]) {
        for (const group of section.groups) {
            if (group.href === admin.page.url(slug)) {
                return group.label;
            }

            const item = group.items?.find((entry) => entry.slug === slug);

            if (item) {
                return item.label;
            }
        }
    }

    return null;
}
