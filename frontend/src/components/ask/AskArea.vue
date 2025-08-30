<template>
    <main class="ask__chat" aria-label="Chat area">
        <header class="ask__chat-header" aria-label="Chat header">
            <div class="ask__chat-title-group">
                <h1 class="ask__chat-title" aria-label="Current conversation title">Fast Language Models</h1>
            </div>
            <div class="ask__chat-actions">
                <button class="ask__chat-action" aria-label="Rename chat">Rename</button>
                <button class="ask__chat-action danger" aria-label="Delete chat">Delete</button>
            </div>
        </header>

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

        <form @submit.prevent="" class="ask__composer" role="form" aria-label="Message composer" autocomplete="off">
            <div class="ask__input-wrapper">
                <textarea class="ask__input" rows="1" placeholder="Type your message..."
                    aria-label="Type your message"></textarea>
            </div>
            <button class="ask__send" type="submit" aria-label="Send message">Send</button>
        </form>
    </main>
</template>