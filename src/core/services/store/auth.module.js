// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_USER = "updateUser";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const SET_ERROR = "setError";

// firebase
import { auth } from "@/firebase";

// router
import router from '@/router'

const state = {
  errors: null,
  user: {},
  isAuthenticated: false
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  [LOGIN](context, credentials) {
    auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(res => {
        const data = {
          email: res.user.email,
          uid: res.user.uid,
          token: res.user.refreshToken
        };
        context.commit(SET_AUTH, data);

        router.push('/dashboard');
      })
      .catch(error => context.commit(SET_ERROR, error));
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(res => {
        const newUser = {
          email: res.user.email,
          uid: res.user.uid,
          token: res.user.refreshToken
        };

        context.commit(SET_AUTH, newUser);

        router.push('/dashboard');
      })
      .catch(error => context.commit(SET_ERROR, error));
  },
  [VERIFY_AUTH](context, data) {
    context.commit(SET_AUTH, data);
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = null;
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = null;
    auth.signOut();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
