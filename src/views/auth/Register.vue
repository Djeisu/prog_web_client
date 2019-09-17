
<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Register Form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                prepend-icon="mdi-account"
                name="name"
                label="Name"
                type="text"
                v-model="name"
                :rules="textRules"
                data-cy="registerNameField"
                required>
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-account-arrow-right"
                name="userName"
                label="User Name"
                type="text"
                v-model="userName"
                :rules="textRules"
                data-cy="registerUserNameField"
                required>
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-email"
                name="email"
                label="Email"
                type="email"
                v-model="email"
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
                v-model="password"
                :rules="passwordRules"
                data-cy="registerPasswordField">
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                required
                v-model="confirmPassword"
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
              Register
            </v-btn>

            <v-btn text to="/auth">
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      valid: false,
      name: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
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
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('register', {
          name: this.name,
          username: this.userName,
          email: this.email,
          password: this.password,
          confirmpassword: this.confirmPassword,
        });
      }
    },
  },
};
</script>

<style scoped></style>
