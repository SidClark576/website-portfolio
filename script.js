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
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "a recruiter"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:sidneyordonia@gmail.com?subject=${subject}&body=${body}`;
});
