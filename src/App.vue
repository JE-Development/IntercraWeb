<script>

export default {
  name: "App",
}
</script>

<template>

<MainPage/>
  <main>
    <div class="container my-3">
      <router-view />
      <notifications/>
    </div>
  </main>
</template>
