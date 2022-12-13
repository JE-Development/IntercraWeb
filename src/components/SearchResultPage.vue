<script>
import {IntercraController} from "../components/intercraSystemCode/controllers/IntercraController"
import MoreContentButton from "../components/MoreContentButton.vue";

export default {
  name: "SearchResultPage",
  components: {MoreContentButton},
  data(){
    return {
      search: this.$route.params.search,
      plugin: this.$route.params.plugin,
      show: false
    };
  },
  mounted() {

    let ic = new IntercraController();
    ic.startSearch(this.search, this.plugin);

    ic.changeShow();

  },
  methods: {
    updateSearch: function (){
      this.show = true;
      console.log("hello in update: " + this.show);
    }
  }
}
</script>

<template>
  <div id="searchRoot">
    <div id="loading-result" class="center-horizontal">
      <img src="../assets/loading.gif" class="loading-image"/>
    </div>
  </div>
  <div id="more-content-button-root" class="center-horizontal">
    <MoreContentButton :show="show"/>
  </div>
</template>