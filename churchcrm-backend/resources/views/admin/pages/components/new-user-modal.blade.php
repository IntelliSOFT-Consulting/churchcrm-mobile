<div id="add-user-modal" class="modal">
    <div class="modal-content">
        <div class="modal-head">
            <h4>Add New User</h4>
        </div>
        <hr>
        <div class="modal-body">
            <form class="form" action="{{ route('admin-usr-register') }}" method="POST"
                enctype="multipart/form-data">
                @csrf
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input id="user-email" type="email" class="form-control" name="email">
                </div>

                <div class="icon-password mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input id="inpassword" type="text" class="form-control int-bg"
                        name="password" autocomplete="off">
                </div>

                <div class="icon-password mb-3">
                    <label for="password_confirmation" class="form-label">Confirm
                        Password</label>
                    <input id="password_confirmation" type="text" class="form-control int-bg"
                        name="password_confirmation" autocomplete="off">
                </div>

                <div class="icon-password mb-3">
                    <div class="generator">
                        <div class="password">
                            <button class="button generate" type="button"
                                onclick="generatePassword()">Generate</button>
                            <button class="button copy" type="button"
                                onclick="copyToClipboard()">Copy</button>
                        </div>
                        <div class="range">
                            <input type="range" min="4" max="24" value="8"
                                id="passwordLength" onchange="updatePasswordLength()">
                            <span id="passwordLengthValue">8</span>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-between">
                    <div>
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                    <div>
                        <button type="button" onclick="closeAddUserModal()"
                            class="btn btn-outline-primary">Cancel</button>
                    </div>
                </div>
            </form>

            <script>
                function generatePassword() {
                    var length = document.getElementById("passwordLength").value;
                    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=";

                    var password = "";

                    for (var i = 0; i < length; i++) {
                        var randomIndex = Math.floor(Math.random() * charset.length);
                        password += charset.charAt(randomIndex);
                    }

                    document.getElementById("inpassword").value = password;
                    document.getElementById("password_confirmation").value = password;
                }

                function copyToClipboard() {
                    var passwordField = document.getElementById("inpassword");
                    passwordField.select();
                    document.execCommand("copy");
                    alert("Password copied to clipboard!");
                }

                function updatePasswordLength() {
                    var length = document.getElementById("passwordLength").value;
                    document.getElementById("passwordLengthValue").innerText = length;
                }
            </script>
        </div>
    </div>
</div>