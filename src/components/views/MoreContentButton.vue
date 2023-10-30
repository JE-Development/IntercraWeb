
<template id="parent-popup">
  <div class="button-layout" v-if="show">
      <button class="more-content-button center-horizontal" @click="onClickButton">
        <p class="text-black more-content-button-text">More Content</p>
      </button>
  </div>
</template>

<script>


import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import {IntercraController} from "../intercraSystemCode/controllers/IntercraController";

export default {
  name: "MoreContentButton",
  data() {
    return {
      show: false,
      ic: new IntercraController(),
    }
  },
  props: {
    show: Boolean,
    search: String,
    plugin: Array,
  },

  methods: {
    onClickButton: function (){
      EventBus.emit("show-loading")
      EventBus.emit("load-more")

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
    }
  }
}

</script>