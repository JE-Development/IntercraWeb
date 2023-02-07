<template>
  <div class="view-border content-layout-color">
    <div>

      <div class="content-layout-color center-horizontal">
        <a :href="url" class="headline-color"><img :src="image" class="center-horizontal view-image"/></a>
      </div>
      <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
      <h3 class="complementary-color bold">{{platform}}</h3>
      <h3 class="text-black">{{teaser}}</h3>
      <h4 class="teaser-color">{{date}}</h4>
      <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>
      <a @click="savedClick">save</a>
    </div>
  </div>
</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";

export default {
  name: "ArticleView",
  props: {
    index: Number,
    url: String,
    headline: String,
    pluginName: String,
    teaser: String,
    image: String,
    date: String,
    platform: String,
  },

  methods: {
    savedClick(){
      EventBus.emit("save-result", this.index)
    }
  }

}
</script>

<style scoped>

</style>