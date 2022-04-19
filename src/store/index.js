import {createStore} from "vuex";
import offices from "./rights/index";
import organizations from "./organizations/index";
import filters from "./filters/index";
import countries from "./addresses/countries";
import currencies from "./finances/currencies";
import organizationLegalForm from "./organizations/OrganizationLegalForm";

const store = createStore({
    modules: {
        Offices: offices,
        Organizations: organizations,
        Filters: filters,
        Countries:countries,
        Currencies:currencies,
        OrganizationLegalForms:organizationLegalForm
    }
});

export default store;