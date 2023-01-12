<template>
  <div class="center-horizontal">
    <div class="view-border content-layout-color">

      <div class="content-layout-color center-horizontal">
        <a :href="url" class="headline-color"><img :src="image" class="center-horizontal view-image"/></a>
      </div>
      <h3 class="complementary-color bold">{{type}}</h3>
      <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
      <h3 class="teaser-color">{{artist}}</h3>
      <h4 class="teaser-color">{{release}}</h4>
      <h4 class="teaser-color">{{tags}}</h4>
      <h4 class="teaser-color">{{genre}}</h4>
      <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BandcampView",

  props: {
    url: String,
    headline: String,
    pluginName: String,
    image: String,
    artist: String,
    release: String,
    tags: String,
    genre: String,
    type: String,
  },
}
</script>

<style scoped>

</style>