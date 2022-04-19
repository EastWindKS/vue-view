export default {
    SET_CURRENCIES(state, payload) {
        state.countriesList = [...payload];
    }

}