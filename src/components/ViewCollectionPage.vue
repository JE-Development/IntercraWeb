<template>


  <ViewTemplatesPage
      :choosen-view="'iconDownloadView'"
      :index="0"
      :savedContent="false"
      :pluginName="'pluginName'"
      :image="'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png'"
      :sizes="'1,2,3,4,5,6,7,8,9'"
      :vectorDownloadUrl="''"
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