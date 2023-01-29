<template>
  <div class="button-layout">
    <div class="dropdown center-horizontal">
      <button class="preset-border preset-border-color" @click="onClickButton">custom preset</button>
      <div class="dropdown-content" v-if="showList">
        <a @click="onClickPresetItem(pk)" v-for="(pk) in presetKeys">{{keyToValue(pk)}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import {PresetController} from "../intercraSystemCode/controllers/PresetController";
import {PresetEnum} from "../intercraSystemCode/enums/PresetEnum";

export default {
  name: "PresetView",

  data() {
    return {
      arrayOfObjects: [],
      object: {
        name: 'Object Name',
      },
      showList: false,
      presetKeys: [],
    }
  },

  created() {
    let presetController = new PresetController();
    this.presetKeys = presetController.getAllPresetKeys()
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },


  methods: {

    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.showList = false;
      }
    },

    keyToValue(key){
      let value = PresetEnum[key]
      return value;
    },

    onClickButton(){
      if(this.showList){
        this.showList = false;
      }else{
        this.showList = true;
      }
    },

    onClickPresetItem(itemKey){
      this.showList = false;
      console.log("click: " + itemKey)
    }
  },

  directives: {
    "click-outside": {
      bind(el, binding, vnode) {
        el.event = function(event) {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener("click", el.event);
      },
      unbind(el) {
        document.body.removeEventListener("click", el.event);
      }
    }
  }
}
</script>

<style>



</style>