/**
 * COMPSSA Hackathon 2026 Javascript Logic
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Mobile Navigation Toggle ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
  }

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileToggle && navMenu) {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
      }
    });
  });

  // --- 2. Countdown Timer ---
  // Event Date: June 24, 2026, at 09:00:00 AM
  const eventDate = new Date('June 24, 2026 09:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = eventDate - now;

    if (timeRemaining > 0) {
      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      // Display the result
      document.getElementById('days').textContent = String(days).padStart(2, '0');
      document.getElementById('hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
      // If the count down is finished
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      
      const countdownTitle = document.querySelector('.countdown-card h3');
      if (countdownTitle) {
        countdownTitle.textContent = "Event Has Started!";
      }
    }
  }

  // Initial call and run every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --- 3. FAQ Accordion Toggle ---
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const faqAnswer = question.nextElementSibling;
      const isOpen = faqItem.classList.contains('open');

      // Close all other FAQ items (Optional, for accordion behavior)
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('open');
        item.querySelector('.faq-answer').style.maxHeight = null;
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        faqItem.classList.add('open');
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- 4. Navigation Active State on Scroll ---
  const sections = document.querySelectorAll('section, header');
  const scrollOffset = 100; // offset for nav header heights

  window.addEventListener('scroll', () => {
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - scrollOffset;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

});
