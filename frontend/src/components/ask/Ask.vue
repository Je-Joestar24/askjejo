<template>
    <section class="ask" role="main" aria-label="Ask main chat page">
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
                    <li class="ask__conversation-item" role="listitem" tabindex="0"
                        aria-label="Conversation: Vue patterns">
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
                    <div class="ask__avatar" aria-hidden="true">U</div>
                    <div class="ask__bubble">
                        <p class="ask__text">Explain the importance of fast language models.</p>
                        <span class="ask__meta" aria-label="Sent time">09:21 AM</span>
                    </div>
                </div>

                <div class="ask__message ask__message--assistant" aria-label="Assistant message">
                    <div class="ask__avatar" aria-hidden="true">AI</div>
                    <div class="ask__bubble">
                        <div class="ask__text" v-html="parsedContent"></div>
                        <span class="ask__meta" aria-label="Sent time">09:22 AM</span>
                    </div>
                </div>
            </section>

            <form class="ask__composer" role="form" aria-label="Message composer" autocomplete="off">
                <div class="ask__input-wrapper">
                    <textarea class="ask__input" rows="1" placeholder="Type your message..."
                        aria-label="Type your message"></textarea>
                </div>
                <button class="ask__send" type="submit" aria-label="Send message">Send</button>
            </form>
        </main>
    </section>
</template>

<script setup>

import { ref, computed } from 'vue'
import { marked } from 'marked'

// This is your raw string from the backend
const rawContent = ref(`
Fast language models have become increasingly important in recent years due to their widespread applications in natural language processing (NLP) and artificial intelligence (AI). Here are some reasons why fast language models are crucial:\n\n1. **Improved User Experience**: Fast language models enable real-time or near-real-time processing of user input, which is essential for applications like chatbots, virtual assistants, and language translation systems. A responsive system provides a better user experience, increasing engagement and satisfaction.\n2. **Scalability**: As the demand for NLP applications grows, the need for fast language models becomes more pressing. Fast models can handle a large volume of requests, making them more scalable and suitable for high-traffic applications.\n3. **Efficient Resource Utilization**: Fast language models require less computational resources, such as memory, CPU, and GPU power, which reduces the operational costs and environmental impact of deploying NLP applications.\n4. **Enabling New Applications**: Fast language models enable new applications that were previously not possible or practical, such as:\n\t* Real-time language translation in video conferencing or live streaming.\n\t* Instant sentiment analysis for customer feedback or social media monitoring.\n\t* Fast text summarization for long documents or articles.\n5. **Competitive Advantage**: In industries like customer service, finance, and healthcare, fast language models can provide a competitive advantage by enabling organizations to respond quickly to customer inquiries, analyze large datasets, or process sensitive information rapidly.\n6. **Increased Accessibility**: Fast language models can make NLP applications more accessible to users with limited internet connectivity, low-end devices, or in areas with restricted computational resources.\n7. **Reducing Latency**: Fast language models help reduce latency, which is critical in applications like:\n\t* Voice assistants, where delays can lead to frustrating user experiences.\n\t* Real-time text-to-speech synthesis, where latency can cause synchronization issues.\n\nTo achieve fast language models, researchers and developers have been exploring various techniques, such as:\n\n1. **Model pruning**: Removing redundant or unnecessary model parameters to reduce computational costs.\n2. **Knowledge distillation**: Transferring knowledge from a large, pre-trained model to a smaller, faster model.\n3. **Efficient architectures**: Designing models with efficient architectures, such as transformer-based models or recurrent neural networks (RNNs) with parallelization.\n4. **Quantization**: Representing model weights and activations using lower-precision data types to reduce memory and computational requirements.\n5. **Parallelization**: Distributing computations across multiple devices or machines to speed up processing.\n\nThe development of fast language models has significant implications for various industries and applications, enabling more efficient, scalable, and user-friendly NLP systems.
`)

// Turn \n into actual line breaks and parse Markdown
const parsedContent = computed(() => {
    return marked.parse(rawContent.value.replace(/\\n/g, '\n').replace(/\\t/g, '    '))
})
</script>