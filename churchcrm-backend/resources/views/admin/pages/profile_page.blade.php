<!DOCTYPE html>
<html lang="en">

<head>
    @include('admin.layout.head')
</head>

<body>
    @php
        $user = App\Models\User::where('id', Illuminate\Support\Facades\Auth::id())->first();
        $unencriptedPassword;
    @endphp
    <header>
        @include('admin.layout.header')
    </header>
    <div class="main-container">
        <div class="navcontainer">
            @include('admin.layout.aside')
        </div>
        <div class="main">
            <div class="dashboard-header">
                <h1>Profile</h1>
                <hr>
                @include('admin.pages.components.error')
               
                @include('admin.pages.components.message-alert')

            </div>

            <form class="form" action="{{ url('/update-profile', $user->id) }}" method="POST"
                enctype="multipart/form-data">
                @csrf

                <div class="form-group mb-4">
                    <div class="row">

                        <div class="image_display profile_display" id="image_display">
                            @if ($user->profile_photo_path)
                                <img src="{{ $user->profile_photo_path }}" alt="{{ $user->profile_photo_path }}">
                            @else
                                <img class="nav-profile-img mr-2" src="{{ Auth::user()->profile_photo_url }}"
                                    alt="{{ Auth::user()->name }}" />
                            @endif
                        </div>
                        <div class="col">
                            <div class="form-group mb-4">
                                <label for="Profile_photo" class="custom-file-upload mt-2 me-2">
                                    Upload A Profile </label>
                                <input type="file" class="file" name="Profile_photo" id="Profile_photo" />
                            </div>
                            @if ($user->profile_photo_path)
                                <div class="form-group mb-4">
                                    <label for="Profile_photo" class="custom-file-upload mt-2 me-2">
                                        Remove Photo
                                    </label>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="form-display">

                    <div class="mb-3">
                        <label for="email" class="form-label">UserName: </label>
                        <input type="text" class="form-control" name="name" required placeholder="email"
                            value="{{ $user->name }}">
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email: </label>
                        <input type="text" class="form-control" name="email" required placeholder="email"
                            value="{{ $user->email }}">
                    </div>
                    <div class="d-flex justify-content-between">
                        <div>
                            <button type="submit" class="btn btn-primary">Update</button>
                        </div>
                    </div>

                </div>
            </form>

            <hr>
            <div class="form-display">

                <form class="form" action="{{ url('/update-password', $user->id) }}" method="POST"
                    enctype="multipart/form-data">
                    @csrf
                    <div class="mb-3">
                        <h4>Change Password</h4>
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Current Password</label>
                        <input id="password" placeholder="Current Password" class="form-control int-bg" type="password"
                            name="password" required />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">New Password</label>
                        <input id="password" placeholder="New Password" class="form-control int-bg" type="password"
                            name="newpassword" required />
                    </div>

                    <div class="d-flex justify-content-between">
                        <div>
                            <button type="submit" class="btn btn-primary">Change Password</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
    {{-- scripts  --}}
    <script src="assets/js/script.js"></script>
    <script src="assets/js/usermodal.js"></script>
    <script src="assets/js/profilemodal.js"></script>
    @include('admin.layout.scripts')

</body>

</html>
