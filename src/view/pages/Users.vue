<template>
  <div data-app>
    <b-alert
      show
      variant="light"
      class="alert alert-custom alert-white alert-shadow fade show gutter-b"
    >
      <div class="alert-icon">
        <span class="svg-icon svg-icon-lg">
          <inline-svg src="media/svg/icons/Tools/Compass.svg" />
        </span>
      </div>
      <div class="alert-text">
        <b>Gestionar Usuarios</b> Utilice este formulario para editar o eliminar los usuarios registrados.
      </div>
    </b-alert>

    <div class="row">
      <div class="col-md-12">
        <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                v-model="search"
                append-icon="search"
                label="Buscar ..."
                single-line
                hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="usuarios"
                :search="search"
            >
                <template v-slot:item.activo="{ item }">
                    <v-checkbox readonly v-model="item.activo"></v-checkbox>
                </template>
                <template v-slot:item.acciones="{ item }">
                    <router-link :to="`/users-edit/${item.id}`">
                        <v-icon
                        small
                        class="mr-2"
                    >
                        mdi-pencil
                    </v-icon>
                    </router-link>
                    
                    <v-icon
                        small
                        @click="deleteUser(item)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { mapState } from 'vuex';

export default {
    data () {
    return {
        search: '',
        headers: [
            { text: 'ID', value: 'id' },
            { text: 'Nombre', value: 'nombre' },
            { text: 'Apellido', value: 'apellidos' },
            { text: 'Pais', value: 'pais' },
            { text: 'Activo', value: 'activo' },
            {
                text: 'Acciones',
                align: 'right',
                sortable: false,
                value: 'acciones',
            },
        ]
    }
    },
    components: {
    },
    methods: {
        async deleteUser(item) {
            const confirm = await this.$confirm(
                "Está seguro de eliminar este usuario?",
                { color: "warning", title: "Eliminar Usuario" }
            );

            if(confirm){
                this.$store.dispatch('deleteUsuario', item.id);
            }
        },
        getUsuarios() {
            this.$store.dispatch('getUsuarios');
        }
    },
    created() {
        this.getUsuarios();

        this.$store.dispatch(SET_BREADCRUMB, [
            { title: "Gestionar Usuarios", route: "alert" }
        ]);
    },
    computed: {
        ...mapState({
            usuarios: state => state.usuarios.usuarios
        })
    }
};
</script>
