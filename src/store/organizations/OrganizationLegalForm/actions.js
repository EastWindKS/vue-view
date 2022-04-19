import ApiWorker from "../../../services/api/ApiWorker";

export default {

    async getAll({commit}) {
        const api = new ApiWorker("organizationLegalForms");
        await api.get("getAll").then(result => commit('SET_ORGANIZATION_LEGAL_FORM', result));
    },

    async getByCountryId({commit}, value) {
        const api = new ApiWorker("organizationLegalForms");
        await api.get("getByCountryId", {countryId: value}).then(result => commit('SET_ORGANIZATION_LEGAL_FORM', result));
    }
}
