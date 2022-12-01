<script>
import {IntercraController} from "../components/intercraSystemCode/controllers/IntercraController"

export default {
  name: "Test",
  data(){
    return {
      search: this.$route.params.search,
      plugin: this.$route.params.plugin,
    };
  },
  created() {

    let ic = new IntercraController();
    ic.startSearch(this.search, this.plugin);

  }
}
</script>

<template>
  <div id="searchRoot"></div>
</template>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>