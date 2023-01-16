<template>
  <div class="center-horizontal">
    <div class="view-border content-layout-color">

      <div class="content-layout-color center-horizontal">
        <a :href="url" class="headline-color"><img :src="image" class="center-horizontal view-image"/></a>
      </div>
      <h3 class="complementary-color bold">{{album}}</h3>
      <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
      <h3 class="teaser-color">{{artist}}</h3>
      <h4 class="teaser-color">{{duration}}</h4>
      <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpotifyView",

  props: {
    url: String,
    headline: String,
    pluginName: String,
    image: String,
    artist: String,
    duration: String,
    album: String,
  },
}
</script>

<style scoped>

</style>