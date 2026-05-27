<template>
  <RouterView />
</template>

<script setup lang="ts">
  import { useSessionExpiredHandler } from './stores/auth';

  //Escucha el evento global de sesion expirada y redirige al login
  useSessionExpiredHandler()
</script>