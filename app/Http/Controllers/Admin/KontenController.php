<?php

namespace App\Http\Controllers\Admin;

use App\Services\InvestaApi;
use App\Support\AdminTable;
use App\Support\ApiFormat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KontenController
{
    public function informasi(Request $request, InvestaApi $api): Response
    {
        $adminId = (string) $request->session()->get('admin.id');

        $rows = collect(InvestaApi::rows($api->get('admin/informasi/TampilInformasi/'.rawurlencode($adminId))))
            ->map(fn (array $row) => [
                'id' => (int) $row['id'],
                'title' => (string) ($row['judul'] ?? ''),
                'text' => ApiFormat::plain($row['info'] ?? '', 200),
            ]);

        return Inertia::render('admin/informasi/data-informasi', [
            'table' => AdminTable::fromCollection($rows, $request, search: ['title', 'text']),
        ]);
    }

    public function materi(Request $request, InvestaApi $api): Response
    {
        return $this->downloads('admin/informasi/unduh-materi', 'admin/materi/TampilMateri/', $request, $api);
    }

    public function peraturan(Request $request, InvestaApi $api): Response
    {
        return $this->downloads('admin/informasi/unduh-peraturan', 'admin/peraturan/TampilPeraturan/', $request, $api);
    }

    public function dokumentasi(Request $request, InvestaApi $api): Response
    {
        return $this->downloads('admin/informasi/unduh-dokumentasi', 'admin/dokumentasi/TampilDokumentasi/', $request, $api);
    }

    public function bukuTamu(Request $request, InvestaApi $api): Response
    {
        $rows = collect(InvestaApi::rows($api->get('admin/buku/tamu/tampil')))
            ->sortByDesc('tanggal')
            ->map(fn (array $row) => [
                'id' => (int) $row['id_btamu'],
                'name' => trim((string) $row['nama']),
                'email' => trim((string) $row['email']),
                'phone' => trim((string) $row['no_telp']),
                'message' => ApiFormat::plain($row['komentar'], 300),
                'date' => ApiFormat::date($row['tanggal']),
            ])
            ->values();

        return Inertia::render('admin/buku-tamu', [
            'table' => AdminTable::fromCollection($rows, $request, search: ['name', 'email', 'message']),
        ]);
    }

    /**
     * Materials, regulations and documentation share one table and the same
     * upload folder on the old site.
     */
    private function downloads(string $component, string $path, Request $request, InvestaApi $api): Response
    {
        $response = $api->get($path.AdminTable::page($request));

        return Inertia::render($component, [
            'table' => AdminTable::fromPaged($response, fn (array $row) => [
                'id' => (int) $row['no_materi'],
                'exam' => (string) $row['jenis_ujian_desc'],
                'topic' => (string) $row['topik'],
                'fileName' => (string) $row['file_name'],
                'url' => ApiFormat::asset('assets/materi', $row['link_url']),
                'active' => (int) $row['status_materi'] === 1,
            ]),
        ]);
    }
}
