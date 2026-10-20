<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Resend, Postmark, AWS, and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'investa_api' => [
        'url' => env('INVESTA_API_URL', 'http://127.0.0.1:3333/api/migrasi/'),
        'timeout' => (int) env('INVESTA_API_TIMEOUT', 10),
        // Images and files uploaded through the old site live on its server.
        'asset_url' => env('INVESTA_ASSET_URL', 'https://investaprima.com/public/'),
        // Excel report the old admin linked for its three "Koordinator" menus.
        'legacy_report_url' => env('INVESTA_LEGACY_REPORT_URL', 'http://103.241.24.180/adminTryOut/ExcelMateriTopikDetail.php'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

];
