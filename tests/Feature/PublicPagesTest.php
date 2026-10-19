<?php

use Inertia\Testing\AssertableInertia as Assert;

test('public pages render their component', function (string $route, string $component) {
    $this->get(route($route))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component($component));
})->with([
    'faq' => ['faq', 'faq'],
    'contact us' => ['contact', 'contact-us'],
    'service' => ['service', 'service'],
    'about us' => ['about', 'about-us'],
    'our team' => ['team', 'our-team'],
]);

test('login, register and forgot password share one page and open on their own tab', function (string $route, string $tab) {
    $this->get(route($route))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('auth')
            ->where('tab', $tab)
        );
})->with([
    'login' => ['login', 'login'],
    'register' => ['register', 'register'],
    'forgot password' => ['password.request', 'forgot'],
]);
