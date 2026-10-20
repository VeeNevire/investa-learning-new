<?php

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia as Assert;

// Endpoints the admin pages read with POST. They only look data up.
const READ_POSTS = ['admin/bank/soal/ListSoal/', 'admin/data/soal/DataSoal', 'admin/hasil/ujian/tryout/detail'];

function paged(array $rows, int $total = 0, int $perPage = 20): array
{
    return [
        'total' => $total ?: count($rows),
        'perPage' => $perPage,
        'page' => 1,
        'lastPage' => (int) max(1, ceil(($total ?: count($rows)) / $perPage)),
        'data' => $rows,
    ];
}

function participant(int $number, array $overrides = []): array
{
    return [
        'uid' => "UID{$number}",
        'userid' => "user{$number}",
        'password' => 'secret-hash',
        'verification' => 'secret-code',
        'nama' => "Peserta {$number}",
        'institusi' => 'Bank Contoh',
        'email' => "peserta{$number}@example.com",
        'telepon' => '0812000000',
        'alamat' => 'Jl. Contoh',
        'tgl_daftar' => sprintf('2026-10-%02d 10:00:00', min(28, $number)),
        'statusaktif' => 'YES',
        'kelas' => 'I',
        'jenis_ujian' => 1,
        ...$overrides,
    ];
}

