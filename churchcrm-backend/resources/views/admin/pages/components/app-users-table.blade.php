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
                                <button id="update-user-button " class="view-button" data-userId={{ $user->id }}
                                    onclick="openUserModal({{ $user->id }}, '{{ $user->name }}', '{{ $user->email }}')">
                                    <span class="view-text">View</span>
                                </button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@include('admin.pages.users.components.update-user-modal')
