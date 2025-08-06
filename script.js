// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

// Initialize Application
function initializeApp() {
  // Initialize components
  initializeLoader();
  initializeTheme();
  initializeNavigation();
  initializeAnimations();
  initializeParticles();
  initializeForm();
  initializeScrollEffects();
  initializeRippleEffect();
  
  // Set initial theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.toggle('dark', savedTheme === 'dark');
    updateThemeIcon();
  }
}

// Loading Screen
function initializeLoader() {
  const loadingScreen = document.getElementById('loadingScreen');
  
  // Simulate loading time
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    
    // Remove loading screen from DOM after animation
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);
  }, 2000);
}

// Theme Toggle
function initializeTheme() {
  const themeToggle = document.getElementById('toggleTheme');
  
  themeToggle.addEventListener('click', toggleTheme);
  themeToggle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcon();
  
  // Add ripple effect to theme toggle
  createRipple(event, document.getElementById('toggleTheme'));
}

function updateThemeIcon() {
  const sunIcon = document.querySelector('.theme-icon.sun');
  const moonIcon = document.querySelector('.theme-icon.moon');
  const isDark = document.body.classList.contains('dark');
  
  if (isDark) {
    sunIcon.style.opacity = '0';
    moonIcon.style.opacity = '1';
  } else {
    sunIcon.style.opacity = '1';
    moonIcon.style.opacity = '0';
  }
}

// Navigation
function initializeNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
  
  // Navbar scroll effect
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      navbar.style.background = document.body.classList.contains('dark') 
        ? 'rgba(18, 18, 18, 0.98)' 
        : 'rgba(255, 255, 255, 0.98)';
      navbar.style.backdropFilter = 'blur(20px)';
    } else {
      navbar.style.background = document.body.classList.contains('dark') 
        ? 'rgba(18, 18, 18, 0.95)' 
        : 'rgba(255, 255, 255, 0.95)';
    }
    
    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  });
  
  // Active section highlighting
  const sections = document.querySelectorAll('.section, .hero-section');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  });
}

// Animations and Scroll Effects
function initializeAnimations() {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Add stagger effect for cards
        if (entry.target.classList.contains('importance-card') || 
            entry.target.classList.contains('practice-card')) {
          const cards = entry.target.parentElement.children;
          Array.from(cards).forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 200);
          });
        }
      }
    });
  }, observerOptions);
  
  // Observe elements
  const animatedElements = document.querySelectorAll(
    '.importance-card, .practice-card, .info-card, .section-header'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Particles System
function initializeParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
  
  // Create new particles periodically
  setInterval(() => {
    if (particlesContainer.children.length < particleCount) {
      createParticle(particlesContainer);
    }
  }, 3000);
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  // Random starting position
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
  particle.style.animationDelay = Math.random() * 5 + 's';
  
  container.appendChild(particle);
  
  // Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.remove();
    }
  }, 20000);
}

// Form Handling
function initializeForm() {
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('successModal');
  const closeModal = document.getElementById('closeModal');
  
  form.addEventListener('submit', handleFormSubmit);
  closeModal.addEventListener('click', hideModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      hideModal();
    }
  });
  
  // Form input animations
  const formInputs = document.querySelectorAll('.form-input');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
    
    // Check if input has value on load
    if (input.value) {
      input.parentElement.classList.add('focused');
    }
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Basic validation
  if (!name || !email || !subject || !message) {
    showNotification('Please fill in all required fields.', 'error');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification('Please enter a valid email address.', 'error');
    return;
  }
  
  // Simulate form submission
  const submitBtn = e.target.querySelector('.form-submit');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = '<span>Sending...</span>';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    showModal();
    e.target.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    // Remove focused class from form groups
    document.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('focused');
    });
  }, 2000);
}

function showModal() {
  const modal = document.getElementById('successModal');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function hideModal() {
  const modal = document.getElementById('successModal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification-close">&times;</button>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'error' ? '#F44336' : '#4CAF50'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    z-index: 3000;
    display: flex;
    align-items: center;
    gap: 1rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Close functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    margin-left: auto;
  `;
  
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Scroll Effects
function initializeScrollEffects() {
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Ripple Effect
function initializeRippleEffect() {
  const buttons = document.querySelectorAll('.btn, .learn-more-btn, .theme-toggle');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      createRipple(e, this);
    });
  });
}

function createRipple(event, element) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    pointer-events: none;
  `;
  
  ripple.className = 'btn-ripple';
  element.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Utility Functions
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

// Performance optimized scroll handler
const optimizedScrollHandler = throttle(() => {
  // Handle scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  // ESC key closes modal
  if (e.key === 'Escape') {
    const modal = document.getElementById('successModal');
    if (modal.classList.contains('show')) {
      hideModal();
    }
    
    // Close mobile menu
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.getElementById('mobileToggle');
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
    }
  }
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
  // Close mobile menu on resize
  const navMenu = document.getElementById('navMenu');
  const mobileToggle = document.getElementById('mobileToggle');
  
  if (window.innerWidth > 768) {
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
  }
}, 250));

// Preload images for better performance
function preloadImages() {
  const images = [
    'public/farm.jpg',
    'public/green.jpg'
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Initialize image preloading
preloadImages();

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Error handling
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  // You could send this to an error reporting service
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // You could send this to an error reporting service
});

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
  // Placeholder for analytics tracking
  console.log('Event tracked:', eventName, eventData);
  
  // Example: Google Analytics 4
  // gtag('event', eventName, eventData);
  
  // Example: Custom analytics
  // analytics.track(eventName, eventData);
}

// Track important user interactions
document.addEventListener('click', (e) => {
  if (e.target.matches('.btn, .nav-link, .learn-more-btn')) {
    trackEvent('button_click', {
      element: e.target.textContent.trim(),
      section: e.target.closest('section')?.id || 'unknown'
    });
  }
});

// Track form submissions
document.getElementById('contactForm').addEventListener('submit', () => {
  trackEvent('form_submit', {
    form: 'contact_form'
  });
});

// Track theme changes
document.getElementById('toggleTheme').addEventListener('click', () => {
  trackEvent('theme_toggle', {
    theme: document.body.classList.contains('dark') ? 'dark' : 'light'
  });
});

console.log('🌱 Agriculture for Future - Website loaded successfully!');