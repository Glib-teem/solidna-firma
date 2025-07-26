import {
  getProductById,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from './products-api.js';
import { openModal, getCurrentProduct, updateModalButtons } from './modal.js';
import { refs } from './refs.js';
import { renderProducts, updateNavCounters } from './render-function.js';
import {
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  getCart,
  getWishlist,
  isInCart,
  isInWishlist,
} from './storage.js';
import {
  clearElement,
  setActiveCategory,
  isValidSearchQuery,
  showNotFound,
  hideNotFound,
  showElement,
  hideElement,
  showLoader,
  hideLoader,
  toggleTheme, // Функція для перемикання теми
  scrollToTop, // Функція для прокрутки наверх
  showToast,
} from './helpers.js';
import { BUTTON_TEXTS, MESSAGES, CSS_CLASSES } from './constants.js';

// Global state
let currentPage = 1;
let currentCategory = 'All';
let currentSearchQuery = '';
let isLoading = false;

// Category click handler
export async function handleCategoryClick(event) {
  if (!event.target.classList.contains('categories__btn')) return;

  if (isLoading) return;
  isLoading = true;

  const category = event.target.textContent.trim();
  currentCategory = category;
  currentPage = 1;
  currentSearchQuery = '';

  try {
    showLoader();
    hideNotFound(refs.notFound);

    // Set active category
    setActiveCategory(refs.categoriesList, category);

    // Clear search input
    if (refs.searchInput) {
      refs.searchInput.value = '';
    }
    hideElement(refs.clearSearchBtn);

    let response;
    if (category === 'All') {
      response = await getProducts(currentPage);
    } else {
      response = await getProductsByCategory(category, currentPage);
    }

    // Clear and render products
    clearElement(refs.productsList);

    if (response.products && response.products.length > 0) {
      refs.productsList.innerHTML = renderProducts(response.products);

      // Show/hide load more button
      if (
        response.products.length === 12 &&
        response.total > response.skip + response.products.length
      ) {
        showElement(refs.loadMoreBtn);
      } else {
        hideElement(refs.loadMoreBtn);
      }
    } else {
      showNotFound(refs.notFound);
      hideElement(refs.loadMoreBtn);
    }
  } catch (error) {
    console.error('Error loading category products:', error);
    showToast('Error loading products', 'error');
  } finally {
    hideLoader();
    isLoading = false;
  }
}

// Product click handler
export async function handleProductClick(event) {
  const productItem = event.target.closest('.products__item');
  if (!productItem) return;

  const productId = parseInt(productItem.dataset.id);

  try {
    showLoader();
    const product = await getProductById(productId);
    hideLoader();
    openModal(product);
  } catch (error) {
    hideLoader();
    console.error('Error loading product:', error);
    showToast('Error loading product details', 'error');
  }
}

// Search form handler
export async function handleSearchSubmit(event) {
  event.preventDefault();

  if (isLoading) return;

  const query = refs.searchInput.value.trim();

  if (!isValidSearchQuery(query)) {
    showToast(MESSAGES.SEARCH_EMPTY, 'error');
    return;
  }

  isLoading = true;
  currentSearchQuery = query;
  currentPage = 1;
  currentCategory = '';

  try {
    showLoader();
    hideNotFound(refs.notFound);

    // Clear active category
    setActiveCategory(refs.categoriesList, '');

    const response = await searchProducts(query, currentPage);

    // Clear and render products
    clearElement(refs.productsList);

    if (response.products && response.products.length > 0) {
      refs.productsList.innerHTML = renderProducts(response.products);
      showElement(refs.clearSearchBtn);

      // Show/hide load more button
      if (
        response.products.length === 12 &&
        response.total > response.skip + response.products.length
      ) {
        showElement(refs.loadMoreBtn);
      } else {
        hideElement(refs.loadMoreBtn);
      }
    } else {
      showNotFound(refs.notFound);
      hideElement(refs.loadMoreBtn);
      showElement(refs.clearSearchBtn);
    }
  } catch (error) {
    console.error('Error searching products:', error);
    showToast('Error searching products', 'error');
  } finally {
    hideLoader();
    isLoading = false;
  }
}

// Clear search handler
export async function handleClearSearch() {
  if (refs.searchInput) {
    refs.searchInput.value = '';
  }

  hideElement(refs.clearSearchBtn);
  currentSearchQuery = '';
  currentCategory = 'All';
  currentPage = 1;

  // Reset to all products
  try {
    showLoader();
    hideNotFound(refs.notFound);

    setActiveCategory(refs.categoriesList, 'All');

    const response = await getProducts(currentPage);

    clearElement(refs.productsList);

    if (response.products && response.products.length > 0) {
      refs.productsList.innerHTML = renderProducts(response.products);

      if (
        response.products.length === 12 &&
        response.total > response.skip + response.products.length
      ) {
        showElement(refs.loadMoreBtn);
      } else {
        hideElement(refs.loadMoreBtn);
      }
    }
  } catch (error) {
    console.error('Error loading products:', error);
    showToast('Error loading products', 'error');
  } finally {
    hideLoader();
  }
}

// Load more handler
export async function handleLoadMore() {
  if (isLoading) return;
  isLoading = true;

  currentPage++;

  try {
    showLoader();

    let response;
    if (currentSearchQuery) {
      response = await searchProducts(currentSearchQuery, currentPage);
    } else if (currentCategory === 'All') {
      response = await getProducts(currentPage);
    } else {
      response = await getProductsByCategory(currentCategory, currentPage);
    }

    if (response.products && response.products.length > 0) {
      refs.productsList.insertAdjacentHTML(
        'beforeend',
        renderProducts(response.products)
      );

      // Check if more products available
      if (response.total <= response.skip + response.products.length) {
        hideElement(refs.loadMoreBtn);
        showToast(MESSAGES.NO_MORE_PRODUCTS, 'info');
      }
    } else {
      hideElement(refs.loadMoreBtn);
      showToast(MESSAGES.NO_MORE_PRODUCTS, 'info');
    }
  } catch (error) {
    console.error('Error loading more products:', error);
    showToast('Error loading more products', 'error');
    currentPage--;
  } finally {
    hideLoader();
    isLoading = false;
  }
}

// Wishlist button handler
export function handleWishlistClick() {
  const product = getCurrentProduct();
  if (!product) return;

  const productId = product.id;

  if (isInWishlist(productId)) {
    removeFromWishlist(productId);
  } else {
    addToWishlist(productId);
  }

  // Update button state
  updateModalButtons(productId);

  // Update navigation counters
  const cartCount = getCart().length;
  const wishlistCount = getWishlist().length;
  updateNavCounters(cartCount, wishlistCount);
}

// Cart button handler
export function handleCartClick() {
  const product = getCurrentProduct();
  if (!product) return;

  const productId = product.id;

  if (isInCart(productId)) {
    removeFromCart(productId);
  } else {
    addToCart(productId);
  }

  // Update button state
  updateModalButtons(productId);

  // Update navigation counters
  const cartCount = getCart().length;
  const wishlistCount = getWishlist().length;
  updateNavCounters(cartCount, wishlistCount);
}

// Theme toggle handler
export function handleThemeToggle() {
  toggleTheme(); // Викликає функцію з helpers.js
}

// Scroll to top handler
export function handleScrollToTop() {
  scrollToTop(); // Викликає функцію з helpers.js
}

// Buy products handler (for cart page)
export function handleBuyProducts() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your cart is empty', 'error');
    return;
  }

  // Clear cart
  localStorage.removeItem('cart');

  // Update UI
  clearElement(refs.productsList);
  showNotFound(refs.notFound);

  // Update counters
  updateNavCounters(0, getWishlist().length);

  // Update cart summary
  if (refs.cartItemsCount) refs.cartItemsCount.textContent = '0';
  if (refs.cartTotalPrice) refs.cartTotalPrice.textContent = '$0';

  showToast(MESSAGES.PURCHASE_SUCCESS, 'success');
}

