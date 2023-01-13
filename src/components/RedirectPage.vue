<template>
<h2>Login to Spotify</h2>
</template>

<script>
export default {
  name: "RedirectPage",

  mounted() {
    if(document.documentURI.includes("access_token=")){
      let parser = document.documentURI.replace("&token_type=", ";;;").replace("access_token=", ";;;");
      let token = parser.split(";;;")[1];
      this.$cookies.set("token", token);
      let route = this.$router.resolve({path: '/'});
      window.open(route.href, '_self');
    }else{
      window.open(document.baseURI, "_self");
    }
  }
}
</script>

<style scoped>

</style>