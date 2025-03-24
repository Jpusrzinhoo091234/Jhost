/**
 * Configuration settings for the application
 */
const CONFIG = {
    // Application settings
    APP_NAME: 'AnimeBoost',
    CURRENCY: 'R$',
    
    // Local storage keys
    STORAGE_KEYS: {
        CART: 'animeBoost_cart',
        CURRENT_USER: 'currentUser',
        USERS: 'users',
        WISHLIST: 'animeBoost_wishlist'
    },
    
    // API endpoints (for future implementation)
    API: {
        BASE_URL: '/api',
        PRODUCTS: '/products',
        USERS: '/users',
        ORDERS: '/orders'
    }
};

export default CONFIG;