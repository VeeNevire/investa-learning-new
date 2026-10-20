<?php

namespace App\Http\Controllers\Admin;

use App\Services\InvestaApi;
use App\Services\InvestaLookups;
use App\Support\AdminTable;
use App\Support\ApiFormat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SoalController
{
    public function index(Request $request, InvestaApi $api): Response
    {
        $group = $request->string('kelompok')->toString();

        // `soal_statis = 0` asks the backend for every group.
        $response = $api->read('admin/bank/soal/ListSoal/'.AdminTable::page($request), [
            'soal_statis' => $group !== '' ? $group : '0',
        ]);

        $groups = $api->cached('lookup:question-groups', 3600, fn () => collect(InvestaApi::rows($api->get('admin/bank/soal/MataPelajaran')))
            ->pluck('kd_soal_statis')
            ->filter()
            ->sort()
            ->values()
            ->all());

        return Inertia::render('admin/bank-soal/data-soal', [
            'table' => AdminTable::fromPaged($response, fn (array $row) => [
                'code' => (string) $row['kd_soal'],
                'staticCode' => (string) $row['kd_soal_statis'],
                'text' => ApiFormat::plain($row['soal']),
                'answer' => (string) $row['kunci'],
                'note' => (string) ($row['keterangan'] ?? ''),
            ], array_filter(['kelompok' => $group])),
            'groupOptions' => $groups,
        ]);
    }

    public function latihan(Request $request, InvestaApi $api, InvestaLookups $lookups): Response
    {
        return $this->examQuestions('admin/bank-soal/soal-latihan', 'latihan', $request, $api, $lookups);
    }

    public function tryout(Request $request, InvestaApi $api, InvestaLookups $lookups): Response
    {
        return $this->examQuestions('admin/bank-soal/soal-tryout', 'tryout', $request, $api, $lookups);
    }

    /**
     * Questions of one package. The backend needs subject, exam type and class
     * together, so the table stays empty until all three are chosen.
     */
    private function examQuestions(string $component, string $table, Request $request, InvestaApi $api, InvestaLookups $lookups): Response
    {
        $selected = [
            'pelajaran' => $request->string('pelajaran')->toString(),
            'jenis' => $request->string('jenis')->toString(),
            'kelas' => $request->string('kelas')->toString(),
        ];

        $tableProps = null;

        if (! in_array('', $selected, true)) {
            $rows = collect(InvestaApi::rows($api->read('admin/data/soal/DataSoal', [...$selected, 'table' => $table])))
                ->sortBy('no_urut')
                ->map(fn (array $row) => [
                    'code' => (string) $row['kd_soal'],
                    'staticCode' => (string) $row['kd_soal_statis'],
                    'order' => (int) $row['no_urut'],
                    'text' => ApiFormat::plain($row['soal_len']),
                    'answer' => (string) $row['kunci'],
                    'minutes' => (int) $row['waktu'],
                ])
                ->values();

            $tableProps = AdminTable::fromCollection($rows, $request, search: ['code', 'staticCode', 'text']);
            $tableProps['query'] += $selected;
        }

        return Inertia::render($component, [
            'selected' => $selected,
            'table' => $tableProps,
            'subjectOptions' => InvestaLookups::options($lookups->subjects()),
            'examOptions' => InvestaLookups::options($lookups->examTypes()),
            'classOptions' => InvestaLookups::options($lookups->classes()),
        ]);
    }
}
