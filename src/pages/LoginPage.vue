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
    </q-form>
    <router-view/>
  </div>
</template>

<script>
import {toRefs, reactive} from 'vue';
import {ApiConnector} from "../services/api/ApiConnector";
import {useQuasar} from 'quasar';

export default {
  name: "LoginPage",
  setup() {
    const loginModel = reactive({
      userName: "",
      password: ""
    })

    const $q = useQuasar();

    const triggerNegative = (message) => {
      $q.notify({
        type: 'negative',
        message: message
      })
    }

    const onSubmit = async () => {
      const api = new ApiConnector("Authenticate");
      await api.post("Login", loginModel)
          .then(r => console.log(r))
          .catch(e => triggerNegative(e));
    }

    return {
      onSubmit,
      ...toRefs(loginModel)
    }
  }
}

</script>

<style scoped>

</style>