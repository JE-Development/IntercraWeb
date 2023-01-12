<template>
  <div class="center-horizontal">
    <div class="view-border content-layout-color">

      <div class="content-layout-color center-horizontal">
        <a :href="url" class="headline-color"><img :src="image" class="center-horizontal view-image"/></a>
      </div>
      <h2><a :href="url" class="headline-color">{{headline}}</a></h2>
      <h3>{{price}}</h3>
      <p class="plugin-name-color  view-plugin-name">Plugin: {{pluginName}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppingView",

  props: {
    url: String,
    headline: String,
    pluginName: String,
    image: String,
    price: String,
  },
}
</script>

<style scoped>

</style>