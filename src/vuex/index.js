import {createStore} from "vuex";
import offices from "./rights/offices";

const store = createStore({
    modules: {
        offices: offices
    }
});

export default store;