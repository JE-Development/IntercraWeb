<template>
  <div class="center-horizontal">
    <div class="view-border content-layout-color">
      <a href="{{url}}" class="visible-link-color">{{url}}</a>
      <h2><a href="{{url}}" class="headline-color">{{headline}}</a></h2>
      <p class="teaser-color">{{teaser}}</p>
      <p class="plugin-name-color view-plugin-name">Plugin: {{pluginName}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InformationView",

  props: {
    url: String,
    headline: String,
    pluginName: String,
    teaser: String,
  },
}
</script>

<style scoped>

</style>