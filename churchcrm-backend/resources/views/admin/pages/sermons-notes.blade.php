<!DOCTYPE html>
<html lang="en">

<head>
    @include('admin.layout.head')
</head>

<body>
    @php
        $sermonnotes = App\Models\SermonNotes::OrderBy('id', 'desc')->get();
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
                <h1>Sermon Notes</h1>
                <hr>
                @include('admin.layout.error')

            </div>
            <section class="center-btn-modal">
                <button id="announcementsmodalBtn" onclick="openModal()"><i class="fa-solid fa-plus mr-2"></i>
                    Add Sermon Notes</button>
            </section>
            <section>
                <div class="card">
                    <div class="card-body">
                        <div class="form-container">
                            <div>
                                <h4>List of Sermon Notes</h4>
                                <hr>
                            </div>
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>

                                        <tr>
                                            <th>Notes</th>
                                            <th>Description</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        @foreach ($sermonnotes as $sermonnote)
                                            <tr id="sermonnotes_{{ $sermonnote->id }}">
                                                <td>
                                                    <a style="text-decoration: none;" target="_blank"
                                                        href="{{ 'SermonNotes/' . $sermonnote->notesupload }}">
                                                        {{ $sermonnote->notesupload }}</a>
                                                </td>
                                                <td>
                                                    {{ Illuminate\Support\Str::limit($sermonnote->sermondescription, $limit = 50, $end = '...') }}
                                                </td>
                                                <td>
                                                    <a href="#" class="text-danger"
                                                        onclick="deleteSermonNotes({{ $sermonnote->id }})">Delete</a>
                                                    <button id="update-user-button" class="view-button"
                                                        style="font-size: 16px"
                                                        onclick="openSermonnotesModal({{ $sermonnote->id }}, '{{ $sermonnote->notesupload }}', '{{ $sermonnote->sermondescription }}')">
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
                </div>
            </section>

            {{-- modal section  add sermon notes --}}
            <div id="modal" class="modal">
                <div class="modal-content">

                    <div class="modal-head">
                        <h4 style="padding-bottom: 20px;"></h4>
                        <hr style="margin-bottom: 20px;">
                    </div>
                    <div class="modal-body">
                        <form action="{{ route('new-sermon-notes') }}" method="post" enctype="multipart/form-data">
                            @csrf
                            <div class="form-group mb-4">


                                <label>Upload Notes</label><br>
                                <label for="file-upload" class="custom-file-upload">
                                    Upload
                                </label>
                                <input id="file-upload" name="notesupload" type="file" />

                            </div>
                            <div class="form-group mb-4">
                                <label>Upload Image with Notes (Optional)</label><br>
                                <label for="notesimage" class="custom-file-upload">
                                    Upload
                                </label>
                                <input id="notesimage" name="notesimage" type="file" />
                            </div>
                            <div class="mb-3">
                                <label for="sermon_date" class="form-label">Sermon Date</label>
                                <input type="date" class="form-control" name="sermon_date" required id="sermon_date">
                            </div>
                            <div class="form-group mb-4">
                                <label for="sermondescription">Add Description</label>
                                <textarea class="form-control" name="sermondescription" id="sermondescription" required cols="30" rows="10"
                                    placeholder="Add Description"></textarea>
                            </div>
                            <div class="form-group mb-4">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <button type="submit" class="btn btn-primary">Add</button>
                                    </div>
                                    <div>
                                        <button type="button" onclick="closeModal()"
                                            class="btn btn-outline-primary">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {{-- Update Sermon notes modal --}}
            @if (isset($sermonnote))
                <div id="sermonnotes-modal" class="modal">
                    <div class="modal-content">

                        <div class="modal-head">
                            <h4 style="padding-bottom: 20px;">Update Sermon Notes</h4>
                            <hr style="margin-bottom: 20px;">
                        </div>
                        <div class="modal-body">
                            <form id="sermonnotes-update-form" action="{{ url('/sermonnotes', $sermonnote->id) }}"
                                method="POST" enctype="multipart/form-data">
                                @csrf
                                @method('PUT')                         
                                <div class="form-group mb-4">
                                    <label>Upload Notes</label><br>
                                    <label for="file-update" class="custom-file-upload">
                                        Upload
                                    </label>
                                    <input id="file-update" name="notesupload" type="file" />
                                </div>
                                <div class="form-group mb-4">
                                    <label>Upload Image with Notes (Optional)</label><br>
                                    <label for="notesimage" class="custom-file-upload">
                                        Upload
                                    </label>
                                    <input id="notesimage" name="notesimage" type="file" />
                                </div>
                                <div class="form-group mb-4">
                                    <label for="sermondescription">Add Description</label>
                                    <textarea class="form-control" name="sermondescription" id="update-sermondescription" required cols="30"
                                        rows="10" placeholder="Update Description"></textarea>
                                </div>
                                <div class="form-group mb-4">
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <button type="submit" class="btn btn-primary">Update</button>
                                        </div>
                                        <div>
                                            <button type="button" onclick="closeSermonnotesModal()"
                                                class="btn btn-outline-primary">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            @endif
        </div>
    </div>
    {{-- scripts  --}}
    <script src="assets/js/script.js"></script>
    <script src="assets/js/usermodal.js"></script>
    <script src="assets/js/profilemodal.js"></script>
    @include('admin.layout.scripts')

</body>

</html>
