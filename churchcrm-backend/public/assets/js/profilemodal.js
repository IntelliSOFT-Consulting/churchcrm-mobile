// Start Profile Modal
function openProfileModal() {
    document.getElementById("profile-modal").style.display = "block";
    document.addEventListener("click", closeModalOutside);
}

function closeProfileModal() {
    document.getElementById("profile-modal").style.display = "none";
    document.removeEventListener("click", closeModalOutside);
}

function closeProfileModalOutside(event) {
    var modal = document.getElementById("profile-modal");
    if (event.target === modal) {
        modal.style.display = "none";
        document.removeEventListener("click", closeModalOutside);
    }
}
//  End Profile modal
