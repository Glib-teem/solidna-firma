import { getProductsByIds } from './js/products-api.js';
import { refs } from './js/refs.js';
import {
  renderProducts,
  updateNavCounters,
  updateCartSummary,
} from './js/render-function.js'; // Зверніть увагу: 'render-function.js'
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
  handleBuyProducts,
  initScrollListener,
} from './js/handlers.js';

// Initialize cart page
async function initCartPage() {
  try {
    // Initialize theme
    initTheme();

    // Show loader
    showLoader();

    // Get cart items
    const cartIds = getCart();

    if (cartIds.length === 0) {
      showNotFound(refs.notFound);
      hideLoader();
      updateCartSummary([]);
      return;
    }

    // Load products by IDs
    const products = await getProductsByIds(cartIds);

    if (refs.productsList) {
      clearElement(refs.productsList);

      if (products && products.length > 0) {
        refs.productsList.innerHTML = renderProducts(products);
        hideNotFound(refs.notFound);
        updateCartSummary(products);
      } else {
        showNotFound(refs.notFound);
        updateCartSummary([]);
      }
    }

    // Update navigation counters
    const cartCount = getCart().length;
    const wishlistCount = getWishlist().length;
    updateNavCounters(cartCount, wishlistCount);
  } catch (error) {
    console.error('Error loading cart:', error);
    showToast('Error loading cart', 'error');
    showNotFound(refs.notFound);
    updateCartSummary([]);
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
    refs.wishlistBtn.addEventListener('click', handleWishlistClick);
  }

  if (refs.cartBtn) {
    refs.cartBtn.addEventListener('click', () => {
      handleCartClick();
      // Refresh cart page after removing item
      setTimeout(() => {
        initCartPage();
      }, 100);
    });
  }

  // Buy button
  if (refs.buyBtn) {
    refs.buyBtn.addEventListener('click', handleBuyProducts);
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
  initCartPage();
});
