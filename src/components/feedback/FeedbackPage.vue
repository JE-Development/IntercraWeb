<template>
    <div class="center-horizontal">
      <div>
        <div>

            <div class="center-horizontal">
                <h2>
                    <span class="feedback-code-color-0">denied</span> |
                    <span class="feedback-code-color-1">pending approval</span> |
                    <span class="feedback-code-color-2">approved, comming soon</span> |
                    <span class="feedback-code-color-3">is now implemented</span>
                </h2>
            </div>

          <div class="feedback-page">
            <div class="feedback-grid center-horizontal">


              <FeedbackView
                      :headline="'more plugins'"
                      :teaser="'i wish this search engine has more plugins as amazon or something else'"
                      :status="0"
                      :username="'jason00'"
              />




            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>


import {PluginController} from "../intercraSystemCode/controllers/PluginController";
import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import {IntercraController} from "../intercraSystemCode/controllers/IntercraController";
import FeedbackView from "./FeedbackView.vue";

export default {
  name: "FeedbackPage",
    components: {FeedbackView},

  created() {

  },

  beforeDestroy() {
  },

  mounted() {

  },

  data(){
    return{

    }
  },

  methods: {
    getCookies(key){
      return this.$cookies.get(key);
    },
    setCookies(key, value){
      if(true){
        return this.$cookies.set(key, value, 2147483647);
      }
    },
  },

}
</script>