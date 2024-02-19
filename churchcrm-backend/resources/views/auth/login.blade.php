<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ trans('Strings.name') }} - {{ Route::current()->uri() }}</title>
    <link rel="stylesheet" href="assets/css/auth.css">
    @include('admin.layout.head')
</head>

<body>
    <section>
        <div class="logo-section">
            <img class="logo_css" src="assets/images/logo/kcc-logo.png" alt="">
        </div>
        <div class="form-section">
            <x-validation-errors class="mb-4 text-danger" />
            <form method="POST" action="{{ route('login') }}">
                @csrf
                <div class="pb-3">
                    <h4 class="g-blue" style="font-weight: 400; font-size: 18px;">Login to dashboard</h4>
                </div>
                <div>
                    <input id="username" class="form-control int-bg" type="email" placeholder="Enter username"
                        name="email" required autofocus autocomplete="username" />
                </div>
                <div class="mt-4 icon-password">
                    <input id="password" class="form-control int-bg" type="password" placeholder="Passsword"
                        name="password" required autocomplete="current-password" />
                    <i id="passwordIcon" class="fa-solid fa-eye" onclick="displayPassword()"></i>


                </div>
                <div class="flex items-center justify-end mt-4">
                    <button class="btn btn-primary" style="width: 100px; font-size: 16px;">
                        Login
                    </button>
                </div>
            </form>
        </div>

    </section>
    <script src="assets/js/passworddisplay.js"></script>
</body>

</html>
