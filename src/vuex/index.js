import {createStore} from "vuex";
import offices from "./rights/offices";
import organizations from "./organizations/organizations";

const store = createStore({
    modules: {
        offices: offices,
        organizations: organizations
    }
});

export default store;