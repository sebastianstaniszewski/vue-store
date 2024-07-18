<template>

  <div class="flex justify-between">
    <router-link class="block" :to="{name: 'products'}">
      <button class="mb-6 flex items-center gap-2">
        <svg width="15px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path fill="#fff" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5
      12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5
      12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        <span>Back to products</span></button>
    </router-link>

    <router-link class="block" :to="{name: 'cart'}">
      <button class="flex items-center gap-2">
        <span>Go to your cart</span>
        <svg width="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path fill="#fff" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5
        12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8
        0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
      </button>
    </router-link>
  </div>
  <hr class="mb-8">

  <div v-if="product">
    <div class="flex justify-center">
      <img :src="product.img" alt="img">
    </div>
    <div class="relative mt-8">
      <h2>{{ product.name }}</h2>
      <p class="text-lg">{{ product.desc }}</p>
      <p class="text-lg">{{ product.stock }} items in stock</p>
      <h3 class="text-black absolute top-6 right-4">{{ product.price }} PLN</h3>
      <button v-if="userStore.user && !isProductInCart(product.id)" @click="addToCart" class="w-full my-4">Add to
        cart
      </button>
      <button disabled v-if="userStore.user && isProductInCart(product.id)" class="w-full bg-gray-300 my-4">Product was
        added to cart
      </button>
      <button v-if="!userStore.user" class="w-full my-4" @click="googleSignIn">Log in to add to cart</button>
    </div>
  </div>
  <div v-else>
    <page404/>
  </div>
</template>


<script setup>
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import page404 from "@/pages/Page404.vue";
import {useRoute} from "vue-router";
import {useCartStore} from "../../stores/cartStore";
import {useProductsStore} from "../../stores/productsStore";
import {onMounted, computed, watch, ref} from "vue";
import {useUserStore} from "../../stores/userStore";

const route = useRoute();
const productId = route.params.productID;
const cartStore = useCartStore();
const productsStore = useProductsStore();
const userStore = useUserStore();

const isProductInCart = (productId) => {
  const cart = cartStore.cart;
  return cart.some(product => product.id === productId);
}

const product = computed(() => {
  return productsStore.actualProduct;
})


onMounted(() => {
  productsStore.getActualProduct(productId);
})

const addToCart = async () => {
  await cartStore.addToCart(productId);
};


const googleSignIn = async () => {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // const user = result.user;
    await cartStore.fetchCart();

  } catch (error) {
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Email:', error.customData.email);
    console.error('Credential:', GoogleAuthProvider.credentialFromError(error));
  }
}

</script>

