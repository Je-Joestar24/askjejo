<template>
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
    <button class="header__mobile-toggle" aria-label="Toggle mobile menu" aria-expanded="false"
        aria-controls="mobile-menu">
        <span class="header__mobile-toggle-line"></span>
        <span class="header__mobile-toggle-line"></span>
        <span class="header__mobile-toggle-line"></span>
    </button>
</template>