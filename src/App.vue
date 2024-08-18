<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex';

export default {
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch('getUser');
    }
  },
};
</script>
