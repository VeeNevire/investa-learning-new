<?php

namespace App\Http\Controllers\Admin;

use App\Services\InvestaApi;
use App\Services\InvestaDirectory;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController
{
    /**
     * The summaries come from slow backend reads (2+ seconds each), so they
     * load after the page in two parallel groups.
     */
    public function __invoke(InvestaApi $api, InvestaDirectory $directory): Response
    {
        return Inertia::render('admin/dashboard', [
            'participants' => Inertia::defer(fn () => $this->participants($directory), 'participants'),
            'exams' => Inertia::defer(fn () => $this->exams($api), 'exams'),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function participants(InvestaDirectory $directory): array
    {
        $participants = $directory->participants();

        return [
            'total' => $participants->count(),
            'active' => $participants->where('status', 'aktif')->count(),
            'byExam' => $participants
                ->countBy('exam')
                ->sortDesc()
                ->map(fn (int $count, string $exam) => ['exam' => $exam, 'count' => $count])
                ->values()
                ->all(),
            'recent' => $participants
                ->take(5)
                ->map(fn (array $row) => collect($row)->only(['uid', 'name', 'exam', 'class', 'status', 'registered'])->all())
                ->values()
                ->all(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function exams(InvestaApi $api): array
    {
        $results = $api->get('admin/hasil/ujian/tampil/1');

        return [
            'subjects' => (int) ($api->get('admin/pelajaran/ListPelajaran/1')['total'] ?? 0),
            'questions' => (int) ($api->read('admin/bank/soal/ListSoal/1', ['soal_statis' => '0'])['total'] ?? 0),
            'results' => (int) ($results['total'] ?? 0),
            'recentResults' => collect(InvestaApi::rows($results))
                ->take(5)
                ->map([HasilController::class, 'result'])
                ->values()
                ->all(),
        ];
    }
}
