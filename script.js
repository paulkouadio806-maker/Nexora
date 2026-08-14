"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     ELEMENTS PRINCIPAUX
     ========================================================= */

  const createModal =
    document.getElementById("createModal");

  const menuModal =
    document.getElementById("menuModal");

  const toast =
    document.getElementById("toast");

  const quickCreateOverlay =
    document.getElementById("quickCreateOverlay");

  const storyCreateOverlay =
    document.getElementById("storyCreateOverlay");

  let toastTimer = null;


  /* =========================================================
     TOAST
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


  /* =========================================================
     BODY SCROLL
     ========================================================= */

  function updateBodyScroll() {

    const somethingOpen =
      createModal?.classList.contains("open") ||
      menuModal?.classList.contains("open") ||
      quickCreateOverlay?.classList.contains("open") ||
      storyCreateOverlay?.classList.contains("open");

    document.body.classList.toggle(
      "modal-open",
      Boolean(somethingOpen)
    );
  }


  /* =========================================================
     MODALES
     ========================================================= */

  function openModal(modal) {

    if (!modal) {
      return;
    }

    modal.classList.add("open");
    updateBodyScroll();
  }


  function closeModal(modal) {

    if (!modal) {
      return;
    }

    modal.classList.remove("open");
    updateBodyScroll();
  }


  function closeQuickCreate() {

    quickCreateOverlay?.classList.remove("open");
    updateBodyScroll();
  }


  function openStoryCreate() {

    if (!storyCreateOverlay) {
      return;
    }

    storyCreateOverlay.classList.add("open");
    updateBodyScroll();
  }


  function closeStoryCreate() {

    storyCreateOverlay?.classList.remove("open");
    updateBodyScroll();
  }


  function closeAllModals() {

    createModal?.classList.remove("open");
    menuModal?.classList.remove("open");
    quickCreateOverlay?.classList.remove("open");
    storyCreateOverlay?.classList.remove("open");

    updateBodyScroll();
  }


  /* =========================================================
     NOUVEAU + DEVANT "QUOI DE NEUF"
     ========================================================= */

  const composerCreateButton =
    document.getElementById("composerCreateButton");


  composerCreateButton?.addEventListener("click", (event) => {

    event.stopPropagation();

    quickCreateOverlay?.classList.add("open");

    updateBodyScroll();

  });


  /* =========================================================
     CLIC SUR PUBLICATION / STORY / NOTE
     ========================================================= */

  const quickCreateOptions =
    document.querySelectorAll(
      "[data-quick-create]"
    );


  quickCreateOptions.forEach((button) => {

    button.addEventListener("click", () => {

      const type =
        button.dataset.quickCreate;

      closeQuickCreate();


      if (type === "Story") {

        openStoryCreate();

        return;
      }


      if (type === "Publication") {

        showToast(
          "📝 Création d'une publication Nexora."
        );

        openModal(createModal);

        return;
      }


      if (type === "Note") {

        showToast(
          "💬 Création d'une note Nexora bientôt disponible."
        );

      }

    });

  });


  /* =========================================================
     FERMETURE POPUP RAPIDE
     ========================================================= */

  quickCreateOverlay?.addEventListener(
    "click",
    (event) => {

      if (
        event.target === quickCreateOverlay
      ) {

        closeQuickCreate();

      }

    }
  );


  /* =========================================================
     MOMENT +
     ========================================================= */

  const createMoment =
    document.getElementById("createMoment");


  createMoment?.addEventListener("click", () => {

    openStoryCreate();

  });


  /* =========================================================
     FERMETURE NOUVELLE STORY
     ========================================================= */

  const storyCloseButton =
    document.getElementById("storyCloseButton");


  storyCloseButton?.addEventListener(
    "click",
    () => {
      closeStoryCreate();
    }
  );


  storyCreateOverlay?.addEventListener(
    "click",
    (event) => {

      if (
        event.target === storyCreateOverlay
      ) {

        closeStoryCreate();

      }

    }
  );


  /* =========================================================
     TYPES DE STORY
     ========================================================= */

  const storyTypeCards =
    document.querySelectorAll(
      ".story-type-card"
    );


  storyTypeCards.forEach((card) => {

    card.addEventListener("click", () => {

      const type =
        card.dataset.storyType ||
        "contenu";


      if (type === "Texte") {

        showToast(
          "✍️ Création d'une story texte."
        );

        return;
      }


      if (type === "Musique") {

        showToast(
          "🎵 Sélection de musique bientôt disponible."
        );

        return;
      }


      if (type === "Caméra") {

        showToast(
          "📷 Caméra Nexora bientôt disponible."
        );

      }

    });

  });


  /* =========================================================
     PARAMÈTRES STORY
     ========================================================= */

  const storySettingsButton =
    document.getElementById(
      "storySettingsButton"
    );


  storySettingsButton?.addEventListener(
    "click",
    () => {

      showToast(
        "⚙️ Paramètres de story bientôt disponibles."
      );

    }
  );


  /* =========================================================
     SÉLECTION STORY
     ========================================================= */

  const storySelectionButton =
    document.getElementById(
      "storySelectionButton"
    );


  storySelectionButton?.addEventListener(
    "click",
    () => {

      showToast(
        "🖼️ Sélection de contenu bientôt disponible."
      );

    }
  );


  /* =========================================================
     GALERIE STORY
     ========================================================= */

  const storyGalleryItems =
    document.querySelectorAll(
      ".story-gallery-item"
    );


  storyGalleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

      showToast(
        `🖼️ Élément ${index + 1} sélectionné.`
      );

    });

  });


  /* =========================================================
     ANCIENNE CRÉATION
     ========================================================= */

  const openComposer =
    document.getElementById("openComposer");


  openComposer?.addEventListener(
    "click",
    () => {

      openModal(createModal);

    }
  );


  const createCloseButton =
    createModal?.querySelector(
      "[data-close-modal]"
    );


  createCloseButton?.addEventListener(
    "click",
    () => {
      closeModal(createModal);
    }
  );


  createModal?.addEventListener(
    "click",
    (event) => {

      if (event.target === createModal) {
        closeModal(createModal);
      }

    }
  );


  const creationButtons =
    document.querySelectorAll(
      "[data-modal-create]"
    );


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

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.modalCreate ||
          "contenu";

        closeModal(createModal);

        showToast(
          creationMessages[type] ||
          `✨ Création ${type} bientôt disponible.`
        );

      }
    );

  });


  /* =========================================================
     NOTIFICATIONS
     ========================================================= */

  const notificationButton =
    document.getElementById(
      "notificationButton"
    );


  notificationButton?.addEventListener(
    "click",
    () => {

      showToast(
        "🔔 Tu n'as pas encore de nouvelles notifications."
      );

    }
  );


  /* =========================================================
     RECHERCHE
     ========================================================= */

  const searchButton =
    document.getElementById("searchButton");

  const menuSearchButton =
    document.getElementById(
      "menuSearchButton"
    );


  searchButton?.addEventListener(
    "click",
    () => {

      showToast(
        "🔎 Recherche Nexora bientôt disponible."
      );

    }
  );


  menuSearchButton?.addEventListener(
    "click",
    () => {

      showToast(
        "🔎 Recherche dans Nexora bientôt disponible."
      );

    }
  );


  /* =========================================================
     MENU
     ========================================================= */

  const menuButton =
    document.getElementById("menuButton");


  menuButton?.addEventListener(
    "click",
    () => {

      openModal(menuModal);

    }
  );


  const closeMenuButton =
    menuModal?.querySelector(
      "[data-close-menu]"
    );


  closeMenuButton?.addEventListener(
    "click",
    () => {

      closeModal(menuModal);

    }
  );


  menuModal?.addEventListener(
    "click",
    (event) => {

      if (event.target === menuModal) {
        closeModal(menuModal);
      }

    }
  );


  /* =========================================================
     MENU CARTES
     ========================================================= */

  const menuCards =
    document.querySelectorAll(
      ".menu-card"
    );


  const menuMessages = {

    Messages:
      "💬 Ton espace de messages Nexora.",

    Amis:
      "👥 Ton espace Amis Nexora.",

    Moments:
      "✨ Retrouve ici tous tes Moments.",

    Enregistrements:
      "🔖 Retrouve tes contenus enregistrés.",

    Notifications:
      "🔔 Tes notifications Nexora.",

    Communautés:
      "👥 Découvre les communautés Nexora.",

    Découvrir:
      "🧭 Découvre du contenu adapté à tes goûts.",

    Événements:
      "📅 Les événements Nexora arrivent bientôt."

  };


  menuCards.forEach((card) => {

    card.addEventListener(
      "click",
      () => {

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

      }
    );

  });


  /* =========================================================
     MENU SETTINGS
     ========================================================= */

  const menuSettings =
    document.querySelectorAll(
      ".menu-settings button"
    );


  menuSettings.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const title =
          button.querySelector("strong")
            ?.textContent
            ?.trim() ||
          "Option";


        const messages = {

          "Déconnexion":
            "🚪 La déconnexion sera disponible avec le compte Nexora.",

          "Ajouter un compte":
            "➕ L'ajout de comptes multiples arrivera bientôt.",

          "Paramètres et confidentialité":
            "⚙️ Les paramètres Nexora arrivent bientôt.",

          "Aide et assistance":
            "❓ Le centre d'aide Nexora arrive bientôt."

        };


        showToast(
          messages[title] ||
          `${title} bientôt disponible.`
        );

      }
    );

  });


  /* =========================================================
     MOMENTS EXISTANTS
     ========================================================= */

  const momentCards =
    document.querySelectorAll(
      ".moment-card:not(.create-moment)"
    );


  momentCards.forEach((card) => {

    card.addEventListener(
      "click",
      () => {

        const name =
          card.querySelector("strong")
            ?.textContent
            ?.trim() ||
          "cet utilisateur";


        showToast(
          `✨ Ouverture du Moment de ${name}.`
        );

      }
    );

  });


  /* =========================================================
     FIL
     ========================================================= */

  const filterButton =
    document.getElementById(
      "filterButton"
    );


  filterButton?.addEventListener(
    "click",
    () => {

      showToast(
        "🎯 Ton fil apprend progressivement ce que tu aimes."
      );

    }
  );


  /* =========================================================
     LIKES
     ========================================================= */

  const likeButtons =
    document.querySelectorAll(
      ".like-button"
    );


  likeButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const countElement =
          button.querySelector(
            ".like-count"
          );

        const heart =
          button.querySelector(
            ".heart"
          );


        if (!countElement) {
          return;
        }


        const currentCount =
          Number.parseInt(
            countElement.textContent,
            10
          ) || 0;


        const alreadyLiked =
          button.classList.contains(
            "liked"
          );


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

          return;
        }


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
    );

  });


  /* =========================================================
     COMMENTAIRES
     ========================================================= */

  const commentButtons =
    document.querySelectorAll(
      ".comment-button"
    );


  commentButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const post =
          button.closest(".post-card");

        const commentsLink =
          post?.querySelector(
            ".comments-link"
          );


        if (commentsLink) {

          commentsLink.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

          showToast(
            "💬 Voici les commentaires."
          );

          return;
        }


        showToast(
          "💬 Les commentaires arrivent bientôt."
        );

      }
    );

  });


  const commentsLinks =
    document.querySelectorAll(
      ".comments-link"
    );


  commentsLinks.forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        showToast(
          "💬 L'espace commentaires Nexora arrive bientôt."
        );

      }
    );

  });


  /* =========================================================
     REPOST
     ========================================================= */

  const repostButtons =
    document.querySelectorAll(
      ".repost-button"
    );


  repostButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const activated =
          button.classList.toggle(
            "reposted"
          );


        showToast(
          activated
            ? "🔁 Publication repostée."
            : "Publication retirée de tes reposts."
        );

      }
    );

  });


  /* =========================================================
     ENREGISTREMENT
     ========================================================= */

  const saveButtons =
    document.querySelectorAll(
      ".save-button"
    );


  saveButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const saved =
          button.classList.toggle(
            "saved"
          );


        showToast(
          saved
            ? "🔖 Publication enregistrée."
            : "Publication retirée des enregistrements."
        );

      }
    );

  });


  /* =========================================================
     PARTAGE
     ========================================================= */

  const shareButtons =
    document.querySelectorAll(
      ".share-button"
    );


  shareButtons.forEach((button) => {

    button.addEventListener(
      "click",
      async () => {

        const post =
          button.closest(".post-card");

        const author =
          post?.querySelector(
            ".author-name"
          )?.textContent?.trim() ||
          "Nexora";


        const shareData = {

          title:
            `Publication de ${author}`,

          text:
            "Découvre cette publication sur Nexora."

        };


        if (
          typeof navigator.share ===
          "function"
        ) {

          try {

            await navigator.share(
              shareData
            );

            showToast(
              "✓ Publication partagée."
            );

          } catch (error) {

            if (
              error.name !==
              "AbortError"
            ) {

              showToast(
                "Le partage n'a pas pu être effectué."
              );

            }

          }

          return;
        }


        showToast(
          "🔗 Le partage sera bientôt disponible."
        );

      }
    );

  });


  /* =========================================================
     OPTIONS PUBLICATIONS
     ========================================================= */

  const moreButtons =
    document.querySelectorAll(
      ".more-button"
    );


  moreButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        showToast(
          "⋯ Options de publication Nexora."
        );

      }
    );

  });


  /* =========================================================
     VIDÉOS
     ========================================================= */

  const videoButton =
    document.getElementById(
      "videoButton"
    );


  videoButton?.addEventListener(
    "click",
    () => {

      showToast(
        "🎥 Les vidéos Nexora arrivent ici."
      );

    }
  );


  /* =========================================================
     NAVIGATION
     ========================================================= */

  const navItems =
    document.querySelectorAll(
      ".nav-item"
    );


  navItems.forEach((item) => {

    item.addEventListener(
      "click",
      () => {

        const page =
          item.dataset.page;


        navItems.forEach((navItem) => {
          navItem.classList.remove(
            "active"
          );
        });


        item.classList.add("active");


        const pageMessages = {

          home:
            "🏠 Accueil",

          explore:
            "🧭 Explorer arrive bientôt.",

          messages:
            "💬 Tes messages arrivent bientôt.",

          profile:
            "👤 Ton profil arrive bientôt."

        };


        showToast(
          pageMessages[page] ||
          "Espace Nexora bientôt disponible."
        );

      }
    );

  });


  /* =========================================================
     ESCAPE
     ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closeAllModals();

      }

    }
  );


  /* =========================================================
     SWIPE POUR FERMER LE MENU
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
