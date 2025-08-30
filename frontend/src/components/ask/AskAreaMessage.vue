<template>
    <form @submit.prevent="" class="ask__composer" role="form" aria-label="Message composer" autocomplete="off">
        <div class="ask__input-wrapper">
            <textarea class="ask__input" rows="1" placeholder="Type your message..."
                aria-label="Type your message"></textarea>
        </div>
        <button class="ask__send" type="submit" aria-label="Send message">Send</button>
    </form>
</template>