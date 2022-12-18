<template>


  <ViewTemplatesPage
      :choosen-view="'shoppingView'"
      :url="'test url'"
      :headline="'headline'"
      :plugin-name="'test plugin'"
      :price="'9€'"
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