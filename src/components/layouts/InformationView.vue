<template>
  <div class="view-border content-layout-color">
    <div>
      <a :href="url" class="visible-link-color">{{url}}</a>
      <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
      <p class="teaser-color">{{teaser}}</p>
      <p class="plugin-name-color view-plugin-name">Plugin: {{pluginName}}</p>
      <a @click="savedClick">save</a>
    </div>
  </div>
</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";

export default {
  name: "InformationView",

  props: {
    index: Number,
    url: String,
    headline: String,
    pluginName: String,
    teaser: String,
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