const API_BASE = '/api';
let authToken = localStorage.getItem('authToken');
let currentUser = null;
let currentProduct = null;

const loginSection = document.getElementById('loginSection');
const productsSection = document.getElementById('productsSection');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const productsGrid = document.getElementById('productsGrid');
const logoutBtn = document.getElementById('logoutBtn');
const ratingModal = document.getElementById('ratingModal');
const ratingForm = document.getElementById('ratingForm');
const ratingError = document.getElementById('ratingError');
const closeModal = document.querySelector('.close');
const cancelRating = document.getElementById('cancelRating');
const stars = document.querySelectorAll('.star');
const ratingInput = document.getElementById('rating');
const productInfo = document.getElementById('productInfo');

document.addEventListener('DOMContentLoaded', () => {
    if (authToken) {
        showProductsSection();
        loadProducts();
    } else {
        showLoginSection();
    }
    
    setupEventListeners();
});

function setupEventListeners() {
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
    ratingForm.addEventListener('submit', handleRatingSubmit);
    closeModal.addEventListener('click', closeRatingModal);
    cancelRating.addEventListener('click', closeRatingModal);
    
    stars.forEach(star => {
        star.addEventListener('click', handleStarClick);
        star.addEventListener('mouseover', handleStarHover);
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === ratingModal) {
            closeRatingModal();
        }
    });
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        showLoading(loginError, 'Signing in...');
        
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            authToken = data.token;
            currentUser = data.user;
            localStorage.setItem('authToken', authToken);
            
            showProductsSection();
            loadProducts();
            hideError(loginError);
        } else {
            showError(loginError, data.message || 'Login failed');
        }
    } catch (error) {
        showError(loginError, 'Network error. Please try again.');
        console.error('Login error:', error);
    }
}

function handleLogout() {
    authToken = null;
    currentUser = null;
    localStorage.removeItem('authToken');
    showLoginSection();
    loginForm.reset();
}

async function loadProducts() {
    try {
        showLoading(productsGrid, 'Loading products...');
        
        const response = await fetch(`${API_BASE}/products`);
        const products = await response.json();
        
        if (response.ok) {
            displayProducts(products);
        } else {
            showError(productsGrid, 'Failed to load products');
        }
    } catch (error) {
        showError(productsGrid, 'Network error while loading products');
        console.error('Load products error:', error);
    }
}

function displayProducts(products) {
    if (products.length === 0) {
        productsGrid.innerHTML = '<div class="loading">No products available</div>';
        return;
    }
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.imageUrl ? `<img src="${product.imageUrl}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : '📦'}
            </div>
            <div class="product-title">${escapeHtml(product.name)}</div>
            <div class="product-description">${escapeHtml(product.description)}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-rating">
                <div class="rating-stars">${generateStars(product.averageRating)}</div>
                <div class="rating-text">(${product.numReviews} reviews)</div>
            </div>
            <button class="rate-btn" onclick="openRatingModal('${product.id}')">
                Rate Product
            </button>
        </div>
    `).join('');
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    
    if (hasHalfStar) {
        stars += '☆';
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
        stars += '☆';
    }
    
    return stars;
}

async function openRatingModal(productId) {
    try {
        const response = await fetch(`${API_BASE}/products/${productId}`);
        const product = await response.json();
        
        if (response.ok) {
            currentProduct = product;
            productInfo.innerHTML = `
                <h3>${escapeHtml(product.name)}</h3>
                <p>${escapeHtml(product.description)}</p>
                <p><strong>Price: $${product.price.toFixed(2)}</strong></p>
            `;
            
            ratingForm.reset();
            ratingInput.value = '';
            resetStars();
            hideError(ratingError);
            
            ratingModal.style.display = 'block';
        } else {
            alert('Failed to load product details');
        }
    } catch (error) {
        alert('Network error while loading product details');
        console.error('Load product error:', error);
    }
}

function closeRatingModal() {
    ratingModal.style.display = 'none';
    currentProduct = null;
}

function handleStarClick(e) {
    const rating = parseInt(e.target.dataset.rating);
    ratingInput.value = rating;
    updateStars(rating);
}

function handleStarHover(e) {
    const rating = parseInt(e.target.dataset.rating);
    highlightStars(rating);
}

function updateStars(rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function highlightStars(rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = '#ffc107';
        } else {
            star.style.color = '#ddd';
        }
    });
}

function resetStars() {
    stars.forEach(star => {
        star.classList.remove('active');
        star.style.color = '#ddd';
    });
}

async function handleRatingSubmit(e) {
    e.preventDefault();
    
    if (!currentProduct) return;
    
    const rating = parseInt(ratingInput.value);
    const comment = document.getElementById('comment').value.trim();
    
    if (!rating) {
        showError(ratingError, 'Please select a rating');
        return;
    }
    
    try {
        showLoading(ratingError, 'Submitting rating...');
        
        const response = await fetch(`${API_BASE}/products/${currentProduct.id}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                rating,
                comment: comment || undefined,
            }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            closeRatingModal();
            loadProducts(); // Refresh products to show updated ratings
            showSuccessMessage('Rating submitted successfully!');
        } else {
            showError(ratingError, data.message || 'Failed to submit rating');
        }
    } catch (error) {
        showError(ratingError, 'Network error while submitting rating');
        console.error('Submit rating error:', error);
    }
}

function showLoginSection() {
    loginSection.style.display = 'block';
    productsSection.style.display = 'none';
}

function showProductsSection() {
    loginSection.style.display = 'none';
    productsSection.style.display = 'block';
}

function showLoading(element, message) {
    element.innerHTML = `<div class="loading">${message}</div>`;
    element.style.display = 'block';
}

function showError(element, message) {
    element.innerHTML = message;
    element.style.display = 'block';
    element.className = 'error-message';
}

function hideError(element) {
    element.style.display = 'none';
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1100;
        animation: slideIn 0.3s ease;
    `;
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style); 