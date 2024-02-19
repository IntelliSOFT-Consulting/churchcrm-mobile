<!DOCTYPE html>
<html lang="en">

<head>
    @include('admin.layout.head')
</head>

<body>
    @php
        use Illuminate\Support\Carbon;
        $date = Carbon::now();

        $upcomingEvents = App\Models\Event::orderBy('Event_Date', 'asc')->where('Event_Date', '>=', $date)->get();

        $pastEvents = App\Models\Event::orderBy('Event_Date', 'asc')->where('Event_Date', '<', $date)->get();
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
                <h1>Events</h1>
                <hr>
                @include('admin.layout.error')
            </div>
            <section class="center-btn-modal">
                <button id="announcementsmodalBtn" onclick="openModal()"><i class="fa-solid fa-plus mr-2"></i>
                    Add New Event</button>
            </section>

            {{-- upcoming events --}}
            <section class="events-carousel">
                <section class="UpcomingEvents">
                    <div class="dashboard-header">
                        <h4 class="margin-top 20">Upcoming</h4>
                    </div>
                    @if ($upcomingEvents)
                        <div class="cover">
                            <button class="left" onclick="leftScroll('up')">
                                <i class="fa fa-chevron-left"></i>
                            </button>
                            <div class="scroll-images">
                                @foreach ($upcomingEvents as $event)
                                    <div class="scroll-card"
                                        onclick="openupdateModal('{{ $event->id }}', '{{ $event->Event_Title }}', '{{ $event->Event_Date }}', '{{ $event->Event_Description }}', '{{ $event->Img_Path }}')">
                                        <div class="card-body">
                                            <img style="height: 200px; width: 300px;" alt="image"
                                                src="EventImages/{{ $event->Img_Path }}">

                                            <h4 class="card-title">{{ $event->Event_Title }}</h4>
                                            <small>
                                                <p class="card-text">{{ $event->Event_Date }}</p>
                                            </small>
                                            <p class="card-text">
                                                {{ Illuminate\Support\Str::limit($event->Event_Description, $limit = 25, $end = '...') }}
                                            </p>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                            <button class="right" onclick="rightScroll('up')">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    @else
                        <div class="cover">
                            <p>No upcoming events available</p>
                        </div>
                    @endif
                </section>

                <section class="PastEvents">
                    <div class="dashboard-header">
                        <h4 class="margin-top 20">Past Events</h4>
                    </div>
                    <div class="cover">
                        <button class="left" onclick="leftScroll('pa')">
                            <i class="fa fa-chevron-left"></i>
                        </button>
                        <div class="scroll-images">
                            @foreach ($pastEvents as $event)
                                <div class="scroll-card"
                                    onclick="openupdateModal('{{ $event->id }}', '{{ $event->Event_Title }}', '{{ $event->Event_Date }}', '{{ $event->Event_Description }}', '{{ $event->Img_Path }}')">
                                    <div class="card-body">
                                        <img style="height: 200px; width: 300px;" alt="image"
                                            src="EventImages/{{ $event->Img_Path }}">

                                        <h4 class="card-title">{{ $event->Event_Title }}</h4>
                                        <small>
                                            <p class="card-text">{{ $event->Event_Date }}</p>
                                        </small>
                                        <p class="card-text">
                                            {{ Illuminate\Support\Str::limit($event->Event_Description, $limit = 100, $end = '...') }}
                                        </p>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                        <button class="right" onclick="rightScroll('pa')">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </section>
            </section>

            {{-- Event Modal --}}
            <div id="modal" class="modal">
                <div class="modal-content">
                    <div class="modal-head">
                        <h4>Add Event</h4>
                    </div>
                    <hr>
                    <div class="modal-body">
                        <form class="form" action="{{ route('new-event') }}" method="post"
                            enctype="multipart/form-data">
                            @csrf
                            <div class="mb-3">
                                <div class="form-group mb-4">
                                    <div class="mb-3">
                                        <div class="row">
                                            <div class="col image_display" id="image_display">
                                                <img src="assets/images/blurholder.jpeg" alt="Placeholder Image"
                                                    style="width: 100%; max-height: 300px;">
                                            </div>
                                            <div class="col">
                                                <label for="eventupload" class="custom-file-upload">
                                                    Add Event Image
                                                </label>
                                                <input type="file" class="file" name="eventupload" id="eventupload"
                                                    onchange="displayImage()" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>




                            <div class="mb-3">
                                <label for="event_title" class="form-label">Event Title</label>
                                <input type="text" class="form-control" name="event_title" required
                                    placeholder="Event Title">
                            </div>

                            <div class="mb-3">
                                <label for="event_date" class="form-label">Event Date</label>
                                <input type="date" class="form-control" id="event_date" name="event_date" required>
                            </div>


                            <div class="mb-3">
                                <label for="event_description" class="form-label">Description</label>
                                <textarea class="form-control" name="event_description" id="event_description" required cols="30" rows="10"
                                    placeholder="Add Description"></textarea>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div>
                                    <button type="submit" class="btn btn-primary">Add Event</button>
                                </div>
                                <div>
                                    <button type="button" onclick="closeModal('newevent')"
                                        class="btn btn-outline-primary">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {{-- The event update modal  --}}
            <div id="updatemodal" class="modal">
                <div class="modal-content">
                    <div class="modal-head">
                        <h4>Update Event</h4>
                    </div>
                    <hr>
                    <div class="modal-body">
                        <form class="form" action="{{ route('update-event') }}" method="post"
                            enctype="multipart/form-data">
                            @csrf

                            <div class="mb-3">
                                <div class="row">
                                    <div class="col image_display">
                                        <img id="event_image" style="height: 300px; width:100%;" src=""
                                            alt="Event Image">
                                    </div>
                                    <div class="col">
                                        <div class="update mb-3">
                                            <button class="btn btn-primary update_button">Upload Image</button>
                                        </div>
                                        <div class="remove mb-3">
                                            <button class="btn btn-primary remove_button">Remove Image</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" name="event_id" id="event_id" value="">
                            <input type="file" name="event_image" id="file_input" style="display: none;">

                            <div class="mb-3">
                                <label for="event_title" class="form-label">Event Title</label>
                                <input type="text" class="form-control" name="event_title" required
                                    placeholder="Event Title" id="event_title_input">
                            </div>

                            <div class="mb-3">
                                <label for="event_date" class="form-label">Event Date</label>
                                <input type="date" class="form-control" name="event_date" required
                                    id="event_date_input">
                            </div>

                            <div class="mb-3">
                                <label for="event_description" class="form-label">Description</label>
                                <textarea class="form-control" name="event_description" id="event_description_input" required cols="30"
                                    rows="10" placeholder="Add Description"></textarea>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div>
                                    <button type="submit" class="btn btn-primary">Update Event</button>
                                </div>
                                <div>
                                    <button type="button" onclick="closeModal('updatemodal')"
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
    <script src="assets/js/scroller.js"></script>

    @include('admin.layout.scripts')
</body>

</html>
