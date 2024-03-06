@php
    $users = App\Models\User::all();
@endphp
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
                        @include('admin.pages.components.delete')
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@include('admin.pages.components.update-user-modal')
