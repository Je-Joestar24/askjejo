<template>
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
</template>