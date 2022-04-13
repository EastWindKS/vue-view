<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="alert" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel
          numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="close"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {toRefs} from 'vue'

export default {
  props: {
    alert: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  setup(props, {emit}) {
    const {alert} = toRefs(props);

    const close = () => {
      emit("onCloseModal");
    }

    return {
      alert,
      close
    }
  }
}
</script>