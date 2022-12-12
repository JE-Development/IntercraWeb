<template>
  <div class="plugin-view">
    <input type="checkbox" class="check-box" id="plug1" name="p1" value="PluginName" @click="$emit('click')" v-if="check === 'true'" checked>
    <input type="checkbox" class="check-box" id="plug1" name="p1" value="PluginName" @click="$emit('click')" v-else>
    <label for="plug1" class="check-box-label">{{title}}</label><br>
  </div>
</template>

<script>
export default {
  name: "PluginCheckBox",

  props: ['title', 'check'],
  emits: ['click']
}
</script>

<style lang="scss">
</style>