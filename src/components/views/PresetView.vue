<template>
  <div class="button-layout">
    <div class="dropdown center-horizontal">
      <button class="preset-border">custom preset</button>
      <div class="dropdown-content">
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
      }
    }
  },

  methods: {
    onClickPreset(){

    },
    onClickPresetItem(item){
      console.log("click: " + item)
    }
  }
}
</script>

<style>

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  width: 400px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  margin-top: 56px;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #f1f1f1}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}
</style>