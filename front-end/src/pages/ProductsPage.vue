<template>
  <h2>Products</h2>
  <hr class="mb-10">
  <div>
    <categories-list/>
    <products-list/>
  </div>
</template>


<script setup>
import productsList from "@/components/ProductsList.vue";
import categoriesList from "@/components/CategoriesList.vue";

import {onMounted} from "vue";
import {useCategoriesStore} from "../../stores/categoriesStore";
import {useProductsStore} from "../../stores/productsStore";

const categoriesStore = useCategoriesStore();
const productsStore = useProductsStore();


onMounted(() => {
  categoriesStore.fetchCategories();
  productsStore.fetchProducts();
});

</script>
