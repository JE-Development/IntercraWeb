<template>

  <InformationView v-if="choosenView === 'informationView'"/>
  <ArticleView v-else-if="choosenView === 'articleView'"/>
  <ShoppingView v-else-if="choosenView === 'shoppingView'"/>
  <BandcampView v-else-if="choosenView === 'bandcampView'"/>

</template>

<script>
import InformationView from "./layouts/InformationView.vue";
import ArticleView from "./layouts/ArticleView.vue";
import ShoppingView from "./layouts/ShoppingView.vue";
import BandcampView from "./layouts/BandcampView.vue";
export default {
  name: "ViewsPage",
  components: {BandcampView, ShoppingView, ArticleView, InformationView}

  props: {
    choosenView: String,
  },
}
</script>

<style scoped>

</style>