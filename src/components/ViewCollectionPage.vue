<template>


  <ViewTemplatesPage
      :choosen-view="'modView'"
      :index="0"
      :savedContent="false"
      :pluginName="'pluginName'"
      :headline="'cool minecraft mod'"
      :teaser="'this is a very cool minecraft mod'"
      :image="'https://play-lh.googleusercontent.com/P2VMEenhpIsubG2oWbvuLGrs0GyyzLiDosGTg8bi8htRXg9Uf0eUtHiUjC28p1jgHzo'"
      :author="'jason enns'"
      :downloads="'500'"
      :categories="'world, generation, tools, shooting'"
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