@@ -1,28 +1,29 @@
<template>

  <div class="center">
    <div class="search-box">
      <div class="center-horizontal">
        <img src="../assets/intercra-text.png" class="logo-text center-horizontal">
      </div>
      <input
          placeholder="Search here"
          :value="text"
          class="search-input center-horizontal"
          @input="event => text = event.target.value">
      <p>This page is in development.</p>
    </div>
  </div>

</template>

<script>
import PluginPopup from "./PluginPopup.vue";
export default {
  //npm run dev | npm run build
  name: "MainSearch"
}
</script>

<style scoped>

</style>
