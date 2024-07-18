<template>
<h1 class="text-gray-600 text-5xl">Hello in my store</h1>
  <hr class="mb-8">

  <p class="mb-6">This store has a presentation purpose. In spite of this,
    it has a complete database with the status of the shopping cart,
    the amount of the given product in the shopping cart,
    the stock status of the given product and the division into categories.
    All this is achieved through the use of the following technologies:</p>

  <div class="mb-10">
    <h2 class="">Frontend stack</h2>
    <hr class="mb-10">
    <div class="flex justify-between items-center">
      <img class="logotype logotype--sm" :src="vue" alt="logotype">
      <img class="logotype logotype--xsm" :src="pinia" alt="logotype">
      <img class="logotype logotype--sm" :src="js" alt="logotype">
      <img class="logotype logotype--sm" :src="tailwind" alt="logotype">
    </div>
  </div>

  <div class="">
    <h2 class="">Backend stack</h2>
    <hr>
    <div class="flex justify-between items-center">
      <img class="logotype logotype--sm" :src="firebase" alt="logotype">
      <img class="logotype" :src="mongo" alt="logotype">
      <img class="logotype" :src="node" alt="logotype">
      <img class="logotype logotype--sm" :src="express" alt="logotype">
    </div>
  </div>

  <router-link :to="{ name: 'products' }">
    <button class="mb-8 w-60 md:w-96 block mx-auto">Go to store</button>
  </router-link>

</template>


<script setup>
import firebase from '@/assets/images/firebase.svg';
import js from '@/assets/images/javascript.svg';
import mongo from '@/assets/images/mongodb.svg';
import node from '@/assets/images/node-js.svg';
import tailwind from '@/assets/images/tailwind.svg';
import pinia from '@/assets/images/pinia.svg';
import vue from '@/assets/images/vue.svg';
import express from '@/assets/images/express.svg';
</script>

