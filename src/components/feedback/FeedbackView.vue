<template>
  <div class="feedback-view-border content-layout-color">
    <div style="overflow: hidden">
      <p class="visible-link-color" style="overflow: hidden">{{username}}</p>
      <h2 :class="'feedback-code-color-' + status">{{headline}}</h2>
      <p class="teaser-color">{{teaser}}</p>
    </div>
  </div>
</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import SavedIconView from "../views/SavedIconView.vue";

export default {
  name: "FeedbackView",
    components: {SavedIconView},

    /*
    status code:
    0: denied
    1: pending approval
    2: approved, coming soon
    3: is now implemented
     */

  props: {
    username: String,
    headline: String,
    teaser: String,
      status: Number
  },


    methods: {

  }
}
</script>

<style scoped>

</style>