<template>
  <q-item :key="filterItem.id">

    <q-item-section side>
      <q-checkbox v-model="filterItem.filterSet" :disable="filterItem.required"/>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ filterItem.propertyDisplayName }}</q-item-label>
    </q-item-section>

    <filter-search-option :filter-item="filterItem" v-if="isSelect || isInput"/>
    <filter-item-value-field :filter-item="filterItem" :is-select="isSelect" :is-input="isInput" v-if="isSelect || isInput"/>

  </q-item>
</template>

<script>
import {onMounted, toRefs} from "vue";
import FilterItemValueField from "./FilterSearchValue.vue";
import FilterSearchOption from "./FilterSearchOption.vue";

export default {
  components: {FilterSearchOption, FilterItemValueField},
  props: {
    filterItem: {
      type: Object,
      required: true,
    },

    isCollection: {
      type: Boolean,
      default: false
    },

    isSelect: {
      type: Boolean,
      default: false
    },

    isInput: {
      type: Boolean,
      default: false
    },

  },

  setup(props) {
    const {filterItem, isSelect, isInput, isCollection} = toRefs(props);

    return {
      filterItem,
      isCollection,
      isSelect,
      isInput
    }
  }
}

</script>
