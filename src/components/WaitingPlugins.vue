<template>

  <div class="center-horizontal">
    <div class="center-horizontal">
      <div class="waiting-border waiting-background-color center-horizontal">
        {{data}}
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "WaitingPlugins",

  props: {
    data: String,
  }
}
</script>

<style scoped>

</style>