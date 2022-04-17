import {createStore} from "vuex";
import offices from "./rights/index";
import organizations from "./organizations/index";
import filters from "./filters/index";

const store = createStore({
    modules: {
        offices: offices,
        organizations: organizations,
        filters: filters
    }
});

export default store;