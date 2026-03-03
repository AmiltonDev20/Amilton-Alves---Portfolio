// Scroll to Section Function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(element => {
    observer.observe(element);
  });

  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  skillBars.forEach(bar => {
    bar.style.animationPlayState = 'paused';
    skillObserver.observe(bar);
  });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Mock submission - in production, connect to backend
    alert(`Mensagem enviada! Obrigado pelo contato, ${name}!`);
    
    // Reset form
    contactForm.reset();
  });
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Add parallax effect to background blobs
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const blobs = document.querySelectorAll('.bg-blob');
  
  blobs.forEach((blob, index) => {
    const speed = 0.1 + (index * 0.05);
    blob.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.zIndex = '20';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.zIndex = '1';
  });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Lazy load images for better performance
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add active state to navigation (if navigation is added)
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      // Add active class to corresponding nav item if exists
      document.querySelectorAll(`a[href="#${sectionId}"]`).forEach(link => {
        link.classList.add('active');
      });
    } else {
      document.querySelectorAll(`a[href="#${sectionId}"]`).forEach(link => {
        link.classList.remove('active');
      });
    }
  });
});

// Preload images on hover for better UX
const links = document.querySelectorAll('a');
links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    const href = link.getAttribute('href');
    if (href && (href.endsWith('.jpg') || href.endsWith('.png') || href.endsWith('.webp'))) {
      const img = new Image();
      img.src = href;
    }
  });
});

// Console easter egg for developers
console.log('%c👋 Olá, desenvolvedor!', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%cGostou do código? Vamos conversar! 💼', 'font-size: 14px; color: #a855f7;');
console.log('%ccontato@email.com', 'font-size: 12px; color: #22d3ee;');
