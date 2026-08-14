"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const createModal = document.getElementById("createModal");
  const menuModal = document.getElementById("menuModal");
  const toast = document.getElementById("toast");

  let toastTimer = null;


  /* =========================================================
     UTILITAIRES
     ========================================================= */

  function showToast(message) {

    if (!toast) {
      return;
    }

    clearTimeout(toastTimer);

    toast.textContent = message;
    toast.classList.add("show");

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }


  function openModal(modal) {

    if (!modal) {
      return;
    }

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }


  function closeModal(modal) {

    if (!modal) {
      return;
    }

    modal.classList.remove("open");

    const createIsOpen =
      createModal?.classList.contains("open");

    const menuIsOpen =
      menuModal?.classList.contains("open");

    if (!createIsOpen && !menuIsOpen) {
      document.body.style.overflow = "";
    }
  }


  function closeAllModals() {

    createModal?.classList.remove("open");
    menuModal?.classList.remove("open");

    document.body.style.overflow = "";
  }


  /* =========================================================
     CRÉATION
     ========================================================= */

  const composerCreateButton =
    document.getElementById("composerCreateButton");

  const openComposer =
    document.getElementById("openComposer");

  const createMoment =
    document.getElementById("createMoment");


  composerCreateButton?.addEventListener("click", () => {
    openModal(createModal);
  });


  openComposer?.addEventListener("click", () => {
    openModal(createModal);
  });


  createMoment?.addEventListener("click", () => {
    openModal(createModal);
  });


  /* =========================================================
     FERMETURE CRÉATION
     ========================================================= */

  const createCloseButton =
    createModal?.querySelector("[data-close-modal]");


  createCloseButton?.addEventListener("click", () => {
    closeModal(createModal);
  });


  createModal?.addEventListener("click", (event) => {

    if (event.target === createModal) {
      closeModal(createModal);
    }

  });


  /* =========================================================
     CHOIX DE CRÉATION
     ========================================================= */

  const creationButtons =
    document.querySelectorAll("[data-modal-create]");


  const creationMessages = {

    Photo:
      "📷 La création photo Nexora arrive bientôt.",

    Vidéo:
      "🎬 La création vidéo Nexora arrive bientôt.",

    Texte:
      "✍️ L'éditeur de texte Nexora arrive bientôt.",

    Musique:
      "🎵 La création musicale Nexora arrive bientôt.",

    Lieu:
      "📍 L'ajout de lieu Nexora arrive bientôt.",

    Moment:
      "✨ La création de Moment Nexora arrive bientôt."

  };


  creationButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const type =
        button.dataset.modalCreate || "contenu";

      closeModal(createModal);

      showToast(
        creationMessages[type] ||
        `✨ Création ${type} bientôt disponible.`
      );

    });

  });


  /* =========================================================
     VIDÉOS
     ========================================================= */

  const videoButton =
    document.getElementById("videoButton");


  videoButton?.addEventListener("click", () => {

    showToast(
      "🎥 Les vidéos Nexora arrivent ici."
    );

  });


  /* =========================================================
     NOTIFICATIONS
     ========================================================= */

  const notificationButton =
    document.getElementById("notificationButton");


  notificationButton?.addEventListener("click", () => {

    showToast(
      "🔔 Tu n'as pas encore de nouvelles notifications."
    );

  });


  /* =========================================================
     MENU
     ========================================================= */

  const menuButton =
    document.getElementById("menuButton");


  menuButton?.addEventListener("click", () => {
    openModal(menuModal);
  });


  const closeMenuButton =
    menuModal?.querySelector("[data-close-menu]");


  closeMenuButton?.addEventListener("click", () => {
    closeModal(menuModal);
  });


  menuModal?.addEventListener("click", (event) => {

    if (event.target === menuModal) {
      closeModal(menuModal);
    }

  });


  /* =========================================================
     RECHERCHE DU MENU
     ========================================================= */

  const menuSearchButton =
    document.getElementById("menuSearchButton");


  menuSearchButton?.addEventListener("click", () => {

    showToast(
      "🔎 Recherche dans Nexora bientôt disponible."
    );

  });


  /* =========================================================
     MOMENTS
     ========================================================= */

  const momentCards =
    document.querySelectorAll(
      ".moment-card:not(.create-moment)"
    );


  momentCards.forEach((card) => {

    card.addEventListener("click", () => {

      const name =
        card.querySelector("strong")
          ?.textContent
          ?.trim() ||
        "cet utilisateur";

      showToast(
        `✨ Ouverture du Moment de ${name}.`
      );

    });

  });


  /* =========================================================
     FIL PERSONNALISÉ
     ========================================================= */

  const filterButton =
    document.getElementById("filterButton");


  filterButton?.addEventListener("click", () => {

    showToast(
      "🎯 Ton fil apprend progressivement ce que tu aimes."
    );

  });


  /* =========================================================
     LIKES
     ========================================================= */

  const likeButtons =
    document.querySelectorAll(".like-button");


  likeButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const countElement =
        button.querySelector(".like-count");

      const heart =
        button.querySelector(".heart");


      if (!countElement) {
        return;
      }


      const currentCount =
        Number.parseInt(
          countElement.textContent,
          10
        ) || 0;


      const alreadyLiked =
        button.classList.contains("liked");


      if (alreadyLiked) {

        button.classList.remove("liked");

        countElement.textContent =
          String(
            Math.max(
              0,
              currentCount - 1
            )
          );


        if (heart) {
          heart.textContent = "♡";
        }

      } else {

        button.classList.add("liked");

        countElement.textContent =
          String(currentCount + 1);


        if (heart) {
          heart.textContent = "♥";
        }


        showToast(
          "❤️ J'aime ajouté."
        );

      }

    });

  });


  /* =========================================================
     COMMENTAIRES
     ========================================================= */

  const commentButtons =
    document.querySelectorAll(".comment-button");


  commentButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const post =
        button.closest(".post-card");

      const commentsLink =
        post?.querySelector(".comments-link");


      if (commentsLink) {

        commentsLink.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

        showToast(
          "💬 Voici les commentaires."
        );

      } else {

        showToast(
          "💬 Les commentaires arrivent bientôt."
        );

      }

    });

  });


  const commentsLinks =
    document.querySelectorAll(".comments-link");


  commentsLinks.forEach((link) => {

    link.addEventListener("click", () => {

      showToast(
        "💬 L'espace commentaires Nexora arrive bientôt."
      );

    });

  });


  /* =========================================================
     REPOST
     ========================================================= */

  const repostButtons =
    document.querySelectorAll(".repost-button");


  repostButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const activated =
        button.classList.toggle("reposted");


      showToast(
        activated
          ? "🔁 Publication repostée."
          : "Publication retirée de tes reposts."
      );

    });

  });


  /* =========================================================
     ENREGISTREMENTS
     ========================================================= */

  const saveButtons =
    document.querySelectorAll(".save-button");


  saveButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const saved =
        button.classList.toggle("saved");


      showToast(
        saved
          ? "🔖 Publication enregistrée."
          : "Publication retirée des enregistrements."
      );

    });

  });


  /* =========================================================
     PARTAGE
     ========================================================= */

  const shareButtons =
    document.querySelectorAll(".share-button");


  shareButtons.forEach((button) => {

    button.addEventListener("click", async () => {

      const post =
        button.closest(".post-card");


      const author =
        post?.querySelector(".author-name")
          ?.textContent
          ?.trim() ||
        "Nexora";


      const shareData = {

        title:
          `Publication de ${author}`,

        text:
          "Découvre cette publication sur Nexora."

      };


      if (navigator.share) {

        try {

          await navigator.share(shareData);

          showToast(
            "✓ Publication partagée."
          );

        } catch (error) {

          if (error.name !== "AbortError") {

            showToast(
              "Le partage n'a pas pu être effectué."
            );

          }

        }

      } else {

        showToast(
          "🔗 Le partage sera bientôt disponible."
        );

      }

    });

  });


  /* =========================================================
     OPTIONS PUBLICATIONS
     ========================================================= */

  const moreButtons =
    document.querySelectorAll(".more-button");


  moreButtons.forEach((button) => {

    button.addEventListener("click", () => {

      showToast(
        "⋯ Options de publication Nexora."
      );

    });

  });


  /* =========================================================
     NAVIGATION
     ========================================================= */

  const navItems =
    document.querySelectorAll(".nav-item");


  navItems.forEach((item) => {

    item.addEventListener("click", () => {

      const page =
        item.dataset.page;


      navItems.forEach((navItem) => {

        navItem.classList.remove("active");

      });


      item.classList.add("active");


      const pageMessages = {

        home:
          "🏠 Accueil",

        friends:
          "👥 Ton espace Amis arrive bientôt.",

        messages:
          "💬 Tes messages arrivent bientôt.",

        profile:
          "👤 Ton profil arrive bientôt."

      };


      showToast(
        pageMessages[page] ||
        "Espace Nexora bientôt disponible."
      );

    });

  });


  /* =========================================================
     CARTES DU MENU
     ========================================================= */

  const menuCards =
    document.querySelectorAll(".menu-card");


  const menuMessages = {

    Messages:
      "💬 Ton espace de messages Nexora.",

    Explorer:
      "🧭 Explore du contenu adapté à tes goûts.",

    Moments:
      "✨ Retrouve ici tous tes Moments.",

    Enregistrements:
      "🔖 Retrouve tes contenus enregistrés.",

    Notifications:
      "🔔 Tes notifications Nexora.",

    Communautés:
      "👥 Découvre les communautés Nexora.",

    Découvrir:
      "✨ Découvre du contenu adapté à tes goûts.",

    Événements:
      "📅 Les événements Nexora arrivent bientôt."

  };


  menuCards.forEach((card) => {

    card.addEventListener("click", () => {

      const item =
        card.dataset.menuItem ||
        card.querySelector("strong")
          ?.textContent
          ?.trim() ||
        "Fonctionnalité";


      closeModal(menuModal);


      showToast(
        menuMessages[item] ||
        `${item} — bientôt disponible.`
      );

    });

  });


  /* =========================================================
     PARAMÈTRES
     ========================================================= */

  const menuSettings =
    document.querySelectorAll(
      ".menu-settings button"
    );


  menuSettings.forEach((button) => {

    button.addEventListener("click", () => {

      const title =
        button.querySelector("strong")
          ?.textContent
          ?.trim() ||
        "Option";


      if (title === "Déconnexion") {

        showToast(
          "🚪 La déconnexion sera disponible avec le compte Nexora."
        );

        return;
      }


      if (title === "Ajouter un compte") {

        showToast(
          "➕ L'ajout de comptes multiples arrivera bientôt."
        );

        return;
      }


      if (
        title ===
        "Paramètres et confidentialité"
      ) {

        showToast(
          "⚙️ Les paramètres Nexora arrivent bientôt."
        );

        return;
      }


      if (
        title ===
        "Aide et assistance"
      ) {

        showToast(
          "❓ Le centre d'aide Nexora arrive bientôt."
        );

      }

    });

  });


  /* =========================================================
     ESC
     ========================================================= */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeAllModals();
    }

  });


  /* =========================================================
     SWIPE MENU
     ========================================================= */

  let touchStartX = 0;


  menuModal?.addEventListener(
    "touchstart",
    (event) => {

      touchStartX =
        event.changedTouches[0].screenX;

    },
    {
      passive: true
    }
  );


  menuModal?.addEventListener(
    "touchend",
    (event) => {

      const touchEndX =
        event.changedTouches[0].screenX;

      const distance =
        touchEndX - touchStartX;


      if (distance > 90) {
        closeModal(menuModal);
      }

    },
    {
      passive: true
    }
  );


  /* =========================================================
     BIENVENUE
     ========================================================= */

  setTimeout(() => {

    showToast(
      "✨ Bienvenue sur Nexora."
    );

  }, 600);

});
