/**
 * KOUSHIK Portfolio - Interactive JavaScript Features
 * Modern portfolio with advanced interactivity and animations
 */

// ============================================================================
// GLOBAL VARIABLES AND CONFIGURATION
// ============================================================================

const CONFIG = {
    typewriter: {
        texts: ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Innovation Enthusiast'],
        typeSpeed: 100,
        deleteSpeed: 50,
        delayBetweenTexts: 2000
    },
    testimonials: {
        autoPlay: true,
        interval: 5000
    },
    animations: {
        staggerDelay: 100,
        observerThreshold: 0.1,
        observerRootMargin: '0px 0px -50px 0px'
    }
};

// Blog posts data
const BLOG_POSTS = [
    {
        id: 1,
        title: "Advanced React Patterns for 2024",
        date: "2024-03-15",
        excerpt: "Exploring cutting-edge React patterns including Compound Components, Render Props, and Custom Hooks for building maintainable, scalable applications that stand the test of time.",
        content: "Full article content about React patterns...",
        tags: ["react", "javascript", "patterns"],
        category: "react"
    },
    {
        id: 2,
        title: "AI-Powered Web Development",
        date: "2024-02-28",
        excerpt: "How artificial intelligence is revolutionizing web development workflows, from automated code generation to intelligent testing and optimization strategies.",
        content: "Full article content about AI in web development...",
        tags: ["ai", "automation", "development"],
        category: "ai"
    },
    {
        id: 3,
        title: "Performance Optimization Mastery",
        date: "2024-01-20",
        excerpt: "Advanced techniques for achieving lightning-fast web performance including code splitting, lazy loading, service workers, and modern compression algorithms.",
        content: "Full article content about performance optimization...",
        tags: ["performance", "optimization", "web"],
        category: "performance"
    },
    {
        id: 4,
        title: "Modern CSS Architecture",
        date: "2024-01-10",
        excerpt: "Building scalable CSS architectures with CSS custom properties, container queries, and modern layout techniques for maintainable stylesheets.",
        content: "Full article content about CSS architecture...",
        tags: ["css", "architecture", "design"],
        category: "css"
    },
    {
        id: 5,
        title: "The Future of JavaScript",
        date: "2024-01-05",
        excerpt: "Upcoming JavaScript features and how they'll change the way we write code, including top-level await, pattern matching, and more.",
        content: "Full article content about future JavaScript...",
        tags: ["javascript", "future", "es2024"],
        category: "javascript"
    }
];

// Project details data
const PROJECT_DETAILS = {
    1: {
        title: "Personal Portfolio Website",
        description: "A modern, responsive portfolio showcasing web development skills with interactive animations and professional design.",
        features: [
            "Responsive design across all devices",
            "Advanced CSS animations and transitions",
            "Interactive JavaScript functionality",
            "SEO optimized structure",
            "Accessibility compliant (WCAG 2.1)"
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "SCSS", "Webpack"],
        challenges: [
            "Creating smooth animations without performance impact",
            "Ensuring cross-browser compatibility",
            "Implementing advanced CSS Grid layouts",
            "Optimizing for mobile and touch devices"
        ],
        results: [
            "100% Lighthouse performance score",
            "Fully accessible design",
            "Cross-browser compatibility",
            "Mobile-first responsive design"
        ],
        liveUrl: "https://akagami.top/",
        githubUrl: "#"
    },
    2: {
        title: "Educational Platform - Educatum",
        description: "A comprehensive learning management system with interactive courses, progress tracking, and student analytics.",
        features: [
            "Course management system",
            "Interactive video lessons",
            "Progress tracking dashboard",
            "Student analytics and reporting",
            "Mobile-responsive design"
        ],
        technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
        challenges: [
            "Real-time progress synchronization",
            "Scalable video streaming",
            "Complex state management",
            "Performance optimization for large datasets"
        ],
        results: [
            "Successfully handling 1000+ concurrent users",
            "95% student satisfaction rate",
            "Improved learning outcomes by 40%",
            "Reduced administrative workload by 60%"
        ],
        liveUrl: "https://educatum.pages.dev/",
        githubUrl: "#"
    },
    3: {
        title: "Word of the Day Application",
        description: "Daily vocabulary enhancement tool with pronunciation guides, examples, and progress tracking features.",
        features: [
            "Daily vocabulary updates",
            "Audio pronunciation guides",
            "Usage examples and etymology",
            "Personal progress tracking",
            "Offline functionality (PWA)"
        ],
        technologies: ["Vue.js", "PWA", "Service Workers", "IndexedDB", "Web APIs"],
        challenges: [
            "Implementing offline-first architecture",
            "Audio playback optimization",
            "Cross-platform PWA deployment",
            "Efficient data caching strategies"
        ],
        results: [
            "10,000+ daily active users",
            "4.8-star app store rating",
            "Works offline seamlessly",
            "Fast loading on all devices"
        ],
        liveUrl: "https://wotd.pages.dev/",
        githubUrl: "#"
    }
};

