import { API_BASE_URL, API_ENDPOINTS, PRODUCTS_PER_PAGE } from './constants.js';

// Base API request function
async function apiRequest(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Get products with pagination
export async function getProducts(page = 1) {
  const skip = (page - 1) * PRODUCTS_PER_PAGE;
  const endpoint = `${API_ENDPOINTS.PRODUCTS}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
  return await apiRequest(endpoint);
}

// Get single product by ID
export async function getProductById(id) {
  const endpoint = API_ENDPOINTS.PRODUCT_BY_ID(id);
  return await apiRequest(endpoint);
}

// Search products
export async function searchProducts(query, page = 1) {
  const skip = (page - 1) * PRODUCTS_PER_PAGE;
  const endpoint = `${API_ENDPOINTS.SEARCH}?q=${encodeURIComponent(
    query
  )}&limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
  return await apiRequest(endpoint);
}

// Get categories list
export async function getCategories() {
  const endpoint = API_ENDPOINTS.CATEGORIES;
  return await apiRequest(endpoint);
}

// Get products by category
export async function getProductsByCategory(category, page = 1) {
  const skip = (page - 1) * PRODUCTS_PER_PAGE;
  const endpoint = `${API_ENDPOINTS.CATEGORY(
    category
  )}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
  return await apiRequest(endpoint);
}

// Get multiple products by IDs
export async function getProductsByIds(ids) {
  if (!ids || ids.length === 0) {
    return [];
  }

  try {
    const requests = ids.map(id => getProductById(id));
    const products = await Promise.all(requests);
    return products;
  } catch (error) {
    console.error('Error fetching products by IDs:', error);
    return [];
  }
}
