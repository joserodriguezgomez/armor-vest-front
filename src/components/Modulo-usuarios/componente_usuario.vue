<template>
  <v-container fluid>
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-account-group"></v-icon> &nbsp; Usuarios

        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          label="Buscar Usuario"
          single-line
          flat
          hide-details
          variant="solo-filled"
        ></v-text-field>
      </v-card-title>

      <v-divider></v-divider>
      <v-data-table v-model:search="search" :items="items">
        <template v-slot:header.stock>
         
        </template>

        <template v-slot:item.Usuario="{ item }">
          <v-img
            src="@/assets/foto_usuario.png"
            alt="Imagen de perfil"
            class="imagen-perfil"
          ></v-img>
        </template>

       <template v-slot:item.Perfil="{ item }">
          <v-col>
            {{ item.Perfil }}
          </v-col>
        </template>

        
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      items: [
        {
          Nombre: "Andres Aguayo",
          Usuario: "aguayo14", 
          Correo: "andres@aguayo.legal",
          Perfil: "Administrador",
        },
        {
          Nombre: "Valentina Mejias",
          Usuario: "valem",
          Correo: "valentina.mejias@armorvest.cl",
          Perfil: "Usuario",
        },
        {
          Nombre: "Mileydis Sotolongo ",
          Usuario: "Mily",
          Correo: "msotolongo@aguayo.legal",
          Perfil: "Vendedor",
        },
      ],
    };
  },
};
</script>

<style scoped>
.imagen-perfil {
  width: 50px; /* Ancho personalizado */
  height: 60px; /* Alto personalizado */
  border-radius: 0%; /* Forma de círculo (opcional) */
}
</style>