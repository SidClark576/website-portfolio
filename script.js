const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const currentPage = document.body.dataset.page;

document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.dataset.page === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }

    link.addEventListener("click", () => {
        navLinks?.classList.remove("open");
        navToggle?.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    });
});

navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navLinks?.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("visible"));
}

document.querySelector("#contact-form")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const formData = new FormData(form);

    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        form.style.display = "none";
        document.querySelector("#form-success").style.display = "block";
        const note = document.querySelector(".form-note");
        if (note) note.style.display = "none";
    })
    .catch((error) => {
        console.error('Error:', error);
        document.querySelector("#form-error").style.display = "block";
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    });
});
