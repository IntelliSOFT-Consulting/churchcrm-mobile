<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/dashboard.css">
    <script src="https://kit.fontawesome.com/30ef7ac8b3.js" crossorigin="anonymous"></script>
    <title>Dashboard</title>
</head>

<body>
    <div class="dashboard-body">
        <div class="navigation-menu">
            <div class="container">
                <!-- Top Navigation Menu -->
                <div class="topNav">
                    <div class="hamburgerMenu" id="toggleSidebar">
                        <span>
                            <i class="fa-solid fa-bars" style="color: #ffffff; font-size: 32px;"></i>
                        </span>
                    </div>

                    <div class="profileDetails">
                        <span class="profilePic"><img src="assets/images/customer01.jpg" alt="profile-pic"></span>
                        <span class="profileName">Profile</span>
                    </div>
                </div>

                <!-- Side Navigation Menu -->
                <div class="sideNav" id="sideNavbar">
                    <ul>
                        <li>
                            <a href="">
                                <span class="icon">
                                    <i class="fa-solid fa-house"></i>
                                </span>
                                <span class="title"> Dashboard </span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span class="icon">
                                    <i class="fa-solid fa-user"></i>
                                </span>
                                <span class="title">
                                    Users
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span class="icon">
                                    <i class="fa-solid fa-clipboard-list"></i>
                                </span>
                                <span class="title">
                                    Announcements
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span class="icon">
                                    <i class="fa-solid fa-book-bible"></i>
                                </span>
                                <span class="title">
                                    Sermons
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span class="icon">
                                    <i class="fa-solid fa-note-sticky fa-flip-vertical"></i>
                                </span>
                                <span class="title">
                                    Sermon Notes
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span class="icon">
                                    <i class="fa-solid fa-calendar-days"></i>
                                </span>
                                <span class="title">
                                    Events
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
        <div class="dashboard-container">
            <div class="dashboard-header">
                <h3 class="dashboard-heading">Dashboard</h3>
                <hr>
            </div>
            <div class="dashboard-cards-display">
                <div class="dashboard-cards">
                    <p class="card-name">Users</p>
                    <div class="card-text">
                        <span class="card-stats">
                            90
                        </span>
                        <span class="icon">
                            <i class="fa-solid fa-user"></i>
                        </span>
                    </div>
                    <p class="card-link"><a href="">View all</a></p>
                </div>

                <div class="dashboard-cards">
                    <p class="card-name">Sermons</p>
                    <div class="card-text">
                        <span class="card-stats">
                            150
                        </span>
                        <span class="icon">
                            <i class="fa-solid fa-book-bible"></i>
                        </span>
                    </div>
                    <p class="card-link"><a href="">View all</a></p>
                </div>

                <div class="dashboard-cards">
                    <p class="card-name">Announcements</p>
                    <div class="card-text">
                        <span class="card-stats">
                            30
                        </span>
                        <span class="icon">
                            <i class="fa-solid fa-clipboard-list"></i>
                        </span>
                    </div>
                    <p class="card-link"><a href="">View all</a></p>
                </div>

                <div class="dashboard-cards">
                    <p class="card-name">Sermon Notes</p>
                    <div class="card-text">
                        <span class="card-stats">
                            50
                        </span>
                        <span class="icon">
                            <i class="fa-solid fa-note-sticky fa-flip-vertical"></i>
                        </span>
                    </div>
                    <p class="card-link"><a href="">View all</a></p>
                </div>

                <div class="dashboard-cards">
                    <p class="card-name">Events</p>
                    <div class="card-text">
                        <span class="card-stats">
                            10
                        </span>
                        <span class="icon">
                            <i class="fa-solid fa-calendar-days"></i>
                        </span>
                    </div>
                    <p class="card-link"><a href="">View all</a></p>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
