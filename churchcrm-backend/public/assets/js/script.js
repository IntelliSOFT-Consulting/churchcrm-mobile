// Toggle Bar
document.addEventListener("DOMContentLoaded", function () {
    // Your new toggle menu code
    let toggle_menu = document.getElementById("toggleSidebar");
    let sideBar = document.querySelector(".navcontainer");
    let pageBody = document.querySelector(".main-container");
    let dashBoardContainer = document.querySelector(".main");

    toggle_menu.addEventListener("click", function () {
        if (sideBar.style.display === "block" || sideBar.style.display === "") {
            sideBar.style.display = "none";
            pageBody.style.paddingLeft = "0";
            dashBoardContainer.style.width = "100%";
        } else {
            sideBar.style.display = "block";
            dashBoardContainer.style.width = "100%";
        }
    });
});

// Active link
const currentRoute = window.location.href;
const navLinks = document.querySelectorAll(".link");
navLinks.forEach((link) => {
    const linkHref = link.href;
    if (currentRoute.includes(linkHref)) {
        link.classList.add("active-link");
    }
});
// End active link
