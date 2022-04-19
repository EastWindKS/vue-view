import {onMounted, ref} from "vue";
import {useStore} from "vuex";

export default function useGetDataTable(controllerName, method) {
    const store = useStore();
    const data = ref([]);
    const loading = ref(true);

    onMounted(async () => {

        if (store.getters[`${controllerName}/getAll`].length === 0) {
            method === undefined ? await store.dispatch(`${controllerName}/getAll`) : await store.dispatch(`${controllerName}/${method.name}`,method.value);
        }

        data.value = store.getters[`${controllerName}/getAll`];
        loading.value = false;
    });

    return {
        data,
        loading
    }
}


