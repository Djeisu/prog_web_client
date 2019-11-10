<template>
  <user-profile :user="$store.state.user"/>
</template>

<script>
import UserProfile from '@/components/user/Profile.vue';

export default {
  name: 'showProfile',
  components: {
    UserProfile,
  },
};
</script>

<style lang="scss" scoped>

</style>
