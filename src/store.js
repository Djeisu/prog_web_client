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
    archives: null,
    folders: null,
    listUsers: null,
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
    setArchives(state, payload) {
      state.archives = payload;
    },
    setFolders(state, payload) {
      state.folders = payload;
    },
    setListUsers(state, payload) {
      state.listUsers = payload;
    },
  },
  actions: {
    // checkAuth({ dispatch, commit }) {
    //   // make localstorage
    // },
    async getInfoUser({ state, commit, dispatch }, payload) {
      try {
        const response = await axios.get(`${state.apiUrl}/users/${payload}`, {
          headers: { Authorization: state.token },
        });
        commit('setUser', response.data);
        commit('setIsAuthenticated', true);
        dispatch('getArchives', { folder: null });
        dispatch('getFolders', { folder: null });
        dispatch('getListUsers');
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
    async getArchives({ state, commit }, payload) {
      try {
        const response = await axios.get(`${state.apiUrl}/api/v1/archives_by_folder/${payload.folder}`, {
          headers: { Authorization: state.token },
        });
        commit('setArchives', response.data.archives);
      } catch (error) {
        commit('setArchives', null);
      }
    },
    async getFolders({ state, commit }, payload) {
      try {
        const response = await axios.get(`${state.apiUrl}/api/v1/folders_by_folder/${payload.folder}`, {
          headers: { Authorization: state.token },
        });
        commit('setFolders', response.data.folders);
      } catch (error) {
        commit('setFolders', null);
      }
    },
    async newArchive({ state, dispatch }, payload) {
      const formData = new FormData();
      formData.append('archive', payload.file);
      formData.append('title', payload.file.name);
      formData.append('folder_id', payload.folder);

      try {
        await axios.post(`${state.apiUrl}/api/v1/archives`,
          formData,
          { headers: { Authorization: state.token, 'Content-Type': 'multipart/form-data' } });

        dispatch('getArchives', { folder: payload.folder });
      } catch (error) {
        console.error(error);
      }
    },
    async destroyArchive({ state, dispatch }, payload) {
      try {
        await axios.delete(`${state.apiUrl}/api/v1/archives/${payload.id}`,
          { headers: { Authorization: state.token } });

        dispatch('getArchives', { folder: payload.folder });
      } catch (error) {
        console.error(error);
      }
    },
    async newFolder({ state, dispatch }, payload) {
      const formData = new FormData();
      formData.append('title', payload.name);
      formData.append('folder_id', payload.folder);

      try {
        await axios.post(`${state.apiUrl}/api/v1/folders`,
          formData,
          { headers: { Authorization: state.token, 'Content-Type': 'multipart/form-data' } });

        dispatch('getFolders', { folder: payload.folder });
      } catch (error) {
        console.error(error);
      }
    },
    async destroyFolder({ state, dispatch }, payload) {
      try {
        await axios.delete(`${state.apiUrl}/api/v1/folders/${payload.id}`,
          { headers: { Authorization: state.token } });

        dispatch('getFolders', { folder: payload.folder });
      } catch (error) {
        console.error(error);
      }
    },
    async getListUsers({ state, commit }) {
      try {
        const response = await axios.get(`${state.apiUrl}/users`,
          { headers: { Authorization: state.token } });

        commit('setListUsers', response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    },
  },
});
