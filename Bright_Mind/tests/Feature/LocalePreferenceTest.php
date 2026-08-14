<?php

use App\Models\User;

it('persists a guest locale in the session and cookie', function () {
    $response = $this->from('/')->post(route('locale.update'), ['locale' => 'pl']);

    $response->assertRedirect('/');
    $response->assertPlainCookie('bm_locale', 'pl');
    expect(session('locale'))->toBe('pl');
});

it('persists an authenticated users preferred locale', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->from('/')
        ->post(route('locale.update'), ['locale' => 'it'])
        ->assertRedirect('/');

    expect($user->fresh()->preferred_locale)->toBe('it');
});

it('rejects unsupported locales', function () {
    $this->from('/')
        ->post(route('locale.update'), ['locale' => 'fr'])
        ->assertSessionHasErrors('locale');
});
