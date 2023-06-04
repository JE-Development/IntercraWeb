<template>
  <div class="button-layout display-flex">
    <div class="center-horizontal">
      <button class="preset-border preset-border-color text-black" @click="onClickButton">{{buttonName}}</button>
      <div class="dropdown-content dropdown-settings" v-if="showList">
        <a @click="onClickPresetItem(pk)" class="pointer" v-for="(pk) in presetKeys"><p class="white">{{pk}}</p></a>
      </div>
    </div>
  </div>
</template>

<script>
import {PluginController} from "../intercraSystemCode/controllers/PluginController";
import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import {PresetController} from "../intercraSystemCode/controllers/PresetController";

export default {
  name: "SettingsPresetView",

  data() {
    return {
      arrayOfObjects: [],
      object: {
        name: 'Object Name',
      },
      buttonName: "nothing selected",
      showList: false,
      presetKeys: [],
    }
  },

  created() {
    let presetController = new PresetController();
    let keys = presetController.getAllPresetValues()
      let normalKeys = []
      for(let i = 0; i < keys.length; i++){
          if(keys[i] !== "Enable All"){
              if(keys[i] !== "Disable All"){
                  normalKeys.push(keys[i])
              }
          }
      }
      this.presetKeys = normalKeys

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

    onClickButton(){
      if(this.showList){
        this.showList = false;
      }else{
        this.showList = true;
      }
    },

    onClickPresetItem(item){
        EventBus.emit("choosen-preset-name", item)
      this.buttonName = item;
      this.showList = false;
      let pc = new PluginController();
      let list = pc.getPluginsByPresetValue(item);
      if(item === "Enable All"){
        list = pc.getAllPluginsAsId();
      }
      EventBus.emit("display-plugins", list)
    },
    getCookies(key){
      return this.$cookies.get(key);
    },
    setCookies(key, value){
      if(true){
        return this.$cookies.set(key, value, 2147483647);
      }
    },
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