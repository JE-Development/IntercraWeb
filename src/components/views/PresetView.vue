<template>
  <div class="button-layout">
    <div class="dropdown center-horizontal">
      <button class="preset-border preset-border-color" @click="onClickButton">{{buttonName}}</button>
      <div class="dropdown-content" v-if="showList">
        <a @click="onClickPresetItem(pk)" v-for="(pk) in presetKeys">{{pk}}</a>
      </div>
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
      console.log("is custom")
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
        return this.$cookies.set(key, value);
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