// Global state
let currentTheme = 'classic';
let currentTestimonial = 0;
let isLoading = false;
let observers = [];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function calls
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Show success message
 */
function showSuccessMessage(message) {
    const successEl = document.getElementById('successMessage');
    successEl.querySelector('span').textContent = message;
    successEl.classList.add('show');
    
    setTimeout(() => {
        successEl.classList.remove('show');
    }, 4000);
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Validate email format
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate phone number
 */
function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// ============================================================================
// LOADING SCREEN
// ============================================================================

function initializeLoadingScreen() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.getElementById('loader');
            loader.classList.add('hidden');
            
            setTimeout(() => {
                startAnimations();
                createParticles();
                initializeCustomCursor();
            }, 500);
        }, 2000);
    });
}

// ============================================================================
// PARTICLES SYSTEM
// ============================================================================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 30 : 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ============================================================================
// CUSTOM CURSOR
// ============================================================================

function initializeCustomCursor() {
    const cursor = document.getElementById('customCursor');

    if (window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        // Smooth cursor movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;

            cursorX += dx * 0.15;
            cursorY += dy * 0.15;

            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            cursor.classList.add('active');

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        // Add hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });

        document.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    }
}

// ============================================================================
// THEME SWITCHER
// ============================================================================

function initializeThemeSwitcher() {
    const themeBtns = document.querySelectorAll('.theme-btn');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'classic';
    applyTheme(savedTheme);
    
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            applyTheme(theme);
            localStorage.setItem('portfolio-theme', theme);
        });
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
    
    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}

// ============================================================================
// NAVIGATION
// ============================================================================

