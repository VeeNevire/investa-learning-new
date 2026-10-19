<?php

use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->admin = ['id' => '1', 'name' => 'Admin', 'access' => 'admin'];
});

test('admin dashboard renders', function () {
    $this->withSession(['admin' => $this->admin])
        ->get(route('admin.dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/dashboard'));
});

test('admin menu pages render by slug', function () {
    $this->withSession(['admin' => $this->admin])
        ->get(route('admin.page', 'data-peserta'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/page')
            ->where('page', 'data-peserta')
        );
});

test('admin pages redirect guests to the admin login', function () {
    $this->get(route('admin.dashboard'))->assertRedirect(route('admin.login'));
});

test('admin page slugs only accept lowercase words and dashes', function () {
    $this->withSession(['admin' => $this->admin])
        ->get('/admin/Data_Peserta')
        ->assertNotFound();
});
