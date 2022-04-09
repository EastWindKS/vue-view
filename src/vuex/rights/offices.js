export default {
    namespaced: true,
    state: {
        officeList: ['Verdeco', 'Formag Odesa', 'Formag Dnepr', 'All']
    },
    getters: {
        getOffices(state) {
            return state.officeList
        }
    },
    mutations: {},
    actions: {}
}