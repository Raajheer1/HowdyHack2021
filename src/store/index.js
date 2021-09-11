import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appURL: "https://howdy.raajpatel.dev/",
    login: false,
    drawer: null,
    assets: null,
    title: null,
    streamkey: null,
    intervalvideo: null,
    intervalasset: null,
    streams: null,
    loading: true,
    sheet: false,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
