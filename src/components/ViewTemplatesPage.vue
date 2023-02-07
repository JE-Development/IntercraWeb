<template>

  <InformationView v-if="choosenView === 'informationView'"
                   :index="index"
                   :url="url"
                   :headline="headline"
                   :pluginName="pluginName"
                   :teaser="teaser"
  />
  <ArticleView v-else-if="choosenView === 'articleView'"
               :index="index"
               :url="url"
               :headline="headline"
               :pluginName="pluginName"
               :teaser="teaser"
               :image="image"
               :date="date"
               :platform="platform"
  />
  <ShoppingView v-else-if="choosenView === 'shoppingView'"
                :index="index"
                :url="url"
                :headline="headline"
                :pluginName="pluginName"
                :price="price"
                :image="image"
  />
  <BandcampView v-else-if="choosenView === 'bandcampView'"
                :index="index"
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
                 :index="index"
                 :url="url"
                 :headline="headline"
                 :pluginName="pluginName"
                 :publisher="publisher"
                 :image="image"
                 :appIcon="appIcon"
  />
  <PlayStoreNoIconView v-else-if="choosenView === 'playStoreNoIconView'"
                 :index="index"
                 :url="url"
                 :headline="headline"
                 :pluginName="pluginName"
                 :publisher="publisher"
                 :image="image"
  />
  <ImageView v-else-if="choosenView === 'imageView'"
                 :index="index"
                 :url="url"
                 :pluginName="pluginName"
                 :image="image"
  />
  <SpotifyView v-else-if="choosenView === 'spotifyView'"
                 :index="index"
                 :url="url"
                 :headline="headline"
                 :pluginName="pluginName"
                 :image="image"
                 :artist="artist"
                 :duration="duration"
                 :album="album"
  />
  <GithubView v-else-if="choosenView === 'githubView'"
              :index="index"
              :url="url"
              :headline="headline"
              :pluginName="pluginName"
              :teaser="teaser"
              :lang="lang"
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
import GithubView from "./layouts/GithubView.vue";
export default {
  name: "ViewTemplatesPage",
  components: {
    GithubView, BandcampView, ShoppingView, ArticleView, InformationView, PlayStoreView, PlayStoreNoIconView,
    ImageView, SpotifyView},

  props: {
    index: Number,
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

    //GitHub
    lang: String,
  },
}
</script>

<style scoped>

</style>