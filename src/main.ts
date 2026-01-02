// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initHeaderScroll();
  initHeadlineGrid();
  initScrollReveal();
  initFeatureAccordion();
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

/**
 * Initialize feature accordion - expand/collapse cards based on scroll position
 */
function initFeatureAccordion(): void {
  const featureSteps = document.querySelectorAll('.feature-step') as NodeListOf<HTMLElement>;
  const progressBar = document.querySelector('.flow-connector-progress') as HTMLElement;
  const flowConnector = document.querySelector('.flow-connector') as HTMLElement;

  if (!featureSteps.length) return;

  const observerOptions: IntersectionObserverInit = {
    threshold: 0.4,
    rootMargin: '-10% 0px -40% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const step = entry.target as HTMLElement;

      if (entry.isIntersecting) {
        // Collapse all other steps
        featureSteps.forEach(s => {
          if (s !== step) {
            s.classList.add('collapsed');
          }
        });
        // Expand this step
        step.classList.remove('collapsed');

        // Update progress bar
        if (progressBar && flowConnector) {
          const stepIndex = Array.from(featureSteps).indexOf(step);
          const progress = ((stepIndex + 1) / featureSteps.length) * 100;
          progressBar.style.height = `${progress}%`;
        }
      }
    });
  }, observerOptions);

  featureSteps.forEach(step => observer.observe(step));
}
