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
  <h1>this is the test page</h1>
  <p>{{searchData}}</p>
</template>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>