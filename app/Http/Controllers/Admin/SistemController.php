<?php

namespace App\Http\Controllers\Admin;

use App\Services\InvestaApi;
use App\Support\AdminTable;
use App\Support\ApiFormat;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class SistemController
{
    public function admins(Request $request, InvestaApi $api): Response
    {
        $response = $api->get('admin/listAdmin/'.AdminTable::page($request));

        // Rows also carry the password hash (`passg`); only these fields are sent.
        return Inertia::render('admin/pengaturan/data-admin', [
            'table' => AdminTable::fromPaged($response, fn (array $row) => [
                'id' => (string) $row['idg'],
                'name' => (string) $row['namag'],
                'userId' => (string) $row['userg'],
                'access' => (string) $row['access'],
                'active' => $row['statusaktif'] === 'YES',
            ]),
        ]);
    }

    /**
     * Visits per site section: all time, for one month and for one day.
     */
    public function visitor(Request $request, InvestaApi $api): Response
    {
        $today = Carbon::now('Asia/Jakarta');
        $month = $request->string('bulan')->toString();
        $day = $request->string('tanggal')->toString();

        $month = preg_match('/^\d{4}-\d{2}$/', $month) ? $month : $today->format('Y-m');
        $day = preg_match('/^\d{4}-\d{2}-\d{2}$/', $day) ? $day : $today->format('Y-m-d');
        [$year, $monthNumber] = explode('-', $month);

        $categories = collect(InvestaApi::rows($api->get('admin/statistic/list')))
            ->map(fn (array $row) => [
                'id' => (int) $row['category_id'],
                'name' => (string) $row['category_desc'],
                'total' => (int) $row['total_akses'],
            ])
            ->sortByDesc('total')
            ->values();

        // The backend takes 10+ seconds for monthly and daily counts, so they
        // load after the page (in parallel) and are kept for a few minutes.
        return Inertia::render('admin/pengaturan/visitor', [
            'categories' => $categories->all(),
            'selected' => ['bulan' => $month, 'tanggal' => $day],
            'monthly' => Inertia::defer(
                fn () => $this->visits($api, "admin/statistic/monthly/{$year}/{$monthNumber}"),
                'monthly',
            ),
            'daily' => Inertia::defer(
                fn () => $this->visits($api, "admin/statistic/date/{$day}"),
                'daily',
            ),
        ]);
    }

    /**
     * Visits per category id for one month or day.
     *
     * @return array<int|string, int>
     */
    private function visits(InvestaApi $api, string $path): array
    {
        return $api->cached("visits:{$path}", 300, fn () => collect(InvestaApi::rows($api->get($path, timeout: 30)))
            ->mapWithKeys(fn (array $row) => [$row['category_id'] => (int) $row['akses']])
            ->all());
    }

    public function slides(Request $request, InvestaApi $api): Response
    {
        $response = $api->get('admin/slider/slide/'.AdminTable::page($request));

        return Inertia::render('admin/pengaturan/image-slide', [
            'table' => AdminTable::fromPaged($response, fn (array $row) => [
                'id' => (int) $row['no_image'],
                'name' => (string) $row['file_name'],
                'image' => ApiFormat::asset('assets/images/imageSlide', $row['link_url']),
                'active' => (int) $row['status_image'] === 1,
            ]),
        ]);
    }

    public function runningText(InvestaApi $api): Response
    {
        return Inertia::render('admin/pengaturan/running-text', [
            'items' => collect(InvestaApi::rows($api->get('admin/runningtext/')))
                ->map(fn (array $row) => [
                    'id' => (int) $row['id'],
                    'text' => (string) $row['text'],
                    'active' => $row['status'] === 'true',
                ])
                ->values()
                ->all(),
        ]);
    }

    public function floatingVideo(InvestaApi $api): Response
    {
        $settings = $api->get('home/floatingvideo/setting');

        return Inertia::render('admin/pengaturan/floating-video', [
            'videos' => collect(InvestaApi::rows($api->get('admin/floatingvideo/')))
                ->map(fn (array $row) => [
                    'id' => (int) $row['id'],
                    'title' => (string) $row['judul'],
                    'url' => 'https://www.youtube.com/watch?v='.rawurlencode((string) $row['link']),
                    'thumbnail' => 'https://i.ytimg.com/vi/'.rawurlencode((string) $row['link']).'/hqdefault.jpg',
                    'active' => (int) $row['status'] === 1,
                ])
                ->values()
                ->all(),
            'settings' => [
                'autoplay' => (bool) ($settings['autoplay'] ?? false),
                'mute' => (bool) ($settings['mute'] ?? false),
            ],
        ]);
    }
}
