<template>
  <div class="new-client">
    <h1>New Client</h1>
    <vue-form
      class="form"
      :state="formstate"
      v-model="this.formstate"
      @submit.prevent="onSubmit"
    >
      <div class="mb-3 row">
        <div class="col-3">
          <label class="form-label">Name</label>
        </div>
        <div class="col-9">
          <input
            class="form-control"
            type="text"
            name="name"
            required
            v-model="model.name"
          />
        </div>
      </div>
      <div class="mb-3 row">
        <div class="col-3">
          <label class="form-label">Email</label>
        </div>
        <div class="col-9">
          <input
            class="form-control"
            type="text"
            name="email"
            required
            v-model="model.email"
          />
        </div>
      </div>
      <div class="mb-3 row">
        <div class="col-3">
          <label class="form-label">Phone</label>
        </div>
        <div class="col-9">
          <input
            class="form-control"
            type="text"
            name="phone"
            required
            v-model="model.phone"
          />
        </div>
      </div>
      <div class="mb-3 row">
        <div class="col-3">
          <label class="form-label">Providers</label>
        </div>
        <div class="col-9">
          <div v-for="provider in this.providersArray" :key="provider">
            <input
              class="form-control"
              type="checkbox"
              id="provider.id"
              value="provider.name"
              v-model="providers"
            />
          </div>
        </div>
      </div>
      <button type="reset">Cancel</button>
      <button type="submit">Add Client</button>
    </vue-form>
  </div>
</template>

<script>
export default {
  name: "NewClient",
  data() {
    return {
      formstate: {},
      model: {
        name: "",
        email: "",
        phone: "",
        providers: [],
      },
    };
  },
  props: {
    providersArray: [],
  },
  methods: {
    onSubmit: function(event) {
      event.preventDefault();
      console.log("form submitted", this.formstate);
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
.new-client {
  margin: 10px;
  padding: 10px;
  position: absolute;
  top: 0;
  z-index: 5;
  background: white;
  border: 1px solid black;
  width: 100%;
  max-width: 650px;
}
</style>
