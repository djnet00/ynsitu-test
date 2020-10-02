/* eslint-disable */
// firebase
import { db } from "@/firebase";

// router
import router from '@/router'

const state = {
    usuarios: [],
    usuario: {id: '', nombre: '', apellido: '', email: '', pais: '', activo: false},
    loading: false,
};

const actions = {
    getUsuarios({commit, state}){
  
        const usuarios = []
        db.collection('usuarios').get()
          .then(res => {
            res.forEach(doc => {
              let usuario = doc.data()
              usuario.id = doc.id
  
              usuarios.push(usuario)
            })
  
            commit('setUsuarios', usuarios)
          })
    },
    getUsuario({commit, state}, id){
        db.collection('usuarios').doc(id).get()
          .then(doc => {
            let usuario = doc.data()
            usuario.id = doc.id
  
            commit('setUsuario', usuario)
          })
    },
    editUsuario({commit, state}, usuario){
        db.collection('usuarios').doc(usuario.id).update({
          nombre: usuario.nombre,
          apellidos: usuario.apellidos,
          email: usuario.email,
          pais: usuario.pais,
          activo: usuario.activo
        })
        .then(() => {
          router.push('/users')
        })
    },
    addUsuario({commit, state}, usuario){
        db.collection('usuarios').add({
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            email: usuario.email,
            pais: usuario.pais,
            activo: usuario.activo ? usuario.activo : false
        })
        .then(() => {
          router.push('/users')
        })
    },
    deleteUsuario({commit, dispatch, state}, id){
        db.collection('usuarios').doc(id).delete()
        .then(() => {
          commit('setDeleteUsuarios', id)
        })
    },
};

const mutations = {
    setUsuarios(state, payload){
        state.usuarios = payload
    },
    setUsuario(state, payload){
        state.usuario = payload
    },
    setDeleteUsuarios(state, payload){
        state.usuarios = state.usuarios.filter(usuario => usuario.id !== payload)
    },
};

export default {
  state,
  actions,
  mutations
};
