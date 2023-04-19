<template>


  <ViewTemplatesPage
      :choosen-view="'spotifyView'"
      :index="0"
      :savedContent="false"
      :url="''"
      :headline="'headline'"
      :pluginName="'pluginName'"
      :image="'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png'"
      :artist="'artist'"
      :duration="'0:00'"
      :album="'album'"
  />


</template>

<script>
import ViewTemplatesPage from "./ViewTemplatesPage.vue";
export default {
  name: "ViewCollectionPage",
  components: {ViewTemplatesPage},

}
</script>

<style scoped>

</style>