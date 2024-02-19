function generate() {
    const lowercaseChars = "qwertyuiopasdfghjklzxcvbnm";
    const uppercaseChars = "QWERTYUIOPASDFGHJKLZXCVBNM";
    const digits = "1234567890";
    const specials = "!@#$%^&*()_+-={}[];<>:";

    let dictionary = lowercaseChars + uppercaseChars + digits + specials;
    const length = document.querySelector('input[type="range"]').value;

    if (length < 1 || dictionary.length === 0) {
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const pos = Math.floor(Math.random() * dictionary.length);
        password += dictionary[pos];
    }

    document.querySelector('input[type="text"]').value = password;
}

function copy() {
    const pass = document.querySelector('input[type="text"]').value;
    navigator.clipboard.writeText(pass).then(() => {
        document.querySelector(".button.copy").innerHTML = "Copied!";
        setTimeout(() => {
            document.querySelector(".button.copy").innerHTML = "Copy";
        }, 1000);
    });
}

document.querySelector('.button.generate').addEventListener("click", function (event) {
    event.preventDefault();
    generate();
});

document.querySelector('.button.copy').addEventListener("click", function (event) {
    event.preventDefault();
    copy();
});

document.querySelector('input[type="range"]').addEventListener("input", (e) => {
    document.querySelector("div.range span").innerHTML = e.target.value;
    generate();
});

generate();