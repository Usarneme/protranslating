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
      <table class="table table-striped table-bordered">
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
            <th>
              <span v-for="provider in client.providers" :key="provider"
                >{{ providersMap[provider.id] + " " }}
              </span>
            </th>
            <th>
              <button
                class="button-link button-edit"
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
            <th>
              <button
                class="button-link button-delete"
                @click="deleteClient(client._id)"
              >
                Delete
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import EditClient from "./EditClient.vue";
const CLIENTS_API_URL = "http://localhost:1337/clients/";

export default {
  name: "ClientsList",
  components: {
    EditClient,
  },
  props: {
    providersMap: {
      type: Object,
    },
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
    fetch(CLIENTS_API_URL)
      .then((response) => response.json())
      .then((result) => {
        console.log("FETCHED CLIENTS:", result);
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
    deleteClient(id) {
      console.log("delete clicked for id:", id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button-link {
  background: unset;
  border: none;
  text-decoration: underline;
}
.button-edit {
  color: #4444cc;
}
.button-delete {
  color: #cc4444;
}
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
