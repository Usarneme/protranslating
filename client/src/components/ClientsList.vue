<template>
  <div :class="[this.editClientShowing == true ? '' : 'hidden']">
    <EditClient
      id="editingId"
      name="editingName"
      email="editingEmail"
      phone="editingPhone"
      providers="editingProviders"
    />
  </div>
  <div class="container">
    <div class="clients">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Providers</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody v-for="client in clients" :key="client._id">
          <tr>
            <th>{{ client.name }}</th>
            <th>{{ client.email }}</th>
            <th>{{ client.phone }}</th>
            <th>Providers TODO:</th>
            <th>
              <button
                @click="
                  handleEdit(
                    client._id,
                    client.name,
                    client.email,
                    client.phone,
                    client.providers
                  )
                "
              >
                Edit
              </button>
            </th>
            <th><button>Delete</button></th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
const EVENTS_API_URL = "http://localhost:1337/clients/";
import EditClient from "./EditClient.vue";

export default {
  name: "ClientsList",
  components: {
    EditClient,
  },
  data() {
    return {
      editClientShowing: false,
      editingId: "",
      editingName: "",
      editingEmail: "",
      editingPhone: "",
      editingProviders: "",
    };
  },
  mounted() {
    fetch(EVENTS_API_URL)
      .then((response) => response.json())
      .then((result) => {
        console.log("GOT RESULT OF:", result);
        this.clients = result;
      });
  },
  methods: {
    handleEdit(id, name, email, phone, providers) {
      this.editingId = id;
      this.editingName = name;
      this.editingEmail = email;
      this.editingPhone = phone;
      this.editingProviders = providers;
      console.log(
        "Button clicked ID:",
        this.editingId,
        this.editingName,
        this.editingEmail,
        this.editingPhone,
        this.editingProviders
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
