<template>

  <div class="flex gap-4 mb-10">
    <button class="uppercase" @click="getProducts">All products</button>
    <div v-for="(category) in categories" :key="category.id">
      <button
          @click="getCategoryProducts(category.category)"><span class="uppercase">{{ category.category }}</span></button>
    </div>
  </div>

</template>


<script setup>
import {useCategoriesStore} from "../../stores/categoriesStore";
import {useProductsStore} from "../../stores/productsStore";
import {computed} from "vue";

const categoriesStore = useCategoriesStore();
const productStore = useProductsStore();

const getCategoryProducts = productStore.fetchCategoryProducts;
const getProducts = productStore.fetchProducts;

const categories = computed(() => {
  return categoriesStore.categories;
});

</script>
