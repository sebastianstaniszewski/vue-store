<template>

  <footer class="px-6 md:px-18 py-5 gap-10 relative border-t border-gray-500 flex justify-between items-center">
    <div>
      <p class="max-w-lm">You need a GOOGLE ACCOUNT to add a product to cart.
        It does not save or store your personal data in any way.</p>
      <div class="flex gap-2 md:gap-5 items-center">
        <img class="logotype logotype--xxsm" :src="vue" alt="logotype">
        <img class="logotype logotype--xxsm" :src="pinia" alt="logotype">
        <img class="logotype logotype--xxsm" :src="firebase" alt="logotype">
        <img class="logotype logotype--xsm" :src="mongo" alt="logotype">
        <img class="logotype logotype--xsm" :src="node" alt="logotype">
        <img class="logotype logotype--xxsm" :src="express" alt="logotype">
        <img class="logotype logotype--xxsm" :src="js" alt="logotype">
        <img class="logotype logotype--xxsm" :src="tailwind" alt="logotype">
      </div>
    </div>

    <span>©2024</span>
  </footer>

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