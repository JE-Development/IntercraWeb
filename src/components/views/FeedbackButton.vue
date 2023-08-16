
<template>
  <div class="button-layout">
      <button class="feed-button center-horizontal" @click="handleClick()">
        <p class="text-black main-button-text">Suggestions</p>
      </button>
  </div>
</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";

export default {
  name: "FeedbackButton",

  methods: {

    handleClick() {
      EventBus.emit("open-feedback")
    },
  }
}

</script>