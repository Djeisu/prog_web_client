
<template>
  <user-form :action="'Update'" @form="submit">
    <v-btn text to="/auth">
      Login
    </v-btn>
  </user-form>
</template>

<script>
import UserForm from '@/components/user/Form.vue';

export default {
  name: 'updateProfile',
  components: {
    UserForm,
  },
  methods: {
    submit(form) {
      this.$store.dispatch('updateUser', form);
    },
  },
};
</script>

<style scoped></style>
