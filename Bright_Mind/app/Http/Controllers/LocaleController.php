<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Validation\Rule;

class LocaleController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'locale' => ['required', 'string', Rule::in(config('locales.supported'))],
        ]);

        $locale = $validated['locale'];
        $request->session()->put('locale', $locale);
        App::setLocale($locale);

        if ($request->user()) {
            $request->user()->update(['preferred_locale' => $locale]);
        }

        return back()->withCookie(cookie(
            name: 'bm_locale',
            value: $locale,
            minutes: 60 * 24 * 365,
            secure: $request->isSecure(),
            httpOnly: true,
            sameSite: 'lax',
        ));
    }
}
