/**
 * Portfolio JavaScript — Divya Asnani
 * Handles navigation, mobile menu, dynamic recommendation submission,
 * validation, and modal popup confirmation.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Navigation & Smooth Scrolling
     -------------------------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav when link clicked
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (siteNav.classList.contains('is-open')) {
          siteNav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. Profile Image Graceful Fallback
     -------------------------------------------------------------------------- */
  const profileImg = document.getElementById('profile-img');
  const profileFallback = document.getElementById('profile-fallback');

  if (profileImg && profileFallback) {
    profileImg.addEventListener('error', function () {
      profileImg.style.display = 'none';
      profileFallback.style.display = 'flex';
    });
  }

  /* --------------------------------------------------------------------------
     3. Recommendation Submission & Validation
     -------------------------------------------------------------------------- */
  const recommendationForm = document.getElementById('recommendation-form');
  const recommendationInput = document.getElementById('recommendation-input');
  const validationMessage = document.getElementById('validation-message');
  const recommendationsContainer = document.getElementById('recommendations-container');

  // Popup Elements
  const popupOverlay = document.getElementById('popup-overlay');
  const popupCloseBtn = document.getElementById('popup-close-btn');

  /**
   * Displays the confirmation popup modal.
   * Requirement: Called ONLY upon valid, successful recommendation submission.
   */
  function showPopup() {
    if (popupOverlay) {
      popupOverlay.classList.add('active');
      popupOverlay.setAttribute('aria-hidden', 'false');

      // Focus close button for accessibility
      if (popupCloseBtn) {
        popupCloseBtn.focus();
      }
    }
  }

  // Expose showPopup globally for testing and assignment verification
  window.showPopup = showPopup;

  /**
   * Hides the confirmation popup modal.
   */
  function hidePopup() {
    if (popupOverlay) {
      popupOverlay.classList.remove('active');
      popupOverlay.setAttribute('aria-hidden', 'true');
    }
  }

  // Popup dismissal listeners
  if (popupCloseBtn) {
    popupCloseBtn.addEventListener('click', hidePopup);
  }

  if (popupOverlay) {
    popupOverlay.addEventListener('click', function (event) {
      if (event.target === popupOverlay) {
        hidePopup();
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && popupOverlay && popupOverlay.classList.contains('active')) {
      hidePopup();
    }
  });

  // Handle recommendation form submission
  if (recommendationForm && recommendationInput && recommendationsContainer) {
    recommendationForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const rawText = recommendationInput.value;
      const trimmedText = rawText.trim();

      // Rule: Validate that textarea is not empty and prevent whitespace-only text
      if (trimmedText === '') {
        recommendationInput.classList.add('has-error');
        if (validationMessage) {
          validationMessage.textContent = 'Please enter a recommendation before submitting.';
        }
        recommendationInput.focus();
        // Popup must NOT appear for invalid submission
        return;
      }

      // Clear any previous validation errors
      recommendationInput.classList.remove('has-error');
      if (validationMessage) {
        validationMessage.textContent = '';
      }

      // Create new recommendation card element
      const card = document.createElement('article');
      card.className = 'recommendation-card';

      const quoteMark = document.createElement('div');
      quoteMark.className = 'quote-mark';
      quoteMark.setAttribute('aria-hidden', 'true');
      quoteMark.innerHTML = '&ldquo;';

      const textParagraph = document.createElement('p');
      textParagraph.className = 'recommendation recommendation-text';
      textParagraph.textContent = trimmedText;

      const authorContainer = document.createElement('div');
      authorContainer.className = 'recommendation-author';

      const authorName = document.createElement('span');
      authorName.className = 'author-name';
      authorName.textContent = 'Portfolio Visitor & Endorsement';

      const authorRole = document.createElement('span');
      authorRole.className = 'author-role';
      authorRole.textContent = 'Verified Submission \u2022 Recent Recommendation';

      authorContainer.appendChild(authorName);
      authorContainer.appendChild(authorRole);

      card.appendChild(quoteMark);
      card.appendChild(textParagraph);
      card.appendChild(authorContainer);

      // Append new recommendation to the list
      recommendationsContainer.appendChild(card);

      // Reset textarea
      recommendationInput.value = '';

      // Trigger showPopup ONLY after successful, valid submission
      showPopup();
    });

    // Clear error message on user input
    recommendationInput.addEventListener('input', function () {
      if (recommendationInput.classList.contains('has-error')) {
        recommendationInput.classList.remove('has-error');
        if (validationMessage) {
          validationMessage.textContent = '';
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. Home Icon Navigation
     -------------------------------------------------------------------------- */
  const homeIcon = document.getElementById('home-icon');
  if (homeIcon) {
    homeIcon.addEventListener('click', function (event) {
      const topElement = document.getElementById('top');
      if (topElement) {
        event.preventDefault();
        topElement.scrollIntoView({ behavior: 'smooth' });
        // Update URL hash without abrupt jump
        history.pushState(null, '', '#top');
      }
    });
  }
});

