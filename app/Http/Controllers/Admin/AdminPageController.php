<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AdminPageController extends Controller
{
    /**
     * Render an admin menu page by its slug (dummy data for the demo).
     */
    public function __invoke(string $page): Response
    {
        return Inertia::render('admin/page', [
            'page' => $page,
        ]);
    }
}