// Ініціалізація слухача прокручування для кнопки "Scroll to Top"
export function initScrollListener() {
  window.addEventListener('scroll', toggleScrollTopButtonVisibility);
  // Викликаємо один раз при завантаженні, щоб встановити початковий стан кнопки
  toggleScrollTopButtonVisibility();
}

// Функція, яка керує видимістю кнопки "Scroll to Top"
function toggleScrollTopButtonVisibility() {
  if (refs.scrollTopBtn) {
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    // Поріг, наскільки близько до кінця сторінки потрібно бути, щоб кнопка з'явилася
    const thresholdFromBottom = 100;

    if (
      scrollPosition + viewportHeight >=
      documentHeight - thresholdFromBottom
    ) {
      refs.scrollTopBtn.classList.add(CSS_CLASSES.SCROLL_TOP_VISIBLE);
      // Якщо ви використовуєте 'is-hidden' для початкового приховування, розкоментуйте:
      // refs.scrollTopBtn.classList.remove(CSS_CLASSES.HIDDEN);
    } else {
      refs.scrollTopBtn.classList.remove(CSS_CLASSES.SCROLL_TOP_VISIBLE);
      // Якщо ви використовуєте 'is-hidden' для початкового приховування, розкоментуйте:
      // refs.scrollTopBtn.classList.add(CSS_CLASSES.HIDDEN);
    }
  }
}
