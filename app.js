document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".jeff-card");
  const player = document.getElementById("jeff-player");
  const section = document.getElementById("jeff-section");

  // If any element is missing, stop (prevents console spam)
  if (!card || !player || !section) return;

  // Random Jeff embed links
  const jeffVideos = [
    "https://www.youtube.com/embed/X6H4l9R3DnY",
    "https://www.youtube.com/embed/roCP6wCXPqo",
    "https://www.youtube.com/embed/5jY6EPf4v9A",
    "https://www.youtube.com/embed/IAnhFUUCq6c"
  ];

  const randomVideo = jeffVideos[Math.floor(Math.random() * jeffVideos.length)];
  player.src = `${randomVideo}?autoplay=1&mute=1&playsinline=1`;

  // Slide in when the section is around bottom-middle of the viewport
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
    {
      threshold: 0,
      rootMargin: "0px 0px -25% 0px" // change to -20% earlier, -50% later
    }
  );

  obs.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector("#heroCarousel");
  if (!el || !window.bootstrap) return;

  const c = bootstrap.Carousel.getOrCreateInstance(el, {
    interval: 5000,
    ride: "carousel",
    pause: false,
    touch: true
  });

  c.cycle(); // force it to start moving
});

document.addEventListener("DOMContentLoaded", () => {
  const tip = document.getElementById("trainer-tip");
  const trigger = document.getElementById("tip-trigger");
  const muscle = document.querySelector(".vitruvian-wrap");
  const tipText = document.getElementById("tip-text");

  if (!tip || !trigger || !muscle || !tipText) return;

  // random tip text
  const tips = [
    "Control the negative — muscles grow on the way down.",
    "If you can ego lift it, you can probably lift it lighter and better.",
    "Progression beats perfection.",
    "Leave 1–2 reps in reserve most sets.",
    "Sleep is the highest legal performance enhancer."
  ];
  tipText.textContent = tips[Math.floor(Math.random() * tips.length)];

  // Track visibility safely (no entry order assumptions)
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
  }, {
    threshold: 0,
    rootMargin: "0px 0px -25% 0px" // tweak later if you want
  });

  observer.observe(trigger);
  observer.observe(muscle);
});

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("supplement-section");
  if (!grid) return;

  const cols = Array.from(grid.children).filter(el =>
    el.classList.contains("col-12")
  );

  // groups columns that share the same "top" (same row visually)
  const getRowGroup = (col) => {
    const top = col.getBoundingClientRect().top;
    // allow tiny differences from sub-pixel layout
    const EPS = 4;

    return cols.filter(c => Math.abs(c.getBoundingClientRect().top - top) < EPS);
  };

  const clearRowHover = () => {
    cols.forEach(c => c.classList.remove("supp-rowhover"));
  };

  cols.forEach(col => {
    col.addEventListener("mouseenter", () => {
      clearRowHover();
      const row = getRowGroup(col);
      row.forEach(c => c.classList.add("supp-rowhover"));
    });

    col.addEventListener("mouseleave", () => {
      // small delay helps when moving between cards in same row
      requestAnimationFrame(() => {
        // if mouse is still inside the grid, keep row hover based on hovered element
        const hovered = cols.find(c => c.matches(":hover"));
        if (!hovered) clearRowHover();
        else {
          clearRowHover();
          getRowGroup(hovered).forEach(c => c.classList.add("supp-rowhover"));
        }
      });
    });
  });

  // when the window resizes, the row grouping changes
  window.addEventListener("resize", () => {
    const hovered = cols.find(c => c.matches(":hover"));
    clearRowHover();
    if (hovered) getRowGroup(hovered).forEach(c => c.classList.add("supp-rowhover"));
  });
});
