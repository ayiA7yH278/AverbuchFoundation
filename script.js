/* ============================================
   AVERBUCH FOUNDATION - JAVASCRIPT
   Smooth Animations & Interactions
   ============================================ */

(function() {
    'use strict';

    // Initialize on DOM load
    document.addEventListener('DOMContentLoaded', function() {
        initLoadingBar();
        initScrollAnimations();
        initParallax();
        initCustomCursor();
        initSmoothLinks();
    });

    // Loading Bar Animation
    function initLoadingBar() {
        const loadingBar = document.createElement('div');
        loadingBar.className = 'loading';
        loadingBar.innerHTML = '<div class="loading-bar"></div>';
        document.body.appendChild(loadingBar);
        
        const bar = loadingBar.querySelector('.loading-bar');
        
        window.addEventListener('load', function() {
            bar.style.width = '100%';
            setTimeout(function() {
                loadingBar.style.opacity = '0';
                setTimeout(function() {
                    loadingBar.remove();
                }, 800);
            }, 300);
        });
    }

    // Scroll-triggered Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe sections
        const sections = document.querySelectorAll('.capabilities, .philosophy, .inquiry, .footer');
        sections.forEach(function(section) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1), transform 800ms cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(section);
        });
    }

    // Subtle Parallax Effect on Hero
    function initParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        let ticking = false;

        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.15; // Very subtle movement
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
            
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Custom Cursor (Desktop Only)
    function initCustomCursor() {
        if (window.innerWidth < 1024) return;

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor follow
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();

        // Hover states
        const hoverElements = document.querySelectorAll('a, button, .inquiry-link');
        hoverElements.forEach(function(el) {
            el.addEventListener('mouseenter', function() {
                cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', function() {
                cursor.classList.remove('hover');
            });
        });
    }

    // Smooth Link Navigation
    function initSmoothLinks() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') {
                    e.preventDefault();
                    return;
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Navbar Opacity on Scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.nav');
        const scrolled = window.pageYOffset;
        
        if (scrolled > 50) {
            nav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        } else {
            nav.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
        }
    }, { passive: true });

    // Respect Reduced Motion Preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-slow', '0ms');
        document.documentElement.style.setProperty('--transition-base', '0ms');
        document.documentElement.style.setProperty('--transition-fast', '0ms');
    }

})();
