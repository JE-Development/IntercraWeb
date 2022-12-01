@@ -1,28 +1,29 @@
<template>

  <div class="center">
    <div class="search-box">
      <div class="center-horizontal">
        <img src="../assets/intercra-text.png" class="logo-text center-horizontal">
      </div>
      <input
          @keyup.enter="enterClicked()"
          id="main-input-search"
          placeholder="Search here"
          :value="text"
          class="search-input center-horizontal"
          @input="event => text = event.target.value">
      <p>This page is in development.</p>
      <h1><font-awesome-icon icon="fa-sharp fa-solid fa-check" /></h1>
    </div>
  </div>

</template>

<script>
import {IntercraController} from "../components/intercraSystemCode/controllers/IntercraController"
export default {
  //npm run dev | npm run build
  name: "MainSearch",

  methods: {
    enterClicked(){

      let searchText = document.getElementById("main-input-search").value;

      let ic = new IntercraController();
      ic.startSearch(searchText);

      let route = this.$router.resolve({path: '/search/' + searchText});
      window.open(route.href, '_self');

    }
  }
}
</script>

<style scoped>

</style>
