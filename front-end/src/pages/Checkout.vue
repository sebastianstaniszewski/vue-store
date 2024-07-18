<template>
  <h2>Checkout</h2>
  <hr class="mb-8">
  <h2>Summary</h2>
  <div v-for="product in checkoutProducts" :key="product.id" class="mb-8">
    <div class="details-wrap">
      <h3>{{ product.name }}</h3>
      <p>Amount: {{ product.amount }}</p>
      <p>Price per unit: {{ product.price.toFixed(2) }} PLN</p>
      <p>Total cost for this product: {{ totalPriceForProduct(product) }} PLN</p>
    </div>
    <hr class="mt-4 bg-black h-0.5">
  </div>
  <div>
    <h3 class="mt-8">Total cost for all products: <span class="text-black text-2xl">{{ checkoutTotalPrice }} PLN</span></h3>
  </div>
  <div class="my-8">
    <h3 class="mb-8">Add your shipping address</h3>
    <form-component></form-component>
  </div>
</template>

<script setup>
import { useCartStore } from "../../stores/cartStore";
import { ref, onMounted } from "vue";
import FormComponent from '@/components/FormComponent.vue';

const cartStore = useCartStore();

const checkoutProducts = ref([]);
const checkoutTotalPrice = ref(0);

const calculateTotalPrice = () => {
  checkoutTotalPrice.value = cartStore.checkoutState.reduce((total, product) => {
    return total + product.price * product.amount;
  }, 0).toFixed(2);
};

onMounted(() => {
  cartStore.loadCheckoutFromLocalStorage();
  checkoutProducts.value = cartStore.checkoutState;
  calculateTotalPrice();
});

function totalPriceForProduct(product) {
  let price = product.price * product.amount;
  return price.toFixed(2);
}
</script>