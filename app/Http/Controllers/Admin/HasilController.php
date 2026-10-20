<?php

namespace App\Http\Controllers\Admin;

use App\Services\InvestaApi;
use App\Support\AdminTable;
use App\Support\ApiFormat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HasilController
{
    public function index(Request $request, InvestaApi $api): Response
    {
        $response = $api->get('admin/hasil/ujian/tampil/'.AdminTable::page($request));

        return Inertia::render('admin/hasil-ujian/informasi-hasil', [
            'table' => AdminTable::fromPaged($response, [self::class, 'result']),
        ]);
    }

    /**
     * Per-question share of correct answers for one TryOut package and attempt.
     * The package list depends on the signed-in admin, as in the old panel.
     */
    public function laporanTryout(Request $request, InvestaApi $api): Response
    {
        $adminId = (string) $request->session()->get('admin.id');

        $packages = collect(InvestaApi::rows($api->get('admin/hasil/ujian/tryout/tampil/'.rawurlencode($adminId))))
            ->map(fn (array $row) => [
                'value' => "{$row['kd_pelajaran']}|{$row['jenis_ujian']}|{$row['kelas']}",
                'label' => (string) $row['nm_pelajaran'],
            ])
            ->values();

        $package = $request->string('paket')->toString();
        $attempt = $request->integer('ke', 1);
        $selected = ['paket' => $package, 'ke' => (string) $attempt];
        $table = null;

        if ($packages->contains('value', $package) && $attempt >= 1 && $attempt <= 5) {
            [$subject, $examType, $class] = explode('|', $package);

            $rows = collect(InvestaApi::rows($api->read('admin/hasil/ujian/tryout/detail', [
                'kd_pelajaran' => $subject,
                'jenis_ujian' => $examType,
                'kelas' => $class,
                'ke' => $attempt,
                'uid' => $adminId,
            ])))
                ->sortBy('no_urut')
                ->map(fn (array $row) => [
                    'key' => (string) $row['kd_soal'],
                    'staticCode' => (string) $row['kd_soal_statis'],
                    'order' => (int) $row['no_urut'],
                    'text' => ApiFormat::plain($row['soal_len']),
                    'correct' => (int) data_get($row, 'hasil.jawab_benar', 0),
                    'total' => (int) data_get($row, 'hasil.total_peserta', 0),
                ])
                ->values();

            $table = AdminTable::fromCollection($rows, $request, search: ['staticCode', 'text']);
            $table['query'] += $selected;
        }

        return Inertia::render('admin/hasil-ujian/laporan-tryout', [
            'packageOptions' => $packages->all(),
            'selected' => $selected,
            'table' => $table,
        ]);
    }

    /**
     * One exam result. The backend sends every answer (`nilai`, up to 100
     * items); only the total score is kept: 1 point per correct answer.
     *
     * @param  array<string, mixed>  $row
     * @return array<string, mixed>
     */
    public static function result(array $row): array
    {
        $score = collect(InvestaApi::rows($row, 'nilai'))->sum(fn (array $answer) => (int) ($answer['jawaban'] ?? 0));
        $passing = (int) ($row['nilai_lulus'] ?? 0);

        return [
            'number' => (string) $row['noujian'],
            'examName' => (string) $row['nm_pelajaran'],
            'exam' => (string) $row['jenis_ujian_desc'],
            'class' => (string) $row['kelas_desc'],
            'uid' => (string) $row['uid'],
            'name' => (string) $row['nama'],
            'score' => $score,
            'passing' => $passing,
            'passed' => $score >= $passing,
        ];
    }
}
