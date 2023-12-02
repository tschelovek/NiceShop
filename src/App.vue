<template>
  <Header/>

  <router-view :key="$route.fullPath"/>

  <Footer />

  <div id="teleport-target"></div>
</template>

<script setup lang="ts">
import Footer from './components/FooterComponent.vue';
import Header from './components/BaseElements/BaseHeader.vue';
import {useStore} from "./store/store";
import {onMounted} from "vue";

const store = useStore();

onMounted(() => {
  const userAccessKey = localStorage.getItem('userAccessKey');
  if (userAccessKey) {
    store.commit('updateUserAccessKey', {userAccessKey});
  }

  store.dispatch('loadCart');
})

</script>

<style scoped>
</style>
