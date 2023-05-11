
<template>
  <div class="button-layout">
      <button class="feed-button center-horizontal" @click="handleClick()">
        <p class="text-black more-content-button-text">Open Feed</p>
      </button>
  </div>
</template>

<script>

import EventBus from "../intercraSystemCode/classes/EventBusEvent";

export default {
  name: "FeedButton",

  methods: {

    handleClick() {
      EventBus.emit("open-feed")
    },
  }
}

</script>