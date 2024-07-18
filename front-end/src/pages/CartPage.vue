<template>
  <router-link :to="{name: 'products'}">
    <button class="mb-6 flex items-center gap-2">
      <svg width="15px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path fill="#fff" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5
      12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5
      12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
      <span>Back to products</span></button>
  </router-link>
  <h2 class="mt-8">Cart</h2>
  <hr class="mb-10">
  <div class="flex flex-col gap-10" v-if="cartProducts.length">
    <cart-list/>
  </div>
  <div v-else>
    <h2 class="mb-[360px]"> No items in you cart</h2>
  </div>
</template>


<script setup>

import CartList from "@/components/CartList.vue";
import {useCartStore} from "../../stores/cartStore";
import {computed} from "vue";

const cartStore = useCartStore();
const cartProducts = computed(() => {
  return cartStore.cart;
})

</script>


