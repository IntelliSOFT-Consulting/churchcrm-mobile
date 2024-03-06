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