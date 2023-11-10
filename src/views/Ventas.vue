<template>
  <div class="bg- relative border round-lg">
    <v-container fluid>
      <v-row no-gutters class="botones">
        <v-col cols="3" offset="0">
          <Buscador />
        </v-col>
        <v-col col="1" offset="6">
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

      <Paginacion />
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
import Formulario from "@/components/Modulo-ventas/Formulario.vue";
</script>


<style>
.botones {
  background-color: #ffffff;
  margin: 10px;
}
</style>