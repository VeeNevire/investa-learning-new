<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HasilController;
use App\Http\Controllers\Admin\KontenController;
use App\Http\Controllers\Admin\PelajaranController;
use App\Http\Controllers\Admin\PesertaController;
use App\Http\Controllers\Admin\SertifikatController;
use App\Http\Controllers\Admin\SistemController;
use App\Http\Controllers\Admin\SoalController;
use App\Http\Controllers\GlossaryController;
use App\Support\ApiFormat;
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
// Every page reads its data from the backend API (read-only for now: saving,
// editing and deleting still only show a demo notice).
Route::prefix('admin')->name('admin.')->middleware('admin')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');

    Route::get('data-peserta', [PesertaController::class, 'index'])->name('data-peserta');
    Route::get('card-background', [PesertaController::class, 'cardBackground'])->name('card-background');

    Route::get('data-pelajaran', [PelajaranController::class, 'index'])->name('data-pelajaran');
    Route::get('detail-latihan', [PelajaranController::class, 'latihan'])->name('detail-latihan');
    Route::get('detail-tryout', [PelajaranController::class, 'tryout'])->name('detail-tryout');
    Route::get('video-conference', [PelajaranController::class, 'videoConference'])->name('video-conference');
    Route::get('tambah-pelajaran', [PelajaranController::class, 'create'])->name('tambah-pelajaran');

    Route::get('data-soal', [SoalController::class, 'index'])->name('data-soal');
    Route::inertia('tambah-soal', 'admin/bank-soal/tambah-soal')->name('tambah-soal');
    Route::inertia('upload-excel', 'admin/bank-soal/upload-excel', [
        'templateUrl' => ApiFormat::asset('assets/example', 'example_ujian2.xlsx'),
    ])->name('upload-excel');
    Route::get('soal-latihan', [SoalController::class, 'latihan'])->name('soal-latihan');
    Route::get('soal-tryout', [SoalController::class, 'tryout'])->name('soal-tryout');

    Route::get('informasi-hasil', [HasilController::class, 'index'])->name('informasi-hasil');
    Route::get('laporan-tryout', [HasilController::class, 'laporanTryout'])->name('laporan-tryout');

    // The old panel only linked these three to an Excel report on the old server.
    foreach (['materi-topik', 'materi-topik-detail', 'summary-hasil-peserta'] as $report) {
        Route::inertia($report, "admin/koordinator/{$report}", [
            'reportUrl' => config('services.investa_api.legacy_report_url'),
        ])->name($report);
    }

    Route::get('informasi', [KontenController::class, 'informasi'])->name('informasi');
    Route::get('unduh-materi', [KontenController::class, 'materi'])->name('unduh-materi');
    Route::get('unduh-peraturan', [KontenController::class, 'peraturan'])->name('unduh-peraturan');
    Route::get('unduh-dokumentasi', [KontenController::class, 'dokumentasi'])->name('unduh-dokumentasi');
    Route::get('buku-tamu', [KontenController::class, 'bukuTamu'])->name('buku-tamu');

    Route::get('data-sertifikat', [SertifikatController::class, 'index'])->name('data-sertifikat');
    Route::get('template-sertifikat', [SertifikatController::class, 'template'])->name('template-sertifikat');
    Route::get('background-sertifikat', [SertifikatController::class, 'background'])->name('background-sertifikat');
    Route::get('logo-sertifikat', [SertifikatController::class, 'logo'])->name('logo-sertifikat');
    Route::get('tanda-tangan', [SertifikatController::class, 'tandaTangan'])->name('tanda-tangan');

    Route::get('data-admin', [SistemController::class, 'admins'])->name('data-admin');
    Route::get('visitor', [SistemController::class, 'visitor'])->name('visitor');
    Route::get('image-slide', [SistemController::class, 'slides'])->name('image-slide');
    Route::get('running-text', [SistemController::class, 'runningText'])->name('running-text');
    Route::get('floating-video', [SistemController::class, 'floatingVideo'])->name('floating-video');
});