beforeEach(function () {
    Cache::flush();

    $this->admin = ['id' => 'IDG001', 'name' => 'Admin', 'access' => 'Admin'];

    $result = [
        'noujian' => 'U1',
        'uid' => 'UID1',
        'nama' => 'Peserta 1',
        'nm_pelajaran' => 'TryOut WPPE-A-01',
        'jenis_ujian_desc' => 'WPPE',
        'kelas_desc' => 'Biasa',
        'nilai_lulus' => 2,
        'nilai' => [['jawaban' => 1], ['jawaban' => 1], ['jawaban' => 0]],
    ];

    Http::fake([
        '*/admin/data/soal/JenisUjian' => Http::response([['jenis_ujian_id' => 1, 'jenis_ujian_desc' => 'WPPE']]),
        '*/admin/data/soal/Kelas' => Http::response([['kelas_id' => 'I', 'kelas_desc' => 'Biasa']]),
        '*/admin/data/soal/MateriPelajaran' => Http::response([['kd_pelajaran' => 'P001', 'nm_pelajaran' => 'Latihan WPPE']]),
        '*/admin/peserta/ListPeserta' => Http::response([
            'data' => [],
            'dataku' => [
                participant(1),
                participant(2, ['nama' => 'Siti Aminah', 'statusaktif' => 'NO']),
                ...array_map(fn ($n) => participant($n), range(3, 25)),
            ],
        ]),
        '*/admin/peserta/background' => Http::response(['data' => [['id' => 1, 'uid_peserta' => 'UID1', 'instansi' => 'UNY', 'image' => 'card.png']]]),
        '*/admin/pelajaran/ListPelajaran/*' => Http::response(paged([['kd_pelajaran' => 'P001', 'nm_pelajaran' => 'Latihan WPPE', 'status_pelajaran' => 1]], 86)),
        '*/admin/pelajaran/detail/ListDetail/*' => Http::response([[
            'kd_pelajaran' => 'P001', 'nm_pelajaran' => 'Latihan WPPE', 'jenis_ujian' => 1,
            'jenis_ujian_desc' => 'WPPE', 'kelas' => 'I', 'kelas_desc' => 'Biasa', 'jml' => 50, 'waktu' => 120,
        ]]),
        '*/admin/vidcon/TampilJadwal' => Http::response(['data' => [[
            'id_vidcon' => 1, 'title' => 'WAPERD-1', 'total_peserta' => 3, 'status' => 'Belum',
            'jadwal' => 'Wednesday, March 24, 2021 12:00 AM', 'namag' => 'Tunggul', 'code' => 'waperd-1',
        ]]]),
        '*/admin/pelajaran/lastCode' => Http::response(['number' => 'P087']),
        '*/admin/bank/soal/MataPelajaran' => Http::response([['kd_soal_statis' => 'AKF']]),
        '*/admin/bank/soal/ListSoal/*' => Http::response(paged([[
            'kd_soal' => 'S1', 'kd_soal_statis' => 'AKF1', 'soal' => '<p>Berapa <b>beta</b>?</p>',
            'kunci' => 'B', 'keterangan' => 'BUKU 1',
        ]], 4156, 35)),
        '*/admin/data/soal/DataSoal' => Http::response(['data' => [[
            'kd_soal' => 'S1', 'kd_soal_statis' => 'AKF1', 'no_urut' => 1, 'soal_len' => '<p>Soal</p>', 'kunci' => 'A', 'waktu' => 1,
        ]], 'waktu' => 0]),
        '*/admin/hasil/ujian/tampil/*' => Http::response(paged([$result], 8923, 30)),
        '*/admin/hasil/ujian/tryout/tampil/*' => Http::response([['kd_pelajaran' => 'P029', 'kelas' => 'II', 'jenis_ujian' => 3, 'nm_pelajaran' => 'TryOut WMI-A-01']]),
        '*/admin/hasil/ujian/tryout/detail' => Http::response([[
            'kd_soal' => 'S73', 'kd_soal_statis' => 'AES002', 'no_urut' => 56, 'soal_len' => '<p>Harga warrant</p>',
            'hasil' => ['total_peserta' => 4, 'jawab_benar' => 1],
        ]]),
        '*/admin/informasi/TampilInformasi/*' => Http::response([['id' => 3, 'idg' => 'IDG001', 'judul' => 'Ujian', 'info' => 'Ujian dilaksanakan']]),
        '*/admin/materi/TampilMateri/*' => Http::response(paged([['no_materi' => 1, 'jenis_ujian_desc' => 'WAPERD', 'topik' => 'Silabus', 'file_name' => 'Silabus', 'link_url' => 'silabus waperd.pdf', 'status_materi' => 1]])),
        '*/admin/peraturan/TampilPeraturan/*' => Http::response(paged([])),
        '*/admin/dokumentasi/TampilDokumentasi/*' => Http::response(paged([])),
        '*/admin/buku/tamu/tampil' => Http::response([['id_btamu' => 1, 'nama' => 'Tamu', 'email' => 'tamu@example.com', 'no_telp' => '0812', 'komentar' => 'Halo', 'tanggal' => '2020-08-09T17:00:00.000Z']]),
        '*/admin/sertifikat/list' => Http::response(['data' => [[
            'id' => 1, 'nama' => 'Alif', 'userid' => 'alif', 'judul' => 'Pelatihan WMI', 'pengajar' => 'Tunggul',
            'nama_ttd1' => 'A', 'nama_ttd2' => 'B', 'status' => 1,
        ]]]),
        '*/admin/sertifikat/template' => Http::response(['data' => [['id' => 1, 'judul' => 'WMI', 'pengajar' => 'Tunggul', 'ttd_1' => 'A', 'ttd_2' => 'B', 'nama_background' => 'Default', 'background' => 'bg.jpg']]]),
        '*/admin/background/list' => Http::response([['id' => 1, 'nama_background' => 'Default', 'background' => 'bg.jpg', 'status' => 1]]),
        '*/admin/logo/list' => Http::response([['id' => 1, 'nama_logo' => 'Logo', 'logo' => 'logo.jpg', 'status' => 1]]),
        '*/admin/ttd/list' => Http::response([['id' => 1, 'nama_ttd' => 'A', 'jabatan' => 'Direktur', 'ttd' => 'ttd.jpg', 'status' => 1]]),
        '*/admin/listAdmin/*' => Http::response(paged([[
            'idg' => 'IDG001', 'namag' => 'Tunggul', 'userg' => 'tunggul', 'passg' => 'secret-hash', 'access' => 'Admin', 'statusaktif' => 'YES',
        ]], 101)),
        '*/admin/statistic/list' => Http::response(['data' => [['category_id' => 1, 'category_desc' => 'Local', 'total_akses' => 1558684]]]),
        '*/admin/statistic/monthly/*' => Http::response(['data' => [['category_id' => 1, 'akses' => 58]]]),
        '*/admin/statistic/date/*' => Http::response(['data' => [['category_id' => 1, 'akses' => 2]]]),
        '*/admin/slider/slide/*' => Http::response(paged([['no_image' => 10, 'file_name' => 'Investa', 'link_url' => 'investa.jpg', 'status_image' => 0]])),
        '*/admin/runningtext/' => Http::response([['id' => 10, 'text' => 'Selamat Tahun Baru', 'status' => 'false']]),
        '*/admin/floatingvideo/' => Http::response(['status' => 200, 'count' => 1, 'data' => [['id' => 2, 'judul' => 'Video', 'link' => 'AsdzdXg63Cg', 'status' => 0]]]),
        '*/home/floatingvideo/setting' => Http::response(['autoplay' => 1, 'mute' => 0, 'video' => []]),
    ]);
});

