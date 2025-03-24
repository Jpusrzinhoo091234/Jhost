document.addEventListener('DOMContentLoaded', function() {
    // Plan Toggle
    const planToggle = document.getElementById('plan-toggle');
    const weeklyPrices = document.querySelectorAll('.price.weekly');
    const monthlyPrices = document.querySelectorAll('.price.monthly');

    if (planToggle) {
        planToggle.addEventListener('change', function() {
            if (this.checked) {
                weeklyPrices.forEach(price => price.style.display = 'none');
                monthlyPrices.forEach(price => price.style.display = 'block');
            } else {
                weeklyPrices.forEach(price => price.style.display = 'block');
                monthlyPrices.forEach(price => price.style.display = 'none');
            }
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    if (testimonialSlider && testimonialCards.length > 0 && dots.length > 0) {
        // Set initial active dot
        dots[0].classList.add('active');

        // Function to change slide
        function changeSlide(index) {
            if (index >= testimonialCards.length) index = 0;
            if (index < 0) index = testimonialCards.length - 1;

            // Calculate scroll position
            const cardWidth = testimonialCards[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(testimonialSlider).columnGap) || 0;
            const scrollPosition = index * (cardWidth + gap);
            
            testimonialSlider.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });

            // Update dots
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');

            currentIndex = index;
        }

        // Add click event to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => changeSlide(index));
        });

        // Auto slide every 5 seconds
        setInterval(() => {
            changeSlide(currentIndex + 1);
        }, 5000);

        // Handle manual scroll
        testimonialSlider.addEventListener('scroll', () => {
            const cardWidth = testimonialCards[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(testimonialSlider).columnGap) || 0;
            const scrollPosition = testimonialSlider.scrollLeft;
            
            const newIndex = Math.round(scrollPosition / (cardWidth + gap));
            
            if (newIndex !== currentIndex) {
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[newIndex]) {
                    dots[newIndex].classList.add('active');
                }
                currentIndex = newIndex;
            }
        });
    }

    // Floating Button Animation
    const mainButton = document.querySelector('.main-button');
    const subButtons = document.querySelector('.sub-buttons');

    if (mainButton && subButtons) {
        mainButton.addEventListener('click', function() {
            subButtons.classList.toggle('active');
        });
    }

    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.card-btn, .plan-btn');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;

    if (addToCartButtons.length > 0 && cartCount) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                count++;
                cartCount.textContent = count;
                
                // Animation for button
                this.classList.add('added');
                setTimeout(() => {
                    this.classList.remove('added');
                }, 1000);
                
                // Show notification
                showNotification('Produto adicionado ao carrinho!');
            });
        });
    }

    // Notification Function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
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
    }

    // Scroll Animation
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });

        // Add class to header when scrolled
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Particle Animation in Hero Section
    const heroParticles = document.querySelector('.hero-particles');
    if (heroParticles) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            heroParticles.appendChild(particle);
        }
    }

    // Form Validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const inputs = this.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (valid) {
                // Simulate form submission
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    this.reset();
                    showNotification('Mensagem enviada com sucesso!');
                }, 2000);
            }
        });
    }

    // User Authentication System
    // DOM Elements
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const userDashboardModal = document.getElementById('userDashboardModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const testimonialForm = document.getElementById('testimonialForm');
    const ratingStars = document.querySelectorAll('.rating-select i');
    
    // Current user state
    let currentUser = null;
    
    // Check if user is logged in (from localStorage)
    function checkAuth() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            updateUIForLoggedInUser();
        }
    }
    
    // Update UI based on authentication state
    function updateUIForLoggedInUser() {
        if (currentUser) {
            loginBtn.innerHTML = `<i class="fas fa-user"></i> ${currentUser.username}`;
            loginBtn.removeEventListener('click', openLoginModal);
            loginBtn.addEventListener('click', openDashboardModal);
            
            // Update dashboard info
            document.getElementById('userDisplayName').textContent = currentUser.name;
            document.getElementById('userUsername').textContent = `@${currentUser.username}`;
            
            if (currentUser.avatar) {
                document.getElementById('userAvatar').src = currentUser.avatar;
            }
            
            // Fill profile form
            document.getElementById('profileName').value = currentUser.name;
            document.getElementById('profileUsername').value = currentUser.username;
            document.getElementById('profileEmail').value = currentUser.email;
            document.getElementById('profileAvatar').value = currentUser.avatar || '';
            
            // Load user testimonials
            loadUserTestimonials();
        } else {
            loginBtn.innerHTML = `<i class="fas fa-user"></i> Login`;
            loginBtn.removeEventListener('click', openDashboardModal);
            loginBtn.addEventListener('click', openLoginModal);
        }
    }
    
    // Load testimonials from database
    async function loadTestimonials() {
        try {
            const response = await fetch('database.json');
            const data = await response.json();
            return data.testimonials;
        } catch (error) {
            console.error('Error loading testimonials:', error);
            return [];
        }
    }
    
    // Load user testimonials
    async function loadUserTestimonials() {
        if (!currentUser) return;
        
        const testimonials = await loadTestimonials();
        const userTestimonials = testimonials.filter(t => t.user === currentUser.username);
        const container = document.getElementById('userTestimonials');
        
        if (userTestimonials.length === 0) {
            container.innerHTML = '<p>Você ainda não tem depoimentos.</p>';
            return;
        }
        
        container.innerHTML = '';
        userTestimonials.forEach(testimonial => {
            const testimonialEl = document.createElement('div');
            testimonialEl.className = 'user-testimonial';
            testimonialEl.dataset.id = testimonial.id;
            
            // Create rating stars
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= testimonial.rating) {
                    stars += '<i class="fas fa-star"></i>';
                } else if (i - 0.5 <= testimonial.rating) {
                    stars += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    stars += '<i class="far fa-star"></i>';
                }
            }
            
            testimonialEl.innerHTML = `
                <div class="testimonial-date">${formatDate(testimonial.date)}</div>
                <div class="testimonial-rating">${stars}</div>
                <div class="testimonial-text">${testimonial.text}</div>
                <div class="testimonial-actions">
                    <button class="edit-btn"><i class="fas fa-edit"></i> Editar</button>
                    <button class="delete-btn"><i class="fas fa-trash"></i> Excluir</button>
                </div>
            `;
            
            container.appendChild(testimonialEl);
            
            // Add event listeners for edit and delete buttons
            const editBtn = testimonialEl.querySelector('.edit-btn');
            const deleteBtn = testimonialEl.querySelector('.delete-btn');
            
            editBtn.addEventListener('click', () => editTestimonial(testimonial));
            deleteBtn.addEventListener('click', () => deleteTestimonial(testimonial.id));
        });
    }
    
    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }
    
    // Edit testimonial
    function editTestimonial(testimonial) {
        document.getElementById('testimonialText').value = testimonial.text;
        document.getElementById('testimonialRating').value = testimonial.rating;
        
        // Update stars
        ratingStars.forEach(star => {
            const rating = parseInt(star.dataset.rating);
            if (rating <= testimonial.rating) {
                star.className = 'fas fa-star active';
            } else {
                star.className = 'far fa-star';
            }
        });
        
        // Change form submit handler to update instead of create
        const form = document.getElementById('testimonialForm');
        form.dataset.mode = 'edit';
        form.dataset.testimonialId = testimonial.id;
        
        // Change button text
        form.querySelector('button[type="submit"]').textContent = 'Atualizar Depoimento';
        
        // Scroll to form
        form.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Delete testimonial
    async function deleteTestimonial(id) {
        if (!confirm('Tem certeza que deseja excluir este depoimento?')) return;
        
        try {
            // In a real app, this would be an API call
            // For this demo, we'll simulate deletion
            const testimonials = await loadTestimonials();
            const updatedTestimonials = testimonials.filter(t => t.id !== id);
            
            // Simulate saving to database
            // In a real app, this would be an API call
            console.log('Testimonial deleted:', id);
            
            // Update UI
            loadUserTestimonials();
            showNotification('Depoimento excluído com sucesso!');
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            showNotification('Erro ao excluir depoimento. Tente novamente.');
        }
    }
    
    // Modal functions
    function openLoginModal() {
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function openForgotPasswordModal() {
        loginModal.style.display = 'none';
        forgotPasswordModal.style.display = 'block';
    }
    
    function openDashboardModal() {
        userDashboardModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeAllModals() {
        loginModal.style.display = 'none';
        forgotPasswordModal.style.display = 'none';
        userDashboardModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Tab switching
    function switchTab(event) {
        const tabName = event.target.dataset.tab;
        const tabContainer = event.target.closest('.modal-content, .dashboard-content');
        
        // Update active tab button
        tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Show selected tab content
        if (tabContainer.classList.contains('modal-content')) {
            // For login/register tabs
            document.getElementById('loginTab').style.display = tabName === 'login' ? 'block' : 'none';
            document.getElementById('registerTab').style.display = tabName === 'register' ? 'block' : 'none';
        } else {
            // For dashboard tabs
            document.getElementById('profileTab').style.display = tabName === 'profile' ? 'block' : 'none';
            document.getElementById('testimonialsTab').style.display = tabName === 'testimonials' ? 'block' : 'none';
            document.getElementById('ordersTab').style.display = tabName === 'orders' ? 'block' : 'none';
        }
    }
    
    // Form submissions
    async function handleLoginSubmit(event) {
        event.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Validate inputs
        if (!email || !password) {
            showNotification('Por favor, preencha todos os campos.');
            return;
        }
        
        try {
            // In a real app, this would be an API call
            // For this demo, we'll check localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Login successful
                currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                updateUIForLoggedInUser();
                closeAllModals();
                showNotification('Login realizado com sucesso!');
            } else {
                showNotification('Email ou senha incorretos.');
            }
        } catch (error) {
            console.error('Login error:', error);
            showNotification('Erro ao fazer login. Tente novamente.');
        }
    }
    
    async function handleRegisterSubmit(event) {
        event.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        const termsCheck = document.getElementById('termsCheck').checked;
        
        // Validate inputs
        if (!name || !username || !email || !password || !confirmPassword) {
            showNotification('Por favor, preencha todos os campos.');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('As senhas não coincidem.');
            return;
        }
        
        if (!termsCheck) {
            showNotification('Você deve aceitar os termos de serviço.');
            return;
        }
        
        try {
            // In a real app, this would be an API call
            // For this demo, we'll use localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Check if email or username already exists
            if (users.some(u => u.email === email)) {
                showNotification('Este email já está em uso.');
                return;
            }
            
            if (users.some(u => u.username === username)) {
                showNotification('Este nome de usuário já está em uso.');
                return;
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
            localStorage.setItem('users', JSON.stringify(users));
            
            // Auto login after registration
            currentUser = newUser;
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            updateUIForLoggedInUser();
            
            // Reset form and close modal
            event.target.reset();
            closeAllModals();
            showNotification('Cadastro realizado com sucesso!');
        } catch (error) {
            console.error('Registration error:', error);
            showNotification('Erro ao criar conta. Tente novamente.');
        }
    }
    
    async function handleForgotPasswordSubmit(event) {
        event.preventDefault();
        
        const email = document.getElementById('resetEmail').value;
        
        if (!email) {
            showNotification('Por favor, informe seu email.');
            return;
        }
        
        try {
            // In a real app, this would send a password reset email
            // For this demo, we'll just show a success message
            
            // Check if email exists
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userExists = users.some(u => u.email === email);
            
            if (!userExists) {
                showNotification('Email não encontrado.');
                return;
            }
            
            // Reset form and close modal
            event.target.reset();
            closeAllModals();
            showNotification('Link de recuperação enviado para seu email!');
        } catch (error) {
            console.error('Password reset error:', error);
            showNotification('Erro ao enviar link de recuperação. Tente novamente.');
        }
    }
    
    async function handleTestimonialSubmit(event) {
        event.preventDefault();
        
        if (!currentUser) {
            showNotification('Você precisa estar logado para enviar um depoimento.');
            return;
        }
        
        const text = document.getElementById('testimonialText').value;
        const rating = parseFloat(document.getElementById('testimonialRating').value);
        
        if (!text) {
            showNotification('Por favor, escreva seu depoimento.');
            return;
        }
        
        if (rating === 0) {
            showNotification('Por favor, selecione uma avaliação.');
            return;
        }
        
        try {
            // In a real app, this would be an API call
            // For this demo, we'll simulate adding to database
            const isEditMode = event.target.dataset.mode === 'edit';
            const testimonialId = isEditMode ? parseInt(event.target.dataset.testimonialId) : Date.now();
            
            const testimonial = {
                id: testimonialId,
                user: currentUser.username,
                avatar: currentUser.avatar || 'https://i.imgur.com/JR0s5j2.png',
                rating,
                text,
                date: new Date().toISOString().split('T')[0]
            };
            
            console.log(`${isEditMode ? 'Updated' : 'New'} testimonial:`, testimonial);
            
            // Reset form
            event.target.reset();
            event.target.dataset.mode = 'create';
            delete event.target.dataset.testimonialId;
            event.target.querySelector('button[type="submit"]').textContent = 'Enviar Depoimento';
            
            // Reset rating stars
            ratingStars.forEach(star => {
                star.className = 'far fa-star';
            });
            document.getElementById('testimonialRating').value = '0';
            
            // Update UI
            loadUserTestimonials();
            showNotification(`Depoimento ${isEditMode ? 'atualizado' : 'enviado'} com sucesso!`);
        } catch (error) {
            console.error('Testimonial submission error:', error);
            showNotification('Erro ao enviar depoimento. Tente novamente.');
        }
    }
    
    function handleLogout() {
        if (confirm('Tem certeza que deseja sair?')) {
            localStorage.removeItem('currentUser');
            currentUser = null;
            updateUIForLoggedInUser();
            closeAllModals();
            showNotification('Logout realizado com sucesso!');
        }
    }
    
    // Rating star selection
    function handleRatingClick(event) {
        const rating = parseInt(event.target.dataset.rating);
        document.getElementById('testimonialRating').value = rating;
        
        ratingStars.forEach(star => {
            const starRating = parseInt(star.dataset.rating);
            if (starRating <= rating) {
                star.className = 'fas fa-star active';
            } else {
                star.className = 'far fa-star';
            }
        });
    }
    
    // Event listeners
    if (loginBtn) loginBtn.addEventListener('click', openLoginModal);
    if (forgotPasswordLink) forgotPasswordLink.addEventListener('click', openForgotPasswordModal);
    if (closeModalButtons) {
        closeModalButtons.forEach(button => {
            button.addEventListener('click', closeAllModals);
        });
    }
    if (tabButtons) {
        tabButtons.forEach(button => {
            button.addEventListener('click', switchTab);
        });
    }
    if (loginForm) loginForm.addEventListener('submit', handleLoginSubmit);
    if (registerForm) registerForm.addEventListener('submit', handleRegisterSubmit);
    if (forgotPasswordForm) forgotPasswordForm.addEventListener('submit', handleForgotPasswordSubmit);
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (testimonialForm) testimonialForm.addEventListener('submit', handleTestimonialSubmit);
    if (ratingStars) {
        ratingStars.forEach(star => {
            star.addEventListener('click', handleRatingClick);
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            closeAllModals();
        }
        if (event.target === forgotPasswordModal) {
            closeAllModals();
        }
        if (event.target === userDashboardModal) {
            closeAllModals();
        }
    });
    
    // Initialize
    checkAuth();

    // Add CSS for additional animations
    document.head.insertAdjacentHTML('beforeend', `
    <style>
        /* Additional Animations */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .notification {
            position: fixed;
            bottom: -100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary-color);
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transition: all 0.3s ease;
        }

        .notification.show {
            bottom: 30px;
        }

        .notification i {
            color: var(--success-color);
        }

        .card-btn.added, .plan-btn.added {
            background: var(--success-color);
            transform: scale(1.1);
        }

        .nav-links li a.active {
            color: var(--secondary-color);
        }

        .nav-links li a.active::after {
            width: 100%;
        }

        header.scrolled {
            background: rgba(10, 10, 10, 0.95);
        }

        .particle {
            position: absolute;
            width: 5px;
            height: 5px;
            background: var(--accent-color);
            border-radius: 50%;
            opacity: 0.3;
            animation: float-particle 10s linear infinite;
        }

        @keyframes float-particle {
            0% {
                transform: translateY(0) scale(1);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-50px) scale(1.5);
                opacity: 0.5;
            }
            100% {
                transform: translateY(-100px) scale(0.5);
                opacity: 0;
            }
        }

        .form-group input.error,
        .form-group textarea.error,
        .form-group select.error {
            border-color: var(--error-color);
            box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2);
        }

        .sub-buttons.active {
            opacity: 1;
            pointer-events: all;
        }

        /* Mobile Menu */
        @media (max-width: 768px) {
            .menu-toggle {
                display: block;
            }

            .nav-links {
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                background: var(--darker-bg);
                flex-direction: column;
                padding: 2rem;
                gap: 1.5rem;
                transform: translateY(-150%);
                transition: all 0.3s ease;
                z-index: 999;
            }

            .nav-links.active {
                transform: translateY(0);
            }

            .menu-toggle.active i::before {
                content: '\f00d';
            }
        }
    </style>
    `);
    });