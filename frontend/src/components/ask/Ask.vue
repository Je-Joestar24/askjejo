<template>
    <section class="ask" role="main" aria-label="Ask main chat page">
        <aside class="ask__sidebar" role="navigation" aria-label="Chat sessions list">
            <header class="ask__sidebar-header">
                <h2 class="ask__sidebar-title" aria-label="Chats">Chats</h2>
                <button class="ask__new-chat" aria-label="Start new chat">+ New</button>
            </header>

            <div class="ask__sidebar-search" role="search" aria-label="Search chats">
                <input class="ask__search-input" type="text" placeholder="Search conversations" aria-label="Search conversations" />
            </div>

            <nav class="ask__conversations" aria-label="Conversation list">
                <ul class="ask__conversation-list" role="list">
                    <li class="ask__conversation-item active" role="listitem" tabindex="0" aria-label="Conversation: Portfolio feedback">
                        <span class="ask__conversation-title">Portfolio feedback</span>
                        <span class="ask__conversation-meta">Today • 3 messages</span>
                    </li>
                    <li class="ask__conversation-item" role="listitem" tabindex="0" aria-label="Conversation: API design help">
                        <span class="ask__conversation-title">API design help</span>
                        <span class="ask__conversation-meta">Yesterday • 12 messages</span>
                    </li>
                    <li class="ask__conversation-item" role="listitem" tabindex="0" aria-label="Conversation: Vue patterns">
                        <span class="ask__conversation-title">Vue patterns</span>
                        <span class="ask__conversation-meta">2 days ago • 7 messages</span>
                    </li>
                    <li class="ask__conversation-item" role="listitem" tabindex="0" aria-label="Conversation: Laravel Sanctum">
                        <span class="ask__conversation-title">Laravel Sanctum</span>
                        <span class="ask__conversation-meta">Aug 12 • 21 messages</span>
                    </li>
                </ul>
            </nav>

            <footer class="ask__sidebar-footer" aria-label="Sidebar actions">
                <button class="ask__sidebar-btn" aria-label="Settings">Profile</button>
                <button class="ask__sidebar-btn" aria-label="Logout">Logout</button>
            </footer>
        </aside>

        <main class="ask__chat" aria-label="Chat area">
            <header class="ask__chat-header" aria-label="Chat header">
                <div class="ask__chat-title-group">
                    <h1 class="ask__chat-title" aria-label="Current conversation title">Portfolio feedback</h1>
                    <p class="ask__chat-subtitle">Discussing layout, accessibility, and performance</p>
                </div>
                <div class="ask__chat-actions">
                    <button class="ask__chat-action" aria-label="Rename chat">Rename</button>
                    <button class="ask__chat-action danger" aria-label="Delete chat">Delete</button>
                </div>
            </header>

            <section class="ask__messages" aria-label="Message history" role="log">
                <div class="ask__message ask__message--assistant" aria-label="Assistant message">
                    <div class="ask__avatar" aria-hidden="true">A</div>
                    <div class="ask__bubble">
                        <p class="ask__text">Hi! I reviewed your portfolio. The typography looks clean and the visual rhythm is consistent. Would you like suggestions on performance or accessibility first?</p>
                        <span class="ask__meta" aria-label="Sent time">09:20 AM</span>
                    </div>
                </div>

                <div class="ask__message ask__message--user" aria-label="User message">
                    <div class="ask__avatar" aria-hidden="true">U</div>
                    <div class="ask__bubble">
                        <p class="ask__text">Let’s start with performance. I’m using heavy images on the hero and some SVG masks.</p>
                        <span class="ask__meta" aria-label="Sent time">09:21 AM</span>
                    </div>
                </div>

                <div class="ask__message ask__message--assistant" aria-label="Assistant message">
                    <div class="ask__avatar" aria-hidden="true">A</div>
                    <div class="ask__bubble">
                        <p class="ask__text">Consider responsive `srcset`, lazy-loading offscreen sections, and preloading critical fonts. Also check CLS by setting explicit width/height on images.</p>
                        <span class="ask__meta" aria-label="Sent time">09:22 AM</span>
                    </div>
                </div>

                <div class="ask__message ask__message--user" aria-label="User message">
                    <div class="ask__avatar" aria-hidden="true">U</div>
                    <div class="ask__bubble">
                        <p class="ask__text">Great! Can we also add a skeleton for the project cards while loading?</p>
                        <span class="ask__meta" aria-label="Sent time">09:23 AM</span>
                    </div>
                </div>
            </section>

            <form class="ask__composer" role="form" aria-label="Message composer" autocomplete="off">
                <div class="ask__input-wrapper">
                    <textarea class="ask__input" rows="1" placeholder="Type your message..." aria-label="Type your message"></textarea>
                </div>
                <button class="ask__send" type="submit" aria-label="Send message">Send</button>
            </form>
        </main>
    </section>
</template>