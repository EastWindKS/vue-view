export default {
    SET_FILTERS(state, payload) {
        state.filtersList = [...payload];
    }

}