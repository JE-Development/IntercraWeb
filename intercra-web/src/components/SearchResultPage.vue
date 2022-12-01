<script>
export default {
  name: "Test",
  data(){
    return {
      search: this.$route.params.search,
      searchData: "",
    };
  },
  created() {
    this.searchData = this.search

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