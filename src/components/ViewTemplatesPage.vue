<template>

  <InformationView v-if="choosenView === 'informationView'"
                   :index="index"
                   :savedContent="savedContent"
                   :url="url"
                   :headline="headline"
                   :pluginName="pluginName"
                   :teaser="teaser"
  />
  <ArticleView v-else-if="choosenView === 'articleView'"
               :index="index"
               :savedContent="savedContent"
               :url="url"
               :headline="headline"
               :pluginName="pluginName"
               :teaser="teaser"
               :image="image"
               :date="date"
               :platform="platform"
               :author="author"
  />
  <ShoppingView v-else-if="choosenView === 'shoppingView'"
                :index="index"
                :savedContent="savedContent"
                :url="url"
                :headline="headline"
                :pluginName="pluginName"
                :price="price"
                :image="image"
  />
  <BandcampView v-else-if="choosenView === 'bandcampView'"
                :index="index"
                :savedContent="savedContent"
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
                 :savedContent="savedContent"
                 :url="url"
                 :headline="headline"
                 :pluginName="pluginName"
                 :publisher="publisher"
                 :image="image"
                 :appIcon="appIcon"
  />
  <PlayStoreNoIconView v-else-if="choosenView === 'playStoreNoIconView'"
                       :index="index"
                       :savedContent="savedContent"
                       :url="url"
                       :headline="headline"
                       :pluginName="pluginName"
                       :publisher="publisher"
                       :image="image"
                       :price="price"
  />
  <ImageView v-else-if="choosenView === 'imageView'"
             :index="index"
             :savedContent="savedContent"
             :url="url"
             :pluginName="pluginName"
             :image="image"
             :headline="headline"
             :scaleIndex="scaleIndex"
  />
  <SpotifyView v-else-if="choosenView === 'spotifyView'"
               :index="index"
               :savedContent="savedContent"
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
              :savedContent="savedContent"
              :url="url"
              :headline="headline"
              :pluginName="pluginName"
              :teaser="teaser"
              :lang="lang"
  />
  <ITunesView v-else-if="choosenView === 'itunesView'"
              :index="index"
              :savedContent="savedContent"
              :url="url"
              :headline="headline"
              :pluginName="pluginName"
              :image="image"
              :artist="artist"
              :type="type"
              :price="price"
              :scaleIndex="scaleIndex"
  />
  <ModelsView v-else-if="choosenView === 'modelsView'"
              :index="index"
              :savedContent="savedContent"
              :url="url"
              :headline="headline"
              :pluginName="pluginName"
              :image="image"
              :artist="artist"
              :type="type"
              :price="price"
  />
  <NewgroundsAudioView v-else-if="choosenView === 'newgroundsAudioView'"
               :index="index"
               :savedContent="savedContent"
               :url="url"
               :headline="headline"
               :pluginName="pluginName"
               :teaser="teaser"
               :image="image"
               :genre="genre"
               :artist="artist"
  />
  <NewgroundsImageView v-else-if="choosenView === 'newgroundsImageView'"
               :index="index"
               :savedContent="savedContent"
               :url="url"
               :headline="headline"
               :pluginName="pluginName"
               :image="image"
               :artist="artist"
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
import ITunesView from "./layouts/ITunesView.vue";
import ModelsView from "./layouts/ModelsView.vue";
import NewgroundsAudioView from "./layouts/NewgroundsAudioView.vue";
import NewgroundsImageView from "./layouts/NewgroundsImageView.vue";
export default {
  name: "ViewTemplatesPage",
  components: {
    NewgroundsImageView,
    NewgroundsAudioView,
    ModelsView,
    ITunesView,
    GithubView, BandcampView, ShoppingView, ArticleView, InformationView, PlayStoreView, PlayStoreNoIconView,
    ImageView, SpotifyView},
  props: {
    index: Number,
    choosenView: String,
    savedContent: Boolean,

    //multiple use props

    url: String,
    headline: String,
    pluginName: String,
    teaser: String,
    image: String,
    scaleIndex:String,

    //article

    date: String,
    platform: String,
    author: String,

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