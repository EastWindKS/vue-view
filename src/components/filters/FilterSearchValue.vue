<template>
  <q-item-section>
    <q-input outlined v-model="filterValue" label="Outlined" v-if="isInput"/>

    <q-select
        v-if="isSelect"
        filled
        v-model="model"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        @filter="filterFn"
        @update:model-value="show"
        style="width: 250px"
    >
      <template v-slot:selected>
        123
      </template>

      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section>
            <q-item-label>{{ scope.opt.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>

    </q-select>

  </q-item-section>
</template>

<script>
import {ref, toRefs} from "vue";
import {useStore} from "vuex";

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
    const filterValue = ref(null);
    const options = ref(null);
    const model = ref(null);
    const store = useStore();

    const show = (value) => {
      model.value = value.name
    }

    const filterFn = async (val, update, abort) => {
      if (options.value !== null) {
        if (val !== '') {
          model.value = "1";
          const needle = val.toLowerCase()
          options.value = store.getters[`${filterItem.value.controllerName}/getAll`].filter(v => v.name.toLowerCase().indexOf(needle) > -1);
          await update();

        } else {
          options.value = store.getters[`${filterItem.value.controllerName}/getAll`];
        }

        update();
        return;
      }

      update(async () => {
        if (store.getters[`${filterItem.value.controllerName}/getAll`].length === 0) {
          await store.dispatch(`${filterItem.value.controllerName}/getAll`)
        }
        options.value = store.getters[`${filterItem.value.controllerName}/getAll`];
      })

    }

    return {
      filterValue,
      isInput,
      isSelect,
      model,
      options,
      filterFn,
      show,
      abortFilterFn() {

      }
    }
  }
}
</script>
