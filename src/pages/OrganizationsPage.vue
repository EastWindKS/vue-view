<template>
  <default-table title="Organizations" :columns="columns" controller-name="organizations"/>
</template>

<script>
import DefaultTable from "../components/Tables/DefaultTable.vue";
import columns from "../static/Organizations/organizationsColumns"

export default {
  name: "OrganizationsPage",
  components: {DefaultTable},
  data() {
    return {
      columns
    }
  }

}
</script>

