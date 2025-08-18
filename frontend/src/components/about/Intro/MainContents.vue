<template>
    <div class="intro__container">
        <!-- Left: Content -->
        <div class="intro__content">
            <p class="intro__eyebrow" aria-label="Section label">ABOUT ASKJEJO</p>
            <h1 class="intro__title">
                Built to help you think faster and create more
                <span class="intro__title-accent">with AI</span>
            </h1>
            <p class="intro__subtitle">
                AskJejo AI is a focused assistant powered by the Groq API. It delivers rapid, reliable
                answers and an elegant chat experience designed for your day‑to‑day flow.
            </p>

            <ul class="intro__list" role="list" aria-label="Highlights">
                <li class="intro__list-item">
                    <span class="intro__list-icon" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </span>
                    Real‑time responses powered by Groq inference
                </li>
                <li class="intro__list-item">
                    <span class="intro__list-icon" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </span>
                    Clean, accessible UI with keyboard‑first navigation
                </li>
                <li class="intro__list-item">
                    <span class="intro__list-icon" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </span>
                    Private by default with export‑friendly history
                </li>
            </ul>

            <div class="intro__cta" role="group" aria-label="Primary actions">
                <a class="intro__btn intro__btn--primary" href="#" role="button"
                    aria-label="Start chatting with AskJejo">
                    Start chatting
                </a>
                <a class="intro__btn intro__btn--secondary" href="#" role="button" aria-label="Explore features">
                    Explore features
                </a>
            </div>

            <div class="intro__meta" role="list" aria-label="Key stats">
                <div class="intro__stat" role="listitem">
                    <span class="intro__stat-value">150ms</span>
                    <span class="intro__stat-label">Median response time</span>
                </div>
                <div class="intro__stat" role="listitem">
                    <span class="intro__stat-value">99.9%</span>
                    <span class="intro__stat-label">Uptime</span>
                </div>
                <div class="intro__stat" role="listitem">
                    <span class="intro__stat-value">Secure</span>
                    <span class="intro__stat-label">Privacy‑first</span>
                </div>
            </div>
        </div>

        <!-- Right: Visual -->
        <div class="intro__media" role="img" aria-label="AskJejo chat preview illustration">
            <div class="intro__device" aria-hidden="true">
                <div class="intro__notch" aria-hidden="true"></div>
                <div class="intro__screen">
                    <div class="intro__bubble intro__bubble--user">Hey AskJejo, summarise this article.</div>
                    <div class="intro__bubble intro__bubble--ai">Here’s a concise, accurate summary with key takeaways.
                    </div>
                    <div class="intro__bubble intro__bubble--user">Turn it into bullet points.</div>
                    <div class="intro__bubble intro__bubble--ai">Done. Anything else?</div>
                </div>
            </div>

            <div class="intro__badge intro__badge--groq" aria-label="Powered by Groq API">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" stroke="currentColor" stroke-width="2" />
                </svg>
                <span>Groq Accelerated</span>
            </div>
            <div class="intro__badge intro__badge--secure" aria-label="Security badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" />
                </svg>
                <span>Private by design</span>
            </div>
        </div>
    </div>
</template>