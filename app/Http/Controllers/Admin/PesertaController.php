<?php

namespace App\Http\Controllers\Admin;

use App\Services\InvestaApi;
use App\Services\InvestaDirectory;
use App\Services\InvestaLookups;
use App\Support\AdminTable;
use App\Support\ApiFormat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PesertaController
{
    public function index(Request $request, InvestaDirectory $directory, InvestaLookups $lookups): Response
    {
        return Inertia::render('admin/peserta/data-peserta', [
            'table' => AdminTable::fromCollection(
                $directory->participants(),
                $request,
                search: ['name', 'userId', 'uid', 'institution'],
                filters: ['examId', 'classId', 'status'],
            ),
            'examOptions' => InvestaLookups::options($lookups->examTypes()),
            'classOptions' => InvestaLookups::options($lookups->classes()),
        ]);
    }

    public function cardBackground(InvestaApi $api): Response
    {
        $cards = collect(InvestaApi::rows($api->get('admin/peserta/background')))
            ->map(fn (array $row) => [
                'id' => (int) $row['id'],
                'uid' => (string) $row['uid_peserta'],
                'institution' => (string) $row['instansi'],
                'image' => ApiFormat::asset('image/peserta/background', $row['image']),
            ]);

        return Inertia::render('admin/peserta/card-background', [
            'cards' => $cards->values()->all(),
        ]);
    }
}
