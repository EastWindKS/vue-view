<template>
  <div class="q-pa-md">
    <q-table
        :title="title"
        :rows="rows"
        :columns="columns"
        row-key="id"
        v-model:pagination="pagination"
        :filter="filter"
        :filter-method="filtering"
        separator="cell"
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

    methodName: {
      type: String,
      required: false,
      default: "getAll"
    }
  },

  setup(props) {
    const {title, columns, controllerName, methodName} = toRefs(props);
    const filter = ref('');
    const {rows} = fetchTableRows(controllerName.value);
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      rowsPerPage: 14
    });

    const filtering = (rows, terms, cols, getCellValue) => {
      return rows.filter(({nativeName}) => {
        return nativeName.toLowerCase().includes(filter.value.toLowerCase())
      })
    }

    return {
      title,
      pagination,
      columns,
      rows,
      filter,
      filtering
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