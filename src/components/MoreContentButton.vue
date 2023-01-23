
<template id="parent-popup">
  <div class="button-layout" v-if="show">
      <button class="more-content-button center-horizontal" @click="onClickButton">
        <p class="text-button more-content-button-text">More Content</p>
      </button>
  </div>
</template>

<script>


import {IntercraController} from "./intercraSystemCode/controllers/IntercraController";
import EventBus from "./intercraSystemCode/classes/EventBusEvent";

export default {
  name: "MoreContentButton",
  data() {
    return {
      show: false,
    }
  },
  props: {
    show: Boolean,
    search: String,
    plugin: String,
  },

  methods: {
    onClickButton: function (){
      EventBus.emit("show-loading")
      let ic = new IntercraController();
      ic.startMoreSearch(this.search, this.plugin, this.$cookies.get("token"));

      ic.changeShow();
    },
    getCookies(key){
      return this.$cookies.get(key);
    },
    setCookies(key, value){
      if(this.isCookiesAllowed()){
        return this.$cookies.set(key, value);
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
    }
  }
}

</script>