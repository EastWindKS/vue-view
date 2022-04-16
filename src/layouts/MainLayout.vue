<template>
  <q-layout view="lHh lpR lFf">
    <q-header elevated class="bg-green text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu_open" @click="toggleLeftDrawer"/>
        <q-toolbar-title>
          GTI
        </q-toolbar-title>
        <language-switcher/>
        <q-select
            options-selected-class="text-deep-orange"
            v-model="officesList[0]"
            :options="officesList"
            :dense="dense"
            :options-dense="denseOpts">
          <template v-slot:prepend>
            <q-icon name="change_circle"/>
          </template>
        </q-select>

        <q-btn dense color="deep-purple-6" rounded icon="notifications" class="q-ml-md">
          <q-badge color="red" floating>4</q-badge>
        </q-btn>

        <q-icon name="account_circle" size="2rem" right class="cursor-pointer"/>
        <q-icon name="logout" size="2rem" right class="cursor-pointer" @click="logout"/>
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" elevated>
      <div class="q-pa-md q-gutter-sm">
        <q-tree
            ref="tree"
            node-key="label"
            :nodes="menuList"
            selected-color="primary"
            v-model:selected="selected"
            @update:selected="(value)=>onSelected(value)"
        />
      </div>
    </q-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import {menuItems} from "../static/menuList";
import LanguageSwitcher from "../components/LanguageSwitcher.vue";
import {onMounted, ref, watch} from "vue";
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {useI18n} from "vue-i18n/index";
import {clearLocalStorage} from "../services/jwtWorker";
import {useTranslate} from "../services/useTranslate"

export default {
  name: "MainLayout",
  components: {LanguageSwitcher},

  setup() {
    onMounted(() => {
      officesList.value = store.getters["offices/getOffices"];
      menuList.value = menuItems.map((item) => useTranslate(item));
    });

    const {locale} = useI18n();
    const officesList = ref([]);
    const leftDrawerOpen = ref(false);
    const dense = ref(true);
    const denseOpts = ref(false);
    const selected = ref("");
    const tree = ref(null);
    const menuList = ref([]);
    const store = useStore();
    const router = useRouter();

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    };

    const onSelected = (value) => {
      const node = tree.value.getNodeByKey(value);

      if (node?.route !== undefined) {
        router.push(node.route)
      }
    };

    const logout = () => {
      clearLocalStorage();
      router.push("/login")
    };

    watch(locale, () => {
      menuList.value = menuItems.map((item) => useTranslate(item));
    });

    return {
      officesList,
      tree,
      selected,
      leftDrawerOpen,
      dense,
      denseOpts,
      menuList,
      logout,
      toggleLeftDrawer,
      onSelected
    }
  }
}
</script>
