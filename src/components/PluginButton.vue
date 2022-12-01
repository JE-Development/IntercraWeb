
<template>
  <div class="button-layout">
      <button class="plugin-menu" @click="onClickPluginButton">
        <img width="25%" src="../assets/three-line.png" class="plugin-menu-image"/>
        <p id="plugin-menu-text">Open Plugin List</p>
      </button>
  </div>
  <PluginPopup :show="show" @show-popup="showFromPopup"/>
</template>

<script>

import PluginPopup from "./PluginPopup.vue";

export default {
  //npm run dev | npm run build
  name: "PluginButton",
  data() {
    return {
      show: false
    }
  },
  components: {
    PluginPopup
  },
  methods: {
    onClickPluginButton: function (){
      this.show=true;
    },
    showFromPopup: function (message){
      this.show = message;
    }
  }
}

</script>