<script setup>
import { ref } from 'vue';
import { generateShadyLink } from '../utils/shadyGenerator';
import { useRouter } from 'vue-router';

const inputLink = ref('')
const generatedLink = ref('')
const isGenerated = ref(false)
const isInvalid = ref(false)
const isCopied = ref(false)

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
  <div v-if="$route.path === '/'">
    <h1>Suspicious Link Generator</h1>
    <div>
      <span>Paste your link here:</span><br/>
      <input type="text" v-model="inputLink" /><br/>
      
      
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
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/background-image.jpg');
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding-top: 50px;
  font-family: 'Google Sans Code', monospace;
  max-width: 400px;

  overflow: hidden;
}

h1 {
  text-align: center;
  font-size: 24px;
}

div {
  text-align: center;
}
input {
  background-color: #121212;
  color: whitesmoke;
  font-family: 'Google Sans Code', monospace;
  margin-top: 10px;
  width: 80%;
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
  margin-top: 12rem; 
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
</style>
