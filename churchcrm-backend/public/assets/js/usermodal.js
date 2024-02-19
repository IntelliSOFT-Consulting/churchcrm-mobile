// Start User Modal
function openUserModal() {
    // Find the user ID dynamically based on the clicked button
    var userId = event.target.dataset.userid;

    // Show the corresponding user modal
    document.getElementById("user-modal-" + userId).style.display = "block";
}

function closeUserModal(userId) {
    document.getElementById("user-modal-" + userId).style.display = "none";
}
// End user modal
