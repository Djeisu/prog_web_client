<template>
  <v-card class="mx-auto ma-8" max-width="434" tile>
    <v-img height="100%"
      src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg">
      <v-row align="end" class="fill-height">
        <v-col class="py-0">
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
            </v-list-item-content>
          </v-list-item>
          <v-list-item></v-list-item>
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
              <v-list-item-title class="title">{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
    <v-btn color="pink" dark small absolute bottom right fab
      v-if="user.id === cuser.id" @click="deleteUser()">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'userProfile',
  props: {
    user: Object,
  },
  computed: {
    cuser() {
      return this.$store.state.user;
    },
  },
  methods: {
    deleteUser() {
      this.$store.dispatch('deleteUser');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
