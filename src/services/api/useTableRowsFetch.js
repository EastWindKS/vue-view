import {onMounted, ref} from "vue";
import {useStore} from "vuex";

export default function fetchTableRows(controllerName, methodName) {
    const store = useStore();
    const rows = ref([]);
    const loading = ref(true);

    onMounted(async () => {
        if (store.getters[`${controllerName}/getAll`].length === 0) {
            await store.dispatch(`${controllerName}/getAll`);
        }

        rows.value = store.getters[`${controllerName}/getAll`];
        loading.value = false;
    });

    return {
        rows,
        loading
    }
}


