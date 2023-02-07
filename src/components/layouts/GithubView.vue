<template>
  <div class="view-border content-layout-color">
    <div>
      <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
      <p class="text-black">{{teaser}}</p>
      <p class="teaser-color">{{lang}}</p>
      <p class="plugin-name-color view-plugin-name">Plugin: {{pluginName}}</p>
      <a @click="savedClick">save</a>
    </div>
  </div>
</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";

export default {
  name: "GithubView",

  props: {
    index: Number,
    url: String,
    headline: String,
    pluginName: String,
    teaser: String,
    lang: String,
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