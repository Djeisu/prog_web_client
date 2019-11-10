<template>
  <v-container grid-list-xs>
    <user-profile v-for="user in users" :key="user.id" :user="user"/>
  </v-container>
</template>

<script>
import UserProfile from '@/components/user/Profile.vue';

export default {
  name: 'home',
  components: {
    UserProfile,
  },
  computed: {
    users() {
      return this.$store.state.listUsers;
    },
  },
  mounted() {
    this.$store.dispatch('getListUsers');
  },
};
</script>

<style lang="scss" scoped>

</style>
