/**
 * Main application entry point
 */
import Auth from './auth.js';
import Cart from './cart.js';
import CartUI from './cartUI.js';
import Products from './products.js';

// Initialize modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize authentication
    Auth.init();
    
    // Initialize cart
    Cart.init();
    
    // Initialize cart UI
    CartUI.init();
    
    // Add CSS for cart modal
    addCartStyles();
});

/**
 * Add CSS styles for cart
 */
function addCartStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Cart Modal Styles */
        .cart-modal-content {
            max-width: 800px;
            width: 90%;
        }
        
        .cart-items-container {
            max-height: 400px;
            overflow-y: auto;
            margin: 20px 0;
        }
        
        .cart-items {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .cart-item {
            display: grid;
            grid-template-columns: 80px 1fr auto auto auto;
            align-items: center;
            gap: 15px;
            padding: 15px;
            background: var(--card-bg);
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .cart-item-image img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
        }
        
        .cart-item-details h3 {
            font-size: 1rem;
            margin: 0 0 5px 0;
        }
        
        .cart-item-price {
            color: var(--primary-color);
            font-weight: 600;
            margin: 0;
        }
        
        .cart-item-quantity {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .quantity-btn {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: var(--card-bg);
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .quantity-btn:hover {
            background: rgba(255, 62, 120, 0.1);
        }
        
        .quantity-input {
            width: 40px;
            height: 30px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            background: var(--darker-bg);
            color: white;
        }
        
        .cart-item-total {
            font-weight: 700;
            color: var(--secondary-color);
        }
        
        .remove-item-btn {
            background: none;
            border: none;
            color: var(--error-color);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .remove-item-btn:hover {
            transform: scale(1.2);
        }
        
        .cart-summary {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .cart-total {
            font-size: 1.2rem;
            font-weight: 700;
        }
        
        .cart-actions {
            display: flex;
            gap: 10px;
        }
        
        .empty-cart {
            text-align: center;
            padding: 30px;
            color: rgba(255, 255, 255, 0.5);
        }
        
        .empty-cart i {
            font-size: 3rem;
            margin-bottom: 15px;
            opacity: 0.3;
        }
        
        @media (max-width: 768px) {
            .cart-item {
                grid-template-columns: 60px 1fr;
                grid-template-rows: auto auto auto;
                padding: 10px;
            }
            
            .cart-item-image {
                grid-row: span 3;
            }
            
            .cart-item-details {
                grid-column: 2;
            }
            
            .cart-item-quantity {
                grid-column: 2;
                margin-top: 10px;
            }
            
            .cart-item-total {
                grid-column: 2;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
            }
            
            .remove-item-btn {
                position: absolute;
                top: 10px;
                right: 10px;
            }
            
            .cart-summary {
                flex-direction: column;
                gap: 15px;
            }
            
            .cart-actions {
                width: 100%;
                justify-content: space-between;
            }
        }
    `;
    document.head.appendChild(style);
}