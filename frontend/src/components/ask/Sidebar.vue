<template>
    <aside class="ask__sidebar" role="navigation" aria-label="Chat sessions list">
        <header class="ask__sidebar-header">
            <h2 class="ask__sidebar-title" aria-label="Chats">Chats</h2>
            <button class="ask__new-chat" aria-label="Start new chat">+ New</button>
        </header>

        <div class="ask__sidebar-search" role="search" aria-label="Search chats">
            <input class="ask__search-input" type="text" placeholder="Search conversations"
                aria-label="Search conversations" />
        </div>

        <nav class="ask__conversations" aria-label="Conversation list">
            <ul class="ask__conversation-list" role="list">
                <li class="ask__conversation-item active" role="listitem" tabindex="0"
                    aria-label="Conversation: Fast Language Models">
                    <span class="ask__conversation-title">Fast Language Models</span>
                    <span class="ask__conversation-meta">Today • 3 messages</span>
                </li>
                <li class="ask__conversation-item" role="listitem" tabindex="0"
                    aria-label="Conversation: API design help">
                    <span class="ask__conversation-title">API design help</span>
                    <span class="ask__conversation-meta">Yesterday • 12 messages</span>
                </li>
                <li class="ask__conversation-item" role="listitem" tabindex="0" aria-label="Conversation: Vue patterns">
                    <span class="ask__conversation-title">Vue patterns</span>
                    <span class="ask__conversation-meta">2 days ago • 7 messages</span>
                </li>
                <li class="ask__conversation-item" role="listitem" tabindex="0"
                    aria-label="Conversation: Laravel Sanctum">
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
</template>