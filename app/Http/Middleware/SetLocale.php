<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $supported = config('locales.supported', []);
        $locale = $request->user()?->preferred_locale
            ?? $request->session()->get('locale')
            ?? $request->cookie('bm_locale')
            ?? config('locales.fallback', 'en');

        if (! in_array($locale, $supported, true)) {
            $locale = config('locales.fallback', 'en');
        }

        App::setLocale($locale);

        return $next($request);
    }
}
