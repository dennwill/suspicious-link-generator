<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
    try {
        const encodedUrl = route.params.encoded;
        
        if (!encodedUrl) {
            throw new Error('No URL found');
        }
        
        const reversed = encodedUrl.replace(/~/g, '=').replace(/-/g, '+').replace(/_/g, '/');
        const decoded = atob(reversed);

        const fullUrl = decoded.startsWith('http') ? decoded : `https://${decoded}`;
        window.location.href = fullUrl;
    } catch (error) {
        console.error('Invalid link:', error);
        document.body.innerHTML = '<h1>Invalid or Expired Link</h1>';
    }
});
</script>

<template>
    <p>Redirecting...</p>
</template>