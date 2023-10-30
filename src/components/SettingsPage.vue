<template>
<div class="center-horizontal opacity-fade-in">
  <YesNoPopup :show="showPopup" :onPositive="yesClicked" :onNegative="noClicked">
    <div class="center-horizontal">
      <h2>Do you want to remove this plugin from this preset?</h2>
    </div>
  </YesNoPopup>
    <PluginListPopup :show="showPlPopup" :onClose="onPlPopupClose">

        <div class="outer-scroll plugin-list-popup" style="height: 90vh">
            <div>
                <div v-for="(pl, index) in otherPlugins">
                    <a class="pointer plugin-list-popup-item center-horizontal" @click="onPluginClick(index)">
                        {{pl}}
                    </a>
                </div>
            </div>
        </div>
    </PluginListPopup>
  <div>
    <SettingsPresetView/>
    <div class="white-border" v-if="activePlugins.length > 0">
        <div class="white-border-button center-horizontal pointer" @click="addButtonClicked">
            <h2 class="headline-color">Add Plugin</h2>
        </div>
      <div v-if="activePlugins.length > 1">
          <PluginSettings
                  v-for="(pl) in activePlugins"
                  :name="pl"
                  :onRemove="removeClicked"
                  :showRemove="true"
          />
      </div>
        <div v-else>
            <PluginSettings
                    :name="activePlugins[0]"
                    :onRemove="removeClicked"
                    :showRemove="false"
            />
        </div>
    </div>
  </div>
</div>
</template>

<script>

import SettingsPresetView from "./views/SettingsPresetView.vue";
import EventBus from "./intercraSystemCode/classes/EventBusEvent";
import PluginSettings from "./views/PluginSettings.vue";
import {PluginController} from "./intercraSystemCode/controllers/PluginController";
import YesNoPopup from "./views/YesNoPopup.vue";
import CustomPopup from "./views/CustomPopup.vue";
import PluginListPopup from "./views/PluginListPopup.vue";
import MainNav from "./views/MainNav.vue";

export default {
  name: "SettingsPage",
  components: {MainNav, PluginListPopup, CustomPopup, YesNoPopup, SettingsPresetView, PluginSettings},

  created() {
    EventBus.addEventListener('display-plugins', (event) => {
      this.activePlugins = []
      let pc = new PluginController()
      this.apid = event.data
      for(let i = 0; i < this.apid.length; i++){
        let name = pc.getNameFromId(this.apid[i])
        this.activePlugins.push(name)
      }
    })

      EventBus.addEventListener('choosen-preset-name', (event) => {
          this.presetName = event.data
      })
  },

  mounted() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  },

  data(){
    return{
      activePlugins: [],
      showPopup: false,
        apid: [],
        clickedName: "",
        presetName: "",
        showPlPopup: false,
        otherPlugins: [],
        opid: [],
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
    yesClicked(){
        let name = this.clickedName
        this.showPopup = false
        let pc = new PluginController()
        let id = pc.getIdFromName(name)
        let presetValues = "null"
        for(let i = 0; i < this.apid.length; i++){
            if(id !== this.apid[i]){
                if(presetValues === "null"){
                    presetValues = this.apid[i]
                }else{
                    presetValues = presetValues + "---" + this.apid[i]
                }
            }
        }
        this.setCookies("mod-preset-" + this.presetName.replace(" ", "_"), presetValues)
        let modPresets = this.getCookies("modified-presets")
        if(modPresets === null){
            this.setCookies("modified-presets", this.presetName.replace(" ", "_"))
        }else{
            if(!modPresets.includes(this.presetName)){
                this.setCookies("modified-presets", modPresets + "---" + this.presetName.replace(" ", "_"))
            }
        }

        this.activePlugins = []
        this.apid = pc.getPluginsByPresetValue(this.presetName)
        for(let i = 0; i < this.apid.length; i++){
            let name = pc.getNameFromId(this.apid[i])
            this.activePlugins.push(name)
        }

    },
    noClicked(){
      this.showPopup = false
    },
      removeClicked(name){
        this.showPopup = true
          this.clickedName = name

      },
      addButtonClicked(){
        let pl = this.getPluginsNotInPreset();
          this.showPlPopup = true;
      },
      onPlPopupClose(){
        this.showPlPopup = false;
      },
      getPluginsNotInPreset(){
        this.otherPlugins = []
          this.opid = []

        let pc = new PluginController();
        let list = pc.getAllPluginsAsId();
        for(let i = 0; i < list.length; i++){
            let duplicate = false
            for(let j = 0; j < this.apid.length; j++){
                if(list[i] === this.apid[j]){
                    duplicate = true;
                    break;
                }
            }
            if(!duplicate){
                this.otherPlugins.push(pc.getNameFromId(list[i]))
                this.opid.push(list[i])
            }
        }

      },
      onPluginClick(index){
        this.showPlPopup = false
          let pc = new PluginController()

        let presetValues = this.opid[index]
          for(let i = 0; i < this.apid.length; i++){
              presetValues = presetValues + "---" + this.apid[i]
          }
          this.setCookies("mod-preset-" + this.presetName.replace(" ", "_"), presetValues)
          let modPresets = this.getCookies("modified-presets")
          if(modPresets === null){
              this.setCookies("modified-presets", this.presetName.replace(" ", "_"))
          }else{
              if(!modPresets.includes(this.presetName)){
                  this.setCookies("modified-presets", modPresets + "---" + this.presetName.replace(" ", "_"))
              }
          }

          this.activePlugins = []
          this.apid = pc.getPluginsByPresetValue(this.presetName)
          for(let i = 0; i < this.apid.length; i++){
              let name = pc.getNameFromId(this.apid[i])
              this.activePlugins.push(name)
          }
      }
  },

}
</script>