test('every admin menu renders its own page', function (string $route, string $component) {
    $response = $this->withSession(['admin' => $this->admin])->get(route($route));

    $response->assertOk()->assertInertia(fn (Assert $page) => $page->component($component));

    // Password hashes and verification codes from the backend never reach the page.
    expect($response->getContent())
        ->not->toContain('secret-hash')
        ->not->toContain('secret-code');
})->with([
    ['admin.dashboard', 'admin/dashboard'],
    ['admin.data-peserta', 'admin/peserta/data-peserta'],
    ['admin.card-background', 'admin/peserta/card-background'],
    ['admin.data-pelajaran', 'admin/pelajaran/data-pelajaran'],
    ['admin.detail-latihan', 'admin/pelajaran/detail-latihan'],
    ['admin.detail-tryout', 'admin/pelajaran/detail-tryout'],
    ['admin.video-conference', 'admin/pelajaran/video-conference'],
    ['admin.tambah-pelajaran', 'admin/pelajaran/tambah-pelajaran'],
    ['admin.data-soal', 'admin/bank-soal/data-soal'],
    ['admin.tambah-soal', 'admin/bank-soal/tambah-soal'],
    ['admin.upload-excel', 'admin/bank-soal/upload-excel'],
    ['admin.soal-latihan', 'admin/bank-soal/soal-latihan'],
    ['admin.soal-tryout', 'admin/bank-soal/soal-tryout'],
    ['admin.informasi-hasil', 'admin/hasil-ujian/informasi-hasil'],
    ['admin.laporan-tryout', 'admin/hasil-ujian/laporan-tryout'],
    ['admin.materi-topik', 'admin/koordinator/materi-topik'],
    ['admin.materi-topik-detail', 'admin/koordinator/materi-topik-detail'],
    ['admin.summary-hasil-peserta', 'admin/koordinator/summary-hasil-peserta'],
    ['admin.informasi', 'admin/informasi/data-informasi'],
    ['admin.unduh-materi', 'admin/informasi/unduh-materi'],
    ['admin.unduh-peraturan', 'admin/informasi/unduh-peraturan'],
    ['admin.unduh-dokumentasi', 'admin/informasi/unduh-dokumentasi'],
    ['admin.buku-tamu', 'admin/buku-tamu'],
    ['admin.data-sertifikat', 'admin/sertifikat/data-sertifikat'],
    ['admin.template-sertifikat', 'admin/sertifikat/template-sertifikat'],
    ['admin.background-sertifikat', 'admin/sertifikat/background-sertifikat'],
    ['admin.logo-sertifikat', 'admin/sertifikat/logo-sertifikat'],
    ['admin.tanda-tangan', 'admin/sertifikat/tanda-tangan'],
    ['admin.data-admin', 'admin/pengaturan/data-admin'],
    ['admin.visitor', 'admin/pengaturan/visitor'],
    ['admin.image-slide', 'admin/pengaturan/image-slide'],
    ['admin.running-text', 'admin/pengaturan/running-text'],
    ['admin.floating-video', 'admin/pengaturan/floating-video'],
]);

test('admin pages only read from the backend', function () {
    $this->withSession(['admin' => $this->admin]);

    foreach (['admin.dashboard', 'admin.data-soal', 'admin.informasi-hasil', 'admin.data-admin'] as $route) {
        $this->get(route($route))->assertOk();
    }
    $this->get(route('admin.soal-latihan', ['pelajaran' => 'P001', 'jenis' => '1', 'kelas' => 'I']))->assertOk();
    $this->get(route('admin.laporan-tryout', ['paket' => 'P029|3|II', 'ke' => 2]))->assertOk();

    Http::assertNotSent(fn (Request $request) => str_starts_with($request->url(), config('services.investa_api.url'))
        && $request->method() !== 'GET'
        && ! collect(READ_POSTS)->contains(fn (string $path) => str_contains($request->url(), $path)));
});

