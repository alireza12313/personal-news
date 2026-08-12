 // =========================
// DARK MODE
// =========================

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");

    if (themeBtn) {
        themeBtn.textContent = "☀️";
    }
}

if (themeBtn) {
    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            themeBtn.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            themeBtn.textContent = "☾";
        }

    });
}


// =========================
// MOBILE MENU
// =========================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", function () {

        mobileMenu.classList.toggle("show");

        if (mobileMenu.classList.contains("show")) {
            menuBtn.textContent = "✕";
        } else {
            menuBtn.textContent = "☰";
        }

    });
}
// =========================
// NEWSLETTER
// =========================

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const emailInput = newsletterForm.querySelector('input[type="email"]');

        try {
            const response = await fetch("http://localhost:3000/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: emailInput.value
                })
            });

            const data = await response.json();

            alert(data.message);
            newsletterForm.reset();

        } catch (error) {
            console.error(error);
            alert("اتصال به سرور برقرار نشد.");
        }
    });
}
