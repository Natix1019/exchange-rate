<script setup>
</script>

<template>
  <nav class="nav">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/search">Search rates</RouterLink>
    <RouterLink to="/changed">Changed rates</RouterLink>
  </nav>
  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped>
.nav { display: flex; gap: 12px; padding: 12px; border-bottom: 1px solid #eee; }
.container { padding: 16px; }
 a.router-link-active { font-weight: 700; }
</style>
