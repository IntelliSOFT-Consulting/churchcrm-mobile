<?php
return [

    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'app_users' => [
            'driver' => 'sanctum',
            'provider' => 'app_users',
        ],
    ],

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        'app_users' => [
            'driver' => 'eloquent',
            'model' => App\Models\AppUser::class,
        ],
    ],

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 30,
            'throttle' => 30,
        ],
        'app_users' => [
            'provider' => 'app_users',
            'table' => 'password_reset_tokens',
            'expire' => 30,
            'throttle' => 30,
        ],
    ],

    'password_timeout' => 10800,

];
