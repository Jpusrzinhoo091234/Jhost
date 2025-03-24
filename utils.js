/**
 * Utility functions for the application
 */

const Utils = {
    /**
     * Show notification
     * @param {string} message - Notification message
     * @param {string} type - Notification type (success, error, info)
     */
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        let icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';
        if (type === 'info') icon = 'info-circle';
        
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <p>${message}</p>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    },
    
    /**
     * Format price
     * @param {number} price - Price to format
     * @param {string} currency - Currency symbol
     * @returns {string} - Formatted price
     */
    formatPrice(price, currency = 'R$') {
        return `${currency} ${price.toFixed(2).replace('.', ',')}`;
    },
    
    /**
     * Generate ID from string
     * @param {string} str - String to generate ID from
     * @returns {string} - Generated ID
     */
    generateId(str) {
        return str.toLowerCase().replace(/\s+/g, '_');
    }
};

export default Utils;