<template>
  <div class="plugin-view">
    <input type="checkbox" class="check-box" :id="'plug-' + title" name="p1" value="PluginName" @click="$emit('click')" v-if="check === 'true'" checked>
    <input type="checkbox" class="check-box" :id="'plug-' + title" name="p1" value="PluginName" @click="$emit('click')" v-else>
    <label :for="'plug-' + title" class="check-box-label check-box-text">{{title}}</label><br>
  </div>
</template>

<script>
export default {
  name: "PluginCheckBox",

  props: {
    title: String,
    check: String,
    hasSettings: String,
  },
  emits: ['click']
}
</script>

<style lang="scss">
</style>