<template>

  <app-header/>

  <main>
    <router-view></router-view>
  </main>

  <app-footer/>

</template>

<script setup>

import AppHeader from '@/components/AppHeader.vue'
import AppFooter from "@/components/AppFooter.vue";
import {onMounted} from "vue";
import {useUserStore} from "../stores/userStore";

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUser();
});

</script>


