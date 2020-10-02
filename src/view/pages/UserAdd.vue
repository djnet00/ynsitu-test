<template>
  <div data-app>
        <h1>AGREGAR USUARIO</h1>

        <b-card class="mt-3">
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <v-text-field
                    v-model="usuario.nombre"
                    :rules="nombreRules"
                    label="Nombre"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="usuario.apellidos"
                    :rules="apellidosRules"
                    label="Apellidos"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="usuario.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="usuario.pais"
                    :rules="paisRules"
                    label="Pais"
                    required
                ></v-text-field>

                <v-checkbox
                    v-model="usuario.activo"
                    label="Usuario Activo"
                    required
                ></v-checkbox>

                <b-button :disabled="!valid" variant="danger" @click="validate">GUARDAR</b-button>
            </v-form>
        </b-card>
  </div>
</template>

<script>
/* eslint-disable */
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
    data: () => ({
        valid: true,
        nombre: '',
        nombreRules: [
            v => !!v || 'Nombre es requerido',
            v => (v && v.length > 2) || 'Nombre debe ser mayor a 2 carecteres.',
        ],
        apellidos: '',
        apellidosRules: [
            v => !!v || 'Apellido es requerido',
            v => (v && v.length > 2) || 'Apellido debe ser mayor a 2 carecteres.',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail es requerido',
            v => /.+@.+\..+/.test(v) || 'E-mail debe ser válido',
        ],
        pais: '',
        paisRules: [
            v => !!v || 'Pais es requerido',
            v => (v && v.length > 2) || 'Pais debe ser mayor a 2 carecteres.',
        ],
        usuario: {}
    }),

    methods: {
      validate(){
        const valida = this.$refs.form.validate();
        
        if(valida) {
          this.addUsuario(this.usuario);
        }
      },
      addUsuario(usuario){
          this.$store.dispatch('addUsuario', usuario);
      }
    },
    mounted() {
        this.$store.dispatch(SET_BREADCRUMB, [
            { title: "Agregar Usuario", route: "alert" }
        ]);
    },
}
</script>
