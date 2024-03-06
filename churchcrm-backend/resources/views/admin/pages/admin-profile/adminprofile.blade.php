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
                <h4>Web Users</h4>
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
                    @include('admin.pages.components.message-alert')
                    @include('admin.pages.components.web-users-table')
                    @include('admin.pages.components.new-user-modal')
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
