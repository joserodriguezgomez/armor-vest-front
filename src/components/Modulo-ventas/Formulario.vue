<template>
  <v-sheet width="1000" class="mx-auto">
    <v-form @submit.prevent>
      <v-autocomplete
        label="Cliente"
        :items="[
          'Banco Santander',
          'Prosegur',
          'Caja los Andes',
          'Municipalidad de Providencia',
          'Banco de Chile',
          'Falabella',
        ]"
      ></v-autocomplete>
      <v-autocomplete
        label="Articulo"
        :items="[
          'Chaleco',
          'Casco',
          'Funda',
          ]"
      ></v-autocomplete>
      <v-autocomplete
        label="Serie"
        :items="[
          '12345',
          '321654',
          '741852',
        ]"
      ></v-autocomplete>
      <v-btn type="submit" block class="mt-2">Registrar Nueva Venta</v-btn>
    </v-form>
  </v-sheet>
</template>
<script>
export default {};
</script>