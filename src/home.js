import { getProducts, getCategories } from './js/products-api.js';
import { refs } from './js/refs.js';
import {
  renderCategories,
  renderProducts,
  updateNavCounters,
} from './js/render-function.js'; // <- Змінено на "function"
import { getCart, getWishlist } from './js/storage.js';
import {
  clearElement,
  setActiveCategory,
  showNotFound,
  hideNotFound,
  showElement,
  hideElement,
  showLoader,
  hideLoader,
  initTheme,
  showToast,
} from './js/helpers.js';
import { initModalListeners } from './js/modal.js';
import {
  handleCategoryClick,
  handleProductClick,
  handleSearchSubmit,
  handleClearSearch,
  handleLoadMore,
  handleWishlistClick,
  handleCartClick,
  handleThemeToggle,
  handleScrollToTop,
  initScrollListener,
} from './js/handlers.js';

// Initialize page
async function initHomePage() {
  try {
    // Initialize theme
    initTheme();

    // Show loader
    showLoader();

    // Load categories
    const categories = await getCategories();
    const categoriesWithAll = ['All', ...categories];

    if (refs.categoriesList) {
      refs.categoriesList.innerHTML = renderCategories(categoriesWithAll);
      setActiveCategory(refs.categoriesList, 'All');
    }

    // Load initial products
    const productsResponse = await getProducts(1);

    if (refs.productsList) {
      if (productsResponse.products && productsResponse.products.length > 0) {
        refs.productsList.innerHTML = renderProducts(productsResponse.products);

        // Show load more button if needed
        if (
          productsResponse.products.length === 12 &&
          productsResponse.total >
            productsResponse.skip + productsResponse.products.length
        ) {
          showElement(refs.loadMoreBtn);
        }
      } else {
        showNotFound(refs.notFound);
      }
    }

    // Update navigation counters
    const cartCount = getCart().length;
    const wishlistCount = getWishlist().length;
    updateNavCounters(cartCount, wishlistCount);
  } catch (error) {
    console.error('Error initializing home page:', error);
    showToast('Error loading page data', 'error');
  } finally {
    hideLoader();
  }
}

// Add event listeners
function addEventListeners() {
  // Categories
  if (refs.categoriesList) {
    refs.categoriesList.addEventListener('click', handleCategoryClick);
  }

  // Products
  if (refs.productsList) {
    refs.productsList.addEventListener('click', handleProductClick);
  }

  // Search
  if (refs.searchForm) {
    refs.searchForm.addEventListener('submit', handleSearchSubmit);
  }

  if (refs.clearSearchBtn) {
    refs.clearSearchBtn.addEventListener('click', handleClearSearch);
  }

  // Load more
  if (refs.loadMoreBtn) {
    refs.loadMoreBtn.addEventListener('click', handleLoadMore);
  }

  // Modal buttons
  if (refs.wishlistBtn) {
    refs.wishlistBtn.addEventListener('click', handleWishlistClick);
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
  initHomePage();
});
