// Sticky header - ändrar färg vid scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

//toggle dropdown
document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggle = document.querySelector(".nav-links-dropdown__button");
  const dropdownMenu = document.querySelector(".nav-links-dropdown__content");
  const dropdownlistelement = document.querySelector(".nav-links-dropdown");
  const dropdownMenuLi = document.querySelector(".dropdown-menu-li");

  dropdownToggle.addEventListener("click", function (e) {
    e.preventDefault(); // Förhindra navigation
    dropdownMenu.classList.toggle("show");
    dropdownToggle.classList.toggle("active");
    dropdownlistelement.classList.toggle("active");
    dropdownMenuLi.classList.toggle("active");
  });

  // Klick utanför stänger dropdown
  document.addEventListener("click", function (e) {
    if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.remove("show");
      dropdownToggle.classList.remove("active");
      dropdownlistelement.classList.remove("active");
      dropdownMenuLi.classList.remove("active");
    }
  });
});

// Hämta alla länkar i navigeringen
const links = document.querySelectorAll("nav ul li a");

function setActiveLink() {
  const currentPath = window.location.pathname; // Hämta aktuell sökväg
  const links = document.querySelectorAll("nav .nav-links a"); // Hämta alla länkar i navigeringen

  links.forEach((link) => {
    // Ta bort 'active' klassen från alla länkar
    link.classList.remove("active");

    // Hämta href från länken och skapa en absolut sökväg för att jämföra
    const linkPath = link.getAttribute("href");

    // Kontrollera om currentPath slutar med länken (utan ledande snedstreck)
    if (currentPath.endsWith(linkPath) || (linkPath === "" && currentPath === "/")) {
      link.classList.add("active"); // Lägg till 'active' klassen
    }
  });
}

// Hämta alla länkar och lägg till click-händelse
function addLinkClickListeners() {
  links.forEach((link) => {
    link.addEventListener("click", function () {
      // Ta bort 'active' klassen från alla länkar
      links.forEach((l) => l.classList.remove("active"));

      // Lägg till 'active' klassen på den klickade länken
      this.classList.add("active");
    });
  });
}

// Vänta tills DOM är helt laddad innan vi sätter aktiva länkar
document.addEventListener("DOMContentLoaded", function () {
  setActiveLink(); // Sätt den aktiva länken baserat på aktuell sökväg
  addLinkClickListeners(); // Lägg till click-händelser på länkar
});

// Övrig kod för meny och formulär
const menuIcon = document.getElementById("menu-icon");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");
const focusableElements = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
let firstFocusableElement, lastFocusableElement;

function isMobileView() {
  return window.innerWidth <= 768;
}

function setFocusableElements() {
  const focusableContent = navLinks.querySelectorAll(focusableElements);
  firstFocusableElement = focusableContent[0];
  lastFocusableElement = focusableContent[focusableContent.length - 1];
}

function trapFocus(e) {
  if (e.key === "Tab") {
    if (e.shiftKey) {
      // Skift + Tab
      if (document.activeElement === firstFocusableElement) {
        e.preventDefault();
        lastFocusableElement.focus();
      }
    } else {
      // Endast Tab
      if (document.activeElement === lastFocusableElement) {
        e.preventDefault();
        firstFocusableElement.focus();
      }
    }
  }
}

function handleEscapeKey(e) {
  if (e.key === "Escape" && navbar.classList.contains("active")) {
    toggleMenu();
  }
}

function handleClickOutside(e) {
  if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
    toggleMenu();
  }
}

function toggleMenu() {
  if (isMobileView()) {
    navbar.classList.toggle("active");
    if (navbar.classList.contains("active")) {
      navLinks.style.visibility = "visible";
      menuIcon.setAttribute("aria-label", "Stäng menyn");
      menuIcon.setAttribute("aria-expanded", "true");
      setFocusableElements();
      firstFocusableElement.focus();
      document.addEventListener("keydown", trapFocus);
    } else {
      navLinks.style.visibility = "hidden";
      menuIcon.setAttribute("aria-label", "Öppna menyn");
      menuIcon.setAttribute("aria-expanded", "false");
      document.removeEventListener("keydown", trapFocus);
      menuIcon.focus();
    }
  }
}

menuIcon.addEventListener("click", toggleMenu);

menuIcon.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleMenu();
  }
});

window.addEventListener("resize", () => {
  if (!isMobileView()) {
    navLinks.style.visibility = "visible";
    navbar.classList.remove("active");
    menuIcon.setAttribute("aria-expanded", "false");
  } else if (!navbar.classList.contains("active")) {
    navLinks.style.visibility = "hidden";
  }
});

document.addEventListener("click", handleClickOutside);
document.addEventListener("keydown", handleEscapeKey);

//update iframe

document.addEventListener("DOMContentLoaded", function () {
  const iframe = document.querySelector(".section-content__findUs iframe");

  if (iframe) {
    function updateIframeSrc() {
      if (window.innerWidth < 766) {
        iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d830.3255437660231!2d15.045592991644623!3d59.12107514204667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465c72c575887285%3A0x18920c27de8cd0c1!2sJulsta%20532%2C%20692%2093%20Kumla!5e1!3m2!1ssv!2sse!4v1742240948232!5m2!1ssv!2sse";
        iframe.width = "300";
        iframe.height = "200";
      } else {
        iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d830.3255437660231!2d15.045592991644623!3d59.12107514204667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465c72c575887285%3A0x18920c27de8cd0c1!2sJulsta%20532%2C%20692%2093%20Kumla!5e1!3m2!1ssv!2sse!4v1742240948232!5m2!1ssv!2sse";
        iframe.width = "600";
        iframe.height = "450";
      }
    }
    updateIframeSrc();
  }

  // Kör funktionen vid fönsterstorleksändring
  window.addEventListener("resize", updateIframeSrc);
});
