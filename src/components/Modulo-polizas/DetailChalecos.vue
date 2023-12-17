<template>
  <v-timeline>
    <v-timeline-item
      v-for="chaleco in product"
      :key="chaleco.ID_CHALECO"
      :dot-color="getColor(chaleco)">
    
      
      <h3 class="mb-2">Id chaleco: {{ chaleco.ID_CHALECO }}</h3>
      <p>Modelo: {{ chaleco.MODELO }}</p>
      <p>Fecha de Vencimiento panel: {{ chaleco.VENCIMIENTO_PANEL }}</p>
      <p>Fecha de Vencimiento funda: {{ chaleco.VENCIMIENTO_FUNDA }}</p>
      

      <div v-if="chaleco.CLIENTE">
        <p>Cliente: {{ chaleco.CLIENTE }}</p>
      </div>
      <div v-else>
        <p>Chaleco sin cliente asignado</p>
      </div>

    </v-timeline-item>
  </v-timeline>
</template>


<script>
export default {
  name: 'ProductDetail',
  props: {
    product: Object
  },
  methods: {
    getColor(chaleco) {
      return chaleco.CLIENTE ? 'red' : 'green';
    }
  },
};
</script>