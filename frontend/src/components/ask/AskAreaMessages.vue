<template>
    <section class="ask__messages" aria-label="Message history" role="log">
        <div class="ask__message ask__message--user" aria-label="User message">
            <div class="ask__bubble">
                <p class="ask__text">Explain the importance of fast language models.</p>
                <span class="ask__meta" aria-label="Sent time">09:21 AM</span>
            </div>
            <div class="ask__avatar" aria-hidden="true">U</div>
        </div>

        <div class="ask__message ask__message--assistant" aria-label="Assistant message">
            <div class="ask__avatar" aria-hidden="true">AI</div>
            <div class="ask__bubble">
                <div class="ask__text" v-html="''"></div>
                <span class="ask__meta" aria-label="Sent time">09:22 AM</span>
            </div>
        </div>
    </section>
</template>