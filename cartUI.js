/**
 * Cart UI module for managing cart interface
 */
import Cart from './cart.js';
import CONFIG from './config.js';
import Products from './products.js';
import Utils from './utils.js';

const CartUI = {
    /**
     * Initialize cart UI
     */
    init() {
        this.createCartModal();
        this.setupEventListeners();
        this.updateCartDisplay();
    },
    
    /**
     * Create cart modal in DOM
     */
    createCartModal() {
        // Check if cart modal already exists
        if (document.getElementById('cartModal')) return;
        
        const cartModal = document.createElement('div');
        cartModal.className = 'modal';
        cartModal.id = 'cartModal';
        
        cartModal.innerHTML = `
            <div class="modal-content cart-modal-content">
                <span class="close-modal">&times;</span>
                <h2>Seu Carrinho <i class="fas fa-shopping-cart"></i></h2>
                
                <div class="cart-items-container">
                    <div id="cartItems" class="cart-items">
                        <!-- Cart items will be loaded here -->
                    </div>
                </div>
                
                <div class="cart-summary">
                    <div class="cart-total">
                        <span>Total:</span>
                        <span id="cartTotal">${CONFIG.CURRENCY} 0,00</span>
                    </div>
                    <div class="cart-actions">
                        <button id="clearCartBtn" class="btn secondary"><i class="fas fa-trash"></i> Limpar Carrinho</button>
                        <button id="checkoutBtn" class="btn primary"><i class="fas fa-shopping-bag"></i> Finalizar Compra</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(cartModal);
    },
    
    /**
     * Setup event listeners for cart UI
     */
    setupEventListeners() {
        // Cart icon click
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.addEventListener('click', (e) => {
                e.preventDefault();
                this.openCartModal();
            });
        }
        
        // Close modal
        const closeBtn = document.querySelector('#cartModal .close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeCartModal();
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            const cartModal = document.getElementById('cartModal');
            if (event.target === cartModal) {
                this.closeCartModal();
            }
        });
        
        // Clear cart button
        const clearCartBtn = document.getElementById('clearCartBtn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                if (confirm('Tem certeza que deseja limpar o carrinho?')) {
                    Cart.clearCart();
                    this.updateCartDisplay();
                    this.showNotification('Carrinho limpo com sucesso!');
                }
            });
        }
        
        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                this.processCheckout();
            });
        }
        
        // Add to cart buttons
        const addToCartButtons = document.querySelectorAll('.card-btn');
        addToCartButtons.forEach(button => {
            if (button.textContent.includes('Adicionar ao Carrinho')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Get product info from parent card
                    const card = button.closest('.service-card');
                    if (!card) return;
                    
                    const productName = card.querySelector('h3').textContent;
                    const productPrice = parseFloat(card.querySelector('.card-price').textContent.replace('R$ ', '').replace(',', '.'));
                    const productId = this.generateProductId(productName);
                    
                    const product = {
                        id: productId,
                        name: productName,
                        price: productPrice,
                        image: 'https://i.imgur.com/placeholder.jpg'
                    };
                    
                    Cart.addItem(product);
                    
                    // Animation for button
                    button.classList.add('added');
                    setTimeout(() => {
                        button.classList.remove('added');
                    }, 1000);
                    
                    this.showNotification('Produto adicionado ao carrinho!');
                });
            }
        });
    },
    
    /**
     * Generate product ID from name
     * @param {string} name - Product name
     * @returns {string} - Product ID
     */
    generateProductId(name) {
        return name.toLowerCase().replace(/\s+/g, '_');
    },
    
    /**
     * Open cart modal
     */
    openCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            this.updateCartDisplay();
            cartModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    },
    
    /**
     * Close cart modal
     */
    closeCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    },
    
    /**
     * Update cart display
     */
    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const items = Cart.getItems();
        
        if (!cartItems || !cartTotal) return;
        
        if (items.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-cart"></i><p>Seu carrinho está vazio</p></div>';
            cartTotal.textContent = `${CONFIG.CURRENCY} 0,00`;
            return;
        }
        
        let html = '';
        items.forEach(item => {
            html += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image || 'https://i.imgur.com/placeholder.jpg'}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p class="cart-item-price">${CONFIG.CURRENCY} ${item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease"><i class="fas fa-minus"></i></button>
                        <input type="number" value="${item.quantity}" min="1" max="99" class="quantity-input">
                        <button class="quantity-btn increase"><i class="fas fa-plus"></i></button>
                    </div>
                    <div class="cart-item-total">
                        <p>${CONFIG.CURRENCY} ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                    </div>
                    <button class="remove-item-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
        });
        
        cartItems.innerHTML = html;
        cartTotal.textContent = `${CONFIG.CURRENCY} ${Cart.getTotalPrice().toFixed(2).replace('.', ',')}`;
        
        // Add event listeners for quantity buttons and remove buttons
        this.setupCartItemEvents();
    },
    
    /**
     * Setup event listeners for cart items
     */
    setupCartItemEvents() {
        // Quantity decrease buttons
        const decreaseButtons = document.querySelectorAll('.cart-item .quantity-btn.decrease');
        decreaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const cartItem = button.closest('.cart-item');
                const productId = cartItem.dataset.id;
                const quantityInput = cartItem.querySelector('.quantity-input');
                let quantity = parseInt(quantityInput.value) - 1;
                
                if (quantity < 1) quantity = 1;
                
                quantityInput.value = quantity;
                Cart.updateItemQuantity(productId, quantity);
                this.updateCartDisplay();
                this.showNotification('Quantidade atualizada!');
            });
        });
        
        // Quantity increase buttons
        const increaseButtons = document.querySelectorAll('.cart-item .quantity-btn.increase');
        increaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const cartItem = button.closest('.cart-item');
                const productId = cartItem.dataset.id;
                const quantityInput = cartItem.querySelector('.quantity-input');
                let quantity = parseInt(quantityInput.value) + 1;
                
                if (quantity > 99) quantity = 99;
                
                quantityInput.value = quantity;
                Cart.updateItemQuantity(productId, quantity);
                this.updateCartDisplay();
                this.showNotification('Quantidade atualizada!');
            });
        });
        
        // Quantity input change
        const quantityInputs = document.querySelectorAll('.cart-item .quantity-input');
        quantityInputs.forEach(input => {
            input.addEventListener('change', () => {
                const cartItem = input.closest('.cart-item');
                const productId = cartItem.dataset.id;
                let quantity = parseInt(input.value);
                
                if (isNaN(quantity) || quantity < 1) quantity = 1;
                if (quantity > 99) quantity = 99;
                
                input.value = quantity;
                Cart.updateItemQuantity(productId, quantity);
                this.updateCartDisplay();
                this.showNotification('Quantidade atualizada!');
            });
        });
        
        // Remove item buttons
        const removeButtons = document.querySelectorAll('.cart-item .remove-item-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const cartItem = button.closest('.cart-item');
                const productId = cartItem.dataset.id;
                
                Cart.removeItem(productId);
                this.updateCartDisplay();
                this.showNotification('Item removido do carrinho!');
            });
        });
    },
    
    /**
     * Process checkout
     */
    processCheckout() {
        const items = Cart.getItems();
        
        if (items.length === 0) {
            this.showNotification('Seu carrinho está vazio!');
            return;
        }
        
        // In a real app, this would redirect to a checkout page or open a checkout modal
        alert('Funcionalidade de checkout em desenvolvimento!');
        
        // For demo purposes, we'll just clear the cart
        Cart.clearCart();
        this.updateCartDisplay();
        this.closeCartModal();
        this.showNotification('Compra finalizada com sucesso!');
    },
    
    /**
     * Show notification
     * @param {string} message - Notification message
     */
    showNotification(message) {
        Utils.showNotification(message);
    }
};

export default CartUI;