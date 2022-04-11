import ApiWorker from "../../services/api/ApiWorker";

export default {
    namespaced: true,
    state: {
        organizationsList: []
    },
    getters: {
        getAll(state) {
            return state.organizationsList
        }
    },
    mutations: {
        SET_ORGANIZATIONS(state, payload) {
            state.organizationsList = [...payload];
        }
    },
    actions: {
        async getAll({commit}) {
            const api = new ApiWorker("organizations");
            await api.get("getAll").then(result => commit('SET_ORGANIZATIONS', result));
        }
    }
}