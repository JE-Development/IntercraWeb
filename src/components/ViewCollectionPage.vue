<template>


  <ViewTemplatesPage
      :choosen-view="'playStoreView'"
      :url="'test url'"
      :headline="'headline'"
      :plugin-name="'test plugin'"
      :publisher="'LeCraftJay'"
      :image="'https://intercra.com/assets/intercra-text.ee327ec2.png'"
      :appIcon="'https://intercra.com/assets/intercra-logo.png'"
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