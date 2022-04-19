<template>
  <q-dialog v-model="isOpen" persistent full-width>
    <q-layout view="hHh lpR fFf" container class="bg-white">

      <q-header class="bg-white text-white q-pa-sm">
        <q-btn icon="close" color="black" flat round dense class="float-right" @click="onClose"/>
      </q-header>

      <q-page-container>
        <q-list bordered padding>

          <q-item-label header class="text-weight-bold color-red">Collections</q-item-label>
          <filter-item v-for="filter in collectionsFilters" :filter-item="filter" :is-collection="true"/>

          <q-item-label class="text-weight-bold color-red" header>Selects</q-item-label>
          <filter-item v-for="filter in selectFilters" :filter-item="filter" :is-select="true"/>

          <q-item-label class="text-weight-bold color-red" header>Inputs</q-item-label>
          <filter-item v-for="filter in inputFilters" :filter-item="filter" :is-input="true"/>

        </q-list>
      </q-page-container>

      <q-footer bordered class="bg-secondary text-white q-pa-sm">
        <q-btn color="negative" no-caps glossy class="float-left">{{ t('reset') }}</q-btn>
        <q-btn color="secondary" @click="onFilter" no-caps glossy class="q-mr-sm float-right"> {{ t('filter_out') }}</q-btn>
      </q-footer>

    </q-layout>
  </q-dialog>
</template>

<script>
import {toRefs, ref, watch, computed} from 'vue';
import {useI18n} from "vue-i18n/index";
import {useStore} from "vuex";
import {useQuasar} from 'quasar';
import FilterItem from "../filters/FilterItem.vue";
import PropertyDataTypes from "../../static/PropertyDataTypes";

export default {
  components: {FilterItem},
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default: false
    },

    controllerName: {
      type: String,
      required: true,
    }
  },
  setup(props, {emit}) {
    const {isOpen, controllerName} = toRefs(props);
    const {t} = useI18n();
    const store = useStore();
    const $q = useQuasar();
    const filters = ref([]);
    const loading = ref(true);

    watch(isOpen, async () => {
      if (isOpen.value) {
        $q.loading.show();
        await store.dispatch(`Filters/getAll`, controllerName.value);
        filters.value = store.getters[`Filters/getAll`];
        $q.loading.hide();
      }

    });

    const onClose = () => {
      emit("onCloseFilterModal");

    }

    const onFilter = () => {
      emit("onCloseFilterModal");
    }

    const collectionsFilters = computed(() => {
      return filters.value.filter((f) => f.propertyDataTypeId === PropertyDataTypes.Collection);
    })

    const selectFilters = computed(() => {
      return filters.value.filter((f) => f.controllerName !== null);
    })

    const inputFilters = computed(() => {
      return filters.value.filter((f) => f.propertyDataTypeId !== PropertyDataTypes.Collection && f.controllerName === null);
    })

    return {
      loading,
      filters,
      isOpen,
      onClose,
      onFilter,
      selectFilters,
      inputFilters,
      collectionsFilters,
      t,
    }
  }
}
</script>