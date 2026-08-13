"use strict";

/* =========================================================
   NEXORA — INTERACTIONS FRONTEND
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const modalOverlay = document.getElementById("createModal");
  const menuModal = document.getElementById("menuModal");
  const toast = document.getElementById("toast");

  let toastTimer = null;

  /* =======================================================
     OUTILS
     ======================================================= */

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }

  function openModal(modal) {
    if (!modal) return;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    if (!modal) return;

    modal.classList.remove("open");

    if (
      !modalOverlay?.classList.contains("open") &&
      !menuModal?.classList.contains("open")
    ) {
      document.body.style.overflow = "";
    }
  }

  function closeAllModals() {
    modalOverlay?.classList.remove("open");
    menuModal?.classList.remove("open");
    document.body.style.overflow = "";
  }

  /* =======================================================
     BOUTON +
     ======================================================= */

  const createButtons = document.querySelectorAll(
    "[data-action='create'], .create-header, .nav-create"
  );

  createButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openModal(modalOverlay);
    });
  });

  /* =======================================================
     FERMETURE MODALE CRÉATION
     ======================================================= */

  const closeCreateButton = document.querySelector(
    "[data-action='close-create']"
  );

  closeCreateButton?.addEventListener("click", () => {
    closeModal(modalOverlay);
  });

  modalOverlay?.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal(modalOverlay);
    }
  });

  /* =======================================================
     OPTIONS DE CRÉATION
     ======================================================= */

  const creationChoices = document.querySelectorAll(
    ".creation-choice, .composer-option"
  );

  creationChoices.forEach((choice) => {
    choice.addEventListener("click", () => {
      const type =
        choice.dataset.type ||
        choice.querySelector("strong")?.textContent ||
        "contenu";

      closeModal(modalOverlay);

      const messages = {
        Photo: "📷 Sélection de photos bientôt disponible.",
        Vidéo: "🎬 Création vidéo bientôt disponible.",
        Texte: "✍️ Éditeur de texte bientôt disponible.",
        Musique: "🎵 Création musicale bientôt disponible.",
        Lieu: "📍 Ajout d'un lieu bientôt disponible.",
        Moment: "✨ Création d'un Moment bientôt disponible."
      };

      showToast(messages[type] || `✨ Création : ${type}`);
    });
  });

  /* =======================================================
     MENU PRINCIPAL
     ======================================================= */

  const menuButtons = document.querySelectorAll(
    "[data-action='menu'], .hamburger"
  );

  menuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openModal(menuModal);
    });
  });

  const closeMenuButton = document.querySelector(
    "[data-action='close-menu']"
  );

  closeMenuButton?.addEventListener("click", () => {
    closeModal(menuModal);
  });

  /* =======================================================
     RECHERCHE
     ======================================================= */

  const searchButtons = document.querySelectorAll(
    "[data-action='search']"
  );

  searchButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showToast("🔎 Recherche Nexora bientôt disponible.");
    });
  });

  /* =======================================================
     LIKES
     ======================================================= */

  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const countElement = button.querySelector(".like-count");
      const heart = button.querySelector(".heart");

      if (!countElement) return;

      const currentCount = Number.parseInt(
        countElement.textContent,
        10
      ) || 0;

      const liked = button.classList.toggle("liked");

      countElement.textContent = liked
        ? String(currentCount + 1)
        : String(Math.max(0, currentCount - 1));

      if (heart) {
        heart.textContent = liked ? "♥" : "♡";
      }
    });
  });

  /* =======================================================
     COMMENTAIRES
     ======================================================= */

  const commentButtons = document.querySelectorAll(
    "[data-action='comment']"
  );

  commentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const post = button.closest(".post-card");

      if (!post) {
        showToast("💬 Commentaires bientôt disponibles.");
        return;
      }

      const commentLink = post.querySelector(".comments-link");

      if (commentLink) {
        commentLink.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

        showToast("💬 Découvre les commentaires.");
      } else {
        showToast("💬 Commentaires bientôt disponibles.");
      }
    });
  });

  /* =======================================================
     PARTAGE
     ======================================================= */

  const shareButtons = document.querySelectorAll(
    "[data-action='share']"
  );

  shareButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const post = button.closest(".post-card");

      const author =
        post?.querySelector(".author-name")?.textContent?.trim() ||
        "Nexora";

      const shareData = {
        title: `Publication de ${author}`,
        text: "Découvre cette publication sur Nexora."
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          showToast("✓ Publication partagée.");
        } catch (error) {
          if (error.name !== "AbortError") {
            showToast("Impossible de partager pour le moment.");
          }
        }

        return;
      }

      showToast("🔗 Lien de partage bientôt disponible.");
    });
  });

  /* =======================================================
     ENREGISTREMENT
     ======================================================= */

  const saveButtons = document.querySelectorAll(
    "[data-action='save']"
  );

  saveButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const saved = button.classList.toggle("saved");
      const icon = button.querySelector(".action-icon");

      if (icon) {
        icon.textContent = saved ? "🔖" : "🔖";
      }

      showToast(
        saved
          ? "🔖 Publication enregistrée."
          : "Publication retirée des enregistrements."
      );
    });
  });

  /* =======================================================
     MOMENTS
     ======================================================= */

  const momentCards = document.querySelectorAll(
    ".moment-card:not(.create-moment)"
  );

  momentCards.forEach((moment) => {
    moment.addEventListener("click", () => {
      const name =
        moment.querySelector("strong")?.textContent || "Moment";

      showToast(`✨ Moment de ${name}`);
    });
  });

  const createMoment = document.querySelector(".create-moment");

  createMoment?.addEventListener("click", () => {
    openModal(modalOverlay);
  });

  /* =======================================================
     NAVIGATION BASSE
     ======================================================= */

  const navItems = document.querySelectorAll(
    ".bottom-navigation .nav-item"
  );

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.classList.contains("nav-create")) {
        return;
      }

      navItems.forEach((nav) => {
        nav.classList.remove("active");
      });

      item.classList.add("active");

      const label = item.querySelector("span:last-child");

      if (label) {
        const text = label.textContent.trim();

        if (text !== "Accueil") {
          showToast(`${text} — espace Nexora bientôt disponible.`);
        }
      }
    });
  });

  /* =======================================================
     BOUTON FILTRE
     ======================================================= */

  const filterButton = document.querySelector(
    "[data-action='filter']"
  );

  filterButton?.addEventListener("click", () => {
    showToast(
      "🎯 Ton fil Nexora est personnalisé selon tes centres d'intérêt."
    );
  });

  /* =======================================================
     COMPOSER
     ======================================================= */

  const composerInput = document.querySelector(".composer-input");

  composerInput?.addEventListener("click", () => {
    openModal(modalOverlay);
  });

  const cameraButton = document.querySelector(".camera-button");

  cameraButton?.addEventListener("click", () => {
    showToast("📷 Appareil photo Nexora bientôt disponible.");
  });

  /* =======================================================
     MENU : CARTES
     ======================================================= */

  const menuCards = document.querySelectorAll(".menu-card");

  menuCards.forEach((card) => {
    card.addEventListener("click", () => {
      const title =
        card.querySelector("strong")?.textContent?.trim() ||
        "Fonctionnalité";

      const menuMessages = {
        "Mes Moments": "✨ Retrouve ici tous tes Moments.",
        "Découvrir": "🧭 Découvre du contenu adapté à tes goûts.",
        "Mes créations": "🎨 Toutes tes créations Nexora seront ici.",
        "Enregistrements": "🔖 Tes publications enregistrées seront ici.",
        "Amis": "👥 Ton espace de relations Nexora.",
        "Messages": "💬 Tes conversations seront ici.",
        Notifications: "🔔 Tes notifications seront ici.",
        Paramètres: "⚙️ Les paramètres de ton compte seront ici."
      };

      showToast(
        menuMessages[title] ||
          `${title} — fonctionnalité bientôt disponible.`
      );
    });
  });

  /* =======================================================
     TOUCH / SWIPE POUR FERMER LE MENU
     ======================================================= */

  let touchStartX = 0;

  menuModal?.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
    },
    { passive: true }
  );

  menuModal?.addEventListener(
    "touchend",
    (event) => {
      const touchEndX = event.changedTouches[0].screenX;
      const distance = touchEndX - touchStartX;

      if (distance > 90) {
        closeModal(menuModal);
      }
    },
    { passive: true }
  );

  /* =======================================================
     ESCAPE
     ======================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });

  /* =======================================================
     MESSAGE DE BIENVENUE
     ======================================================= */

  setTimeout(() => {
    showToast("✨ Bienvenue sur Nexora.");
  }, 700);
});
