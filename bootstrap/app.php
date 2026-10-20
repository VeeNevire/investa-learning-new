<?php

use App\Exceptions\InvestaApiUnavailable;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias(['admin' => EnsureUserIsAdmin::class]);
        $middleware->redirectGuestsTo(fn (Request $request) => $request->is('admin', 'admin/*') ? route('admin.login') : route('login')
        );
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );

        // Admin pages read everything from the backend API; when it is down,
        // show that inside the admin layout instead of a server error.
        $exceptions->render(function (InvestaApiUnavailable $exception, Request $request) {
            if (! $request->is('admin', 'admin/*') || ! $request->session()->has('admin')) {
                return null;
            }

            return Inertia::render('admin/api-unavailable', ['message' => $exception->getMessage()])
                ->toResponse($request)
                ->setStatusCode(503);
        });
    })->create();
