/**
 * Cart module for managing shopping cart functionality
 */
import CONFIG from './config.js';

const Cart = {
    items: [],
    
    /**
     * Initialize the cart
     */
    init() {
        this.loadFromStorage();
        this.updateCartCount();
    },
    
    /**
     * Load cart data from localStorage
     */
    loadFromStorage() {
        const savedCart = localStorage.getItem(CONFIG.STORAGE_KEYS.CART);
        if (savedCart) {
            try {
                this.items = JSON.parse(savedCart);
            } catch (error) {
                console.error('Error loading cart from storage:', error);
                this.items = [];
            }
        }
    },
    
    /**
     * Save cart data to localStorage
     */
    saveToStorage() {
        localStorage.setItem(CONFIG.STORAGE_KEYS.CART, JSON.stringify(this.items));
    },
    
    /**
     * Add item to cart
     * @param {Object} product - Product to add to cart
     */
    addItem(product) {
        // Check if product already exists in cart
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            // Increment quantity if product already exists
            existingItem.quantity += 1;
        } else {
            // Add new item with quantity 1
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartCount();
        return true;
    },
    
    /**
     * Remove item from cart
     * @param {string|number} productId - ID of product to remove
     */
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartCount();
        return true;
    },
    
    /**
     * Update item quantity
     * @param {string|number} productId - ID of product to update
     * @param {number} quantity - New quantity
     */
    updateItemQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        
        if (!item) return false;
        
        if (quantity <= 0) {
            return this.removeItem(productId);
        }
        
        item.quantity = quantity;
        this.saveToStorage();
        this.updateCartCount();
        return true;
    },
    
    /**
     * Clear all items from cart
     */
    clearCart() {
        this.items = [];
        this.saveToStorage();
        this.updateCartCount();
        return true;
    },
    
    /**
     * Get cart total price
     * @returns {number} Total price
     */
    getTotalPrice() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    },
    
    /**
     * Get total number of items in cart
     * @returns {number} Total items
     */
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    /**
     * Update cart count in UI
     */
    updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = this.getTotalItems();
        }
    },
    
    /**
     * Get all cart items
     * @returns {Array} Cart items
     */
    getItems() {
        return [...this.items];
    }
};

export default Cart;