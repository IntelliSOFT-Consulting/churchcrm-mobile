<div class="dashboard-header">
    <h1>Dashboard</h1>
    <hr>
</div>

{{-- card section --}}
<section>
    <div class="">
        <div class="row">
            <div class="col-md-4 col-xl-3">
                <div class="card">
                    <div class="card-block">
                        <h6>Web Users</h6>
                        <h2 class="f-start "><span>{{ $totalwebusers }}</span><i
                                class="fa fa-user ps-2"></i>
                        </h2>
                        <p class="f-right"><a href="{{ route('users') }}">View all</a></p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-xl-3">
                <div class="card">
                    <div class="card-block">
                        <h6>App Users</h6>
                        <h2 class="f-start "><span>{{ $totalappusers }}</span><i
                                class="fa fa-user ps-2"></i>
                        </h2>
                        <p class="f-right"><a href="{{ route('users') }}">View all</a></p>
                    </div>
                </div>
            </div>


            <div class="col-md-4 col-xl-3">
                <div class="card">
                    <div class="card-block">
                        <h6>Sermons</h6>
                        <h2 class="f-start "><span>{{ $totalsermons }}</span><i
                                class="fa fa-solid fa-book-bible ps-2"></i></h2>
                        <p class="f-right"><a href="{{ route('sermons') }}">View all</a></p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-xl-3">
                <div class="card ">
                    <div class="card-block">
                        <h6>Announcements</h6>
                        <h2 class="f-start "><span>{{ $totalannouncements }}</span><i
                                class="fa fa-solid fa-clipboard-list ps-2"></i>
                        </h2>
                        <p class="f-right"><a href="{{ route('announcements') }}">View all</a></p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-xl-3">
                <div class="card ">
                    <div class="card-block">
                        <h6>Sermon Notes</h6>
                        <h2 class="f-start "><span>{{ $totalsermonsnotes }}</span><i
                                class="fa fa-solid fa-note-sticky fa-flip-vertical ps-2"></i>
                        </h2>
                        <p class="f-right"><a href="{{ route('sermonsnotes') }}">View all</a></p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-xl-3">
                <div class="card">
                    <div class="card-block">
                        <h6>Events</h6>
                        <h2 class="f-start "><span>{{ $totalevents }}</span><i
                                class="fa fa-solid fa-calendar-days ps-2"></i></h2>
                        <p class="f-right"><a href="{{ route('events') }}">View all</a></p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
{{-- end card section --}}

{{-- Table section --}}
<section>
    <div class="card">
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
                    @if ($ifusers > 0)
                        @foreach ($users as $user)
                            <tr class="userId">
                                <td class="username" data-username="{{ $user->name }}">
                                    {{ $user->name }}
                                </td>
                                <td class="email" data-email="{{ $user->email }}">
                                    {{ $user->email }}
                                </td>
                                <td class="phone" data-phone="{{ $user->phone }}">
                                    {{ $user->phone }}
                                </td>
                                <td>{{ $user->membership_status }}</td>
                                <td>
                                    <button id="update-user-button" data-userId="{{ $user->id }}"
                                        style="font-size: 16px"
                                        onclick="openUserModal('{{ $user->name }}', '{{ $user->email }}')">
                                        View
                                    </button>
                                </td>
                            </tr>
                        @endforeach
                        {{-- User modal --}}
                        @foreach ($users as $user)
                            <div id="user-modal-{{ $user->id }}" class="modal">
                                <div class="modal-content">
                                    <div class="modal-head">
                                        <h4>{{ $user->name }}</h4>
                                    </div>
                                    <hr>
                                    <div class="modal-body">
                                        <p>{{ $user->email }}</p>

                                        <p>{{ $user->phone }}</p>

                                        <p>{{ $user->membership_status }}</p>
                                    </div>
                                    <div class="modal-footer d-flex">
                                        <button type="button"
                                            onclick="closeUserModal('{{ $user->id }}')"
                                            class="btn btn-outline-primary">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                        {{-- End user modal  --}}
                    @endif
                </tbody>

            </table>
        </div>
    </div>
</section>
{{-- End table section --}}