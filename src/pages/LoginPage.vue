<template>
  <div class="q-pa-md fixed-center" style="min-width: 400px">
    <q-form
        @submit.prevent="onSubmit"
        class="q-gutter-md"
    >
      <q-input
          square
          outlined
          v-model="userName"
          label="login"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type login']">
        <template v-slot:prepend>
          <q-icon name="face"/>
        </template>
      </q-input>
      <q-input
          outlined
          square
          type="password"
          v-model="password"
          label="password"
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Please type password']">
        <template v-slot:prepend>
          <q-icon name="password"/>
        </template>
      </q-input>
      <div>
        <q-btn label="Submit" type="submit" color="secondary" class="full-width"/>
      </div>
      <q-inner-loading :showing="visible">
        <q-spinner-hourglass size="50px" color="secondary"/>
      </q-inner-loading>
    </q-form>
  </div>
</template>

<script>
import ApiWorker from "../services/api/ApiWorker";
import {setToLocalStorageAfterAuth} from "../services/jwtWorker";
import LanguageSwitcher from "../components/LanguageSwitcher.vue";

export default {
  name: "LoginPage",
  components: {LanguageSwitcher},
  data() {
    return {
      userName: "",
      password: "",
      visible: false
    }
  },
  methods: {
    async onSubmit() {
      this.visible = true;
      const api = new ApiWorker("Authenticate");
      await api.post("Login", {userName: this.userName, password: this.password})
          .then(response => {
            setToLocalStorageAfterAuth(response);
            this.visible = false;
            this.$router.push("/");
          })
          .catch(() => this.visible = false);
    }
  }
}

</script>

<style scoped>

</style>