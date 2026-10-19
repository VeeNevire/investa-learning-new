<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminPageController;
use App\Http\Controllers\GlossaryController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/faq', 'faq')->name('faq');
Route::get('/glossary', GlossaryController::class)->name('glossary');
Route::inertia('/contact-us', 'contact-us')->name('contact');
Route::inertia('/service', 'service')->name('service');
Route::inertia('/about-us', 'about-us')->name('about');
Route::inertia('/our-team', 'our-team')->name('team');

Route::inertia('/login', 'auth', ['tab' => 'login'])->name('login');
Route::inertia('/register', 'auth', ['tab' => 'register'])->name('register');
Route::inertia('/forgot-password', 'auth', ['tab' => 'forgot'])->name('password.request');

Route::get('/adminTryOut', [AdminAuthController::class, 'create'])->name('admin.login');
Route::post('/adminTryOut', [AdminAuthController::class, 'store'])->middleware('throttle:5,1')->name('admin.login.store');
Route::post('/admin/logout', [AdminAuthController::class, 'destroy'])->middleware('admin')->name('admin.logout');

// Admin panel, restricted to accounts explicitly marked as administrators.
Route::prefix('admin')->name('admin.')->middleware('admin')->group(function () {
    Route::inertia('/', 'admin/dashboard')->name('dashboard');
    Route::get('/{page}', AdminPageController::class)
        ->where('page', '[a-z-]+')
        ->name('page');
});
