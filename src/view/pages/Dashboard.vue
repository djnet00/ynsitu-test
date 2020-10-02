<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row">
      <v-card
        class="mx-auto"
        color="#26c6da"
        dark
        max-width="400"
      >
        <v-card-title>
          <v-icon
            large
            left
          >
            mdi-table
          </v-icon>
          <span class="title font-weight-light">Usuarios Registrados</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
          "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
        </v-card-text>

        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ usuarios.length }} usuarios</v-list-item-title>
            </v-list-item-content>

            <v-row
              align="center"
              justify="end"
            >
              <v-btn to="/users" class="ma-2" color="primary">Ver Usuarios</v-btn>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </div>
    <!--end::Dashboard-->
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { mapState } from 'vuex';

export default {
  name: "dashboard",
  components: {
  },
  mounted() {
    this.$store.dispatch('getUsuarios');
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
  },
  methods: {
    setActiveTab1(event) {
      this.tabIndex = this.setActiveTab(event);
    },
    setActiveTab2(event) {
      this.tabIndex2 = this.setActiveTab(event);
    },
    /**
     * Set current active on click
     * @param event
     */
    setActiveTab(event) {
      // get all tab links
      const tab = event.target.closest('[role="tablist"]');
      const links = tab.querySelectorAll(".nav-link");
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }

      // set current active tab
      event.target.classList.add("active");

      // set clicked tab index to bootstrap tab
      return parseInt(event.target.getAttribute("data-tab"));
    }
  },
  computed: {
    ...mapState({
        usuarios: state => state.usuarios.usuarios
    })
  }
};
</script>
