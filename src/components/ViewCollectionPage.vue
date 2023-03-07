<template>


  <ViewTemplatesPage
      :choosen-view="'newgroundsAudioView'"
      :index="1"
      :savedContent="false"
      :url="'https://www.google.com'"
      :headline="'test headline'"
      :pluginName="'internal plugin'"
      :teaser="'this is a teaser'"
      :image="'https://img.ngfiles.com/defaults/icon-audio-smaller.png?f1578181335'"
      :genre="'genre'"
      :artist="'artist'"
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