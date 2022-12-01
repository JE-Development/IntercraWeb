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
export default {
  //npm run dev | npm run build
  name: "MainSearch",

  methods: {
    enterClicked(){

      let searchText = document.getElementById("main-input-search").value;

      let route = this.$router.resolve({path: '/search/' + "nona_web" + "/" + searchText});
      window.open(route.href, '_self');

    }
  }
}
</script>

<style scoped>

</style>
