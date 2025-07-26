import { CSS_CLASSES, BUTTON_TEXTS } from './constants.js';
import { refs } from './refs.js';
import { renderModalProduct } from './render-function.js';
import { isInCart, isInWishlist } from './storage.js';

let currentProduct = null;

// Open modal
export function openModal(product) {
  if (!refs.modal || !refs.modalContent) return;

  currentProduct = product;

  // Render product in modal
  refs.modalContent.innerHTML = renderModalProduct(product);

  // Update button states
  updateModalButtons(product.id);

  // Show modal
  refs.modal.classList.add(CSS_CLASSES.MODAL_OPEN);
  document.body.style.overflow = 'hidden';

  // Add keyboard listener
  document.addEventListener('keydown', handleKeydown);
}

// Close modal
export function closeModal() {
  if (!refs.modal) return;

  refs.modal.classList.remove(CSS_CLASSES.MODAL_OPEN);
  document.body.style.overflow = '';
  currentProduct = null;

  // Remove keyboard listener
  document.removeEventListener('keydown', handleKeydown);
}

// Handle keyboard events
function handleKeydown(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

// Handle modal backdrop click
export function handleBackdropClick(event) {
  if (event.target === refs.modal) {
    closeModal();
  }
}

// Update modal button states based on product ID
export function updateModalButtons(productId) {
  if (!refs.wishlistBtn || !refs.cartBtn) return;

  // Update wishlist button
  if (isInWishlist(productId)) {
    refs.wishlistBtn.textContent = BUTTON_TEXTS.REMOVE_FROM_WISHLIST;
  } else {
    refs.wishlistBtn.textContent = BUTTON_TEXTS.ADD_TO_WISHLIST;
  }

  // Update cart button
  if (isInCart(productId)) {
    refs.cartBtn.textContent = BUTTON_TEXTS.REMOVE_FROM_CART;
  } else {
    refs.cartBtn.textContent = BUTTON_TEXTS.ADD_TO_CART;
  }
}

// Get current product
export function getCurrentProduct() {
  return currentProduct;
}

// Initialize modal event listeners
export function initModalListeners() {
  // Close button
  if (refs.modalCloseBtn) {
    refs.modalCloseBtn.addEventListener('click', closeModal);
  }

  // Backdrop click
  if (refs.modal) {
    refs.modal.addEventListener('click', handleBackdropClick);
  }
}
