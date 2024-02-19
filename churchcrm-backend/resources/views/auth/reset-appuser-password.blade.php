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
        <div class="form-section">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">{{ __('Reset Password') }}</div>

                            <div class="card-body">
                                <form method="POST" action="{{ route('appuser_reset_password') }}">
                                    @csrf

                                    <input type="hidden" name="token" value="{{ $token }}">
                                    <input type="hidden" name="email" value="{{ $email }}">

                                    <div class="form-group row mb-4">
                                        <label for="password"
                                            class="col-md-4 col-form-label text-md-right">{{ __('New Password') }}</label>
                                        <div class="col-md-6">
                                            <input id="password" type="password" class="form-control" name="password"
                                                required autocomplete="new-password" placeholder="New Password">

                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="password-confirm"
                                            class="col-md-4 col-form-label text-md-right">{{ __('Confirm Password') }}</label>
                                        <div class="col-md-6">
                                            <input id="password-confirm" type="password" class="form-control"
                                                name="password_confirmation" required autocomplete="new-password"
                                                placeholder="Confirm Password">
                                        </div>
                                    </div>

                                    <div class="form-group row mb-0 mt-2">
                                        <div class="col-md-6 offset-md-4">
                                            <button type="submit" class="btn btn-primary">
                                                {{ __('Reset Password') }}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="assets/js/passworddisplay.js"></script>
</body>

</html>
