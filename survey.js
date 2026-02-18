// ===== SURVEY / QUIZ (10 questions) =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quizForm");
  const resultBox = document.getElementById("resultBox");

  // If the page isn't the survey page, don't do anything
  if (!form || !resultBox) return;

  // ---- QUESTIONS LIST (radio "name" attributes) ----
  const questions = ["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10"];

  // ---- ANSWER KEY (value of the correct radio option) ----
  const key = {
    q1: "b",
    q2: "a",
    q3: "c",
    q4: "b",
    q5: "d",
    q6: "a",
    q7: "c",
    q8: "b",
    q9: "a",
    q10:"d"
  };

  // ---- EXPLANATIONS (shown only when wrong) ----
  const explain = {
    q1: "Creatine works by increasing phosphocreatine stores → more short-burst strength.",
    q2: "Protein is the building block. If you don’t hit daily protein, recovery suffers.",
    q3: "Caffeine hits best ~30–60 min pre-workout, too late = sleep nuked.",
    q4: "Progressive overload = small improvements over time (reps/weight/sets).",
    q5: "Good form + control beats ego lifting for long-term gains and safety.",
    q6: "Sleep is literally your legal steroid. Bad sleep = bad recovery.",
    q7: "Warm-up sets prepare joints + nervous system, not just ‘get sweaty’.",
    q8: "Balanced program trains push/pull/legs to avoid imbalances & injury.",
    q9: "Hydration + electrolytes matter more the more you sweat.",
    q10:"Consistency wins. Fancy plans die if you can’t stick to them."
  };

  // ---- Helper: clear previous styles/explanations ----
  function resetUI() {
    document.querySelectorAll(".opt").forEach(o => o.classList.remove("good","bad"));
    document.querySelectorAll(".explain").forEach(e => {
      e.classList.remove("show");
      e.textContent = "";
    });
    resultBox.classList.remove("show","good","mid","bad");
    resultBox.innerHTML = "";
  }

  // ---- Helper: rating text based on score ----
  function ratingFromScore(score, total) {
    const pct = Math.round((score / total) * 100);

    if (pct >= 90) return { label: "BEAST MODE 🦍", cls: "good", msg: "Okay professor. You definitely lift AND read labels." };
    if (pct >= 70) return { label: "SOLID 💪", cls: "good", msg: "You’re doing great. Small tweaks and you’re cracked." };
    if (pct >= 50) return { label: "MID (but fixable) 😅", cls: "mid", msg: "Not cooked. Just needs more gym IQ." };
    return { label: "NEWBIE ARC 🚧", cls: "bad", msg: "All good — now you actually learn and level up." };
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    resetUI();

    const data = new FormData(form);

    // ---- Check all answered ----
    const missing = [];
    for (const q of questions) {
      if (!data.get(q)) missing.push(q.toUpperCase());
    }

    if (missing.length) {
      resultBox.classList.add("show","bad");
      resultBox.innerHTML = `
        <strong>Answer all questions first 😭</strong><br>
        <span class="text-muted">Missing: ${missing.join(", ")}</span>
      `;
      return;
    }

    // ---- Score + mark answers ----
    let correctCount = 0;

    for (const q of questions) {
      const picked = data.get(q);
      const correct = key[q];

      // ✅ correct selectors (strings, not variables)
      const chosenInput  = document.querySelector(`input[name="${q}"][value="${picked}"]`);
      const correctInput = document.querySelector(`input[name="${q}"][value="${correct}"]`);

      const chosenLabel  = chosenInput ? chosenInput.closest(".opt") : null;
      const correctLabel = correctInput ? correctInput.closest(".opt") : null;

      if (picked === correct) {
        correctCount++;
        chosenLabel?.classList.add("good");
      } else {
        chosenLabel?.classList.add("bad");
        correctLabel?.classList.add("good");

        // ✅ correct id string
        const exBox = document.getElementById(`ex-${q}`);
        if (exBox) {
          exBox.textContent = explain[q] || "No explanation added for this one yet.";
          exBox.classList.add("show");
        }
      }
    }

    // ---- Final rating ----
    const total = questions.length;
    const pct = Math.round((correctCount / total) * 100);
    const r = ratingFromScore(correctCount, total);

    resultBox.classList.add("show", r.cls);
    resultBox.innerHTML = `
      <div style="font-size:1.1rem; font-weight:800;">Score: ${correctCount}/${total} (${pct}%)</div>
      <div style="margin-top:6px; font-weight:700;">Rating: ${r.label}</div>
      <div class="text-muted" style="margin-top:6px;">${r.msg}</div>
    `;

    resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // Optional reset button support
  const resetBtn = document.getElementById("resetQuiz");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      form.reset();
      resetUI();
    });
  }
});
