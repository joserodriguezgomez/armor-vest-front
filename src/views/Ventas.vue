<template>
  <div>
    <v-container fluid>
      <v-row >
        <v-col col="2" offset="8">
          <buscador />
        </v-col>
        <v-col cols="1" offset="0">
          <btn_registrar />
        </v-col>
        <v-col cols="1" offset="0">
          <btn_exportar />
        </v-col>
      </v-row>

      <tabla />
    </v-container>
  </div>
</template>

<script setup>
import tabla from "@/components/Modulo-ventas/tabla_ventas";
import btn_registrar from "@/components/Modulo-ventas/Registrar.vue";
import btn_exportar from "@/components/Modulo-ventas/Exportar.vue";
import buscador from "@/components/Modulo-ventas/Buscador.vue";
</script>


