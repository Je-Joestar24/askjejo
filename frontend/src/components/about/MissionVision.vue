<template>
    <section class="mv" role="region" aria-labelledby="mv-heading">
        <div class="mv__container">
            <h2 id="mv-heading" class="mv__sr">Mission and Vision</h2>

            <div class="mv__grid" role="list" aria-label="AskJejoAI mission and vision grid">
                <!-- Mission (content) -->
                <article class="mv__tile mv__tile--content mv__tile--mission" role="listitem" aria-label="Our mission">
                    <header class="mv__header">
                        <p class="mv__eyebrow" aria-hidden="true">Our Mission</p>
                        <h3 class="mv__title" role="heading" aria-level="3">Empower everyone to build with AI</h3>
                    </header>
                    <p class="mv__text">
                        AskJejoAI helps learners and teams turn questions into working solutions. We turn curiosity into code, concepts into components,
                        and ideas into shipped features—safely, accessibly, and fast.
                    </p>
                </article>

                <!-- Mission Illustration -->
                <figure class="mv__tile mv__tile--art" role="img" aria-label="Target with arrows illustration">
                    <svg class="mv__svg mv__svg--target" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <g opacity="0.12">
                            <circle cx="256" cy="256" r="200" stroke="currentColor" stroke-width="18" />
                            <circle cx="256" cy="256" r="140" stroke="currentColor" stroke-width="18" />
                            <circle cx="256" cy="256" r="80" stroke="currentColor" stroke-width="18" />
                            <circle cx="256" cy="256" r="24" stroke="currentColor" stroke-width="18" />
                        </g>
                        <g class="mv__arrow">
                            <path d="M330 182 L470 70" stroke="currentColor" stroke-width="14" stroke-linecap="round"/>
                            <path d="M470 70 l-26 6 6-26" stroke="currentColor" stroke-width="14" stroke-linecap="round"/>
                            <circle cx="256" cy="256" r="26" fill="currentColor" opacity="0.2"/>
                        </g>
                    </svg>
                </figure>

                <!-- Vision Illustration -->
                <figure class="mv__tile mv__tile--art" role="img" aria-label="Binoculars illustration">
                    <svg class="mv__svg mv__svg--binoculars" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true" focusable="false">
                        <g stroke="currentColor" stroke-width="14" opacity="0.14">
                            <circle cx="170" cy="300" r="72"/>
                            <circle cx="342" cy="300" r="72"/>
                            <path d="M98 300h52m212 0h52"/>
                            <path d="M208 300h96"/>
                            <path d="M144 228c40-34 184-34 224 0"/>
                        </g>
                    </svg>
                </figure>

                <!-- Vision (content) -->
                <article class="mv__tile mv__tile--content mv__tile--vision" role="listitem" aria-label="Our vision">
                    <header class="mv__header">
                        <p class="mv__eyebrow" aria-hidden="true">Our Vision</p>
                        <h3 class="mv__title" role="heading" aria-level="3">AI craftsmanship for everyone</h3>
                    </header>
                    <p class="mv__text">
                        We imagine a world where building with AI is as natural as asking a question. AskJejoAI brings guidance, reusable patterns,
                        and instant feedback so anyone can learn, prototype, and launch with confidence.
                    </p>
                </article>
            </div>
        </div>
    </section>
</template>