<template>
  <div class="center-horizontal">

    <div @click="leftClicked">
      <div class="icon-div-selected-left center-horizontal" v-if="sort==='list'">
        <img class="icon image-list"/>
      </div>
      <div class="icon-div-left center-horizontal" v-else>
        <img class="icon image-list"/>
      </div>
    </div>

    <div @click="middleClicked">
      <div class="icon-div-selected-middle center-horizontal" v-if="sort==='shuffle'">
        <img class="icon image-shuffle"/>
      </div>
      <div class="icon-div-middle center-horizontal" v-else>
        <img class="icon image-shuffle"/>
      </div>
    </div>

    <div @click="rightClicked">
      <div class="icon-div-selected-right center-horizontal" v-if="sort==='repeat'">
        <img class="icon image-repeat"/>
      </div>
      <div class="icon-div-right center-horizontal" v-else>
        <img class="icon image-repeat"/>
      </div>
    </div>

  </div>
</template>

<script>
import EventBus from "../intercraSystemCode/classes/EventBusEvent";

export default {
  name: "SortingView",

  props: {
    enabled: String,
  },

  data() {
    return {
      sort: this.enabled
    }
  },

  methods: {
    leftClicked(){
      this.setCookies("sorting", "list")
      this.sort = "list";
      EventBus.emit("change-sorting", "list")
    },
    middleClicked(){
      this.setCookies("sorting", "shuffle")
      this.sort = "shuffle";
      EventBus.emit("change-sorting", "shuffle")
    },
    rightClicked(){
      this.setCookies("sorting", "repeat")
      this.sort = "repeat";
      EventBus.emit("change-sorting", "repeat")
    },



    getCookies(key){
      return this.$cookies.get(key);
    },
    setCookies(key, value){
      if(this.isCookiesAllowed()){
        return this.$cookies.set(key, value, 2147483647);
      }
    },
    isCookiesAllowed(){
      let allow = this.getCookies("cookiesAllowed");
      if(allow == "false"){
        return false;
      }else if (allow == "true"){
        return true;
      }else{
        return null;
      }
    },
  }
}
</script>

<style scoped>

</style>