function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const progressBar = document.getElementById('progressBar');

    // Mobile navigation toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', 
            navToggle.classList.contains('active') ? 'true' : 'false'
        );
    });

    // Close mobile nav when clicking on links
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Scroll effects
    const updateScrollEffects = throttle(() => {
        const scrollY = window.scrollY;
        
        // Navbar scroll effect
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Progress bar
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollY / scrollHeight) * 100;
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', Math.round(progress));
        
        // Parallax effect for floating shapes
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translate(0, ${scrollY * speed}px)`;
        });
    }, 16);

    window.addEventListener('scroll', updateScrollEffects);

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScrollTo(target);
            }
        });
    });
}

// ============================================================================
// TYPEWRITER EFFECT
// ============================================================================

function initializeTypewriter() {
    const typewriter = document.getElementById('typewriter');
    const texts = CONFIG.typewriter.texts;
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriter.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? CONFIG.typewriter.deleteSpeed : CONFIG.typewriter.typeSpeed;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = CONFIG.typewriter.delayBetweenTexts;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(typeText, typeSpeed);
    }

    // Start typewriter effect after a delay
    setTimeout(typeText, 1000);
}

// ============================================================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================================================

function initializeAnimationObserver() {
    const observerOptions = {
        threshold: CONFIG.animations.observerThreshold,
        rootMargin: CONFIG.animations.observerRootMargin
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stagger-animation')) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * CONFIG.animations.staggerDelay);
                } else {
                    entry.target.classList.add('visible');
                }
                
                // Trigger skill progress bars when skills section becomes visible
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillProgress(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const elementsToObserve = document.querySelectorAll(
        'section h2, .stagger-animation, .about__image, .about__text, .skill-item, .project-card, .blog-post'
    );
    
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
    
    observers.push(observer);
}

// ============================================================================
// SKILLS PROGRESS ANIMATION
// ============================================================================

function animateSkillProgress(skillItem) {
    const progressBar = skillItem.querySelector('.progress-bar-skill');
    if (progressBar) {
        const progress = progressBar.getAttribute('data-progress');
        setTimeout(() => {
            progressBar.style.width = progress + '%';
        }, 500);
    }
}

// ============================================================================
// TESTIMONIALS SLIDER
// ============================================================================

function initializeTestimonialsSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let autoPlayInterval;

    function showSlide(index) {
        // Hide all slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentTestimonial = index;
    }

    function nextSlide() {
        const nextIndex = (currentTestimonial + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentTestimonial - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    function startAutoPlay() {
        if (CONFIG.testimonials.autoPlay) {
            autoPlayInterval = setInterval(nextSlide, CONFIG.testimonials.interval);
        }
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Event listeners
    nextBtn?.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    prevBtn?.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // Pause auto-play on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    sliderContainer?.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer?.addEventListener('mouseleave', startAutoPlay);

    // Initialize
    showSlide(0);
    startAutoPlay();
}

// ============================================================================
// BLOG FUNCTIONALITY
// ============================================================================

function initializeBlog() {
    const blogSearch = document.getElementById('blogSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogPostsContainer = document.getElementById('blogPosts');

    let currentFilter = 'all';
    let searchQuery = '';

    function renderBlogPosts() {
        let filteredPosts = BLOG_POSTS;

        // Apply category filter
        if (currentFilter !== 'all') {
            filteredPosts = filteredPosts.filter(post => 
                post.category === currentFilter || post.tags.includes(currentFilter)
            );
        }

        // Apply search filter
        if (searchQuery) {
            filteredPosts = filteredPosts.filter(post => 
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Render posts
        blogPostsContainer.innerHTML = filteredPosts.map(post => `
            <article class="blog-post stagger-animation" data-category="${post.category}">
                <div class="blog-post__header">
                    <i class="fas fa-${getIconForCategory(post.category)}" aria-hidden="true"></i>
                </div>
                <div class="blog-post__content">
                    <h3>${post.title}</h3>
                    <div class="blog-post__date">${formatDate(post.date)}</div>
                    <div class="blog-post__excerpt">${post.excerpt}</div>
                    <div class="blog-post__tags">
                        ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                    </div>
                    <button class="read-more-btn" data-post-id="${post.id}">Read More</button>
                </div>
            </article>
        `).join('');

        // Re-observe new elements
        const newPosts = blogPostsContainer.querySelectorAll('.blog-post');
        const observer = observers[0]; // Assuming first observer is the animation observer
        newPosts.forEach(post => observer?.observe(post));

        // Add event listeners to read more buttons
        document.querySelectorAll('.read-more-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = parseInt(e.target.dataset.postId);
                showBlogModal(postId);
            });
        });
    }

    function getIconForCategory(category) {
        const icons = {
            'react': 'react',
            'ai': 'robot',
            'performance': 'rocket',
            'css': 'paint-brush',
            'javascript': 'code'
        };
        return icons[category] || 'file-alt';
    }

    function showBlogModal(postId) {
        const post = BLOG_POSTS.find(p => p.id === postId);
        if (!post) return;

        const modal = document.getElementById('projectModal');
        const modalBody = document.getElementById('modalBody');

        modalBody.innerHTML = `
            <div class="blog-modal-content">
                <div class="blog-header">
                    <h1>${post.title}</h1>
                    <div class="blog-meta">
                        <span class="blog-date">${formatDate(post.date)}</span>
                        <div class="blog-tags">
                            ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="blog-content">
                    <p>${post.excerpt}</p>
                    <p>This is a demo portfolio. In a real implementation, this would contain the full blog post content with rich formatting, images, code snippets, and interactive elements.</p>
                    <p>The blog system would typically connect to a CMS or markdown files, providing features like:</p>
                    <ul>
                        <li>Rich text editing</li>
                        <li>Syntax highlighting for code blocks</li>
                        <li>Image optimization and lazy loading</li>
                        <li>Social sharing buttons</li>
                        <li>Related posts suggestions</li>
                        <li>Comments system</li>
                    </ul>
                </div>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Search functionality
    blogSearch?.addEventListener('input', debounce((e) => {
        searchQuery = e.target.value.trim();
        renderBlogPosts();
    }, 300));

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderBlogPosts();
        });
    });

    // Initial render
    renderBlogPosts();
}

// ============================================================================
// PROJECT MODALS
// ============================================================================

