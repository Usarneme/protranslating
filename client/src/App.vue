<template>
  <header>
    <h1>Clients</h1>
    <button @click="newClientShowing = !newClientShowing">New Client</button>
  </header>
  <ClientsList />
  <div :class="[this.newClientShowing == true ? '' : 'hidden']">
    <NewClient />
  </div>
</template>

<script>
import ClientsList from "./components/ClientsList.vue";
import NewClient from "./components/NewClient.vue";

export default {
  name: "App",
  components: {
    ClientsList,
    NewClient,
  },
  data() {
    return {
      newClientShowing: false,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.hidden {
  display: none;
}
</style>
