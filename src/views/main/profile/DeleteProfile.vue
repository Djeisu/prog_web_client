<template>
  <v-container>
    <v-btn
      color="error"
      @click="deleteUser"
      data-cy="deleteAccountBtn">
      Delete Account
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'deleteProfile',
  methods: {
    deleteUser() {
      this.$store.dispatch('deleteUser');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
