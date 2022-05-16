import { createStore } from "vuex";
import gameStore from "./modules/gameStore";

const store = createStore({
    strict: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        gameStore,
        // userStore,
    },
})

export default store