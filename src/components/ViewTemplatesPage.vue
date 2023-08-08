<template>

  <InformationView v-if="choosenView === 'informationView'"
                   :index="index"
                   :savedContent="savedContent"
                   :url="url"
                   :headline="headline"
                   :pluginName="pluginName"
                   :teaser="teaser"
                   :isResult="isResult"
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
               :scaleIndex="scaleIndex"
               :isResult="isResult"
  />
  <ShoppingView v-else-if="choosenView === 'shoppingView'"
                :index="index"
                :savedContent="savedContent"
                :url="url"
                :headline="headline"
                :pluginName="pluginName"
                :price="price"
                :image="image"
                :isResult="isResult"
                :author="author"
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
                :isResult="isResult"
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
                 :isResult="isResult"
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
                       :isResult="isResult"
  />
  <ImageView v-else-if="choosenView === 'imageView'"
             :index="index"
             :savedContent="savedContent"
             :url="url"
             :pluginName="pluginName"
             :image="image"
             :headline="headline"
             :scaleIndex="scaleIndex"
             :isResult="isResult"
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
               :preview="preview"
               :isResult="isResult"
  />
  <GithubView v-else-if="choosenView === 'githubView'"
              :index="index"
              :savedContent="savedContent"
              :url="url"
              :headline="headline"
              :pluginName="pluginName"
              :teaser="teaser"
              :lang="lang"
              :isResult="isResult"
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
              :isResult="isResult"
  />
  <ITunesPreviewView v-else-if="choosenView === 'itunesPreviewView'"
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
                    :preview="preview"
                    :isResult="isResult"
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
              :isResult="isResult"
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
                       :isResult="isResult"
  />
  <NewgroundsImageView v-else-if="choosenView === 'newgroundsImageView'"
                       :index="index"
                       :savedContent="savedContent"
                       :url="url"
                       :headline="headline"
                       :pluginName="pluginName"
                       :image="image"
                       :artist="artist"
                       :isResult="isResult"
  />
  <IconDownloadView v-else-if="choosenView === 'iconDownloadView'"
                    :index="index"
                    :savedContent="savedContent"
                    :pluginName="pluginName"
                    :image="image"
                    :sizes="sizes"
                    :vectorDownloadUrl="vectorDownloadUrl"
                    :isResult="isResult"
  />
  <ModView v-else-if="choosenView === 'modView'"
               :index="index"
               :savedContent="savedContent"
               :url="url"
               :headline="headline"
               :pluginName="pluginName"
               :teaser="teaser"
               :image="image"
               :downloads="downloads"
               :author="author"
               :scaleIndex="scaleIndex"
               :isResult="isResult"
               :categories="categories"
  />

    <AdsView v-else-if="choosenView === 'adsView'"
             :index="index"
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
import ITunesPreviewView from "./layouts/ITunesPreviewView.vue";
import ModelsView from "./layouts/ModelsView.vue";
import NewgroundsAudioView from "./layouts/NewgroundsAudioView.vue";
import NewgroundsImageView from "./layouts/NewgroundsImageView.vue";
import IconDownloadView from "./layouts/IconDownloadView.vue";
import ModView from "./layouts/ModView.vue";
import AdsView from "./layouts/AdsView.vue";
export default {
  name: "ViewTemplatesPage",
  components: {
      AdsView,
    ModView,
    IconDownloadView,
    NewgroundsImageView,
    NewgroundsAudioView,
    ModelsView,
    ITunesView,
    GithubView, BandcampView, ShoppingView, ArticleView, InformationView, PlayStoreView, PlayStoreNoIconView,
    ImageView, SpotifyView, ITunesPreviewView},
  props: {
    index: Number,
    choosenView: String,
    savedContent: Boolean,
      isResult: Boolean,

    //multiple use props

    url: String,
    headline: String,
    pluginName: String,
    teaser: String,
    image: String,
    scaleIndex:String,
    error: String,

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
    preview: String,

    //GitHub

    lang: String,

    //icon

    sizes: String,
    vectorDownloadUrl: String,

    //mods

    downloads: String,
    categories: String,


  },
}
</script>

<style scoped>
</style>