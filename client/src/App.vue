<template>
  <section class="wrapper">
    <header>
      <h1>Clients</h1>
      <button @click="newClientShowing = !newClientShowing">New Client</button>
    </header>
    <ClientsList :providersMap="providersMap" />
    <div :class="[this.newClientShowing == true ? '' : 'hidden']">
      <NewClient />
    </div>
  </section>
</template>

<script>
import ClientsList from "./components/ClientsList.vue";
import NewClient from "./components/NewClient.vue";
const PROVIDERS_API_URL = "http://localhost:1337/providers/";

export default {
  name: "App",
  components: {
    ClientsList,
    NewClient,
  },
  data() {
    return {
      newClientShowing: false,
      providersMap: {},
    };
  },
  mounted() {
    fetch(PROVIDERS_API_URL)
      .then((response) => response.json())
      .then((result) => {
        console.log("FETCHED PROVIDERS:", result);
        this.updateProvidersMap(result);
      });
  },
  methods: {
    updateProvidersMap(json) {
      json.forEach(
        (provider) => (this.providersMap[provider.id] = provider.name)
      );
    },
  },
};
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/
  v2.0 | 20110126
  License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

section {
  max-width: 900px;
  margin: 0 auto;
  padding: 0;
}

.hidden {
  display: none;
}

header {
  display: flex;
  justify-content: space-between;
  background-color: lightblue;
  color: #5577ee;
  align-items: center;
  align-content: center;
  padding: 12px;
}

button {
  padding: 4px;
  border-radius: 5px;
}
</style>
