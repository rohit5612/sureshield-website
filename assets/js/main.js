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


// ------form handler-----

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
      e.preventDefault(); // stop form from submitting
      alert(errorMessage);
    }
  });
}
