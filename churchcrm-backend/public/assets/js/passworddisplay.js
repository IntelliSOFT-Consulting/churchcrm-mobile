function displayPassword() {
    var passwordInput = document.getElementById("password");
    var eyeIcon = document.getElementById("passwordIcon");

    if (!passwordInput) {
        console.error("Password input not found");
        return;
    }

    if (!eyeIcon) {
        console.error("Eye icon not found");
        return;
    }

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}
