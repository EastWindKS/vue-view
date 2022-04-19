export default {
    SET_ORGANIZATION_LEGAL_FORM(state, payload) {
        state.organizationLegalFormsList = [...payload];
    }

}