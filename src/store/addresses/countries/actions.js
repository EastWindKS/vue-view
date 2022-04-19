import ApiWorker from "../../../services/api/ApiWorker";

export default {
    async getAll({commit}) {
        const api = new ApiWorker("countries");
        await api.get("getAll" ).then(result => commit('SET_COUNTRIES', result));
    }
}
