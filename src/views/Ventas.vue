<template>
  <div>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="6" offset="0">
          <Buscador />
        </v-col>
        <v-col col="1" offset="3">
          <Filtrar />
        </v-col>
        <v-col cols="1" offset="12">
          <btn_exportar />
        </v-col>
        <v-col cols="1" offset="12">
          <btn_registrar />
        </v-col>
        
      </v-row>

      <tabla />
      <Paginacion/>
    </v-container>
  </div>
</template>

<script setup>
import tabla from "@/components/Modulo-ventas/tabla_ventas";
import btn_registrar from "@/components/Modulo-ventas/Registrar.vue";
import btn_exportar from "@/components/Modulo-ventas/Exportar.vue";
import Filtrar from "@/components/Modulo-ventas/Filtrar.vue";
import Buscador from "@/components/Modulo-ventas/Buscador.vue";
import Paginacion from "@/components/Modulo-ventas/Paginacion.vue";
</script>


<style>
/* .botones{
  margin: 5px;
  border: 2px solid rgb(251, 247, 247);
  border-radius: 10px;
} */
</style>