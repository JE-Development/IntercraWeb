
<template id="parent-popup">
  <div class="button-layout" v-if="show">
      <button class="more-content-button center-horizontal" @click="onClickButton">
        <p class="text-black more-content-button-text">More Content</p>
      </button>
  </div>
</template>

<script>


export default {
  name: "MoreContentButton",
  data() {
    return {
      show: false,
    }
  },
  props: {
    show: Boolean,
  },

  methods: {
    onClickButton: function (){

    },
  }
}

</script>