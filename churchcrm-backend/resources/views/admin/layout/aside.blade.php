<nav class="nav">
    <div class="nav-upper-options">
        <a class='link'  href="{{ route('dashboard') }}">
            <p class="nav-link">
                <span class="icon">
                    <i class="fa-solid fa-house"></i>
                </span>
                <span class="title"> Dashboard </span>
            </p>
        </a>
        <a class='link'  href="{{ route('users') }}">
            <p class="nav-link">
                <span class="icon">
                    <i class="fa-solid fa-users"></i>
                </span>
                <span class="title">
                    Users
                </span>
            </p>
        </a>
        <a class='link'  href="{{ route('announcements') }}">
            <p class="nav-link">
                <span class="icon">
                    <i class="fa-solid fa-clipboard-list"></i>
                </span>
                <span class="title">
                    Announcements
                </span>
            </p>
        </a>
        <a class='link'  href="{{ route('sermons') }}">
            <p class="nav-link">
                <span class="icon">
                    <i class="fa-solid fa-book-bible"></i>
                </span>
                <span class="title">
                    Sermons
                </span>
            </p>
        </a>
        <a class='link'  href="{{ route('sermonsnotes') }}">
            <p class="nav-link">
                <span class="icon">
                    <i class="fa-solid fa-note-sticky fa-flip-vertical"></i>
                </span>
                <span class="title">
                    Sermon Notes
                </span>
            </p>
        </a>
        <a class='link'  href="{{ route('events') }}">
            <p class="nav-link">
                <span class="icon">
                    <i class="fa-solid fa-calendar-days"></i>
                </span>
                <span class="title">
                    Events
                </span>
            </p>
        </a>
        <a class='link'  href="{{ route('profile') }}">

            <p class="nav-link">
                <span class="icon">
                    <i class="fa-solid fa-user"></i>
                </span>
                <span class="title">
                    Profile
                </span>
            </p>
        </a>
        <a  class='link' href="{{ route('settings') }}">

            <p class="nav-link">
                <span class="icon">
                    <i class="fa fa-cog"></i>
                </span>
                <span class="title">
                    Admin
                </span>
            </p>
        </a>
    </div>
</nav>
