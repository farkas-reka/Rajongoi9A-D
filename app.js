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
