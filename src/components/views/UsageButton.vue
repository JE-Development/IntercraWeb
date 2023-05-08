
<template id="parent-popup">
  <div class="button-layout">
      <button class="usage-button center-horizontal" @click="handleClick()">
        <p class="text-black more-content-button-text"><img src="../../assets/download_white.png" class="download">{{title}}</p>
      </button>
  </div>
</template>

<script>

export default {
  name: "UsageButton",
  props: {
    title: String,
    onClick: {
      type: Function,
    },
  },

  methods: {

    handleClick() {
      this.onClick();
    },
  }
}

</script>