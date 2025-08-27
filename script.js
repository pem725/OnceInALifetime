// Interactive Game Logic Walkthrough
document.addEventListener('DOMContentLoaded', function() {
    // Step navigation functionality
    const stepButtons = document.querySelectorAll('.step-btn');
    const steps = document.querySelectorAll('.step');
    
    stepButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and steps
            stepButtons.forEach(btn => btn.classList.remove('active'));
            steps.forEach(step => step.classList.remove('active'));
            
            // Add active class to clicked button and corresponding step
            button.classList.add('active');
            const stepNumber = button.getAttribute('data-step');
            document.getElementById(`step-${stepNumber}`).classList.add('active');
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate statistics on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stat, .result-card, .bar, .rule-card');
    animateElements.forEach(el => observer.observe(el));

    // Interactive card matching demonstration
    function createCardMatchingDemo() {
        const demoContainer = document.getElementById('card-matching-demo');
        if (!demoContainer) return;

        const suits = ['♠️', '♥️', '♦️', '♣️'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        
        function getRandomCard() {
            const suit = suits[Math.floor(Math.random() * suits.length)];
            const rank = ranks[Math.floor(Math.random() * ranks.length)];
            return { suit, rank };
        }

        function cardsMatch(card1, card2) {
            return card1.suit === card2.suit || card1.rank === card2.rank;
        }

        function createCardElement(card, highlight = false) {
            const cardEl = document.createElement('div');
            cardEl.className = `card-display${highlight ? ' highlight' : ''}`;
            cardEl.textContent = `${card.suit}${card.rank}`;
            return cardEl;
        }

        let currentDemo = 0;
        const demos = [
            {
                title: "Same Rank Match",
                card1: { suit: '♠️', rank: 'K' },
                card2: { suit: '♥️', rank: 'K' },
                matches: true
            },
            {
                title: "Same Suit Match", 
                card1: { suit: '♦️', rank: 'A' },
                card2: { suit: '♦️', rank: '7' },
                matches: true
            },
            {
                title: "No Match",
                card1: { suit: '♣️', rank: '5' },
                card2: { suit: '♥️', rank: '9' },
                matches: false
            }
        ];

        function showDemo(index) {
            const demo = demos[index];
            demoContainer.innerHTML = `
                <h4>${demo.title}</h4>
                <div class="demo-cards">
                    ${createCardElement(demo.card1).outerHTML}
                    <span class="vs">vs</span>
                    ${createCardElement(demo.card2).outerHTML}
                </div>
                <div class="match-result ${demo.matches ? 'match' : 'no-match'}">
                    ${demo.matches ? '✅ Match!' : '❌ No Match'}
                </div>
            `;
        }

        // Auto-cycle through demos
        setInterval(() => {
            showDemo(currentDemo);
            currentDemo = (currentDemo + 1) % demos.length;
        }, 3000);

        showDemo(0);
    }

    // Initialize card matching demo
    createCardMatchingDemo();

    // Add animation classes for CSS transitions
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .demo-cards {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin: 1rem 0;
        }

        .vs {
            font-size: 1.5rem;
            font-weight: bold;
            color: #6b7280;
        }

        .match-result {
            text-align: center;
            padding: 1rem;
            border-radius: 0.5rem;
            font-weight: bold;
            font-size: 1.125rem;
        }

        .match-result.match {
            background: #dcfce7;
            color: #166534;
        }

        .match-result.no-match {
            background: #fee2e2;
            color: #dc2626;
        }

        .navbar {
            transition: background-color 0.3s ease;
        }

        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Statistics counter animation
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start).toLocaleString();
            }
        }, 16);
    }

    // Trigger counter animations when hero stats come into view
    const heroStatsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent.trim();
                    if (text.includes('700M+')) {
                        animateCounter(stat, 700);
                        stat.innerHTML = stat.innerHTML.replace('700', '<span class="counter">700</span>') + 'M+';
                    } else if (text.includes('240K+')) {
                        animateCounter(stat, 240);
                        stat.innerHTML = '<span class="counter">240</span>K+';
                    }
                });
                heroStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroStatsObserver.observe(heroStats);
    }

    // Bar chart hover effects and tooltips
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.addEventListener('mouseenter', (e) => {
            const percentage = bar.dataset.percentage;
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = `${percentage}% of games`;
            tooltip.style.cssText = `
                position: absolute;
                background: #1f2937;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 0.375rem;
                font-size: 0.875rem;
                font-weight: 500;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
                transform: translateX(-50%);
                left: 50%;
                bottom: 100%;
                margin-bottom: 0.5rem;
            `;
            bar.appendChild(tooltip);
        });

        bar.addEventListener('mouseleave', () => {
            const tooltip = bar.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // Mobile menu toggle (if needed)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('mobile-open');
        });
    }

    // Lazy load performance optimization
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Console easter egg
    console.log(`
🎴 Once In A Lifetime Card Game Statistics 🎴

After 700 million simulations:
• Win Rate: 0 victories
• Probability: < 1 in 700,000,000
• Most common result: 4-5 stacks (78%)
• Legendary 2-stack result: 0.18%

The name "Once In A Lifetime" is perfectly chosen!

Try the simulation yourself:
https://github.com/pem725/OnceInALifetime
    `);

});