<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{action}} Form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                prepend-icon="mdi-account"
                name="name"
                label="Name"
                type="text"
                v-model="form.name"
                :rules="textRules"
                data-cy="registerNameField"
                required>
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-account-arrow-right"
                name="username"
                label="User Name"
                type="text"
                v-model="form.username"
                :rules="textRules"
                data-cy="registerUserNameField"
                required>
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-email"
                name="email"
                label="Email"
                type="email"
                v-model="form.email"
                :rules="emailRules"
                data-cy="registerEmailField"
                required>
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                required
                v-model="form.password"
                :rules="passwordRules"
                data-cy="registerPasswordField">
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                required
                v-model="form.confirmpassword"
                :rules="passwordRules"
                data-cy="registerConfirmPasswordField">
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :disabled="!valid"
              @click="submit"
              data-cy="registerSubmitBtn">
              {{action}}
            </v-btn>

            <slot></slot>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'userForm',
  props: {
    action: String,
  },
  data() {
    return {
      valid: false,
      form: {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6
                      || 'Password must be greater than 6 characters',
      ],
      textRules: [
        v => !!v || 'Field is required',
        v => v.length >= 3
                      || 'This field need be more 3 letters',
      ],
    };
  },
  mounted() {
    if (this.$store.state.user) this.form = this.$store.state.user;
    this.form.password = '';
    this.form.confirmpassword = '';
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('form', this.form);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
