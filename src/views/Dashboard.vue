<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <line-chart />
      </v-col>
      <v-col cols="12" md="6">
        <bar-chart />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <cargaMasiva />
      </v-col>
      <v-col cols="12" md="4">
        <VencimientoPanel />
      </v-col>
      <v-col cols="12" md="4">
        <VencimientoPoliza />
      </v-col>
    </v-row>

<v-row>
      <v-col cols="12" md="12">
        <ControlStock />
      </v-col>
    </v-row>


  </v-container>
</template>



<script setup>
  import cargaMasiva from '@/components/Modulo-dashboard/LateralBar.vue';
  import BarChart from '@/components/Modulo-dashboard/Lineas.vue'; // Reemplaza con la ruta correcta
  import PieChart from '@/components/Modulo-dashboard/Circulo.vue'; // Reemplaza con la ruta correcta
  import LineChart from '@/components/Modulo-dashboard/Prueba.vue';
  import VencimientoPanel from '@/components/Modulo-dashboard/VencimientoPanel.vue'; // Reemplaza con la ruta correcta
  import VencimientoPoliza from '@/components/Modulo-dashboard/VencimientoPoliza.vue';
  import ControlStock from '@/components/Productos/ProductList.vue';
  // import ControlStock from '@/components/Modulo-dashboard/ControlStock.vue';
</script>

<style scoped>
.transparent-card {
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #ccc;
}
.white--text {
  color: white !important;
}
</style>
