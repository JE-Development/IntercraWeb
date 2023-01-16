<template>


  <ViewTemplatesPage
      :choosen-view="'spotifyView'"
      :url="'test url'"
      :headline="'headline'"
      :plugin-name="'test plugin'"
      :artist="'LeCraftJay'"
      :duration="'00:00'"
      :album="'The best album'"
      :image="'https://intercra.com/assets/intercra-text.ee327ec2.png'"
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