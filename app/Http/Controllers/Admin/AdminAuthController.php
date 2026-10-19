<?php

namespace App\Http\Controllers\Admin;

use App\Exceptions\InvestaApiUnavailable;
use App\Services\InvestaApi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AdminAuthController
{
    public function create(Request $request): Response|RedirectResponse
    {
        if ($request->session()->has('admin')) {
            return to_route('admin.dashboard');
        }

        return Inertia::render('admin-auth');
    }

    public function store(Request $request, InvestaApi $api): RedirectResponse
    {
        $credentials = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        try {
            $admin = $api->adminLogin($credentials['username'], $credentials['password']);
        } catch (InvestaApiUnavailable $exception) {
            throw ValidationException::withMessages(['username' => $exception->getMessage()]);
        }

        if (! $admin) {
            throw ValidationException::withMessages([
                'username' => 'User ID atau password admin tidak sesuai.',
            ]);
        }

        $request->session()->regenerate();
        $request->session()->put('admin', $admin);

        return to_route('admin.dashboard');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return to_route('admin.login');
    }
}
