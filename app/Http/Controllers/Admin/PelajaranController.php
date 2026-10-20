<?php

namespace App\Http\Controllers\Admin;

use App\Services\InvestaApi;
use App\Services\InvestaLookups;
use App\Support\AdminTable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PelajaranController
{
    public function index(Request $request, InvestaApi $api): Response
    {
        $response = $api->get('admin/pelajaran/ListPelajaran/'.AdminTable::page($request));

        return Inertia::render('admin/pelajaran/data-pelajaran', [
            'table' => AdminTable::fromPaged($response, fn (array $row) => [
                'code' => (string) $row['kd_pelajaran'],
                'name' => (string) $row['nm_pelajaran'],
                'active' => (int) $row['status_pelajaran'] === 1,
            ]),
        ]);
    }

    public function latihan(Request $request, InvestaApi $api, InvestaLookups $lookups): Response
    {
        return $this->details('admin/pelajaran/detail-latihan', 'soal_latihan', $request, $api, $lookups);
    }

    public function tryout(Request $request, InvestaApi $api, InvestaLookups $lookups): Response
    {
        return $this->details('admin/pelajaran/detail-tryout', 'soal_ujian', $request, $api, $lookups);
    }

    public function videoConference(Request $request, InvestaApi $api): Response
    {
        $rows = collect(InvestaApi::rows($api->get('admin/vidcon/TampilJadwal')))
            ->map(fn (array $row) => [
                'id' => (int) $row['id_vidcon'],
                'title' => (string) $row['title'],
                'participants' => (int) $row['total_peserta'],
                'status' => (string) $row['status'],
                'schedule' => (string) $row['jadwal'],
                'teacher' => (string) $row['namag'],
                'room' => (string) $row['code'],
            ]);

        return Inertia::render('admin/pelajaran/video-conference', [
            'table' => AdminTable::fromCollection(
                $rows,
                $request,
                search: ['title', 'teacher', 'room'],
                filters: ['status'],
            ),
            'statusOptions' => $rows->pluck('status')->unique()->sort()->values()->all(),
        ]);
    }

    public function create(InvestaApi $api): Response
    {
        return Inertia::render('admin/pelajaran/tambah-pelajaran', [
            'nextCode' => (string) ($api->get('admin/pelajaran/lastCode')['number'] ?? ''),
        ]);
    }

    /**
     * Practice and TryOut packages share one layout; `$table` picks the set.
     */
    private function details(string $component, string $table, Request $request, InvestaApi $api, InvestaLookups $lookups): Response
    {
        $rows = collect(InvestaApi::rows($api->get('admin/pelajaran/detail/ListDetail/'.$table)))
            ->map(fn (array $row) => [
                'key' => "{$row['kd_pelajaran']}-{$row['jenis_ujian']}-{$row['kelas']}",
                'code' => (string) $row['kd_pelajaran'],
                'subject' => (string) $row['nm_pelajaran'],
                'examId' => (string) $row['jenis_ujian'],
                'exam' => (string) $row['jenis_ujian_desc'],
                'classId' => (string) $row['kelas'],
                'class' => (string) $row['kelas_desc'],
                'questions' => (int) $row['jml'],
                'minutes' => (int) $row['waktu'],
            ]);

        return Inertia::render($component, [
            'table' => AdminTable::fromCollection(
                $rows,
                $request,
                search: ['subject', 'code'],
                filters: ['examId', 'classId'],
            ),
            'examOptions' => InvestaLookups::options($lookups->examTypes()),
            'classOptions' => InvestaLookups::options($lookups->classes()),
        ]);
    }
}
