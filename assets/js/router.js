const contentArea = document.getElementById("content-area");
const pageOrder = ["home", "about", "services", "why choose us", "contact"];
let currentPage = "home";
let isTransitioning = false;

function normalizePageName(href) {
  const trimmed = href.replace(".html", "").replace("./", "").replace("/", "").toLowerCase();
  return trimmed === "" ? "home" : trimmed;
}

function getDirection(from, to) {
  const fromIndex = pageOrder.indexOf(from);
  const toIndex = pageOrder.indexOf(to);
  return fromIndex < toIndex ? "forward" : "backward";
}

// 🆕 Form validation setup function
function setupContactFormValidation() {
  const form = document.querySelector("#contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    const name = form.querySelector("[name='name']").value.trim();
    const email = form.querySelector("[name='email']").value.trim();
    const subject = form.querySelector("[name='subject']").value.trim();
    const message = form.querySelector("[name='message']").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errorMessage = "";

    if (!name) errorMessage += "Name is required.\n";
    if (!email || !emailPattern.test(email)) errorMessage += "Valid email is required.\n";
    if (!subject) errorMessage += "Subject is required.\n";
    if (!message) errorMessage += "Message is required.\n";

    if (errorMessage) {
      e.preventDefault();
      alert(errorMessage);
    }
  });
}

async function loadPage(page, animate = true, direction = "forward") {
  if (isTransitioning) return;
  isTransitioning = true;

  try {
    const res = await fetch(`${page}.html`);
    const html = await res.text();

    const newContent = document.createElement("div");
    newContent.classList.add("content-slide");
    newContent.innerHTML = html;

    const oldContent = contentArea.querySelector(".content-slide");

    if (animate && oldContent) {
      const outClass = direction === "forward" ? "slide-out-left" : "slide-out-right";
      const inClass = direction === "forward" ? "slide-in-left" : "slide-in-right";

      oldContent.classList.add(outClass);
      newContent.classList.add(inClass);

      newContent.addEventListener(
        "animationend",
        () => {
          if (oldContent) oldContent.remove();
          isTransitioning = false;

          if (page === "contact") setupContactFormValidation(); // ✅ Inject only after content is fully replaced
        },
        { once: true }
      );

      contentArea.appendChild(newContent);
    } else {
      contentArea.innerHTML = "";
      contentArea.appendChild(newContent);
      isTransitioning = false;

      if (page === "contact") setupContactFormValidation(); // ✅ In case no animation
    }

    currentPage = page;
    updateActiveNav(page);
  } catch (err) {
    contentArea.innerHTML = "<h2 class='text-center mt-5'>Page not found</h2>";
    isTransitioning = false;
  }
}

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const href = link.getAttribute("href");
    const page = normalizePageName(href);
    const direction = getDirection(currentPage, page);

    loadPage(page, true, direction);
    history.pushState(null, "", `#${page}`);
  });
});

window.addEventListener("popstate", () => {
  const page = normalizePageName(window.location.hash.replace("#", ""));
  const direction = getDirection(currentPage, page);
  loadPage(page, true, direction);
  currentPage = page;
});

window.addEventListener("DOMContentLoaded", () => {
  const page = normalizePageName(window.location.hash.replace("#", ""));
  currentPage = page;
  loadPage(page, false);
});

function updateActiveNav(page) {
  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href").toLowerCase();
    const normalized = href.replace(".html", "").replace("./", "").replace("/", "") || "home";
    link.classList.toggle("active", normalized === page);
  });
}
