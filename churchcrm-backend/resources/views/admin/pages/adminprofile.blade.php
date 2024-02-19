<!DOCTYPE html>
<html lang="en">

<head>
    @include('admin.layout.head')
</head>

<body>
    @php
        $users = App\Models\User::all();
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
                <h1>Dashboard</h1>
                <hr>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="card-header bg-transparent" style="display: flex; justify-content: space-between;">
                        <h4>Web Users</h4>
                        <button id="update-user-button" class="btn btn-info" onclick="openAddUserModal()">
                            <i class="fa fa-user-plus"></i> Add New User
                        </button>
                    </div>
                    <div class="container">
                        @if (session('message'))
                            <div class="alert alert-success">
                                {{ session('message') }}
                            </div>
                        @endif
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Privileges</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                @foreach ($users as $user)
                                    <tr class="userId">
                                        <td class="username" data-username={{ $user->name }}>{{ $user->name }}
                                        </td>
                                        <td class="email" data-email={{ $user->email }}>{{ $user->email }}</td>
                                        <td class="phone" data-phone={{ $user->phone }}>{{ $user->phone }}</td>
                                        <td></td>
                                        <td>
                                            <a class="text-danger" href="#"
                                                onclick="deleteUser({{ $user->id }})">Delete</a>
                                            <button id="update-user-button" class="view-button"
                                                data-userId={{ $user->id }}
                                                onclick="openUserModal({{ $user->id }}, '{{ $user->name }}', '{{ $user->email }}')">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>

                    </div>
                    {{-- --User Modal- --}}
                    <div id="user-modal" class="modal">
                        <div class="modal-content">
                            <div class="modal-head">
                                <h4>{{ $user->name }}</h4>
                            </div>
                            <hr>
                            <div class="modal-body">
                                <form class="form" id="user-update-form" action="{{ url('/users', $user->id) }}"
                                    method="POST" enctype="multipart/form-data">
                                    @csrf
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Username</label>
                                        <input id="user-email" data-target="#username" type="email"
                                            class="form-control" name="email" value="{{ $user->email }}">
                                    </div>
                                    <div class="icon-password mb-3">
                                        <label for="password" class="form-label">Password</label>
                                        <input id="password" type="text" class="form-control int-bg" name="password"
                                            autocomplete="password">
                                        <div class="generator">
                                            <div class="password">
                                                <button class="button generate">Generate</button>
                                                <button class="button copy">Copy</button>
                                            </div>
                                            <div class="range">
                                                <input type="range" min="8" max="24" value="8" />
                                                <span>8</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <button type="submit" class="btn btn-primary">Update</button>
                                        </div>
                                        <div>
                                            <button type="button" onclick="closeUserModal()"
                                                class="btn btn-outline-primary">Cancel</button>
                                        </div>
                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>{{-- --User Modal- --}}
                    <div id="add-user-modal" class="modal">
                        <div class="modal-content">
                            <div class="modal-head">
                                <h4>{{ $user->name }}</h4>
                            </div>
                            <hr>
                            <div class="modal-body">
                                <form class="form" action="{{ route('admin-usr-register') }}" method="POST"
                                    enctype="multipart/form-data">
                                    @csrf
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Email</label>
                                        <input id="user-email" type="email" class="form-control" name="email">
                                    </div>

                                    <div class="icon-password mb-3">
                                        <label for="password" class="form-label">Password</label>
                                        <input id="inpassword" type="text" class="form-control int-bg"
                                            name="password" autocomplete="off">
                                    </div>

                                    <div class="icon-password mb-3">
                                        <label for="password_confirmation" class="form-label">Confirm
                                            Password</label>
                                        <input id="password_confirmation" type="text" class="form-control int-bg"
                                            name="password_confirmation" autocomplete="off">
                                    </div>

                                    <div class="icon-password mb-3">
                                        <div class="generator">
                                            <div class="password">
                                                <button class="button generate" type="button"
                                                    onclick="generatePassword()">Generate</button>
                                                <button class="button copy" type="button"
                                                    onclick="copyToClipboard()">Copy</button>
                                            </div>
                                            <div class="range">
                                                <input type="range" min="4" max="24" value="8"
                                                    id="passwordLength" onchange="updatePasswordLength()">
                                                <span id="passwordLengthValue">8</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <button type="submit" class="btn btn-primary">Update</button>
                                        </div>
                                        <div>
                                            <button type="button" onclick="closeAddUserModal()"
                                                class="btn btn-outline-primary">Cancel</button>
                                        </div>
                                    </div>
                                </form>

                                <script>
                                    function generatePassword() {
                                        var length = document.getElementById("passwordLength").value;
                                        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=";

                                        var password = "";

                                        for (var i = 0; i < length; i++) {
                                            var randomIndex = Math.floor(Math.random() * charset.length);
                                            password += charset.charAt(randomIndex);
                                        }

                                        document.getElementById("inpassword").value = password;
                                        document.getElementById("password_confirmation").value = password;
                                    }

                                    function copyToClipboard() {
                                        var passwordField = document.getElementById("inpassword");
                                        passwordField.select();
                                        document.execCommand("copy");
                                        alert("Password copied to clipboard!");
                                    }

                                    function updatePasswordLength() {
                                        var length = document.getElementById("passwordLength").value;
                                        document.getElementById("passwordLengthValue").innerText = length;
                                    }
                                </script>

                            </div>
                        </div>
                    </div>

                </div>
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
