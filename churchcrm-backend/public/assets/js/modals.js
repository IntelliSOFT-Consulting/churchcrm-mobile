// Start Dynamic modal opening
function openModal() {
    document.getElementById("modal").style.display = "block";
}















//  End Dynamic modal opening

// The Global modal function script
function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Clossing the modal on outside modal click (The Global Modal)
document.addEventListener("click", function (event) {
    closeModalOutside(event, "modal");
    closeModalOutside(event, "updatemodal");
});

function closeModalOutside(event, modalId) {
    var modal = document.getElementById(modalId);

    if (event.target === modal) {
        modal.style.display = "none";
        document.removeEventListener("click", closeModalOutside);
    }
}

// end clossing the modal outside modal click
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

//  Start update modal
function openupdateModal(
    id,
    Event_Title,
    Event_Date,
    Event_Description,
    Img_Path
) {
    document.getElementById("updatemodal").style.display = "block";
    document.getElementById("event_id").value = id;
    document.getElementById("event_title_input").value = Event_Title;
    document.getElementById("event_date_input").value = Event_Date;
    document.getElementById("event_description_input").value =
        Event_Description;
    var imagePath = "EventImages/" + Img_Path;
    document.getElementById("event_image").src = imagePath;

    var removeImageButton = document.querySelector(".remove_button");
    removeImageButton.addEventListener("click", function () {
        event.preventDefault();
        document.getElementById("event_image").src = "";
    });

    // Add event listener to the upload image button
    var uploadImageButton = document.querySelector(".update_button");
    uploadImageButton.addEventListener("click", function () {
        event.preventDefault();
        document.getElementById("file_input").click();
    });

    // Add event listener to file input change event
    var fileInput = document.getElementById("file_input");
    fileInput.addEventListener("change", function () {
        // Display the newly uploaded image
        var newImage = URL.createObjectURL(fileInput.files[0]);
        document.getElementById("event_image").src = newImage;
    });

    document.addEventListener("click", closeModalOutside);
}

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





// Start User Modal
function openUserModal(userId, username, email) {
    document.getElementById("user-modal").style.display = "block";

    // Changing username
    document.querySelector(".modal-head h4").innerHTML = username;

    // Changing email placeholder and value
    document.getElementById("user-email").placeholder = email;
    document.getElementById("user-email").value = email;

    // Change route to update currently selected user
    var new_route = "{{ url('/users') }}" + "/" + userId;
    document.getElementById("user-update-form").action = new_route;
}

function closeUserModal() {
    document.getElementById("user-modal").style.display = "none";
}
// End user modal

// Start Add User Modal
function openAddUserModal(userId, username, email) {
    document.getElementById("add-user-modal").style.display = "block";
}

function closeAddUserModal() {
    document.getElementById("add-user-modal").style.display = "none";
}
// End add user modal

// Start announcements modal
function openAnnouncementModal(announcementId, topic, message) {
    document.getElementById("announcements-modal").style.display = "block";

    document.querySelector(".modal-head h4").innerHTML = topic;

    document.getElementById("update-topic").value = topic;

    document.getElementById("update-message").value = message;

    console.log(announcementId, topic, message);
    var new_route = "{{ url('/announcements') }}" + "/" + announcementId;
    document.getElementById("announcement-update-form").action = new_route;
}

function closeAnnouncementModal() {
    document.getElementById("announcements-modal").style.display = "none";
}
// End announcements modal

// Start sermon notes update modal
function openSermonnotesModal(notesId, file, description) {
    document.getElementById("sermonnotes-modal").style.display = "block";

    document.getElementById("file-update").value = "";

    document.getElementById("update-sermondescription").value = description;

    console.log(notesId, file, description);

    var newFileInput = document.createElement("input");
    newFileInput.type = "file";
    newFileInput.style.display = "none";

    var blob = new Blob([file]);

    newFileInput.files = [new File([blob], "filename")];

    document.body.appendChild(newFileInput);

    newFileInput.click();

    newFileInput.addEventListener("change", function () {
        console.log("Selected file:", newFileInput.files[0].name);

        document.body.removeChild(newFileInput);
    });

    var new_route = "{{ url('/sermonnotes') }}" + "/" + notesId;
    document.getElementById("sermonnotes-update-form").action = new_route;
}

function closeSermonnotesModal() {
    document.getElementById("sermonnotes-modal").style.display = "none";
}
// End sermon notes update modal
