
<template id="parent-popup">
  <div class="button-layout" v-if="show">
      <button class="more-content-button center-horizontal" @click="onClickButton">
        <p class="text-black more-content-button-text">Saved Content</p>
      </button>
  </div>
</template>

<script>


import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import {IntercraController} from "../intercraSystemCode/controllers/IntercraController";


export default {
  name: "SavedContentButton",
  data() {
    return {
      show: false,
    }
  },
  props: {
    show: Boolean,
  },

  methods: {
    onClickButton(){
      EventBus.emit("show-saved-popup")
    },
  }
}

</script>