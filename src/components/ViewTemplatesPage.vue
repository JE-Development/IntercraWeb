<template>

  <InformationView v-if="choosenView === 'informationView'"
                   :url="url"
                   :headline="headline"
                   :pluginName="pluginName"
                   :teaser="teaser"
  />
  <ArticleView v-else-if="choosenView === 'articleView'"
               :url="url"
               :headline="headline"
               :pluginName="pluginName"
               :teaser="teaser"
               :image="image"
               :date="date"
  />
  <ShoppingView v-else-if="choosenView === 'shoppingView'"
                :url="url"
                :headline="headline"
                :pluginName="pluginName"
                :price="price"
                :image="image"
  />
  <BandcampView v-else-if="choosenView === 'bandcampView'"
                :url="url"
                :headline="headline"
                :pluginName="pluginName"
                :image="image"
                :artist="artist"
                :release="release"
                :tags="tags"
                :genre="genre"
                :type="type"
  />



</template>

<script>
import InformationView from "./layouts/InformationView.vue";
import ArticleView from "./layouts/ArticleView.vue";
import ShoppingView from "./layouts/ShoppingView.vue";
import BandcampView from "./layouts/BandcampView.vue";
export default {
  name: "ViewTemplatesPage",
  components: {BandcampView, ShoppingView, ArticleView, InformationView},

  props: {
    choosenView: String,

    //multiple use props
    url: String,
    headline: String,
    pluginName: String,

    teaser: String,
    image: String,

    //article
    date: String,

    //shopping
    price: String,

    //bandcamp
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