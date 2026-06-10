/* ─── BACKGROUND MOUSE GLOW TRACKER ──────────────── */
const glowElement = document.getElementById('cursorGlow');

// Track mouse position and move the background glow smoothly
document.addEventListener('mousemove', (event) => {
    if (glowElement) {
        glowElement.style.left = event.clientX + 'px';
        glowElement.style.top = event.clientY + 'px';
    }
});

/* ─── LIGHT / DARK THEME ENGINE ──────────────────── */
const themeToggleBtn = document.getElementById('themeToggle');
let isDarkTheme = true;

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        isDarkTheme = !isDarkTheme;

        // Toggle the custom data-theme attribute on the root HTML tag
        document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');

        // Update button text and icon based on current state
        themeToggleBtn.textContent = isDarkTheme ? '🌙 Dark' : '☀️ Light';
    });
}

/* ─── MOBILE HAMBURGER MENU NAVIGATION ────────────── */
const hamburgerMenu = document.getElementById('hamburger');
const navigationLinks = document.getElementById('navLinks');

function toggleMobileMenu() {
    if (navigationLinks) {
        navigationLinks.classList.toggle('open');
    }
}

if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', toggleMobileMenu);
}

// Automatically close the mobile overlay menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navigationLinks) {
            navigationLinks.classList.remove('open');
        }
    });
});

/* ─── SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER) ── */
const revealOptions = {
    threshold: 0.1,     // Trigger when 10% of the element is visible
    rootMargin: '0px'
};

const scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If the section enters the viewport, apply the visibility class
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, revealOptions);

// Attach the observer to all fade-configured layout items
document.querySelectorAll('.fade-in, .fade-left, .fade-right').forEach(element => {
    scrollRevealObserver.observe(element);
});

/* ─── SKILLBAR FILL ACCELERATOR ──────────────────── */
const skillGroupOptions = {
    threshold: 0.2     // Trigger animation when 20% of the skill card is visible
};

const skillProgressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Find all matching child gauges inside the group and expand their widths
            entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                const targetedPercentage = bar.getAttribute('data-width');
                if (targetedPercentage) {
                    bar.style.width = targetedPercentage + '%';
                }
            });
        }
    });
}, skillGroupOptions);

// Track all skill containers
document.querySelectorAll('.skill-group').forEach(group => {
    skillProgressObserver.observe(group);
});

/* ─── SIMULATED CLIENT FORM NOTIFIER ──────────────── */
function handleFormSubmit(event) {
    event.preventDefault(); // Stop standard page refreshing behavior

    const submitButton = event.currentTarget;
    const standardTextContent = submitButton.innerHTML;

    // Visually confirm submission to the client
    submitButton.innerHTML = '<span>✓ Message Saved Successfully!</span>';
    submitButton.style.background = 'linear-gradient(135deg, #059669, #10b981)';

    // Timeout function to restore button states after 3.5 seconds
    setTimeout(() => {
        submitButton.innerHTML = standardTextContent;
        submitButton.style.background = '';
    }, 3500);
}