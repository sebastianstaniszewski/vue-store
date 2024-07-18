<template>

  <header class="px-6 md:px-18 py-5 fixed top-0 left-0 w-full
 border-b border-gray-500 flex justify-between items-center">

    <div class="flex flex-row items-center gap-5">
      <router-link :to="{name: 'home'}" class="block h-fit">
        <img class="w-12" :src="logotype" alt="logotype">
      </router-link>
      <div>
        <button @click="userSignOut" v-if="userStore.user">Logout</button>
        <div v-else>You are logout</div>
      </div>
    </div>

    <div>
      <div class="flex flex-col md:flex-row items-center gap-2" v-if="userStore.user">
        <div class="hidden md:flex flex-col items-end">
          <span>Logged in</span>
          <span>{{ userStore.user.email }}</span>
        </div>
        <router-link :to="{name: 'cart'}" class="cart-link">
          <div class="relative ">
            <button>Shopping Cart</button>
            <div
                class="absolute w-8 h-8 flex justify-center items-center -top-3 -right-3 w-50px h-50px rounded-full bg-white border border-black">
              <span class="text-black-50" v-if="isLoggedIn">{{ totalCart }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>

  </header>
</template>


<script setup>
import logotype from '@/assets/images/logo.png';
import {useUserStore} from "../../stores/userStore";
import {useCartStore} from "../../stores/cartStore";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import {computed, onMounted, ref} from "vue";
import router from '@/router';
import {productsRoute} from "@/router";

const userStore = useUserStore();
const cartStore = useCartStore();
const auth = getAuth();
const isLoggedIn = ref(false);


onAuthStateChanged(auth, (user) => {
  if (user) {
    isLoggedIn.value = true;
  }
});

onMounted(() => {
  cartStore.loadCartFromLocalStorage();
});

const totalCart = computed(() => cartStore.getTotalCart);

const userSignOut = () => {
  const auth = getAuth();
  signOut(auth);
  cartStore.clearLocalStorage();
  router.push({name: 'home'});
  //window.location.replace(productsRoute);
};
</script>