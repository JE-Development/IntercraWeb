<template>
  <div class="button-layout display-flex">
    <div class="center-horizontal full-center">
      <button class="preset-border preset-border-color text-black" @click="onClickButton">{{buttonName}}</button>
      <div class="dropdown-content" v-if="showList">
        <a @click="onClickPresetItem(pk)" class="pointer" v-for="(pk) in presetKeys"><p class="white">{{pk}}</p></a>
      </div>
      <img src="../../assets/settings-anim.gif" class="settings-icon pointer" @click="settingsClicked">
    </div>
  </div>
</template>

<script>
import {PresetController} from "../intercraSystemCode/controllers/PresetController";
import {PluginController} from "../intercraSystemCode/controllers/PluginController";
import EventBus from "../intercraSystemCode/classes/EventBusEvent";

export default {
  name: "PresetView",

  data() {
    return {
      arrayOfObjects: [],
      object: {
        name: 'Object Name',
      },
      buttonName: "custom preset",
      showList: false,
      presetKeys: [],
    }
  },

  created() {
    let presetController = new PresetController();
    this.presetKeys = presetController.getAllPresetValues()

    EventBus.addEventListener('change-preset-button-name', (event) => {
      this.buttonName = "custom preset"
      this.setCookies("preset-name", this.buttonName);
    })

    if(this.getCookies("preset-name") != null && this.getCookies("preset-name") !== this.buttonName){
      this.onClickPresetItem(this.getCookies("preset-name"));
    }
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
      this.setCookies("preset-name", item);

      this.buttonName = item;
      this.showList = false;
      let pc = new PluginController();
      let list = pc.getPluginsByPresetValue(item);
      if(item === "Enable All"){
        list = pc.getAllPluginsAsId();
      }
      EventBus.emit("change-plugins", list)
    },
    getCookies(key){
      return this.$cookies.get(key);
    },
    setCookies(key, value){
      if(this.isCookiesAllowed()){
        return this.$cookies.set(key, value, 2147483647);
      }
    },
    isCookiesAllowed(){
      let allow = this.getCookies("cookiesAllowed");
      if(allow == "false"){
        return false;
      }else if (allow == "true"){
        return true;
      }else{
        return null;
      }
    },
      settingsClicked(){
        EventBus.emit("open-settings")
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