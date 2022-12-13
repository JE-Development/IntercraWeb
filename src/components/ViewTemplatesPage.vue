<template>

  <div class="plugin-view">
    <input type="checkbox" class="check-box" id="plug1" name="p1" value="PluginName">
    <label for="plug1" class="check-box-label">This is a long website name</label><br>
  </div>

  <div class="center-horizontal">
    <div class="view-border content-layout-color">
      <a href=";;;href;;;" class="visible-link-color">;;;url;;;</a>
      <h2><a href=";;;hrefHead;;;" class="headline-color">;;;headline;;;</a></h2>
      <p class="teaser-color">;;;teaser;;;</p>
      <p class="plugin-name-color view-plugin-name">Plugin: ;;;plugin-name;;;</p>
    </div>
  </div>

  <div class="center-horizontal">
    <div class="view-border content-layout-color">

      <div class="view-border content-layout-color center-horizontal">
        <img src="../assets/sample-product-image.png" class="center-horizontal view-image"/>
      </div>
      <h2><a href=";;;hrefHead;;;" class="headline-color">;;;headline;;;</a></h2>
      <p class="text-black">;;;teaser;;;</p>
      <p class="teaser-color">;;;date;;;</p>
      <p class="plugin-name-color  view-plugin-name">Plugin: ;;;plugin-name;;;</p>
    </div>
  </div>

  <div class="center-horizontal">
    <div class="view-border content-layout-color">

      <div class="view-border content-layout-color center-horizontal">
        <img src="../assets/sample-product-image.png" class="center-horizontal view-image"/>
      </div>
      <h2><a href=";;;hrefHead;;;" class="headline-color">;;;headline;;;</a></h2>
      <h3>;;;price;;;</h3>
      <p class="plugin-name-color  view-plugin-name">Plugin: ;;;plugin-name;;;</p>
    </div>
  </div>

  <div class="center-horizontal">
    <div class="view-border content-layout-color">

      <div class="view-border content-layout-color center-horizontal">
        <img src="../assets/sample-product-image.png" class="center-horizontal view-image"/>
      </div>
      <h3 class="complementary-color bold">;;;type;;;</h3>
      <h2><a href=";;;hrefHead;;;" class="headline-color">;;;headline;;;</a></h2>
      <h3 class="teaser-color">;;;artist;;;</h3>
      <h4 class="teaser-color">;;;release;;;</h4>
      <h4 class="teaser-color">;;;tags;;;</h4>
      <h4 class="teaser-color">;;;genre;;;</h4>
      <p class="plugin-name-color  view-plugin-name">Plugin: ;;;plugin-name;;;</p>
    </div>
  </div>

</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
export default {
  name: "ViewsPage",
  components: {FontAwesomeIcon}
}
</script>

<style scoped>

</style>