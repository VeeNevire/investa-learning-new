<?php

namespace App\Http\Controllers\Admin;

use App\Services\InvestaApi;
use App\Support\AdminTable;
use App\Support\ApiFormat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SertifikatController
{
    public function index(Request $request, InvestaApi $api): Response
    {
        // Every certificate (2,000+) arrives in one response.
        $rows = collect($api->cached('certificates', 60, fn () => collect(InvestaApi::rows($api->get('admin/sertifikat/list')))
            ->sortByDesc('id')
            ->map(fn (array $row) => [
                'id' => (int) $row['id'],
                'name' => (string) $row['nama'],
                'userId' => (string) $row['userid'],
                'title' => (string) $row['judul'],
                'teacher' => (string) $row['pengajar'],
                'signers' => collect([$row['nama_ttd1'] ?? null, $row['nama_ttd2'] ?? null])->filter()->unique()->implode(', '),
                'active' => (int) $row['status'] === 1,
            ])
            ->values()
            ->all()));

        return Inertia::render('admin/sertifikat/data-sertifikat', [
            'table' => AdminTable::fromCollection($rows, $request, search: ['name', 'userId', 'title', 'teacher']),
        ]);
    }

    public function template(Request $request, InvestaApi $api): Response
    {
        $rows = collect(InvestaApi::rows($api->get('admin/sertifikat/template')))
            ->map(fn (array $row) => [
                'id' => (int) $row['id'],
                'title' => (string) $row['judul'],
                'teacher' => (string) $row['pengajar'],
                'signers' => collect([$row['ttd_1'] ?? null, $row['ttd_2'] ?? null])->filter()->unique()->implode(', '),
                'background' => (string) ($row['nama_background'] ?? ''),
                'image' => ApiFormat::asset('assets/background', $row['background'] ?? null),
            ]);

        return Inertia::render('admin/sertifikat/template-sertifikat', [
            'table' => AdminTable::fromCollection($rows, $request, search: ['title', 'teacher']),
        ]);
    }

    public function background(InvestaApi $api): Response
    {
        return $this->gallery('admin/sertifikat/background-sertifikat', $api->get('admin/background/list'), fn (array $row) => [
            'id' => (int) $row['id'],
            'name' => (string) $row['nama_background'],
            'image' => ApiFormat::asset('assets/background', $row['background']),
            'active' => (int) $row['status'] === 1,
        ]);
    }

    public function logo(InvestaApi $api): Response
    {
        return $this->gallery('admin/sertifikat/logo-sertifikat', $api->get('admin/logo/list'), fn (array $row) => [
            'id' => (int) $row['id'],
            'name' => (string) $row['nama_logo'],
            'image' => ApiFormat::asset('assets/logo', $row['logo']),
            'active' => (int) $row['status'] === 1,
        ]);
    }

    public function tandaTangan(InvestaApi $api): Response
    {
        return $this->gallery('admin/sertifikat/tanda-tangan', $api->get('admin/ttd/list'), fn (array $row) => [
            'id' => (int) $row['id'],
            'name' => (string) $row['nama_ttd'],
            'position' => (string) ($row['jabatan'] ?? ''),
            'image' => ApiFormat::asset('assets/ttd', $row['ttd']),
            'active' => (int) $row['status'] === 1,
        ]);
    }

    /**
     * @param  array<mixed>  $rows
     * @param  callable(array<string, mixed>): array<string, mixed>  $map
     */
    private function gallery(string $component, array $rows, callable $map): Response
    {
        return Inertia::render($component, [
            'items' => collect(InvestaApi::rows($rows))->map($map)->values()->all(),
        ]);
    }
}
