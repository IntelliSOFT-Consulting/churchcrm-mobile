<!DOCTYPE html>
<html lang="en">

<head>
    @include('admin.layout.head')
   

</head>

<body>
    @php
        $appusers = App\Models\AppUser::all();
        $webusers = App\Models\User::all();
    @endphp

    {{-- Header start --}}
    <header>
        @include('admin.layout.header')
    </header>
    <div class="main-container">
        <div class="navcontainer">
            @include('admin.layout.aside')
        </div>
        <div class="main">

            <div class="dashboard-header">
                <h1>Users</h1>
                <hr>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="card-header bg-transparent">
                        <h4>New App Users</h4>
                    </div>
                    <div class="table-responsive">

                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Membership Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($appusers as $user)
                                    <tr>
                                        <td>{{ $user->name }}</td>
                                        <td>{{ $user->email }}</td>
                                        <td>{{ $user->phone }}</td>
                                        <td>{{ $user->membership_status }}</td>
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
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="card-header bg-transparent">
                        <h4>New Web Users</h4>
                    </div>
                    <div class="table-responsive">

                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Membership Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($webusers as $user)
                                    <tr>
                                        <td>{{ $user->name }}</td>
                                        <td>{{ $user->email }}</td>
                                        <td>{{ $user->phone }}</td>
                                        <td>{{ $user->membership_status }}</td>
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
                </div>
            </div>
            {{-- User Modal --}}
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
                                <input id="user-email" data-target="#username" type="email" class="form-control"
                                    name="email" value="{{ $user->email }}">
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
                                        <input type="range" min="4" max="24" value="8" />
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
