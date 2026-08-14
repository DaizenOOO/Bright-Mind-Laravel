<?php

use Inertia\Testing\AssertableInertia as Assert;

test('public landing page renders the production welcome experience', function () {
    $response = $this->get(route('home'));

    $response->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('welcome')
        ->where('auth.user', null)
    );
});

test('public sign in route remains available', function () {
    $this->get(route('login'))->assertOk();
});
