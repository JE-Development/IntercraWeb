<template>
  <div class="button-layout">
    <div class="dropdown center-horizontal">
      <button class="preset-border preset-border-color" @click="onClickButton">custom preset</button>
      <div class="dropdown-content" v-if="showList">
        <a @click="onClickPresetItem(1)">Link 1</a>
        <a @click="onClickPresetItem(2)">Link 2</a>
        <a @click="onClickPresetItem(3)">Link 3</a>
        <a @click="onClickPresetItem(4)">Link 4</a>
        <a @click="onClickPresetItem(5)">Link 5</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PresetView",

  data() {
    return {
      arrayOfObjects: [],
      object: {
        name: 'Object Name',
      },
      showList: false,
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
      this.showList = false;
      console.log("click: " + item)
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