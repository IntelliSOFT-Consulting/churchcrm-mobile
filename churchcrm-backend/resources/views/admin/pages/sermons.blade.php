<!DOCTYPE html>
<html lang="en">

<head>
    @include('admin.layout.head')
</head>

<body>
    @php
        $LatestSermons = App\Models\Sermons::latest()->take(6)->get();
        $previousSermons = App\Models\Sermons::orderBy('id', 'desc')
            ->skip(6)
            ->take(PHP_INT_MAX)
            ->get();
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
                <h1>Sermons</h1>
                <hr>
                @include('admin.layout.error')
            </div>

            <section class="center-btn-modal">
                <button id="announcementsmodalBtn" onclick="openModal()"> <i class="fa-solid fa-plus mr-2"></i>
                    Add New Sermon</button>
            </section>

            <!-- Sermons Section -->
            <section class="sermon-carousel">
                <section class="LatestSermons">
                    <div class="dashboard-header">
                        <h1 class="margin-top 20">Latest Sermons</h1>
                    </div>
                    <div class="cover">
                        <button class="circle-icon left" onclick="scrollSection('latestSermons', 'left')">
                            <i class="fas fa-angle-left"></i>
                        </button>
                        <div class="scroll-images">
                            @foreach ($LatestSermons as $sermon)
                                <div class="scroll-card">
                                    <div class="card-body">
                                        <img style="height: 200px; width: 300px;" alt="image"
                                            src="SermonThumbnails/{{ $sermon->Thumbnail }}">
                                        <div>
                                            <p>{{ $sermon->sermon_date }}</p>
                                            <h6>
                                                {{ Illuminate\Support\Str::limit($sermon->Title, $limit = 25, $end = '...') }}
                                            </h6>
                                            <small>
                                                {{ Illuminate\Support\Str::limit($sermon->Sermon_Description, $limit = 30, $end = '...') }}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                        <button class=" circle-icon right" onclick="scrollSection('latestSermons', 'right')">
                            <i class="fas fa-angle-right"></i>
                        </button>
                    </div>
                </section>

                <section class="PreviousSermons">
                    <div class="dashboard-header">
                        <h4 class="margin-top 20">Previous Sermons</h4>
                    </div>
                    <div class="cover">
                        <button class="circle-icon left" onclick="scrollSection('previousSermons', 'left')">
                            <i class="fa fa-chevron-left"></i>
                        </button>
                        <div class="scroll-images">
                            @foreach ($previousSermons as $sermon)
                                <div class="scroll-card">
                                    <div class="card-body">
                                        <img style="height: 200px; width: 300px;" alt="image"
                                            src="SermonThumbnails/{{ $sermon->Thumbnail }}">
                                        <h4 class="card-title">
                                            {{ Illuminate\Support\Str::limit($sermon->Title, $limit = 25, $end = '...') }}
                                        </h4>
                                        <p class="card-text">
                                            {{ Illuminate\Support\Str::limit($sermon->Event_Description, $limit = 25, $end = '...') }}
                                        </p>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                        <button class="circle-icon right" onclick="scrollSection('previousSermons', 'right')">
                            <i class="fas fa-angle-right"></i>
                        </button>
                    </div>
                </section>
            </section>
            {{-- modal section  Add announcements --}}
            <div id="modal" class="modal">
                <div class="modal-content">

                    <div class="modal-head">
                        <h4>New Sermon</h4>
                        <hr>
                    </div>
                    <div class="modal-body">
                        <form action="{{ route('new-sermons') }}" method="post" enctype="multipart/form-data">
                            @csrf
                            <div class="mb-3">
                                <label for="Title">Sermon Title</label>
                                <input type="text" class="form-control" name="Title" id="Title"
                                    placeholder="Sermon Title" required>
                            </div>
                            <div class="mb-3">
                                <div class="form-group mb-4">
                                    <label>Upload sermon notes</label><br>
                                    <label for="Sermon_Notes" class="custom-file-upload">
                                        Attach </label>
                                    <input type="file" class="file" name="Sermon_Notes" id="Sermon_Notes" />
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="Sermon_Link">Sermon Link</label>
                                <input type="text" class="form-control" name="Sermon_Link" id="Sermon_Link"
                                    placeholder="Sermon Link">
                            </div>
                            <div class="mb-3">
                                <div class="form-group mb-4">
                                    <label>Upload Thumbnail</label><br>
                                    <label for="Thumbnail" class="custom-file-upload">
                                        Upload</label>
                                    <input type="file" class="file" name="Thumbnail" id="Thumbnail" />
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="form-group mb-4">
                                    <label>Upload sermon notes with an image (Optional)</label><br>
                                    <label for="Notes_Thumbnail" class="custom-file-upload">
                                        Upload </label>
                                    <input type="file" class="file" name="Notes_Thumbnail" id="Notes_Thumbnail" />
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="sermon_date" class="form-label">Sermon Date</label>
                                <input type="date" class="form-control" name="sermon_date" required id="sermon_date">
                            </div>
                            <div class="mb-3">
                                <label for="Sermon_Description" class="form-label">Sermon Description</label>
                                <textarea class="form-control" name="Sermon_Description" id="Sermon_Description" required cols="30"
                                    rows="10" placeholder="Sermon Description"></textarea>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div>
                                    <button type="submit" class="btn btn-primary">Add Sermon</button>
                                </div>
                                <div>
                                    <button type="button" onclick="closeModal()"
                                        class="btn btn-outline-primary">Cancel</button>
                                </div>
                            </div>

                        </form>

                        {{-- <span class="close">&times;</span> --}}
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{-- scripts  --}}
    <script src="assets/js/script.js"></script>
    <script src="assets/js/usermodal.js"></script>
    <script src="assets/js/profilemodal.js"></script>
    <script src="assets/js/scroller.js"></script>
    @include('admin.layout.scripts')
</body>

</html>
