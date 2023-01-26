<template>
  <div class="button-layout">
    <div class="dropdown center-horizontal">
      <button class="preset-border preset-border-color" @click="onClickButton">custom preset</button>
      <div class="dropdown-content" v-if="showList" >
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


  methods: {

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
}
</script>

<style>



</style>