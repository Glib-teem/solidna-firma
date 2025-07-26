import { STORAGE_KEYS } from './constants.js';

// Get data from localStorage
export function getFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error getting data from localStorage:`, error);
    return [];
  }
}

// Save data to localStorage
export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to localStorage:`, error);
  }
}

// Cart functions
export function getCart() {
  return getFromStorage(STORAGE_KEYS.CART);
}

export function saveCart(cart) {
  saveToStorage(STORAGE_KEYS.CART, cart);
}

export function addToCart(productId) {
  const cart = getCart();
  if (!cart.includes(productId)) {
    cart.push(productId);
    saveCart(cart);
  }
  return cart;
}

export function removeFromCart(productId) {
  const cart = getCart();
  const updatedCart = cart.filter(id => id !== productId);
  saveCart(updatedCart);
  return updatedCart;
}

export function isInCart(productId) {
  const cart = getCart();
  return cart.includes(productId);
}

// Wishlist functions
export function getWishlist() {
  return getFromStorage(STORAGE_KEYS.WISHLIST);
}

export function saveWishlist(wishlist) {
  saveToStorage(STORAGE_KEYS.WISHLIST, wishlist);
}

export function addToWishlist(productId) {
  const wishlist = getWishlist();
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    saveWishlist(wishlist);
  }
  return wishlist;
}

export function removeFromWishlist(productId) {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter(id => id !== productId);
  saveWishlist(updatedWishlist);
  return updatedWishlist;
}

export function isInWishlist(productId) {
  const wishlist = getWishlist();
  return wishlist.includes(productId);
}

// Theme functions
export function getTheme() {
  return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
}

export function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
}
