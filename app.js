lucide.createIcons();

// Theme toggle (defaults to light — persists choice in localStorage)
const themeToggle = document.getElementById('theme-toggle');
const toggleLabel = themeToggle.querySelector('.toggle-label');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    toggleLabel.textContent = 'Light mode';
  } else {
    root.removeAttribute('data-theme');
    toggleLabel.textContent = 'Dark mode';
  }
}

const savedTheme = localStorage.getItem('omar-theme') || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('omar-theme', next);
});

// Mobile sidebar
const sidebar = document.getElementById('sidebar');
const mobileToggle = document.getElementById('mobile-toggle');
const backdrop = document.getElementById('sidebar-backdrop');

function closeSidebar() {
  sidebar.classList.remove('open');
  backdrop.style.display = 'none';
}

mobileToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  backdrop.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
});
backdrop.addEventListener('click', closeSidebar);

document.querySelectorAll('.side-link').forEach((link) => {
  link.addEventListener('click', closeSidebar);
});

// Active nav link on scroll
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.side-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach((section) => navObserver.observe(section));

// Reveal cards on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
