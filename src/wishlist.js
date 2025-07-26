import { getProductsByIds } from './js/products-api.js';
import { refs } from './js/refs.js';
import { renderProducts, updateNavCounters } from './js/render-function.js'; // Виправлено 'functions' на 'function' і додано 'js/'
import { getCart, getWishlist } from './js/storage.js';
import {
  clearElement,
  showNotFound,
  hideNotFound,
  showLoader,
  hideLoader,
  initTheme,
  showToast,
} from './js/helpers.js';
import { initModalListeners } from './js/modal.js';
import {
  handleProductClick,
  handleWishlistClick,
  handleCartClick,
  handleThemeToggle,
  handleScrollToTop,
  initScrollListener,
} from './js/handlers.js';

// Initialize wishlist page
async function initWishlistPage() {
  try {
    // Initialize theme
    initTheme();

    // Show loader
    showLoader();

    // Get wishlist items
    const wishlistIds = getWishlist();

    if (wishlistIds.length === 0) {
      showNotFound(refs.notFound);
      hideLoader();
      return;
    }

    // Load products by IDs
    const products = await getProductsByIds(wishlistIds);

    if (refs.productsList) {
      clearElement(refs.productsList);

      if (products && products.length > 0) {
        refs.productsList.innerHTML = renderProducts(products);
        hideNotFound(refs.notFound);
      } else {
        showNotFound(refs.notFound);
      }
    }

    // Update navigation counters
    const cartCount = getCart().length;
    const wishlistCount = getWishlist().length;
    updateNavCounters(cartCount, wishlistCount);
  } catch (error) {
    console.error('Error loading wishlist:', error);
    showToast('Error loading wishlist', 'error');
    showNotFound(refs.notFound);
  } finally {
    hideLoader();
  }
}

// Add event listeners
function addEventListeners() {
  // Products
  if (refs.productsList) {
    refs.productsList.addEventListener('click', handleProductClick);
  }

  // Modal buttons
  if (refs.wishlistBtn) {
    refs.wishlistBtn.addEventListener('click', () => {
      handleWishlistClick();
      // Refresh wishlist page after removing item
      setTimeout(() => {
        initWishlistPage();
      }, 100);
    });
  }

  if (refs.cartBtn) {
    refs.cartBtn.addEventListener('click', handleCartClick);
  }

  // Theme toggle
  if (refs.themeToggleBtn) {
    refs.themeToggleBtn.addEventListener('click', handleThemeToggle);
  }

  // Scroll to top
  if (refs.scrollTopBtn) {
    refs.scrollTopBtn.addEventListener('click', handleScrollToTop);
  }

  // Initialize modal listeners
  initModalListeners();

  // Initialize scroll listener
  initScrollListener();
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  addEventListeners();
  initWishlistPage();
});
