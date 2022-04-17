import ApiWorker from "../../services/api/ApiWorker";

export default {
    async getAll({commit}, value) {
        const api = new ApiWorker("filtersLists");
        await api.get("getByControllerName", {controllerName: value}).then(result => commit('SET_FILTERS', result));
    }
}