function initializeProjectModals() {
    const projectDetailsButtons = document.querySelectorAll('.project-details-btn');
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.getElementById('modalBody');

    function showProjectModal(projectId) {
        const project = PROJECT_DETAILS[projectId];
        if (!project) return;

        modalBody.innerHTML = `
            <div class="project-modal-content">
                <div class="project-header">
                    <h1>${project.title}</h1>
                    <p class="project-description">${project.description}</p>
                    <div class="project-links">
                        <a href="${project.liveUrl}" target="_blank" rel="noopener" class="button button-primary">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                        <a href="${project.githubUrl}" target="_blank" rel="noopener" class="button">
                            <i class="fab fa-github"></i> Source Code
                        </a>
                    </div>
                </div>
                
                <div class="project-details">
                    <div class="detail-section">
                        <h3>Key Features</h3>
                        <ul>
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Technologies Used</h3>
                        <div class="tech-stack">
                            ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Challenges & Solutions</h3>
                        <ul>
                            ${project.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Results & Impact</h3>
                        <ul class="results-list">
                            ${project.results.map(result => `<li><i class="fas fa-check-circle"></i> ${result}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners
    projectDetailsButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.dataset.project;
            showProjectModal(projectId);
        });
    });

    modalClose?.addEventListener('click', closeModal);

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ============================================================================
// FORM VALIDATION AND SUBMISSION
// ============================================================================

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const fields = {
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };

    function validateField(field, value) {
        let isValid = true;
        let errorMessage = '';

        switch (field.name) {
            case 'firstName':
            case 'lastName':
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = 'This field is required';
                } else if (value.trim().length < 2) {
                    isValid = false;
                    errorMessage = 'Must be at least 2 characters';
                }
                break;

            case 'email':
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = 'Email is required';
                } else if (!validateEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;

            case 'phone':
                if (value.trim() && !validatePhone(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;

            case 'subject':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a project type';
                }
                break;

            case 'message':
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = 'Message is required';
                } else if (value.trim().length < 20) {
                    isValid = false;
                    errorMessage = 'Message must be at least 20 characters';
                }
                break;
        }

        return { isValid, errorMessage };
    }

    function showFieldError(field, errorMessage) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        errorElement.textContent = errorMessage;
    }

    function clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error');
        errorElement.textContent = '';
    }

    function validateForm() {
        let isFormValid = true;

        Object.values(fields).forEach(field => {
            const { isValid, errorMessage } = validateField(field, field.value);
            
            if (!isValid) {
                showFieldError(field, errorMessage);
                isFormValid = false;
            } else {
                clearFieldError(field);
            }
        });

        return isFormValid;
    }

    // Real-time validation
    Object.values(fields).forEach(field => {
        field.addEventListener('blur', () => {
            const { isValid, errorMessage } = validateField(field, field.value);
            
            if (!isValid) {
                showFieldError(field, errorMessage);
            } else {
                clearFieldError(field);
            }
        });

        field.addEventListener('input', () => {
            if (field.closest('.form-group').classList.contains('error')) {
                const { isValid } = validateField(field, field.value);
                if (isValid) {
                    clearFieldError(field);
                }
            }
        });
    });

    // Form submission
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (isLoading) return;
        
        if (!validateForm()) {
            return;
        }
        
        const button = form.querySelector('button[type="submit"]');
        const buttonText = button.querySelector('span');
        const buttonIcon = button.querySelector('i');
        const originalText = buttonText.textContent;
        
        // Show loading state
        isLoading = true;
        button.disabled = true;
        buttonIcon.className = 'fas fa-spinner fa-spin';
        buttonText.textContent = 'Sending...';
        
        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success state
            buttonIcon.className = 'fas fa-check';
            buttonText.textContent = 'Message Sent!';
            button.style.background = 'var(--success-color)';
            
            showSuccessMessage('Thank you! Your message has been sent successfully.');
            
            // Reset form
            setTimeout(() => {
                form.reset();
                button.disabled = false;
                buttonIcon.className = 'fas fa-paper-plane';
                buttonText.textContent = originalText;
                button.style.background = '';
                isLoading = false;
            }, 3000);
            
        } catch (error) {
            // Show error state
            buttonIcon.className = 'fas fa-exclamation-triangle';
            buttonText.textContent = 'Error occurred';
            button.style.background = 'var(--error-color)';
            
            setTimeout(() => {
                button.disabled = false;
                buttonIcon.className = 'fas fa-paper-plane';
                buttonText.textContent = originalText;
                button.style.background = '';
                isLoading = false;
            }, 3000);
        }
    });
}

// ============================================================================
// NEWSLETTER SUBSCRIPTION
// ============================================================================

function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = e.target.querySelector('input[type="email"]').value;
        const button = e.target.querySelector('button');
        const originalText = button.textContent;
        
        if (!validateEmail(email)) {
            showSuccessMessage('Please enter a valid email address.');
            return;
        }
        
        button.disabled = true;
        button.textContent = 'Subscribing...';
        
        try {
            // Simulate newsletter subscription (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showSuccessMessage('Successfully subscribed to the newsletter!');
            e.target.reset();
            
        } catch (error) {
            showSuccessMessage('Subscription failed. Please try again.');
        } finally {
            button.disabled = false;
            button.textContent = originalText;
        }
    });
}

