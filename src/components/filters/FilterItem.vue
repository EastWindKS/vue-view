<template>
  <q-item :key="filterItem.id">

    <q-item-section side>
      <q-checkbox v-model="filterItem.filterSet" :disable="filterItem.required"/>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ filterItem.propertyDisplayName }}</q-item-label>
    </q-item-section>

    <q-item-section>
      <q-select dense outlined v-model="searchOptionModel" :options="filterItem.searchOptions">
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ scope.opt.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>

        <template v-slot:selected>
          <div v-if="searchOptionModel" class="row no-wrap justify-center items-center content-top">
            <div class="text-weight-regular text-center text-subtitle2 q-ml-md">{{ searchOptionModel.title }}</div>
          </div>
        </template>
      </q-select>
    </q-item-section>

    <q-item-section>
      <filter-item-value-field :filter-item="filterItem"/>
    </q-item-section>

  </q-item>
</template>

<script>
import {onMounted, ref, toRefs} from "vue";
import FilterItemValueField from "./FilterItemValueField.vue";

export default {
  components: {FilterItemValueField},
  props: {
    filterItem: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const {filterItem} = toRefs(props);
    const searchOptionModel = ref(null);
    onMounted(() => {
      searchOptionModel.value = filterItem.value.searchOptions.find(({title}) => title === filterItem.value.defaultSearchOptionName);
    })

    return {
      filterItem,
      searchOptionModel,
    }
  }
}

</script>
