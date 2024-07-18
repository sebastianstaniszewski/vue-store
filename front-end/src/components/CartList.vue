<template>
  <div v-for="product in cartProducts" :key="product.id" class="flex justify-between items-center pb-4 border-b border-black">
    <div class="flex gap-8">
      <img :src="product.img" alt="" class="flex-1 h-[100px] max-w-[100px]">
      <div>
        <h3 class="mb-2">{{ product.name }}</h3>
        <p class="mb-2">{{ product.price }} PLN</p>
        <div>
          <p class="mb-1">Product quantity:</p>
          <button @click="decreaseProductAmount(product)">-</button>
          <span class="px-4">{{ product.amount }} </span>
          <button @click="increaseProductAmount(product)">+</button>
          <div class="mt-2"><span>Total for product:</span> {{ totalPriceForProduct(product) }} PLN</div>
        </div>
      </div>
    </div>

    <button @click.prevent="removeProductFromCart(product.id)" >Remove from Cart</button>
  </div>
  <div class="text-xl font-bold uppercase">Total cost: {{ totalPrice }} PLN</div>
  <router-link :to="{name: 'checkout'}" @click="proceedToCheckout">
    <button class="flex items-center gap-2">
      <span>Proceed to Checkout</span>
      <svg width="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path fill="#fff" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5
        12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8
        0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
    </button>
  </router-link>
</template>


<script setup>
import { useCartStore } from "../../stores/cartStore";
import { computed, onMounted } from "vue";

const cartStore = useCartStore();

const cartProducts = computed(() => cartStore.cart);
const totalPrice = computed(() => cartStore.getTotalPrice);



onMounted(async () => {
   await cartStore.fetchCart();
});

function totalPriceForProduct(product) {
  let price = product.price * product.amount;
  return price.toFixed(2);
}

async function updateProductAmount(product, newAmount) {
  try {
    await cartStore.updateProductAmount(product.id, newAmount);
  } catch (error) {
    console.error('Error updating product amount:', error.message);
  }
}

async function increaseProductAmount(product) {
  if (product.amount < product.stock) {
    product.amount++;
    cartStore.saveCartToLocalStorage();
    await updateProductAmount(product, product.amount);
  }
}

async function decreaseProductAmount(product) {
  if (product.amount > 1) {
    product.amount--;
    cartStore.saveCartToLocalStorage();
    await updateProductAmount(product, product.amount);
  } else {
    //removeProductFromCart(product.id);
  }
}

function removeProductFromCart(productId) {
  cartStore.removeFromCart(productId);
}

async function proceedToCheckout() {
  await cartStore.cartSummary();
}
</script>