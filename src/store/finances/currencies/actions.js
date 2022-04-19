import ApiWorker from "../../../services/api/ApiWorker";

export default {

    async getAll({commit}) {
        const api = new ApiWorker("currencies");
        await api.get("getAll").then(result => commit('SET_CURRENCIES', result));
    },
}
