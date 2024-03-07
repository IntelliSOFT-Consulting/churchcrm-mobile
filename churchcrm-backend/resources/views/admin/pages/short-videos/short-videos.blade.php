<!DOCTYPE html>
<html lang="en">

<head>
    @include('admin.layout.head')
</head>

<body>
    @php
        $LShortVideo = App\Models\ShortVideo::latest()->take(6)->get();
        $PShortVideo = App\Models\ShortVideo::orderBy('id', 'desc')
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
                <h1>Short Video</h1>
                <hr>
                @include('admin.layout.error')
            </div>
            <section class="center-btn-modal">
                <button id="announcementsmodalBtn" onclick="openModal()"> <i class="fa-solid fa-plus mr-2"></i>
                    Add New Short Video</button>
            </section>
            <section class="sermon-carousel">
                <section class="LatestSermons">
                    <div class="dashboard-header">
                        <h4 class="margin-top 20">Latest Short Video</h4>
                    </div>
                    <div class="cover">
                        <button class="circle-icon left" onclick="scrollSection('latestSermons', 'left')">
                            <i class="fas fa-angle-left"></i>
                        </button>
                        <div class="scroll-images">
                            @foreach ($LShortVideo as $LShortVideo)
                                <div class="scroll-card">
                                    <div class="card-body">
                                        <img style="height: 200px; width: 300px;" alt="image"
                                            src="ShortVideoThumbnails/{{ $LShortVideo->thumbnail_path }}">
                                        <div>
                                            <h6>
                                                {{ Illuminate\Support\Str::limit($LShortVideo->title, $limit = 25, $end = '...') }}
                                            </h6>
                                            <small>
                                                {{ Illuminate\Support\Str::limit($LShortVideo->video_description, $limit = 30, $end = '...') }}
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
                        <h4 class="margin-top 20">Previous Short Video</h4>
                    </div>
                    <div class="cover">
                        <button class="circle-icon left" onclick="scrollSection('previousSermons', 'left')">
                            <i class="fa fa-chevron-left"></i>
                        </button>
                        <div class="scroll-images">
                            @foreach ($PShortVideo as $PShortVideo)
                                <div class="scroll-card">
                                    <div class="card-body">
                                        <img style="height: 200px; width: 300px;" alt="image"
                                            src="ShortVideoThumbnails/{{ $PShortVideo->thumbnail_path }}">
                                        <h4 class="card-title">
                                            {{ Illuminate\Support\Str::limit($PShortVideo->title, $limit = 25, $end = '...') }}
                                        </h4>
                                        <p class="card-text">
                                            {{ Illuminate\Support\Str::limit($PShortVideo->video_description, $limit = 25, $end = '...') }}
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
                        <h4>New Short Video</h4>
                        <hr>
                    </div>
                    <div class="modal-body">
                        <form action="{{ route('short-video-upload') }}" method="post" enctype="multipart/form-data">
                            @csrf
                            <div class="mb-3">
                                <label for="Title">Video Title</label>
                                <input type="text" class="form-control" name="title" id="title"
                                    placeholder="Video Title" required>
                            </div>
                            
                           
                            <div class="mb-3">
                                <div class="form-group mb-4">
                                    <label>Upload Thumbnail</label><br>
                                    <label for="Thumbnail" class="custom-file-upload">
                                        Upload</label>
                                    <input type="file" class="file" name="thumbnail_path" id="Thumbnail" />
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="form-group mb-4">
                                    <label>Video</label><br>
                                    <label for="Notes_Thumbnail" class="custom-file-upload">
                                        Upload </label>
                                    <input type="file" class="file" name="video_path" id="Notes_Thumbnail" />
                                </div>
                            </div>
                           
                            <div class="mb-3">
                                <label for="video_description" class="form-label">Video Description</label>
                                <textarea class="form-control" name="video_description" id="video_description" required cols="30"
                                    rows="10" placeholder="Video Description"></textarea>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div>
                                    <button type="submit" class="btn btn-primary">Add Video</button>
                                </div>
                                <div>
                                    <button type="button" onclick="closeModal()"
                                        class="btn btn-outline-primary">Close</button>
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
    <script src="assets/js/scroller.js"></script>
    @include('admin.layout.scripts')
</body>

</html>
