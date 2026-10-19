<?php

use Inertia\Testing\AssertableInertia as Assert;

test('glossary page lists capital market terms', function () {
    $response = $this->get(route('glossary'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('glossary')
            ->has('terms', 209)
            ->has('terms.0', fn (Assert $term) => $term
                ->whereType('term', 'string')
                ->whereType('definition', 'string')
            )
        );
});
