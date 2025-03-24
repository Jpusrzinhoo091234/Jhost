/**
 * Products module for managing product data
 */
import CONFIG from './config.js';

const Products = {
    /**
     * Get product details by ID
     * @param {string|number} productId - Product ID
     * @returns {Object|null} - Product details or null if not found
     */
    getProductById(productId) {
        // In a real app, this would fetch from an API or database
        // For this demo, we'll return mock data
        const product = this.getAllProducts().find(p => p.id === productId);
        return product || null;
    },
    
    /**
     * Get all products
     * @returns {Array} - All products
     */
    getAllProducts() {
        // In a real app, this would fetch from an API or database
        // For this demo, we'll return mock data based on the products in the HTML
        return [
            {
                id: 'youtube_premium',
                name: 'YouTube Premium + Canva Pro',
                price: 7.39,
                image: 'https://i.imgur.com/placeholder.jpg',
                category: 'streaming'
            },
            {
                id: 'star_plus',
                name: 'Star Plus / Disney / ESPN + Canva Pro',
                price: 15.79,
                image: 'https://i.imgur.com/placeholder.jpg',
                category: 'streaming'
            },
            {
                id: 'prime_video',
                name: 'Prime Video + Canva Pro',
                price: 5.00,
                image: 'https://i.imgur.com/placeholder.jpg',
                category: 'streaming'
            },
            {
                id: 'hbo_max',
                name: 'HBO Max + Canva Pro',
                price: 8.59,
                image: 'https://i.imgur.com/placeholder.jpg',
                category: 'streaming'
            },
            {
                id: 'prime_hbo',
                name: 'Prime Video + HBO Max Tela Privada',
                price: 10.99,
                image: 'https://i.imgur.com/placeholder.jpg',
                category: 'streaming'
            },
            {
                id: 'crunchyroll',
                name: 'Crunchyroll + Canva Pro',
                price: 6.19,
                image: 'https://i.imgur.com/placeholder.jpg',
                category: 'streaming'
            },
            // Social media services
            {
                id: 'instagram_followers',
                name: 'Seguidores Instagram',
                price: 29.90,
                image: 'https://i.imgur.com/placeholder.jpg',
                category: 'social'
            },
            {
                id: 'likes_comments',
                name: 'Likes e Comentários',
                price: 19.90,
                image: 'https://i.imgur.com/placeholder.jpg',
                category: 'social'
            },
            {
                id: 'views_impressions',
                name: 'Views e Impressões',
                price: 15.90,
                image: 'https://i.imgur.com/placeholder.jpg',
                category: 'social'
            },
            // Gaming products
            {
                id: 'free_fire',
                name: 'Passe de Free Fire',
                price: 25.00,
                image: 'https://i.imgur.com/placeholder.jpg',
                category: 'gaming'
            },
            {
                id: 'robux',
                name: 'Robux Roblox',
                price: 20.00,
                image: 'https://i.imgur.com/placeholder.jpg',
                category: 'gaming'
            },
            {
                id: 'gift_cards',
                name: 'Gift Cards',
                price: 30.00,
                image: 'https://i.imgur.com/placeholder.jpg',
                category: 'gaming'
            }
        ];
    },
    
    /**
     * Get products by category
     * @param {string} category - Product category
     * @returns {Array} - Products in the category
     */
    getProductsByCategory(category) {
        return this.getAllProducts().filter(p => p.category === category);
    },
    
    /**
     * Search products
     * @param {string} query - Search query
     * @returns {Array} - Matching products
     */
    searchProducts(query) {
        if (!query) return [];
        
        const searchTerm = query.toLowerCase();
        return this.getAllProducts().filter(product => {
            return product.name.toLowerCase().includes(searchTerm);
        });
    }
};

export default Products;