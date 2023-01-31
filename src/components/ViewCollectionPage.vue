<template>


  <ViewTemplatesPage
      :choosen-view="'githubView'"
      :url="'test url'"
      :headline="'headline'"
      :plugin-name="'test plugin'"
      :teaser="'teaser'"
      :lang="'lang'"
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