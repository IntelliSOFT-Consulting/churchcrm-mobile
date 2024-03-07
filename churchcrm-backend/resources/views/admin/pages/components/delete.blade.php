<style>
    .view-text {
        text-decoration: underline;
        color: blue;
        font-size: 12px;
    }
</style>


@if (Auth::user()->usertype == 1)
    @if ($user->usertype == 1)
        <button id="update-user-button" class="view-button" data-userId={{ $user->id }}
            onclick="openUserModal({{ $user->id }}, '{{ $user->name }}', '{{ $user->email }}')">
            <small class="view-text">View</small>
        </button>
    @else
        <a class="text-danger" href="#" onclick="deleteUser({{ $user->id }})">Delete</a>
        <button id="update-user-button" class="view-button" data-userId={{ $user->id }}
            onclick="openUserModal({{ $user->id }}, '{{ $user->name }}', '{{ $user->email }}')">
            <small class="view-text">View</small>
        </button>
    @endif
@else
    <button id="update-user-button" class="view-button" data-userId={{ $user->id }}
        onclick="openUserModal({{ $user->id }}, '{{ $user->name }}', '{{ $user->email }}')">
        <small class="view-text">View</small>
    </button>
@endif
