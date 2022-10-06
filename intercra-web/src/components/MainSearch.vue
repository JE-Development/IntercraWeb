<template>

  <div class="center">
    <div class="search-box">
      <div class="center-horizontal">
        <img src="../assets/intercra-text.png" class="logo-text center-horizontal">
      </div>
      <input
          @keyup.enter="startSearch"
          placeholder="Search here"
          class="search-input center-horizontal"
          @input="event => text = event.target.value">
    </div>
  </div>

</template>

<script>
import PluginPopup from "./PluginPopup.vue";
import router from "../router";
export default {
  //npm run dev | npm run build
  name: "MainSearch",

  methods: {
    startSearch: function (){
      let route = this.$router.resolve('/results');
      window.open(route.href, '_blank');
    }
  }
}
</script>

<style scoped>

</style>