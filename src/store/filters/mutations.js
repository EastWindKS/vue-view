export default {
    SET_FILTERS(state, payload) {
        state.currenciesList = [...payload];
    }

}