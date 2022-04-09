<template>
  <q-layout view="lHh lpR lFf">

    <q-header elevated class="bg-green text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu_open" @click="toggleLeftDrawer"/>
        <q-toolbar-title>
          GTI
        </q-toolbar-title>
        <q-select outlined v-model="officesList[0]" :options="officesList" :dense="dense" :options-dense="denseOpts" bg-color="grey-2">
          <template v-slot:prepend>
            <q-icon name="change_circle"/>
          </template>
        </q-select>
        <q-btn dense color="deep-purple-6" rounded icon="notifications" class="q-ml-md">
          <q-badge color="red" floating>4</q-badge>
        </q-btn>
        <q-icon name="account_circle" size="2rem" right class="cursor-pointer"/>
        <q-icon name="logout" size="2rem" right class="cursor-pointer"/>

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
            @update:selected="onSelected"
        />
      </div>

    </q-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import {ref, computed} from 'vue'
import {useRouter} from "vue-router";
import {menuList} from "../static/menuList";
import {useStore} from "vuex"

export default {
  setup() {
    const tree = ref(null);
    const router = useRouter();
    const selected = ref(null);
    const leftDrawerOpen = ref(false);
    const store = useStore();

    const onSelected = (value) => {
      const node = tree.value.getNodeByKey(value);
      if (node?.route !== undefined) {
        console.log("finally")
      }
    };

    return {
      onSelected,
      tree,
      menuList,
      selected,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      dense: ref(true),
      denseOpts: ref(false),
      officesList: computed(() => store.getters["offices/getOffices"])
    }
  }
}
</script>