<template>
    <div class="hero__container">
        <div class="hero__content">
            <!-- Main Headline -->
            <h1 class="hero__title">
                <span class="hero__title-main">ASK</span>
                <span class="hero__title-accent">JEJO</span>
                <span class="hero__title-main">AI</span>
            </h1>

            <!-- Tagline -->
            <p class="hero__tagline">
                Your Intelligent AI Assistant for Instant Answers and Creative Solutions
            </p>

            <!-- Description Box -->
            <div class="hero__description">
                <div class="hero__description-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>
                <p>
                    AskJejo is a powerful AI chatbot powered by Groq API, designed to provide quick,
                    accurate responses to your questions. Get instant help with research, writing,
                    problem-solving, and more.
                </p>
            </div>

            <!-- Call to Action Buttons -->
            <div class="hero__actions">
                <button class="hero__btn hero__btn--primary" aria-label="Start chatting with AI">
                    <span>Start Chatting</span>
                    <svg class="hero__btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
                <button class="hero__btn hero__btn--secondary" aria-label="Learn more about features">
                    <svg class="hero__btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 3l14 9-14 9V3z" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    <span>Watch Demo</span>
                </button>
            </div>
        </div>

        <!-- Right Side Visual -->
        <div class="hero__visual">
            <div class="hero__chat-preview">
                <div class="hero__chat-bubble hero__chat-bubble--user">
                    <div class="hero__chat-avatar" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor"
                                stroke-width="2" />
                            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" />
                        </svg>
                    </div>
                    <p>How can I improve my productivity?</p>
                </div>
                <div class="hero__chat-bubble hero__chat-bubble--ai">
                    <div class="hero__chat-avatar hero__chat-avatar--ai" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2z"
                                stroke="currentColor" stroke-width="2" />
                            <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" />
                        </svg>
                    </div>
                    <p>Here are some proven strategies to boost your productivity...</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hero__container {
    position: relative;
    z-index: 2;
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.hero__title {
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.hero__title-main {
    color: var(--text-dark);
    opacity: 0;
    animation: fadeInScale 0.6s ease-out 0.4s forwards;
}

.hero__title-accent {
    color: var(--theme-primary);
    opacity: 0;
    animation: fadeInScale 0.6s ease-out 0.6s forwards;
    text-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
}


.hero__description {
    background: rgba(37, 99, 235, 0.05);
    backdrop-filter: blur(10px);
    border-radius: var(--card-radius);
    padding: 1.5rem;
    margin-bottom: 2.5rem;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    opacity: 0;
    animation: fadeIn 0.6s ease-out 1s forwards;
    border: 1px solid rgba(37, 99, 235, 0.1);
}

.hero__description-icon {
    color: var(--theme-accent);
    flex-shrink: 0;
    margin-top: 0.25rem;
}

.hero__shapes {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.hero__shape {
    position: absolute;
    border-radius: 50%;
    background: rgba(37, 99, 235, 0.1);
    animation: float 6s ease-in-out infinite;
}

.hero__shape--circle {
    width: 120px;
    height: 120px;
    top: 20%;
    right: 15%;
    animation-delay: 0s;
}

.hero__shape--hexagon {
    width: 80px;
    height: 80px;
    top: 60%;
    right: 25%;
    animation-delay: 2s;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.hero__shape--small {
    width: 40px;
    height: 40px;
    top: 30%;
    right: 40%;
    animation-delay: 4s;
}

.hero__description p {
    color: var(--text-dark);
    line-height: 1.6;
    margin: 0;
}

.hero__content {
    opacity: 0;
    transform: translateY(30px);
    animation: slideInUp 0.8s ease-out 0.2s forwards;
}

.hero__tagline {
    font-size: 1.25rem;
    color: var(--text-dark);
    margin-bottom: 2rem;
    opacity: 0;
    animation: fadeIn 0.6s ease-out 0.8s forwards;
    max-width: 500px;
}


.hero__actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    opacity: 0;
    animation: fadeIn 0.6s ease-out 1.2s forwards;
}

.hero__btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    border-radius: var(--card-radius);
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.hero__btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.hero__btn:hover::before {
    left: 100%;
}

.hero__btn--primary {
    background: var(--theme-primary);
    color: white;
    border-color: var(--theme-primary);
}

.hero__btn--primary:hover {
    background: var(--theme-btn-hover);
    border-color: var(--theme-btn-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
}

.hero__btn--secondary {
    background: transparent;
    color: var(--theme-primary);
    border-color: var(--theme-primary);
}

.hero__btn--secondary:hover {
    background: var(--theme-primary);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
}

.hero__btn-icon {
    transition: transform 0.3s ease;
}

.hero__btn:hover .hero__btn-icon {
    transform: translateX(3px);
}

.hero__visual {
    opacity: 0;
    animation: slideInRight 0.8s ease-out 0.4s forwards;
    display: flex;
    justify-content: center;
    align-items: center;
}


.hero__chat-preview {
    background: rgba(37, 99, 235, 0.05);
    backdrop-filter: blur(15px);
    border-radius: var(--card-radius);
    padding: 2rem;
    border: 1px solid rgba(37, 99, 235, 0.1);
    box-shadow: var(--card-shadow);
    max-width: 400px;
    width: 100%;
}

.hero__chat-bubble {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1rem;
    opacity: 0;
    animation: chatBubbleIn 0.6s ease-out forwards;
}

.hero__chat-bubble--user {
    animation-delay: 1.4s;
}

.hero__chat-bubble--ai {
    animation-delay: 1.8s;
}


.hero__chat-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--theme-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
}

.hero__chat-avatar--ai {
    background: var(--theme-accent);
    color: var(--text-dark);
}

.hero__chat-bubble p {
    background: rgba(37, 99, 235, 0.1);
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    margin: 0;
    color: var(--text-dark);
    line-height: 1.4;
    border: 1px solid rgba(37, 99, 235, 0.1);
}

/* Responsive Design */
@media (max-width: 1024px) {
    .hero__actions {
        justify-content: center;
    }

    .hero__title {
        font-size: 2.5rem;
    }

    .hero__container {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 3rem;
    }

    .hero__description {
        text-align: left;
    }
}

@media (max-width: 768px) {
    .hero__actions {
        flex-direction: column;
        align-items: center;
    }

    .hero__btn {
        width: 100%;
        max-width: 300px;
        justify-content: center;
    }

    .hero__container {
        padding: 0 1rem;
    }

    .hero__description {
        padding: 1rem;
    }
}

@media (max-width: 480px) {

    .hero__tagline {
        font-size: 1.125rem;
    }

    .hero__description {
        padding: 1rem;
    }

    .hero__tagline {
        font-size: 1.125rem;
    }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {

    .hero__title-main,
    .hero__tagline,
    .hero__description p,
    .hero__chat-bubble p {
        color: var(--text-light);
    }

    .hero__description {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.1);
    }

    .hero__chat-preview {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.1);
    }

    .hero__shape {
        background: rgba(255, 255, 255, 0.1);
    }

    .hero__btn--secondary {
        color: var(--text-light);
    }
}
</style>