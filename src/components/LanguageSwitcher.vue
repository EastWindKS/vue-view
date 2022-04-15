<template>
  <div class="q-pa-md" style="max-height: 300px">
    <div class="q-gutter-md">
      <q-select
          v-model="model"
          :options="options"
          dense="dense"
          options-selected-class="text-deep-orange"
          @update:model-value="changeLocale"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-icon size="md" :name="scope.opt.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>

        <template v-slot:selected>
          <div v-if="model" class="row no-wrap justify-center items-center content-top">
            <q-icon size="sm" :name="model.icon"/>
            <div class="text-weight-regular text-center text-subtitle2 q-ml-md">{{ model.label }}</div>
          </div>
        </template>

      </q-select>
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import {useQuasar} from 'quasar';
import {useI18n} from 'vue-i18n/index'

export default {
  setup() {
    const $q = useQuasar();
    const model = ref(null);
    const options = ref([
      {label: 'English', icon: 'svguse:gb-flag.svg#flag-icons-gb', locale: "en-GB"},
      // {label: 'Ukrainian', icon: 'svguse:ua-flag.svg#flag-icons-ua'},
      {label: 'Русский', icon: 'svguse:ru-flag.svg#flag-icons-ru', locale: "ru-RU"}
    ]);

    const {locale} = useI18n({
      useScope: 'global'
    })

    const changeLocale = (value) => {
      switch (value.locale) {
        case "en-GB":
          import(
              'quasar/lang/en-GB'
              ).then(lang => {
            $q.lang.set(lang.default);
            locale.value = 'en'
          })
          break;

        case "ru-RU":
          import(
              'quasar/lang/ru'
              ).then(lang => {
            $q.lang.set(lang.default);
            locale.value = 'ru'
          })
          break;

        default:
          return;
      }

    }

    onMounted(() => {
      const browserLocale = $q.lang.getLocale();
      const findLocale = options.value.find(({locale}) => locale === browserLocale);

      if (findLocale === undefined) {
        model.value = options[0];
      } else {
        model.value = findLocale;
      }

      changeLocale(model.value)
    })

    return {
      model,

      options,
      changeLocale,
    }
  }
}
</script>