test('participants are searched, filtered and paged on the server', function () {
    $this->withSession(['admin' => $this->admin])
        ->get(route('admin.data-peserta'))
        ->assertInertia(fn (Assert $page) => $page
            ->has('table.rows', 20)
            ->where('table.meta.total', 25)
            ->where('table.meta.lastPage', 2)
            ->where('table.rows.0.exam', 'WPPE')
            ->where('table.rows.0.class', 'Biasa')
            ->missing('table.rows.0.email')
            ->missing('table.rows.0.password')
        );

    $this->get(route('admin.data-peserta', ['q' => 'siti']))
        ->assertInertia(fn (Assert $page) => $page
            ->has('table.rows', 1)
            ->where('table.rows.0.name', 'Siti Aminah')
            ->where('table.query.q', 'siti')
        );

    $this->get(route('admin.data-peserta', ['status' => 'nonaktif']))
        ->assertInertia(fn (Assert $page) => $page->where('table.meta.total', 1));

    $this->get(route('admin.data-peserta', ['page' => 2]))
        ->assertInertia(fn (Assert $page) => $page
            ->has('table.rows', 5)
            ->where('table.meta.from', 21)
        );
});

test('dashboard summaries load after the page', function () {
    $this->withSession(['admin' => $this->admin])
        ->get(route('admin.dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->missing('participants')
            ->missing('exams')
            ->loadDeferredProps(fn (Assert $reload) => $reload
                ->where('participants.total', 25)
                ->where('participants.active', 24)
                ->where('participants.byExam.0', ['exam' => 'WPPE', 'count' => 25])
                ->has('participants.recent', 5)
                ->missing('participants.recent.0.email')
                ->where('exams.subjects', 86)
                ->where('exams.questions', 4156)
                ->where('exams.results', 8923)
                ->where('exams.recentResults.0.score', 2)
            )
        );
});

test('visitor counts per month and day load after the page', function () {
    $this->withSession(['admin' => $this->admin])
        ->get(route('admin.visitor', ['bulan' => '2026-10', 'tanggal' => '2026-10-19']))
        ->assertInertia(fn (Assert $page) => $page
            ->where('categories.0.total', 1558684)
            ->where('selected', ['bulan' => '2026-10', 'tanggal' => '2026-10-19'])
            ->loadDeferredProps(fn (Assert $reload) => $reload
                ->where('monthly.1', 58)
                ->where('daily.1', 2)
            )
        );

    Http::assertSent(fn (Request $request) => str_ends_with($request->url(), 'admin/statistic/monthly/2026/10'));
    Http::assertSent(fn (Request $request) => str_ends_with($request->url(), 'admin/statistic/date/2026-10-19'));
});

test('exam results are scored from the answers', function () {
    $this->withSession(['admin' => $this->admin])
        ->get(route('admin.informasi-hasil'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('table.meta.total', 8923)
            ->where('table.rows.0.score', 2)
            ->where('table.rows.0.passed', true)
            ->missing('table.rows.0.nilai')
        );
});

test('question text is sent as plain text', function () {
    $this->withSession(['admin' => $this->admin])
        ->get(route('admin.data-soal'))
        ->assertInertia(fn (Assert $page) => $page->where('table.rows.0.text', 'Berapa beta?'));
});

test('package questions wait until subject, exam type and class are chosen', function () {
    $this->withSession(['admin' => $this->admin])
        ->get(route('admin.soal-tryout', ['pelajaran' => 'P001']))
        ->assertInertia(fn (Assert $page) => $page->where('table', null));

    $this->get(route('admin.soal-tryout', ['pelajaran' => 'P001', 'jenis' => '1', 'kelas' => 'I']))
        ->assertInertia(fn (Assert $page) => $page
            ->has('table.rows', 1)
            ->where('table.query.pelajaran', 'P001')
        );

    Http::assertSent(fn (Request $request) => str_contains($request->url(), 'admin/data/soal/DataSoal')
        && $request['table'] === 'tryout');
});

test('uploaded files link to the old site', function () {
    $this->withSession(['admin' => $this->admin])
        ->get(route('admin.unduh-materi'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('table.rows.0.url', 'https://investaprima.com/public/assets/materi/silabus%20waperd.pdf')
        );
});

test('an unreachable backend shows a notice inside the admin panel', function () {
    Http::fake(['*' => fn () => throw new ConnectionException('timeout')]);

    $this->withSession(['admin' => $this->admin])
        ->get(route('admin.data-pelajaran'))
        ->assertStatus(503)
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/api-unavailable')
            ->where('message', 'Server data tidak dapat dihubungi. Coba lagi beberapa saat lagi.')
        );
});

test('admin pages redirect guests to the admin login', function () {
    $this->get(route('admin.dashboard'))->assertRedirect(route('admin.login'));
    $this->get(route('admin.data-peserta'))->assertRedirect(route('admin.login'));
});

test('unknown admin pages are not found', function () {
    $this->withSession(['admin' => $this->admin])
        ->get('/admin/halaman-lain')
        ->assertNotFound();
});
