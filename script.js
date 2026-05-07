// ===============================
// Step 7: JavaScript Interactions
// ===============================

// HTMLの読み込みが終わってから処理を実行する
document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  setupMoreAboutToggle();
  setupRevealAnimation();
  setupBackToTopButton();
});

// -------------------------------
// 1. ダークモード切り替え
// -------------------------------
function setupThemeToggle() {
  const themeToggleButton = document.getElementById("theme-toggle");

  if (!themeToggleButton) {
    return;
  }

  themeToggleButton.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");

    if (isDarkMode) {
      themeToggleButton.textContent = "☀️ Light";
      themeToggleButton.setAttribute("aria-label", "ライトモードに切り替える");
    } else {
      themeToggleButton.textContent = "🌙 Dark";
      themeToggleButton.setAttribute("aria-label", "ダークモードに切り替える");
    }
  });
}

// -------------------------------
// 2. Aboutの詳細表示切り替え
// -------------------------------
function setupMoreAboutToggle() {
  const moreAboutButton = document.getElementById("more-about-button");
  const moreAboutContent = document.getElementById("more-about");

  if (!moreAboutButton || !moreAboutContent) {
    return;
  }

  moreAboutButton.addEventListener("click", () => {
    const isHidden = moreAboutContent.hidden;

    moreAboutContent.hidden = !isHidden;
    moreAboutButton.setAttribute("aria-expanded", String(isHidden));

    if (isHidden) {
      moreAboutButton.textContent = "閉じる";
    } else {
      moreAboutButton.textContent = "さらに詳しく見る";
    }
  });
}

// -------------------------------
// 3. スクロール時にセクションをふわっと表示
// -------------------------------
function setupRevealAnimation() {
  const sections = document.querySelectorAll("main > section");

  sections.forEach((section) => {
    section.classList.add("reveal");
  });

  const observerOptions = {
    threshold: 0.15,
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    revealObserver.observe(section);
  });
}

// -------------------------------
// 4. トップへ戻るボタン
// -------------------------------
function setupBackToTopButton() {
  const backToTopButton = document.getElementById("back-to-top");

  if (!backToTopButton) {
    return;
  }

  window.addEventListener("scroll", () => {
    const shouldShowButton = window.scrollY > 500;

    if (shouldShowButton) {
      backToTopButton.classList.add("is-visible");
    } else {
      backToTopButton.classList.remove("is-visible");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}