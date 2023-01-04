<template>
  <div class="center-horizontal">
    <div class="view-border content-layout-color">

      <div class="view-border content-layout-color center-horizontal">
        <img :src="image" class="center-horizontal view-image"/>
      </div>
      <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
      <h3 class="text-black">{{teaser}}</h3>
      <h4 class="teaser-color">{{date}}</h4>
      <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleView",
  props: {
    url: String,
    headline: String,
    pluginName: String,
    teaser: String,
    image: String,
    date: String,
  },

}
</script>

<style scoped>

</style>