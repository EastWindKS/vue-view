import ApiWorker from "../../services/api/ApiWorker";

export default {

    async getAll({commit}) {
        const api = new ApiWorker("organizations");
        await api.get("getAll").then(result => commit('SET_ORGANIZATIONS', result));
        // await Promise.allSettled([
        //     api.get("getAlll").then(result => commit('SET_ORGANIZATIONS', result)),
        //     api.get("getAll").then(result => commit('SET_ORGANIZATIONS', result))
        //]);
    }
}
