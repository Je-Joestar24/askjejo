<template>
  <header class="header" role="banner" aria-label="Main navigation">
    <!-- Top accent bars -->
    <div class="header__accent-bars">
      <div class="header__accent-bar header__accent-bar--primary"></div>
      <div class="header__accent-bar header__accent-bar--secondary"></div>
    </div>
    
    <!-- Main navigation container -->
    <nav class="header__nav" role="navigation" aria-label="Primary navigation">
      <div class="header__container">
        <!-- Logo -->
        <div class="header__logo">
          <a href="/" class="header__logo-link" aria-label="AskJejo - Home">
            <div class="header__logo-icon">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="16" cy="16" r="14" fill="var(--theme-primary)" opacity="0.1"/>
                <circle cx="16" cy="16" r="8" fill="var(--theme-primary)" opacity="0.2"/>
                <circle cx="16" cy="16" r="4" fill="var(--theme-primary)"/>
                <path d="M8 16 L24 16 M16 8 L16 24" stroke="var(--theme-accent)" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <span class="header__logo-text">AskJejo</span>
          </a>
        </div>

        <!-- Navigation links -->
        <ul class="header__nav-list" role="list">
          <li class="header__nav-item">
            <a href="/" class="header__nav-link header__nav-link--active" aria-current="page">
              Home
            </a>
          </li>
          <li class="header__nav-item">
            <a href="/about" class="header__nav-link">
              About
            </a>
          </li>
        </ul>

        <!-- Action buttons -->
        <div class="header__actions">
          <a href="/login" class="header__btn header__btn--secondary" role="button">
            Login
          </a>
          <a href="/signup" class="header__btn header__btn--primary" role="button">
            Sign Up
          </a>
        </div>

        <!-- Mobile menu toggle (hidden on desktop) -->
        <button class="header__mobile-toggle" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobile-menu">
          <span class="header__mobile-toggle-line"></span>
          <span class="header__mobile-toggle-line"></span>
          <span class="header__mobile-toggle-line"></span>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
// Component logic will be added later
</script>