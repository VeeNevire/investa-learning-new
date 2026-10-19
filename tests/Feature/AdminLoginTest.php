<?php

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;

test('admin signs in through the backend API with an md5 password', function () {
    Http::fake([
        '*/admin/login' => Http::response([
            'count' => 1,
            'data' => ['idg' => 'A001', 'namag' => 'Admin Investa', 'access' => 'admin'],
        ]),
    ]);

    $this->post(route('admin.login.store'), ['username' => 'admin', 'password' => 'rahasia'])
        ->assertRedirect(route('admin.dashboard'))
        ->assertSessionHas('admin', ['id' => 'A001', 'name' => 'Admin Investa', 'access' => 'admin']);

    Http::assertSent(fn (Request $request) => $request['username'] === 'admin'
        && $request['password'] === md5('rahasia'));
});

test('wrong admin credentials show an error', function () {
    Http::fake(['*/admin/login' => Http::response(['count' => 0])]);

    $this->post(route('admin.login.store'), ['username' => 'admin', 'password' => 'salah'])
        ->assertSessionHasErrors('username')
        ->assertSessionMissing('admin');
});

test('an unreachable backend shows a friendly error', function () {
    Http::fake(['*/admin/login' => fn () => throw new ConnectionException('timeout')]);

    $this->post(route('admin.login.store'), ['username' => 'admin', 'password' => 'rahasia'])
        ->assertSessionHasErrors(['username' => 'Server data tidak dapat dihubungi. Coba lagi beberapa saat lagi.']);
});

test('admin logout clears the session', function () {
    $this->withSession(['admin' => ['id' => '1', 'name' => 'Admin', 'access' => 'admin']])
        ->post(route('admin.logout'))
        ->assertRedirect(route('admin.login'))
        ->assertSessionMissing('admin');
});
