<template>
  <default-table :title="title" :columns="columns" controller-name="Organizations" action-type-on-double-click="modal">
    <template #modal="{isOpen, onCloseModal}">
      <test-dialog :alert="isOpen" @onCloseModal="onCloseModal"/>
    </template>
  </default-table>
</template>

<script>
import DefaultTable from "../components/tables/DefaultTable.vue";
import columns from "../static/Organizations/organizationsColumns"
import TestDialog from "../components/dialogs/TestDialog.vue"
import {useI18n} from "vue-i18n/index";
import {ref} from "vue";

export default {
  name: "OrganizationsPage",
  components: {DefaultTable, TestDialog},
  setup() {
    const {t} = useI18n();
    const title = ref(t('organizations'))
    return {
      columns,
      title
    }
  }
}
</script>

