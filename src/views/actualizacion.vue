<template>
  <v-card color="amber yellow" class="tabs-card">
    <v-tabs v-model="tab" bg-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item" :value="item" class="custom-tab">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tab-item >
      <v-card v-if="tab === 'Ventas'">
        <ventas />

        <!-- Contenido del componente de clientes -->
      </v-card>
    </v-tab-item>

    <v-tab-item>
      <v-card v-if="tab === 'Chalecos'">
        <!-- Contenido del componente de Chalecos -->
        <chalecoView />
      </v-card>
    </v-tab-item>

    <v-tab-item>
      <v-card v-if="tab === 'Muestras'">
        <!-- Contenido del componente de Lotes IDIC -->
        <muestras />
      </v-card>
    </v-tab-item>

    <v-tab-item>
      <v-card v-if="tab === 'Devolucion'">
        <!-- Contenido del componente de Chalecos -->
        <devoluciones />
      </v-card>
    </v-tab-item>
    
  </v-card>
</template>
<script >
import ventas from "@/views/Ventas.vue";
import muestras from "@/views/muestras.vue";
import devoluciones from "@/views/devoluciones.vue";
// import Componente1_cliente from "@/views/Clientes.vue";
import chalecoView from "@/views/chalecoView";

export default {
  data() {
    return {
      tab: "Ventas",
      items: ["Ventas", "Chalecos", "Muestras", "Devolucion",],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  components: {
    ventas,
    muestras,
    devoluciones,
    // Componente1_cliente,  
    chalecoView,
  },
};
</script>
<style scoped>
.tabs-card {
  margin: 0px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   overflow: hidden;
}

.v-tabs {
  background-color: #f5f5f5;
}

.custom-tab {
  margin: 0px;
  padding: 5px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition:  background-color #ffffff 0.3s;
}
.custom-tab .v-tab__content {
  min-width: 60px !important; /* Usa !important para forzar la prioridad */
}

.custom-tab:hover {
  background-color: #ffffff;
}

.v-tabs-slider {
  background-color: #000000;
}
</style>