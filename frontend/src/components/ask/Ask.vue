<template>
    <section class="ask" role="main" aria-label="Ask main chat page">
        <Sidebar/>
        <AskArea/>
    </section>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'
import api from '@/config/api'
import Sidebar from './Sidebar.vue'
import AskArea from './AskArea.vue'
import { useStore } from 'vuex'

const store = useStore()
// This is your raw string from the backend
const rawContent = ref(`
Fast language models have become increasingly important in recent years due to their widespread applications in natural language processing (NLP) and artificial intelligence (AI). Here are some reasons why fast language models are crucial:\n\n1. **Improved User Experience**: Fast language models enable real-time or near-real-time processing of user input, which is essential for applications like chatbots, virtual assistants, and language translation systems. A responsive system provides a better user experience, increasing engagement and satisfaction.\n2. **Scalability**: As the demand for NLP applications grows, the need for fast language models becomes more pressing. Fast models can handle a large volume of requests, making them more scalable and suitable for high-traffic applications.\n3. **Efficient Resource Utilization**: Fast language models require less computational resources, such as memory, CPU, and GPU power, which reduces the operational costs and environmental impact of deploying NLP applications.\n4. **Enabling New Applications**: Fast language models enable new applications that were previously not possible or practical, such as:\n\t* Real-time language translation in video conferencing or live streaming.\n\t* Instant sentiment analysis for customer feedback or social media monitoring.\n\t* Fast text summarization for long documents or articles.\n5. **Competitive Advantage**: In industries like customer service, finance, and healthcare, fast language models can provide a competitive advantage by enabling organizations to respond quickly to customer inquiries, analyze large datasets, or process sensitive information rapidly.\n6. **Increased Accessibility**: Fast language models can make NLP applications more accessible to users with limited internet connectivity, low-end devices, or in areas with restricted computational resources.\n7. **Reducing Latency**: Fast language models help reduce latency, which is critical in applications like:\n\t* Voice assistants, where delays can lead to frustrating user experiences.\n\t* Real-time text-to-speech synthesis, where latency can cause synchronization issues.\n\nTo achieve fast language models, researchers and developers have been exploring various techniques, such as:\n\n1. **Model pruning**: Removing redundant or unnecessary model parameters to reduce computational costs.\n2. **Knowledge distillation**: Transferring knowledge from a large, pre-trained model to a smaller, faster model.\n3. **Efficient architectures**: Designing models with efficient architectures, such as transformer-based models or recurrent neural networks (RNNs) with parallelization.\n4. **Quantization**: Representing model weights and activations using lower-precision data types to reduce memory and computational requirements.\n5. **Parallelization**: Distributing computations across multiple devices or machines to speed up processing.\n\nThe development of fast language models has significant implications for various industries and applications, enabling more efficient, scalable, and user-friendly NLP systems.
`)

// Turn \n into actual line breaks and parse Markdown
const parsedContent = computed(() => {
    return marked.parse(rawContent.value.replace(/\\n/g, '\n').replace(/\\t/g, '    '))
})


const message = ref('')
const chatId = ref(null) // store current chat id if continuing
const loading = ref(false)
const responseData = ref(null)

async function sendMessage() {
    loading.value = true
    try {
        const payload = {
            message: message.value,
            chat_id: chatId.value,
        }

        const { data } = await api.post('/api/ask', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // assuming you store auth token
            },
        })

        responseData.value = data

        // store chat_id if it’s a new chat
        if (!chatId.value) {
            chatId.value = data.chat_id
        }

        console.log('Messages:', data.messages)

    } catch (error) {
        console.error(error.response?.data || error.message)
    } finally {
        loading.value = false
    }
}

const loadChats = async () => {
    store.dispatch('getChatHistory')
}

onMounted(loadChats)
</script>