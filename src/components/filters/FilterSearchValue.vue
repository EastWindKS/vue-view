<template>
  <q-item-section>
    <q-input outlined v-model="text" label="Outlined" v-if="isInput"/>
  </q-item-section>
</template>

<script>
import {ref, toRefs} from "vue";

export default {
  props: {
    filterItem: {
      type: Object,
      required: true
    },
    isSelect: {
      type: Boolean,
      default: false
    },
    isInput: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const {filterItem, isInput, isSelect} = toRefs(props)
    const text = ref(null)

    return {
      text,
      isInput,
      isSelect
    }
  }
}
</script>
