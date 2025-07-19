const header = document.getElementById("mainHeader");
  const logo = document.getElementById("logo");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
      // logo.classList.add("logo-hidden");
    } else {
      header.classList.remove("scrolled");
      logo.classList.remove("logo-hidden");
    }
  });



document.addEventListener("DOMContentLoaded", function () {
  // 1. Auto-collapse offcanvas on link click
  const offcanvas = document.querySelector(".offcanvas");
  if (offcanvas) {
    const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvas);
    offcanvas.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        bsOffcanvas.hide();
      });
    });
  }

  // 2. Scroll to top on internal link click
document.querySelectorAll('a[href^="#"], a[href^="/"], a[href^="."]').forEach((link) => {
    link.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookieConsent");
  const acceptBtn = document.getElementById("acceptCookies");

  // Check cookie
  if (!localStorage.getItem("cookiesAccepted")) {
    banner.classList.remove("d-none");
  }

  // Accept button click
  acceptBtn?.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    banner.classList.add("d-none");
  });
});
