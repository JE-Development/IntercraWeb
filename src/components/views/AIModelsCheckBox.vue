<template>
  <div class="plugin-view" style="margin-left: 20px">
    <input type="checkbox" class="check-box" :id="'plug-' + title" name="p1" value="PluginName" @click="$emit('click')" :checked="check">
    <div>
      <label :for="'plug-' + title" class="check-box-label check-box-text">{{title}}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "AIModelCheckBox",

  props: {
    title: String,
    check: Boolean,
  },
  emits: ['click']
}
</script>