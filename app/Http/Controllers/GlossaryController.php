<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class GlossaryController extends Controller
{
    /**
     * Show the capital market glossary.
     */
    public function __invoke(): Response
    {
        /** @var list<array{term: string, definition: string}> $terms */
        $terms = File::json(resource_path('data/glossary.json'));

        return Inertia::render('glossary', [
            'terms' => $terms,
        ]);
    }
}
