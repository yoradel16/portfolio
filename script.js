const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabId = button.getAttribute("data-tab");

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    button.classList.add("active");
    document
      .querySelector(`.tab-content[data-tab="${tabId}"]`)
      .classList.add("active");
  });
});

let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-item");
const totalSlides = slides.length;
const wrapper = document.getElementById("carousel-wrapper");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const indicators = document.querySelectorAll(".indicator");

function updateCarousel() {
  const translateX = -currentSlide * 100;
  wrapper.style.transform = `translateX(${translateX}%)`;

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide);
  });

  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === totalSlides - 1;
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateCarousel();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateCarousel();
  }
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => goToSlide(index));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});

updateCarousel();

const contact_btn = document.getElementById("lets_collaborate");
const modal_overlay = document.getElementById("modal-overlay");
const close_btn = document.getElementById("close_btn");

contact_btn.onclick = function () {
  modal_overlay.classList.add("active");
};

close_btn.onclick = function () {
  modal_overlay.classList.remove("active");
};

window.onclick = function (event) {
  if (event.target === modal_overlay) {
    modal_overlay.classList.remove("active");
  }
};

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

reveals.forEach((el) => observer.observe(el));

const contactForm = document.querySelector("#modal-content form");
const modalContent = document.getElementById("modal-content");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      if (response.ok) {
        modalContent.innerHTML = `
          <div class="modal-header">
            <h2>Thank you! 🎉</h2>
            <img src="assets/close.svg" id="close_btn"/>
          </div>
          <p>Your message has been sent successfully. I'll get back to you soon!</p>
          
        `;
        document.getElementById("close_btn").onclick = function () {
          modal_overlay.classList.remove("active");
        };
      } else {
        modalContent.innerHTML = `
          <div class="modal-header">
            <h2>Oops!</h2>
          </div>
          <p>Something went wrong. Please try again later or email me directly.</p>
          <button id="close_btn" style="margin-top:2rem;">Close</button>
        `;
        document.getElementById("close_btn").onclick = function () {
          modal_overlay.classList.remove("active");
        };
      }
    } catch (error) {
      modalContent.innerHTML = `
        <div class="modal-header">
          <h2>Oops!</h2>
        </div>
        <p>Something went wrong. Please try again later or email me directly.</p>
        <button id="close_btn" style="margin-top:2rem;">Close</button>
      `;
      document.getElementById("close_btn").onclick = function () {
        modal_overlay.classList.remove("active");
      };
    }
  });
}
