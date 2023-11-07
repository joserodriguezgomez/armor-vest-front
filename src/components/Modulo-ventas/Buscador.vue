<template>
  <v-text-field
    v-model="firstName"
    :rules="rules"
    label="Buscar"
    solo-inverted
    dense
    class="search-field"
  >
    <template v-slot:append>
      <v-btn
        variant="text"
        icon
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
  </v-text-field>
</template>

<style scoped>
.search-field {
  position: relative;
}

.search-field .v-input__append-inner {
  position: absolute;
  top: 50%;
  transform: translateY(-40%);
  right: 5px; /* Ajusta el valor según tu preferencia */
}
</style>