
<template>
  <div class="button-layout">
      <button ref="usage" class="usage-button center-horizontal" @click="handleClick()">
        <!--<p class="text-black more-content-button-text"><img src="../../assets/download_white.png" class="download">{{title}}</p>/!-->
          <slot>

          </slot>
      </button>
  </div>
</template>

<script>

export default {
  name: "UsageButton",
  props: {
    title: String,
    width: String,
    height: String,
    padding: String,
    onClick: {
      type: Function,
    },
  },

  mounted() {
    if(this.width != null && this.width != ""){
      this.$refs.usage.style.width = this.width + "px";
    }
    if(this.height != null && this.height != ""){
      this.$refs.usage.style.height = this.height + "px";
    }
    if(this.padding != null && this.padding != ""){
      this.$refs.usage.style.padding = this.padding;
    }
  },

  methods: {

    handleClick() {
      this.onClick();
    },
  }
}

</script>