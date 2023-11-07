<template>
   <div>
    <v-btn v-on:click="navegarAFormulario" to='formulario' variant="text" icon="mdi-plus" ></v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    navegarAFormulario() {
      this.$router.push({ name: 'Formulario' });
    },
  },
}
</script>

<style>

</style>
 