<template>
  <div class="q-pa-md">
    <q-table
        :title="title"
        :rows="rows"
        :columns="translatedColumns"
        row-key="id"
        v-model:pagination="pagination"
        :filter="filter"
        separator="cell"
        :selection="selectionType"
        :loading="loading"
        @row-dblclick="onDoubleClick"
        class="my-sticky-header-table"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary">
          <q-spinner-hourglass size="50px" color="secondary"/>
        </q-inner-loading>
      </template>

      <template v-slot:top>
        <div class="text-h6 q-pr-md">{{ title }}</div>
        <q-btn color="secondary" round icon="add" size="md">
          <q-tooltip class="bg-purple text-body2" :offset="[10, 10]" transition-show="rotate" transition-hide="rotate">
            {{ t('add') }}
          </q-tooltip>
        </q-btn>
        <q-space/>

        <q-btn color="secondary" round size="md" icon="filter_list" class="q-mr-xl" @click="onFilterButtonClick">
          <q-tooltip class="bg-purple text-body2" :offset="[10, 10]" transition-show="rotate" transition-hide="rotate">
            {{ t('filters') }}
          </q-tooltip>
        </q-btn>

        <q-input dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>

      <template v-if="isShowNoDataMessage" v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied"/>
          <span>
            Well this is sad... {{ message }}
          </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon"/>
        </div>
      </template>

    </q-table>
  </div>
  <slot name="modal" :isOpen="isOpen" :onCloseModal="onCloseModal"/>
  <filter-dialog :is-open="isFilterDialogOpen" @onCloseFilterModal="onCloseFilterModal" :controller-name="controllerName"/>
</template>
<script>
import {ref, toRefs, computed} from 'vue'
import fetchTableRows from "../../services/api/useTableRowsFetch.js";
import {useTranslate} from "../../services/useTranslate";
import {useI18n} from "vue-i18n/index";
import FilterDialog from "../dialogs/FilterDialog.vue";

export default {
  components: {FilterDialog},
  props: {
    title: {
      type: String,
      required: true,
    },

    columns: {
      type: Array,
      required: true
    },

    controllerName: {
      type: String,
      required: true
    },

    selectionType: {
      type: String,
      required: false,
      default: "none",
      validator: function (type) {
        return ['none', 'multiple', 'single'].includes(type)
      }
    },

    actionTypeOnDoubleClick: {
      type: String,
      required: false,
      default: "none",
      validator: function (type) {
        return ['none', 'modal', 'card'].includes(type)
      }
    },

    routeToCard: {
      type: String,
      required: false
    }
  },

  setup(props) {
    const {t} = useI18n();
    const {title, columns, controllerName, selectionType, actionTypeOnDoubleClick, routeToCard} = toRefs(props);
    const filter = ref('');
    const isOpen = ref(false);
    const isFilterDialogOpen = ref(false);
    const filterLabel = ref(t('filters'));
    const {rows, loading} = fetchTableRows(controllerName.value);
    const translatedColumns = ref(columns.value.map((column) => useTranslate(column)));

    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      rowsPerPage: 14
    });

    const onCloseModal = () => {
      isOpen.value = false;
    }

    const onCloseFilterModal = () => {
      isFilterDialogOpen.value = false;
    }

    const onDoubleClick = (evt, row, index) => {

      switch (actionTypeOnDoubleClick.value) {
        case "none":
          break;
        case "modal":
          isOpen.value = true;
          break;
        case "card":
          this.$router.push(routeToCard.value);
          break;
        default:
          break;
      }
    }

    const onFilterButtonClick = () => {
      isFilterDialogOpen.value = true;
    }

    const isShowNoDataMessage = computed(() => {
      return loading && rows.length < 1;
    })

    return {
      title,
      filterLabel,
      pagination,
      columns,
      controllerName,
      translatedColumns,
      rows,
      filter,
      isFilterDialogOpen,
      selectionType,
      isOpen,
      loading,
      t,
      onDoubleClick,
      onCloseModal,
      onFilterButtonClick,
      onCloseFilterModal,
      isShowNoDataMessage
    }
  }
}
</script>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 880px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1

  thead tr:first-child th
    top: 0
  /* this is when the loading indicator appears */


































































  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>