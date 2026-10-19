<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Admins sign in through the backend API, so the session holds the admin, not the auth guard.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->session()->has('admin')) {
            return to_route('admin.login');
        }

        return $next($request);
    }
}
