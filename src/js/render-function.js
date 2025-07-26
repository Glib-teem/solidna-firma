// Render categories list
export function renderCategories(categories) {
  return categories
    .map(
      category =>
        `<li class="categories__item">
       <button class="categories__btn" type="button">${category}</button>
     </li>`
    )
    .join('');
}

// Render single product item
export function renderProductItem(product) {
  return `
    <li class="products__item" data-id="${product.id}">
      <img class="products__image" src="${product.thumbnail}" alt="${
    product.title
  }"/>
      <p class="products__title">${product.title}</p>
      <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${
        product.brand || 'No brand'
      }</p>
      <p class="products__category">Category: ${product.category}</p>
      <p class="products__price">Price: $${product.price}</p>
    </li>
  `;
}

// Render products list
export function renderProducts(products) {
  if (!products || products.length === 0) {
    return '';
  }
  return products.map(renderProductItem).join('');
}

// Render modal product
export function renderModalProduct(product) {
  const tags = product.tags
    ? product.tags.map(tag => `<li>${tag}</li>`).join('')
    : '';

  return `
    <img class="modal-product__img" src="${product.thumbnail}" alt="${
    product.title
  }" />
    <div class="modal-product__content">
      <p class="modal-product__title">${product.title}</p>
      <ul class="modal-product__tags">${tags}</ul>
      <p class="modal-product__description">${product.description}</p>
      <p class="modal-product__shipping-information">Shipping: ${
        product.shippingInformation || 'Standard shipping'
      }</p>
      <p class="modal-product__return-policy">Return Policy: ${
        product.returnPolicy || 'Standard return policy'
      }</p>
      <p class="modal-product__price">Price: $${product.price}</p>
      <button class="modal-product__buy-btn" type="button">Buy</button>
    </div>
  `;
}

// Update navigation counters
export function updateNavCounters(cartCount, wishlistCount) {
  const cartCountElement = document.querySelector('[data-cart-count]');
  const wishlistCountElement = document.querySelector('[data-wishlist-count]');

  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
  if (wishlistCountElement) {
    wishlistCountElement.textContent = wishlistCount;
  }
}

// Update cart summary
export function updateCartSummary(products) {
  const cartItemsCount = document.querySelector('[data-count]');
  const cartTotalPrice = document.querySelector('[data-price]');

  if (!cartItemsCount || !cartTotalPrice) return;

  const totalItems = products.length;
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  cartItemsCount.textContent = totalItems;
  cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
}
