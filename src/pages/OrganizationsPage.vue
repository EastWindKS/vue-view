<template>
  <default-table title="Organizations" :columns="columns" controller-name="organizations" action-type-on-double-click="modal">
    <template #modal="{isOpen, onCloseModal}">
      <test-dialog :alert="isOpen" @onCloseModal="onCloseModal"/>
    </template>
  </default-table>
</template>

<script>
import DefaultTable from "../components/tables/DefaultTable.vue";
import columns from "../static/Organizations/organizationsColumns"
import TestDialog from "../components/dialogs/TestDialog.vue"

export default {
  name: "OrganizationsPage",
  components: {DefaultTable, TestDialog},
  data() {
    return {
      columns
    }
  }
}
</script>

