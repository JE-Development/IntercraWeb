<template>
  <div class="plugin-view" style="margin-left: 20px">
    <input type="checkbox" class="check-box" :id="'plug-' + title" name="p1" value="PluginName" @click="$emit('click')" v-if="check === 'true'" checked>
    <input type="checkbox" class="check-box" :id="'plug-' + title" name="p1" value="PluginName" @click="$emit('click')" v-else>
    <div>
      <label :for="'plug-' + title" class="check-box-label check-box-text">{{title}}</label>
      <p class="decent-color preset-text decent-text">{{preset.join(" ,")}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PluginCheckBox",

  props: {
    title: String,
    check: String,
    hasSettings: String,
    preset: Array
  },
  emits: ['click']
}
</script>

<style lang="scss">
</style>