const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
const toast = document.getElementById("toast");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

menuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
  menuBtn.textContent = mobileNav.classList.contains("open") ? "×" : "☰";
});

mobileNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.querySelectorAll("[data-toast]").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    showToast(el.dataset.toast);
  });
});

document.querySelectorAll(".wish").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    btn.classList.toggle("liked");
    btn.textContent = btn.classList.contains("liked") ? "♥" : "♡";
    showToast(btn.classList.contains("liked") ? "Added to wishlist" : "Removed from wishlist");
  });
});

document.getElementById("newsletter").addEventListener("submit", e => {
  e.preventDefault();
  const input = e.target.querySelector("input");
  showToast(`Thanks! ${input.value} is subscribed.`);
  input.value = "";
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
