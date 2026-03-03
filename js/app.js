/* =========================
   THEME TOGGLE (ALL PAGES)
   ========================= */
document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const root = document.documentElement;

  // load saved theme
  const saved = localStorage.getItem("theme");
  if (saved === "light") root.setAttribute("data-theme","light");

  updateLabel();

  btn.addEventListener("click", () => {

    // activate transition mode
    root.classList.add("theme-transition");

    const isLight = root.getAttribute("data-theme") === "light";

    if(isLight){
      root.removeAttribute("data-theme");
      localStorage.setItem("theme","dark");
    }else{
      root.setAttribute("data-theme","light");
      localStorage.setItem("theme","light");
    }

    updateLabel();

    // remove transition helper after animation
    setTimeout(()=>{
      root.classList.remove("theme-transition");
    }, 400);
  });

  function updateLabel(){
    const isLight = root.getAttribute("data-theme") === "light";
    btn.textContent = isLight ? "🌙 Dark mode" : "☀️ Light mode";
  }

});



/* =========================
   JEFF CARD (INDEX ONLY)
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".jeff-card");
  const player = document.getElementById("jeff-player");
  const section = document.getElementById("jeff-section");

  if (!card || !player || !section) return;

  const jeffVideos = [
    "https://www.youtube.com/embed/X6H4l9R3DnY",
    "https://www.youtube.com/embed/roCP6wCXPqo",
    "https://www.youtube.com/embed/GMEMKMAb5w4?si=9Ra60SSKcaII_6mV",
    "https://www.youtube.com/embed/IAnhFUUCq6c"
  ];

  const randomVideo = jeffVideos[Math.floor(Math.random() * jeffVideos.length)];
  player.src = `${randomVideo}?autoplay=1&mute=1&playsinline=1`;

  const obs = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        card.classList.add("jeff-show");
        card.classList.remove("jeff-hidden");
      } else {
        card.classList.remove("jeff-show");
        card.classList.add("jeff-hidden");
      }
    },
    { threshold: 0, rootMargin: "0px 0px -25% 0px" }
  );

  obs.observe(section);
});


/* =========================
   HERO CAROUSEL (INDEX ONLY)
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector("#heroCarousel");
  if (!el || !window.bootstrap) return;

  const c = bootstrap.Carousel.getOrCreateInstance(el, {
    interval: 5000,
    ride: "carousel",
    pause: false,
    touch: true
  });

  c.cycle();
});


/* =========================
   TRAINER TIP (INDEX ONLY)
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const tip = document.getElementById("trainer-tip");
  const trigger = document.getElementById("tip-trigger");
  const muscle = document.querySelector(".vitruvian-wrap");
  const tipText = document.getElementById("tip-text");

  if (!tip || !trigger || !muscle || !tipText) return;

  const tips = [
    "Control the negative — muscles grow on the way down.",
    "If you can ego lift it, you can probably lift it lighter and better.",
    "Progression beats perfection.",
    "Leave 1–2 reps in reserve most sets.",
    "Sleep is the highest legal performance enhancer."
  ];
  tipText.textContent = tips[Math.floor(Math.random() * tips.length)];

  let triggerVisible = false;
  let muscleVisible = false;

  const update = () => {
    if (triggerVisible && !muscleVisible) tip.classList.add("show");
    else tip.classList.remove("show");
  };

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === trigger) triggerVisible = entry.isIntersecting;
      if (entry.target === muscle) muscleVisible = entry.isIntersecting;
    }
    update();
  }, { threshold: 0, rootMargin: "0px 0px -25% 0px" });

  observer.observe(trigger);
  observer.observe(muscle);
});


/* =========================
   SUPP ROW HOVER (INDEX ONLY)
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("supplement-section");
  if (!grid) return;

  const cols = Array.from(grid.children).filter(el => el.classList.contains("col-12"));
  if (!cols.length) return;

  const EPS = 4;

  const getRowGroup = (col) => {
    const top = col.getBoundingClientRect().top;
    return cols.filter(c => Math.abs(c.getBoundingClientRect().top - top) < EPS);
  };

  const clearRowHover = () => cols.forEach(c => c.classList.remove("supp-rowhover"));

  cols.forEach(col => {
    col.addEventListener("mouseenter", () => {
      clearRowHover();
      getRowGroup(col).forEach(c => c.classList.add("supp-rowhover"));
    });

    col.addEventListener("mouseleave", () => {
      requestAnimationFrame(() => {
        const hovered = cols.find(c => c.matches(":hover"));
        clearRowHover();
        if (hovered) getRowGroup(hovered).forEach(c => c.classList.add("supp-rowhover"));
      });
    });
  });

  window.addEventListener("resize", () => {
    const hovered = cols.find(c => c.matches(":hover"));
    clearRowHover();
    if (hovered) getRowGroup(hovered).forEach(c => c.classList.add("supp-rowhover"));
  });
});


/* =========================
   GEN PAGES ROW HOVER (ALL PAGES THAT HAVE .gen-card)
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const rows = Array.from(document.querySelectorAll(".row"))
    .filter(r => r.querySelector(".gen-card"));

  if (!rows.length) return;

  const EPS = 4;

  const getCols = (row) =>
    Array.from(row.children).filter(el => el.classList.contains("col-12"));

  const rowGroupForCol = (cols, col) => {
    const top = col.getBoundingClientRect().top;
    return cols.filter(c => Math.abs(c.getBoundingClientRect().top - top) < EPS);
  };

  rows.forEach(row => {
    const cols = getCols(row);
    if (!cols.length) return;

    const clearRow = () => cols.forEach(c => c.classList.remove("gen-rowhover"));

    cols.forEach(col => {
      col.addEventListener("mouseenter", () => {
        clearRow();
        rowGroupForCol(cols, col).forEach(c => c.classList.add("gen-rowhover"));
      });

      col.addEventListener("mouseleave", () => {
        requestAnimationFrame(() => {
          const hovered = cols.find(c => c.matches(":hover"));
          clearRow();
          if (hovered) rowGroupForCol(cols, hovered).forEach(c => c.classList.add("gen-rowhover"));
        });
      });
    });

    window.addEventListener("resize", () => {
      const hovered = cols.find(c => c.matches(":hover"));
      clearRow();
      if (hovered) rowGroupForCol(cols, hovered).forEach(c => c.classList.add("gen-rowhover"));
    });
  });
});

