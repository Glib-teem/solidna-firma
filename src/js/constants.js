// API endpoints
export const API_BASE_URL = 'https://dummyjson.com';

export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT_BY_ID: id => `/products/${id}`,
  SEARCH: '/products/search',
  CATEGORIES: '/products/category-list',
  CATEGORY: category => `/products/category/${category}`,
};

// Pagination
export const PRODUCTS_PER_PAGE = 12;

// Local storage keys
export const STORAGE_KEYS = {
  CART: 'cart',
  WISHLIST: 'wishlist',
  THEME: 'theme',
};

// CSS classes
export const CSS_CLASSES = {
  HIDDEN: 'is-hidden',
  MODAL_OPEN: 'modal--is-open',
  CATEGORY_ACTIVE: 'categories__btn--active',
  NOT_FOUND_VISIBLE: 'not-found--visible',
  NAV_ACTIVE: 'nav__link--active',
  // ДОДАНО: Клас для відображення кнопки "Scroll to Top"
  SCROLL_TOP_VISIBLE: 'scroll-top-btn--visible',
};

// Button texts
export const BUTTON_TEXTS = {
  ADD_TO_CART: 'Add to Cart',
  REMOVE_FROM_CART: 'Remove from Cart',
  ADD_TO_WISHLIST: 'Add to Wishlist',
  REMOVE_FROM_WISHLIST: 'Remove from Wishlist',
};

// Messages
export const MESSAGES = {
  NO_MORE_PRODUCTS: 'No more products to load',
  PURCHASE_SUCCESS: 'Products purchased successfully!',
  SEARCH_EMPTY: 'Please enter a search term',
  NO_PRODUCTS_FOUND: 'No products found',
};
