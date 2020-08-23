<template>
  <div>
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav"/>
    <TheSidenav :show="displaySidenav" @close="displaySidenav=false"/>
    <Nuxt/>
  </div>
</template>

<style>
html {
  font-family: 'Open Sans', sans-serif;
}

body {
  margin: 0;
}
</style>
<script>
import TheHeader from "~/components/Navigation/TheHeader";
import TheSidenav from "~/components/Navigation/TheSidenav";

export default {
  //middleware: 'log',
  components: {TheSidenav, TheHeader},
  data() {
    return {
      displaySidenav: false,
    }
  }
}
</script>