// ============================================================================
// ENHANCED INTERACTIONS
// ============================================================================

function initializeEnhancedInteractions() {
    // Glitch effect on hero title hover
    const heroTitle = document.querySelector('.hero h1');
    heroTitle?.addEventListener('mouseenter', () => {
        heroTitle.style.animation = 'glitch 0.3s ease-in-out';
        setTimeout(() => {
            heroTitle.style.animation = '';
        }, 300);
    });

    // Enhanced hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                card.style.transform = 'translateY(-15px) rotateY(5deg) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateY(0) scale(1)';
        });
    });

    // Smooth reveal animations on scroll
    const revealElements = document.querySelectorAll('.skill-item, .project-card, .blog-post');
    revealElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });
}

// ============================================================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================================================

function initializeAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#skills';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Announce dynamic content changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);

    // Function to announce changes
    window.announceToScreenReader = (message) => {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };

    // Keyboard navigation for custom components
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dot.click();
            }
        });
    });

    // Focus management for modals
    const modal = document.getElementById('projectModal');
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    modal?.addEventListener('shown', () => {
        const firstFocusableElement = modal.querySelector(focusableElements);
        firstFocusableElement?.focus();
    });
}

// ============================================================================
// PERFORMANCE OPTIMIZATIONS
// ============================================================================

function initializePerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });

    // Optimize scroll listeners
    let ticking = false;
    
    function optimizedScrollHandler() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scroll-dependent updates go here
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        observers.forEach(observer => observer.disconnect());
        observers = [];
    });
}

// ============================================================================
// ADVANCED PARALLAX SCROLLING
// ============================================================================

function initializeParallaxScrolling() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    function updateParallax() {
        const scrollY = window.pageYOffset;

        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }

    window.addEventListener('scroll', throttle(updateParallax, 16), { passive: true });
}

// ============================================================================
// MAGNETIC BUTTON EFFECT
// ============================================================================

function initializeMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.button, .theme-btn');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const moveX = x * 0.3;
            const moveY = y * 0.3;

            button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================================================
// RIPPLE EFFECT ON CLICK
// ============================================================================

function initializeRippleEffect() {
    const rippleElements = document.querySelectorAll('.button, .project-card, .skill-item');

    rippleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ============================================================================
// ADVANCED SCROLL REVEAL
// ============================================================================

function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => revealObserver.observe(element));
}

// ============================================================================
// SMOOTH TILT EFFECT FOR CARDS
// ============================================================================

function initializeTiltEffect() {
    const tiltCards = document.querySelectorAll('.project-card, .skill-item');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ============================================================================
// ANIMATED STATISTICS COUNTER
// ============================================================================

function initializeCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// ============================================================================
// SMOOTH SCROLL WITH OFFSET
// ============================================================================

function initializeSmoothScrollWithOffset() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80; // Navbar height
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================================================
// TYPING ANIMATION FOR HEADINGS
// ============================================================================

function initializeTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');

    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';

        let index = 0;
        const speed = 50;

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    type();
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element);
    });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

function startAnimations() {
    initializeTypewriter();
    initializeAnimationObserver();
}

function initializeApp() {
    try {
        // Core functionality
        initializeLoadingScreen();
        initializeNavigation();
        initializeThemeSwitcher();

        // Interactive features
        initializeTestimonialsSlider();
        initializeBlog();
        initializeProjectModals();
        initializeContactForm();
        initializeNewsletter();

        // Enhanced interactions
        initializeEnhancedInteractions();

        // Advanced effects (NEW)
        initializeParallaxScrolling();
        initializeMagneticButtons();
        initializeRippleEffect();
        initializeScrollReveal();
        initializeTiltEffect();
        initializeCounterAnimations();
        initializeSmoothScrollWithOffset();
        initializeTypingEffect();

        // Accessibility and performance
        initializeAccessibility();
        initializePerformanceOptimizations();

        console.log('Portfolio initialized successfully! 🚀');
        console.log('Advanced enhancements activated! ✨');

    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Handle resize events
window.addEventListener('resize', debounce(() => {
    // Reinitialize components that depend on viewport size
    if (window.innerWidth > 768) {
        initializeCustomCursor();
    }
}, 250));

// Handle visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
    } else {
        // Resume animations when page becomes visible
    }
});

// ============================================================================
// SERVICE WORKER REGISTRATION (for PWA capabilities)
// ============================================================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(registrationError => {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

// ============================================================================
// EXPORT FOR TESTING (if needed)
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validatePhone,
        formatDate,
        debounce,
        throttle
    };
}
