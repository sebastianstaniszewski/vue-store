<template>

  <div class="grid grid-cols-[repeat(1,_1fr)] sm:grid-cols-[repeat(2,_1fr)]
   md:grid-cols-[repeat(3,_1fr)] grid-rows-auto gap-8">
    <div class="p-5 flex rounded-lg shadow-custom flex flex-col items-center relative" v-for="(product, id) in products" :key="id">
      <router-link :to="{name: 'product', params: {productID: product.id}}">
        <img class="w-full w-48 h-48 mb-4" :src="product.img" alt="image"/>
        <h2 class="text-center">{{ product.name }}</h2>
        <p class="text-center">{{ product.desc }}</p>
        <p class="text-lg font-bold my-3 text-center">{{ product.price }} PLN</p>
        <button class="w-full">View Details</button>
      </router-link>
    </div>
  </div>

</template>

<script setup>
import {useProductsStore} from "../../stores/productsStore";
import {computed} from "vue";

const productsStore = useProductsStore();

const products = computed(() => {
  return productsStore.products;
});

</script>

