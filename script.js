/* =========================
   ELEMENTS & SETUP
========================= */
const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicToggle");
const screens = document.querySelectorAll(".screen");
let playing = false;

/* =========================
   AUTOPLAY FIX
========================= */
document.body.addEventListener(
  "click",
  () => {
    if (!playing) {
      music
        .play()
        .then(() => {
          playing = true;
          musicBtn.innerHTML = "🔊";
        })
        .catch(() => {
          console.log("Music blocked");
        });
    }
  },
  { once: true },
);

musicBtn.addEventListener("click", () => {
  if (playing) {
    music.pause();
    playing = false;
    musicBtn.innerHTML = "🔇";
  } else {
    music.play();
    playing = true;
    musicBtn.innerHTML = "🔊";
  }
});

/* =========================
   SCREEN SWITCHER
========================= */
function showScreen(id) {
  screens.forEach((screen) => {
    screen.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

/* =========================
   LOADING → COUNTDOWN
========================= */
setTimeout(() => {
  showScreen("countdown");
  let count = 3;
  const counter = document.getElementById("countNumber");

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      counter.innerText = count;
    }
    if (count === 0) {
      counter.innerText = "🎉";
    }
    if (count < 0) {
      clearInterval(interval);
      showScreen("hero");
    }
  }, 1000);
}, 4500);

/* =========================
   SLIDESHOW LOGIC
========================= */
let currentSlide = 0;
let slideInterval;

function startSlideshow() {
  const slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return;

  clearInterval(slideInterval); // Clear any old timers

  slideInterval = setInterval(() => {
    // Remove active class from all slides
    slides.forEach((slide) => slide.classList.remove("active"));

    // Move to the next slide, loop back to 0 if at the end
    currentSlide = (currentSlide + 1) % slides.length;

    // Add active class to the new slide
    slides[currentSlide].classList.add("active");
  }, 2500); // 2.5 seconds
}

/* =========================
   BUTTON NAVIGATION
========================= */
document.getElementById("giftBtn").addEventListener("click", () => {
  showScreen("letter");
});

document.getElementById("galleryBtn").addEventListener("click", () => {
  showScreen("gallery");

  // Reset everything manually when entering the gallery
  const slides = document.querySelectorAll(".slide");
  slides.forEach((s) => s.classList.remove("active"));
  if (slides.length > 0) {
    slides[0].classList.add("active"); // Force first image to show
  }
  currentSlide = 0;

  // Kick off the timer
  startSlideshow();
});

document.getElementById("rewatchBtn").addEventListener("click", () => {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((s) => s.classList.remove("active"));
  if (slides.length > 0) slides[0].classList.add("active");

  currentSlide = 0;
  startSlideshow();
  document.getElementById("gallery").scrollTop = 0;
});

document.getElementById("reopenGiftBtn").addEventListener("click", () => {
  location.reload();
});

document.getElementById("appreciationBtn").addEventListener("click", () => {
  showScreen("appreciation");
  clearInterval(slideInterval); // Stop timer when leaving gallery
});

document.getElementById("finalBtn").addEventListener("click", () => {
  showScreen("final");
});

document.getElementById("homeBtn").addEventListener("click", () => {
  showScreen("hero");
});

document.getElementById("restartBtn").addEventListener("click", () => {
  location.reload();
});

document.getElementById("exitBtn").addEventListener("click", () => {
  window.location.href = "about:blank";
});

/* =========================
   DECORATIVE ANIMATIONS
========================= */
function createBalloon() {
  const balloon = document.createElement("div");
  balloon.className = "balloon";
  balloon.innerHTML = "🎈";
  balloon.style.left = Math.random() * 100 + "vw";
  balloon.style.animationDuration = 8 + Math.random() * 8 + "s";
  document.body.appendChild(balloon);
  setTimeout(() => {
    balloon.remove();
  }, 16000);
}
setInterval(createBalloon, 1500);

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 5 + Math.random() * 5 + "s";
  document.body.appendChild(heart);
  setTimeout(() => {
    heart.remove();
  }, 10000);
}
setInterval(createHeart, 1800);

function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.top = Math.random() * 100 + "vh";
  document.body.appendChild(sparkle);
  setTimeout(() => {
    sparkle.remove();
  }, 2000);
}
setInterval(createSparkle, 700);

/* =========================
   BACKGROUND ELEMENTS
========================= */
const starsContainer = document.getElementById("stars");
for (let i = 0; i < 150; i++) {
  const star = document.createElement("div");
  star.className = "star";
  const size = Math.random() * 3;
  star.style.width = size + "px";
  star.style.height = size + "px";
  star.style.left = Math.random() * 100 + "vw";
  star.style.top = Math.random() * 100 + "vh";
  star.style.animationDuration = 1 + Math.random() * 3 + "s";
  starsContainer.appendChild(star);
}

function createConfetti() {
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.background = `hsl(${Math.random() * 360},100%,50%)`;
    confetti.style.animationDuration = 3 + Math.random() * 5 + "s";
    document.body.appendChild(confetti);
    setTimeout(() => {
      confetti.remove();
    }, 8000);
  }
}
setInterval(createConfetti, 5000);

/* =========================
   FIREWORKS
========================= */
const canvas = document.getElementById("fireworks");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = [];

  function firework() {
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 6,
        dy: (Math.random() - 0.5) * 6,
        life: 100,
      });
    }
  }
  setInterval(firework, 1000);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${Math.random() * 360},100%,50%)`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      p.life--;
      if (p.life <= 0) {
        particles.splice(index, 1);
      }
    });
    requestAnimationFrame(animate);
  }
  animate();
}

function megaFirework() {
  for (let i = 0; i < 80; i++) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.width = "6px";
    particle.style.height = "6px";
    particle.style.borderRadius = "50%";
    particle.style.background = `hsl(${Math.random() * 360},100%,50%)`;
    particle.style.left = window.innerWidth / 2 + "px";
    particle.style.top = window.innerHeight / 2 + "px";
    particle.style.zIndex = "9999";
    document.body.appendChild(particle);

    const x = (Math.random() - 0.5) * 1000;
    const y = (Math.random() - 0.5) * 1000;

    particle.animate(
      [
        { transform: "translate(0,0)", opacity: 1 },
        { transform: `translate(${x}px,${y}px)`, opacity: 0 },
      ],
      { duration: 3000 },
    );

    setTimeout(() => {
      particle.remove();
    }, 3000);
  }
}

setInterval(() => {
  const finalPage = document.getElementById("final");
  if (finalPage.classList.contains("active")) {
    megaFirework();
  }
}, 3000);
