/**
 * Authentication module for managing user login, registration, and profile
 */
import CONFIG from './config.js';

const Auth = {
    currentUser: null,
    
    /**
     * Initialize authentication
     */
    init() {
        this.checkAuth();
    },
    
    /**
     * Check if user is logged in from localStorage
     */
    checkAuth() {
        const savedUser = localStorage.getItem(CONFIG.STORAGE_KEYS.CURRENT_USER);
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                return true;
            } catch (error) {
                console.error('Error parsing user data:', error);
                this.currentUser = null;
                return false;
            }
        }
        return false;
    },
    
    /**
     * Login user
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<Object>} - User data or error
     */
    async login(name, password) {
        try {
            const users = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.USERS) || '[]');
            const user = users.find(u => u.username === name && u.password === password);
            
            if (user) {
                this.currentUser = user;
                localStorage.setItem(CONFIG.STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
                return { success: true, user };
            } else {
                return { success: false, error: 'Nome de usuário ou senha incorretos' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Erro ao fazer login. Tente novamente.' };
        }
    },
    
    /**
     * Register new user
     * @param {Object} userData - User registration data
     * @returns {Promise<Object>} - User data or error
     */
    async register(userData) {
        try {
            const { name, username, email, password } = userData;
            
            // Validate required fields
            if (!name || !username || !email || !password) {
                return { success: false, error: 'Todos os campos são obrigatórios' };
            }
            
            // In a real app, this would be an API call
            const users = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.USERS) || '[]');
            
            // Check if email or username already exists
            if (users.some(u => u.email === email)) {
                return { success: false, error: 'Este email já está em uso' };
            }
            
            if (users.some(u => u.username === username)) {
                return { success: false, error: 'Este nome de usuário já está em uso' };
            }
            
            // Create new user
            const newUser = {
                id: Date.now(),
                name,
                username,
                email,
                password,
                avatar: '',
                createdAt: new Date().toISOString()
            };
            
            users.push(newUser);
            localStorage.setItem(CONFIG.STORAGE_KEYS.USERS, JSON.stringify(users));
            
            // Auto login after registration
            this.currentUser = newUser;
            localStorage.setItem(CONFIG.STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
            
            return { success: true, user: newUser };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: 'Erro ao criar conta. Tente novamente.' };
        }
    },
    
    /**
     * Logout current user
     */
    logout() {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.CURRENT_USER);
        this.currentUser = null;
        return true;
    },
    
    /**
     * Update user profile
     * @param {Object} profileData - Updated profile data
     * @returns {Promise<Object>} - Updated user data or error
     */
    async updateProfile(profileData) {
        try {
            if (!this.currentUser) {
                return { success: false, error: 'Usuário não está logado' };
            }
            
            const users = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.USERS) || '[]');
            const userIndex = users.findIndex(u => u.id === this.currentUser.id);
            
            if (userIndex === -1) {
                return { success: false, error: 'Usuário não encontrado' };
            }
            
            // Update user data
            const updatedUser = {
                ...users[userIndex],
                ...profileData,
                // Don't allow updating these fields
                id: this.currentUser.id,
                email: this.currentUser.email,
                createdAt: this.currentUser.createdAt
            };
            
            users[userIndex] = updatedUser;
            localStorage.setItem(CONFIG.STORAGE_KEYS.USERS, JSON.stringify(users));
            
            // Update current user
            this.currentUser = updatedUser;
            localStorage.setItem(CONFIG.STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser));
            
            return { success: true, user: updatedUser };
        } catch (error) {
            console.error('Profile update error:', error);
            return { success: false, error: 'Erro ao atualizar perfil. Tente novamente.' };
        }
    },
    
    /**
     * Change user password
     * @param {string} currentPassword - Current password
     * @param {string} newPassword - New password
     * @returns {Promise<Object>} - Success or error
     */
    async changePassword(currentPassword, newPassword) {
        try {
            if (!this.currentUser) {
                return { success: false, error: 'Usuário não está logado' };
            }
            
            const users = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.USERS) || '[]');
            const userIndex = users.findIndex(u => u.id === this.currentUser.id);
            
            if (userIndex === -1) {
                return { success: false, error: 'Usuário não encontrado' };
            }
            
            // Verify current password
            if (users[userIndex].password !== currentPassword) {
                return { success: false, error: 'Senha atual incorreta' };
            }
            
            // Update password
            users[userIndex].password = newPassword;
            localStorage.setItem(CONFIG.STORAGE_KEYS.USERS, JSON.stringify(users));
            
            // Update current user
            this.currentUser = users[userIndex];
            localStorage.setItem(CONFIG.STORAGE_KEYS.CURRENT_USER, JSON.stringify(users[userIndex]));
            
            return { success: true };
        } catch (error) {
            console.error('Password change error:', error);
            return { success: false, error: 'Erro ao alterar senha. Tente novamente.' };
        }
    },
    
    /**
     * Request password reset
     * @param {string} email - User email
     * @returns {Promise<Object>} - Success or error
     */
    async requestPasswordReset(email) {
        try {
            // In a real app, this would send a password reset email
            const users = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.USERS) || '[]');
            const userExists = users.some(u => u.email === email);
            
            if (!userExists) {
                return { success: false, error: 'Email não encontrado' };
            }
            
            // Simulate sending reset email
            console.log(`Password reset requested for: ${email}`);
            
            return { success: true };
        } catch (error) {
            console.error('Password reset error:', error);
            return { success: false, error: 'Erro ao solicitar redefinição de senha. Tente novamente.' };
        }
    },
    
    /**
     * Get current user
     * @returns {Object|null} - Current user or null if not logged in
     */
    getCurrentUser() {
        return this.currentUser;
    },
    
    /**
     * Check if user is logged in
     * @returns {boolean} - True if user is logged in
     */
    isLoggedIn() {
        return this.currentUser !== null;
    }
};

export default Auth;