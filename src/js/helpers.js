import { CSS_CLASSES } from './constants.js';

// Show/hide elements
export function showElement(element) {
  if (element) {
    element.classList.remove(CSS_CLASSES.HIDDEN);
  }
}

export function hideElement(element) {
  if (element) {
    element.classList.add(CSS_CLASSES.HIDDEN);
  }
}

// Show/hide not found message
export function showNotFound(element) {
  if (element) {
    element.classList.add(CSS_CLASSES.NOT_FOUND_VISIBLE);
  }
}

export function hideNotFound(element) {
  if (element) {
    element.classList.remove(CSS_CLASSES.NOT_FOUND_VISIBLE);
  }
}

// Clear element content
export function clearElement(element) {
  if (element) {
    element.innerHTML = '';
  }
}

// Set active category
export function setActiveCategory(categoriesContainer, activeText) {
  if (!categoriesContainer) return;

  const buttons = categoriesContainer.querySelectorAll('.categories__btn');
  buttons.forEach(btn => {
    btn.classList.remove(CSS_CLASSES.CATEGORY_ACTIVE);
    if (btn.textContent.trim() === activeText) {
      btn.classList.add(CSS_CLASSES.CATEGORY_ACTIVE);
    }
  });
}

// Validate search input
export function isValidSearchQuery(query) {
  return query && query.trim().length > 0;
}

// Debounce function
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Scroll to top
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// Show loader
export function showLoader() {
  // Create simple loader if not exists
  let loader = document.querySelector('.loader');
  if (!loader) {
    loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="loader__spinner"></div>';
    document.body.appendChild(loader);
  }
  loader.style.display = 'flex';
}

// Hide loader
export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'none';
  }
}

// Initialize theme
export function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  return savedTheme;
}

// Toggle theme
export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  return newTheme;
}

// Show toast message (using iziToast if available)
export function showToast(message, type = 'info') {
  if (window.iziToast) {
    window.iziToast[type]({
      title: type.charAt(0).toUpperCase() + type.slice(1),
      message: message,
      position: 'topRight',
    });
  } else {
    // Fallback to alert if iziToast is not available
    alert(message);
  }
}
