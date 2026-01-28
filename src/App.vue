<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { generateShadyLink } from '../utils/shadyGenerator';

const inputLink = ref('')
const generatedLink = ref('')
const isGenerated = ref(false)
const isInvalid = ref(false)
const isCopied = ref(false)

// Title for typewriter effect
const displayedTitle = ref('')
const fullTitle = 'Suspicious Link Generator 🕵️'

// Mouse tracker
const x = ref(0);
const y = ref(0);
const updateMouse = (e) => {
  x.value = e.clientX;
  y.value = e.clientY;
};

onMounted(() => window.addEventListener('mousemove', updateMouse));
onUnmounted(() => window.removeEventListener('mousemove', updateMouse));

onMounted(() => {
  let index = 0
  const typeInterval = setInterval(() => {
    if (index < fullTitle.length) {
      displayedTitle.value += fullTitle[index]
      index++
    } else {
      clearInterval(typeInterval)
    }
  }, 50)
})
const submitForm = () => {
  if (inputLink.value.trim && inputLink.value.length > 0) {
    isInvalid.value = false
    const baseUrl = window.location.origin
    generatedLink.value = generateShadyLink(inputLink.value, baseUrl)
    isGenerated.value = true
  } else {
    isInvalid.value = true
    setTimeout(() => {
    isInvalid.value = false;
  }, 2000);
  }
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(generatedLink.value)
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 2000);
}
</script>

<template>
  <div 
    class="custom-cursor"
    :style="{ left: x + 'px', top: y + 'px' }"
  ></div>
  <div v-if="$route.path === '/'">
    <h1 class="typing">{{ displayedTitle }}<span class="cursor"></span></h1>
    
    <div>
      <span>Paste your link here:</span><br/>
      <input type="text" v-model="inputLink" /><br/>
      <label for="inputLink" style="opacity: 0.5; font-size: 12px;">e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ</label>
      
      <button v-on:click="submitForm">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M23 4v6h-6"></path>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Generate
      </button>
      <span v-if="isInvalid" style="color: red;">Invalid Link!</span>
    </div><br/>
    <div>
      <span>Suspicious Link:</span><br/>
      <input type="text" :value="generatedLink" id="generatedField" readonly /><br/>
      <button v-on:click="copyToClipboard">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
          <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
          <path d="M9 12l.01 0" />
          <path d="M13 12l2 0" />
          <path d="M9 16l.01 0" />
          <path d="M13 16l2 0" />
        </svg>
        Copy To Clipboard
      </button>
      <span v-if="isCopied">Copied to clipboard!</span>
    </div>
    <footer>
      My Github:
      <a href="https://github.com/dennwill" target="_blank" rel="noopener noreferrer">
        <img 
          src="/GitHub_Invertocat_White.png" 
          alt="Visit Dennwill's GitHub profile" 
          width="24" 
          height="24"
        />
      </a>
    </footer>
  </div>

  <router-view v-else />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&display=swap');

:global(body) {
  background-color: black;
  background-image: linear-gradient(rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.8)), url('/background-image.jpg');
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
  padding: 0;
  font-family: 'Google Sans Code', monospace;
  max-width: 400px;
  min-height: 100vh;
  width: 100%;

  overflow: hidden;
}

h1 {
  text-align: center;
  font-size: 24px;
  white-space: nowrap;
  min-height: 1.2em;
}

div {
  text-align: center;
}
input {
  background-color: #121212;
  color: whitesmoke;
  font-family: 'Google Sans Code', monospace;
  margin-top: 10px;
  width: 100%;
  max-width: 9cm;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
}

#generatedField {
  color:gray
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  margin: 10px auto;
  padding: 12px 24px;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;

  font-family: 'Google Sans Code', monospace;
  font-size: 16px;
  font-weight: 600;
  color: white;
  letter-spacing: 0.5px;
  
  background: #1a1a1a;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.4);
  background: linear-gradient(135deg, rgb(0, 61, 0) 0%, #2a2a2a 100%);
  border-color: rgba(255, 255, 255, 0.3);
}

footer {
  margin-top: 8rem; 
  width: 100%;

  text-align: center;
  padding: 20px 0;
  color: rgba(255, 255, 255, 0.5); /* Dimmed text */
  font-size: 12px;
  font-family: 'Google Sans Code', monospace;
}

img:hover {
  filter:opacity(0.6)
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: white;
  margin-left: 4px;
  animation: blink 1s infinite;
  vertical-align: text-bottom;
}

@keyframes blink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
}

.custom-cursor {
  position: fixed;
  width: 300px;
  height: 300px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 70%);
  pointer-events: none;
  z-index: 9999;
}

@media (max-width: 768px) {
  :global(body) {
    max-width: 100%;
    padding: 20px;
    padding-top: 0;
  }

  h1 {
    font-size: 20px;
  }

  input {
    width: 90%;
    font-size: 16px;
  }

  button {
    padding: 10px 20px;
    font-size: 14px;
    gap: 8px;
  }

  footer {
    margin-top: 4rem;
    font-size: 10px;
  }

  .custom-cursor {
    display: none;
  }
}

@media (max-width: 480px) {
  :global(body) {
    max-width: 100%;
    padding: 12px;
  }

  h1 {
    font-size: 18px;
  }

  span {
    font-size: 14px;
  }

  input {
    width: 100%;
    font-size: 14px;
    padding: 8px;
    margin-top: 8px;
  }

  button {
    padding: 8px 16px;
    font-size: 12px;
    gap: 6px;
  }

  button svg {
    width: 14px;
    height: 14px;
  }

  footer {
    margin-top: 2rem;
    padding: 12px 0;
  }

  label {
    font-size: 10px !important;
  }
}
</style>

