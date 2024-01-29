<template>
  <v-card color="amber yellow" class="tabs-card">
    <v-tabs v-model="tab" bg-color="transparent" color="basil" grow >
      <v-tab v-for="item in items" :key="item" :value="item" class="custom-tab">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tab-item>
      <v-card v-if="tab === 'Lotes IDIC'">
        <!-- Contenido del componente de Lotes IDIC -->
        <PolizaView />
      </v-card>
    </v-tab-item>
     <v-tab-item>
      <v-card v-if="tab === 'Lotes NO IDIC'">
        <!-- Contenido del componente de Lotes NO IDIC -->
        <noidic />
      </v-card>
    </v-tab-item>
  </v-card>
</template>


<script>
import PolizaView from "@/views/PolizaView";
import noidic from "@/views/noidic";

export default {
  data() {
    return {
      tab: "Lotes IDIC",
      items: ["Lotes IDIC", "Lotes NO IDIC"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  components: {
    PolizaView,
    noidic,
  },
};
</script>
<style>
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
.text-basil {
  color: #ffffff !important;
}
</style>