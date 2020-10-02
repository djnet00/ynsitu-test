/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/core/services/store";
import { VERIFY_AUTH } from "@/core/services/store/auth.module";

Vue.config.productionTip = false;

// Global 3rd party plugins
import "popper.js";
import "tooltip.js";
import PerfectScrollbar from "perfect-scrollbar";
window.PerfectScrollbar = PerfectScrollbar;
import ClipboardJS from "clipboard";
window.ClipboardJS = ClipboardJS;

// Vue 3rd party plugins
import i18n from "@/core/plugins/vue-i18n";
import vuetify from "@/core/plugins/vuetify";
import "@/core/plugins/portal-vue";
import "@/core/plugins/bootstrap-vue";
import "@/core/plugins/perfect-scrollbar";
import "@/core/plugins/highlight-js";
import "@/core/plugins/inline-svg";
import "@/core/plugins/apexcharts";
import "@/core/plugins/metronic";
import "@mdi/font/css/materialdesignicons.css";

import {auth} from '@/firebase';

auth.onAuthStateChanged(user => {

  if(user){
    store.dispatch(VERIFY_AUTH, {email:user.email, uid: user.uid, token: user.refreshToken});
  }

  new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: h => h(App)
  }).$mount("#app");
});