import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import VuetifyConfirm from "vuetify-confirm";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#5867dd",
        secondary: "#e8ecfa",
        accent: "#5d78ff",
        error: "#fd397a",
        info: "#5578eb",
        success: "#0abb87",
        warning: "#ffb822"
      }
    }
  }
});

Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: 'Aceptar',
  buttonFalseText: 'Cancelar',
  buttonTrueColor: 'danger',
  buttonFalseColor: 'grey',
  buttonTrueFlat: false,
  buttonFalseFlat: true,
  color: 'warning',
  icon: 'warning',
  title: 'Warning',
  width: 350,
  property: '$confirm'
});

export default vuetify
