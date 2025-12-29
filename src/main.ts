// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initHeaderScroll();
  initHeadlineGrid();
  initFeaturesCarousel();
  initScrollReveal();
});

/**
 * Calculate and set grid lines for headline
 */
function initHeadlineGrid(): void {
  const headline = document.querySelector('.hero-headline') as HTMLElement;
  if (!headline) return;

  function updateGridLines() {
    const rect = headline.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    document.documentElement.style.setProperty('--headline-top', `${rect.top + scrollTop}px`);
    document.documentElement.style.setProperty('--headline-bottom', `${rect.bottom + scrollTop}px`);
    document.documentElement.style.setProperty('--headline-left', `${rect.left}px`);
    document.documentElement.style.setProperty('--headline-right', `${rect.right}px`);
  }

  updateGridLines();
  window.addEventListener('resize', updateGridLines);
  window.addEventListener('scroll', updateGridLines);
}

/**
 * Initialize features carousel with navigation
 */
function initFeaturesCarousel(): void {
  const featureCards = document.querySelectorAll('.feature-card') as NodeListOf<HTMLElement>;
  const prevBtn = document.querySelector('.feature-nav-prev') as HTMLButtonElement;
  const nextBtn = document.querySelector('.feature-nav-next') as HTMLButtonElement;
  const featureBox = document.querySelector('.feature-box') as HTMLElement;

  if (!featureCards.length || !prevBtn || !nextBtn || !featureBox) return;

  let currentIndex = 0;
  let isAnimating = false;

  function updateFeature(newIndex: number) {
    if (isAnimating) return;
    isAnimating = true;

    // Remove active class from current card
    featureCards[currentIndex].classList.remove('active');

    // Add active class to new card
    featureCards[newIndex].classList.add('active');

    currentIndex = newIndex;

    // Allow next animation after transition completes
    setTimeout(() => {
      isAnimating = false;
    }, 400);
  }

  function updateGridLines() {
    const rect = featureBox.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    document.documentElement.style.setProperty('--features-top', `${rect.top + scrollTop}px`);
    document.documentElement.style.setProperty('--features-bottom', `${rect.bottom + scrollTop}px`);
  }

  prevBtn.addEventListener('click', () => {
    const newIndex = currentIndex === 0 ? featureCards.length - 1 : currentIndex - 1;
    updateFeature(newIndex);
  });

  nextBtn.addEventListener('click', () => {
    const newIndex = currentIndex === featureCards.length - 1 ? 0 : currentIndex + 1;
    updateFeature(newIndex);
  });

  // Update grid lines on load, resize, and scroll
  updateGridLines();
  window.addEventListener('resize', updateGridLines);
  window.addEventListener('scroll', updateGridLines);
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll(): void {
  const links = document.querySelectorAll('a[href^="#"]:not([href="#MARKETPLACE_URL"]):not([href="#GITHUB_URL"]):not([href="#TWITTER_URL"])');

  links.forEach(link => {
    link.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const target = link.getAttribute('href');

      if (!target || target === '#') return;

      const element = document.querySelector(target);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Add/remove header shadow on scroll
 */
function initHeaderScroll(): void {
  const header = document.querySelector('.header') as HTMLElement;
  if (!header) return;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 10) {
      header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}

/**
 * Initialize scroll-reveal animations with Intersection Observer
 */
function initScrollReveal(): void {
  const observerOptions: IntersectionObserverInit = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        const delay = element.getAttribute('data-delay');

        if (delay) {
          setTimeout(() => {
            element.classList.add('visible');
          }, parseInt(delay));
        } else {
          element.classList.add('visible');
        }

        // Stop observing after animation triggers (one-time animation)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with reveal-on-scroll class
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  revealElements.forEach(el => observer.observe(el));
}

// Initialize scroll reveal animations
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
});
