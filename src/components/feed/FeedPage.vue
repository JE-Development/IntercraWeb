<template>

</template>

<script>


import {PluginController} from "../intercraSystemCode/controllers/PluginController";

export default {
  name: "FeedPage",

  created() {
    this.getAllActivePlugins()
  },

  mounted() {


  },

  data(){
    return{
      activePlugins: [],
    }
  },

  methods: {
    getCookies(key){
      return this.$cookies.get(key);
    },
    setCookies(key, value){
      if(this.isCookiesAllowed()){
        return this.$cookies.set(key, value, 2147483647);
      }
    },
    getAllActivePlugins(){
      let pc = new PluginController();
      let all = pc.getAllPluginsAsId();
      for(let i = 0; i < all.length; i++){
        let status = this.getCookies(all[i])
        if(status === "true"){
          this.activePlugins.push(all[i])
        }
      }
    }
  },

}
</script>

<style scoped>

</style>