<template>
  <div class="center-horizontal">
    <div class="view-border content-layout-color">

      <div class="content-layout-color center-horizontal">
        <a :href="url">
          <img :src="image" class="center-horizontal view-image"/>
        </a>
      </div>
      <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageView",

  props: {
    url: String,
    image: String,
    pluginName: String,
  },
}
</script>

<style scoped>

</style>