<template>
  <div class="q-pa-md">
    <q-table
        :title="title"
        :rows="rows"
        :columns="columns"
        row-key="id"
        v-model:pagination="pagination"
        :filter="filter"
        separator="cell"
        :selection="selectionType"
        @row-dblclick="onDoubleClick"
        class="my-sticky-header-table"
    >

      <template v-slot:loading>
        <q-inner-loading showing color="primary"/>
      </template>

      <template v-slot:top>
        <div class="text-h6 q-pr-md">{{ title }}</div>
        <q-btn color="secondary" round icon="add" size="md" @click=""/>
        <q-space/>
        <q-input dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
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
</template>

<script>
import {ref, toRefs} from 'vue'
import fetchTableRows from "../../services/api/useTableRowsFetch.js";

export default {
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
    const {title, columns, controllerName, selectionType, actionTypeOnDoubleClick, routeToCard} = toRefs(props);
    const filter = ref('');
    const isOpen = ref(false);
    const {rows} = fetchTableRows(controllerName.value);
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      rowsPerPage: 12
    });

    const onCloseModal = () => {
      isOpen.value = false;
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

    return {
      title,
      pagination,
      columns,
      rows,
      filter,
      selectionType,
      isOpen,
      onDoubleClick,
      onCloseModal
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