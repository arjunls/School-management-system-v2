<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

/**
 * This is the custom RouteServiceProvider for the application.
 * It defines how the application routes are loaded.
 */
class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, etc.
     */
    public function boot(): void
    {
        info("Custom RouteServiceProvider booted!");
        parent::boot();

        //
    }

    /**
     * Define the routes for the application.
     */
    public function map(): void
    {
        info("Custom RouteServiceProvider map() called!");
        $this->mapApiRoutes();
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     */
    protected function mapApiRoutes(): void
    {
        info("Custom RouteServiceProvider mapApiRoutes() called!");
        Route::prefix('api')
             ->middleware('api')
             ->group(__DIR__.'/../../routes/api.php');
    }
}
