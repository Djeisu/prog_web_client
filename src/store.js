import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// eslint-disable-next-line
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: 'http://localhost:3000',
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    // checkAuth({ dispatch, commit }) {
    //   // make localstorage
    // },
    async getInfoUser({ state, commit }, payload) {
      try {
        const response = await axios.get(`${state.apiUrl}/users/${payload}`, {
          headers: { Authorization: state.token },
        });
        commit('setUser', response.data);
        commit('setIsAuthenticated', true);
        router.push('/home');
      } catch (error) {
        commit('setUser', null);
        commit('setToken', null);
        commit('setIsAuthenticated', false);
        commit('setError', error);
      }
    },
    async login({ dispatch, state, commit }, payload) {
      try {
        const response = await axios.post(`${state.apiUrl}/auth/login`, payload);
        commit('setToken', response.data.token);
        dispatch('getInfoUser', response.data.username);
      } catch (error) {
        commit('setUser', null);
        commit('setToken', null);
        commit('setIsAuthenticated', false);
        commit('setError', error);
      }
    },
    async registerUser({ dispatch, state, commit }, payload) {
      try {
        await axios.post(`${state.apiUrl}/users`, payload);
        dispatch('login', {
          email: payload.email,
          password: payload.password,
        });
      } catch (error) {
        commit('setError', error);
      }
    },
    async updateUser({ state, commit }, payload) {
      try {
        await axios.put(`${state.apiUrl}/users/${state.user.username}`, payload, {
          headers: { Authorization: state.token },
        });
        router.push('/home');
      } catch (error) {
        commit('setError', error);
      }
    },
    async deleteUser({ state, commit }) {
      try {
        await axios.delete(`${state.apiUrl}/users/${state.user.username}`, {
          headers: { Authorization: state.token },
        });
        commit('setUser', null);
        commit('setToken', null);
        commit('setIsAuthenticated', false);
        router.push('/auth');
      } catch (error) {
        commit('setError', error);
      }
    },
    signOut({ commit }) {
      commit('setUser', null);
      commit('setToken', null);
      commit('setIsAuthenticated', false);
      router.push('/auth');
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    },
  },
});
