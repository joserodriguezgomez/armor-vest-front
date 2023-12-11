<template>
  <v-timeline>
    <v-timeline-item
      v-for="chaleco in product"
      :key="chaleco._id"
      :dot-color="getColor(chaleco)">
      
      <template v-slot:opposite>{{ chaleco.fechaElaboracion }}</template>
      
      <h3 class="mb-2">Chaleco Talla {{ chaleco.talla }}</h3>
      <p>Fecha de Vencimiento: {{ chaleco.fechaVencimiento }}</p>

      <div v-if="chaleco.cliente">
        <p>Cliente: {{ chaleco.cliente.nombre }}</p>
        <p>Contacto: {{ chaleco.cliente.contacto }}</p>
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
      return chaleco.cliente ? 'red' : 'green';
    }
  },
};
</script>
