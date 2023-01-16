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
               :platform="platform"
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
  <PlayStoreView v-else-if="choosenView === 'playStoreView'"
                :url="url"
                :headline="headline"
                :pluginName="pluginName"
                :publisher="publisher"
                :image="image"
                :appIcon="appIcon"
  />
  <PlayStoreNoIconView v-else-if="choosenView === 'playStoreNoIconView'"
                 :url="url"
                 :headline="headline"
                 :pluginName="pluginName"
                 :publisher="publisher"
                 :image="image"
  />
  <ImageView v-else-if="choosenView === 'imageView'"
                 :url="url"
                 :pluginName="pluginName"
                 :image="image"
  />
  <SpotifyView v-else-if="choosenView === 'spotifyView'"
                 :url="url"
                 :headline="headline"
                 :pluginName="pluginName"
                 :image="image"
                 :artist="artist"
                 :duration="duration"
                 :album="album"
  />




</template>

<script>
import InformationView from "./layouts/InformationView.vue";
import ArticleView from "./layouts/ArticleView.vue";
import ShoppingView from "./layouts/ShoppingView.vue";
import BandcampView from "./layouts/BandcampView.vue";
import PlayStoreView from "./layouts/PlayStoreView.vue";
import PlayStoreNoIconView from "./layouts/PlayStoreNoIconView.vue";
import ImageView from "./layouts/ImageView.vue";
import SpotifyView from "./layouts/SpotifyView.vue";
export default {
  name: "ViewTemplatesPage",
  components: {BandcampView, ShoppingView, ArticleView, InformationView, PlayStoreView, PlayStoreNoIconView,
    ImageView, SpotifyView},

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
    platform: String,

    //shopping
    price: String,

    //bandcamp
    artist: String,
    release: String,
    tags: String,
    genre: String,
    type: String,

    //play store
    publisher: String,
    appIcon: String,

    //spotify
    album: String,
    duration: String,
  },
}
</script>

<style scoped>

</style>