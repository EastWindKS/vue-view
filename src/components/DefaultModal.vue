<template>
  <q-dialog v-model="isOpen">
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        {{ text }}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default: false
    },
    text: {
      type: String,
      required: false,
    }
  }
}

</script>

