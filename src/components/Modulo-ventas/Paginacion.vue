<template>
     <v-pagination
          v-model="page"
          :length="15"
          :total-visible="7"
        ></v-pagination>
</template>

<script>
export default {
      data () {
      return {
        page: 1,
      }
    },
};
</script>

<style>
</style>