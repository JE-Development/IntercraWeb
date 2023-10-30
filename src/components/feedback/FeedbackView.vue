<template>
  <div class="feedback-view-border content-layout-color">
    <div style="overflow: hidden">
      <a class="error-color pointer" v-if="isUserView" style="overflow: hidden" @click="deleteClicked">delete</a>
      <p class="visible-link-color" style="overflow: hidden">{{username}}</p>
      <h2 :class="'feedback-code-color-' + status">{{headline}}</h2>
      <p class="white">{{teaser}}</p>
    </div>
  </div>
</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import SavedIconView from "../views/SavedIconView.vue";
import {FirebaseController} from "../intercraSystemCode/controllers/FirebaseController";

export default {
  name: "FeedbackView",
    components: {SavedIconView},

    /*
    status code:
    0: denied
    1: pending approval
    2: approved, coming soon
    3: implemented
     */

  props: {
    username: String,
    headline: String,
    teaser: String,
      status: String,
    isUserView: Boolean,
    id: String,
    onDeleteCallback: {
      type: Function,
    },
  },


    methods: {

    deleteClicked(){
      let fc = new FirebaseController()
      fc.deletePost(this.id)
      this.onDeleteCallback()
    }

  }
}
</script>

<style scoped>

</style>