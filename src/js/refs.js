// DOM references object
export const refs = {
  // Categories
  categoriesList: document.querySelector('.categories'),

  // Products
  productsList: document.querySelector('.products'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  notFound: document.querySelector('.not-found'),

  // Search
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('.search-form__input'),
  clearSearchBtn: document.querySelector('.search-form__btn-clear'),

  // Modal
  modal: document.querySelector('.modal'),
  modalContent: document.querySelector('.modal-product'),
  modalCloseBtn: document.querySelector('.modal__close-btn'),
  wishlistBtn: document.querySelector('.modal-product__btn--wishlist'),
  cartBtn: document.querySelector('.modal-product__btn--cart'),

  // Navigation counters
  cartCount: document.querySelector('[data-cart-count]'),
  wishlistCount: document.querySelector('[data-wishlist-count]'),

  // Cart page specific
  cartItemsCount: document.querySelector('[data-count]'),
  cartTotalPrice: document.querySelector('[data-price]'),
  buyBtn: document.querySelector('.cart-summary__btn'),

  // Theme toggle
  themeToggleBtn: document.querySelector('.theme-toggle-btn'),

  // Scroll to top
  scrollTopBtn: document.querySelector('.scroll-top-btn'),
};
