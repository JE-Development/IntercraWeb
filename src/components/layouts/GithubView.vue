<template>
  <div class="center-horizontal">
    <div class="view-border content-layout-color">
      <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
      <p class="text-black">{{teaser}}</p>
      <p class="teaser-color">{{lang}}</p>
      <p class="plugin-name-color view-plugin-name">Plugin: {{pluginName}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GithubView",

  props: {
    url: String,
    headline: String,
    pluginName: String,
    teaser: String,
    lang: String,
  },
}
</script>

<style scoped>

</style>