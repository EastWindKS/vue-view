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
          :label="loginLabel"
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
          :label="passwordLabel"
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
import {setToLocalStorageAfterAuth} from "../services/localStorageWorker";
import LanguageSwitcher from "../components/LanguageSwitcher.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n/index";

export default {
  name: "LoginPage",
  components: {LanguageSwitcher},
  setup() {
    const router = useRouter();
    const {t} = useI18n();
    const userName = ref("");
    const password = ref("");
    const visible = ref(false);
    const passwordLabel = ref(t('password'));
    const loginLabel = ref(t('login'));

    const onSubmit = async () => {
      visible.value = true;
      const api = new ApiWorker("Authenticate");
      await api.post("Login", {userName: userName.value, password: password.value})
          .then(response => {
            setToLocalStorageAfterAuth(response);
            visible.value = false;
            router.push("/");
          })
          .catch(() => visible.value = false);
    }

    return {
      userName,
      password,
      visible,
      passwordLabel,
      loginLabel,
      onSubmit
    }
  }
}
</script>
