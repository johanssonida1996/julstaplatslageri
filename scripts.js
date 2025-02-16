// Sticky header - ändrar färg vid scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Hämta alla länkar i navigeringen
const links = document.querySelectorAll('nav ul li a');

function setActiveLink() {
    const currentPath = window.location.pathname; // Hämta aktuell sökväg
    console.log(currentPath);
    const links = document.querySelectorAll('nav .nav-links a'); // Hämta alla länkar i navigeringen

    links.forEach(link => {
        // Ta bort 'active' klassen från alla länkar
        link.classList.remove('active');

        // Hämta href från länken och skapa en absolut sökväg för att jämföra
        const linkPath = link.getAttribute('href');
        
        // Kontrollera om currentPath slutar med länken (utan ledande snedstreck)
        if (currentPath.endsWith(linkPath) || (linkPath === '' && currentPath === '/')) {
            link.classList.add('active'); // Lägg till 'active' klassen
        }
    });
}

// Hämta alla länkar och lägg till click-händelse
function addLinkClickListeners() {
    links.forEach(link => {
        link.addEventListener('click', function() {
            // Ta bort 'active' klassen från alla länkar
            links.forEach(l => l.classList.remove('active'));

            // Lägg till 'active' klassen på den klickade länken
            this.classList.add('active');
        });
    });
}

// Vänta tills DOM är helt laddad innan vi sätter aktiva länkar
document.addEventListener('DOMContentLoaded', function() {
    setActiveLink(); // Sätt den aktiva länken baserat på aktuell sökväg
    addLinkClickListeners(); // Lägg till click-händelser på länkar
});

// Övrig kod för meny och formulär
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
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
    if (e.key === 'Tab') {
        if (e.shiftKey) { // Skift + Tab
            if (document.activeElement === firstFocusableElement) {
                e.preventDefault();
                lastFocusableElement.focus();
            }
        } else { // Endast Tab
            if (document.activeElement === lastFocusableElement) {
                e.preventDefault();
                firstFocusableElement.focus();
            }
        }
    }
}

function handleEscapeKey(e) {
    if (e.key === 'Escape' && navbar.classList.contains('active')) {
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
        navbar.classList.toggle('active');
        if (navbar.classList.contains('active')) {
            navLinks.style.visibility = 'visible';
            menuIcon.setAttribute('aria-label', 'Stäng menyn');
            menuIcon.setAttribute('aria-expanded', 'true');
            setFocusableElements();
            firstFocusableElement.focus();
            document.addEventListener('keydown', trapFocus);
        } else {
            navLinks.style.visibility = 'hidden';
            menuIcon.setAttribute('aria-label', 'Öppna menyn');
            menuIcon.setAttribute('aria-expanded', 'false');
            document.removeEventListener('keydown', trapFocus);
            menuIcon.focus();
        }
    }
}

menuIcon.addEventListener('click', toggleMenu);

menuIcon.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleMenu();
    }
});

window.addEventListener('resize', () => {
    if (!isMobileView()) {
        navLinks.style.visibility = 'visible';
        navbar.classList.remove('active');
        menuIcon.setAttribute('aria-expanded', 'false');
    } else if (!navbar.classList.contains('active')) {
        navLinks.style.visibility = 'hidden';
    }
});

document.addEventListener('click', handleClickOutside);
document.addEventListener('keydown', handleEscapeKey);

// Formulär
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Förhindrar standardformulärskickningen
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const termsChecked = document.getElementById('terms').checked;
        
        let isValid = true;
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        if (!name) {
            showError('name', 'Namn är obligatoriskt');
            isValid = false;
        }
        
        if (!email) {
            showError('email', 'E-post är obligatoriskt');
            isValid = false;
        }
        
        if (!message) {
            showError('message', 'Meddelande är obligatoriskt');
            isValid = false;
        }
        
        if (!termsChecked) {
            showError('terms', 'Du måste godkänna villkoren');
            isValid = false;
        }
        
        if (isValid) {
            console.log('Formuläret är korrekt ifyllt');
            console.log({ name, email, message });
        }
    });
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const error = document.createElement('div');
        error.className = 'error-message';
        error.style.color = 'red';
        error.style.fontSize = '0.9rem';
        error.textContent = message;
        field.parentNode.appendChild(error);
    }
});




