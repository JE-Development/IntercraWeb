<template>
  <div class="center-horizontal">
    <div class="view-border content-layout-color">

      <div class="content-layout-color center-horizontal">
        <a :href="url" class="headline-color"><img :src="image" class="center-horizontal view-image"/></a>
      </div>
      <div class="display-flex">
        <div class="app-content-width">
          <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
          <h3>{{publisher}}</h3>
          <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>
        </div>
        <div class="icon-view">
          <img :src="appIcon" class="play-store-icon-image"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "PlayStoreView",

  props: {
    url: String,
    headline: String,
    pluginName: String,
    image: String,
    appIcon: String,
    publisher: String,
  },
}
</script>

<style scoped>

</style>