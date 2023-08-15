
<template>
  <div class="button-layout">
      <button class="feed-button center-horizontal" @click="handleClick()">
        <p class="text-black more-content-button-text">Give Feedback</p>
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