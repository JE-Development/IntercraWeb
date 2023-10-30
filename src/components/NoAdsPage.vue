<template>

</template>

<script>

export default {
  name: "NoAdsPage",



  mounted() {
      this.setCookies("noads", "true")
      this.$router.push('/');
  },



  methods: {
    getCookies(key){
      return this.$cookies.get(key);
    },
    setCookies(key, value){
      if(true){
        return this.$cookies.set(key, value, 2147483647);
      }
    },
  },

}
</script>