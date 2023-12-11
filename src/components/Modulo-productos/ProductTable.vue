<template>
  <v-data-table
    :headers="polizaHeaders"
    :items="datosDePolizas"
    item-key="id"
    @click:row="handleRowClick">
  </v-data-table>
</template>

<script>
export default {
  name: 'ProductTable',
  props: {
    datosDePolizas: Array,
    polizaHeaders: Array
  },
  data() {
    return {
 
    };
  },
  methods: {
    handleRowClick(event, item) {
      console.log(item.item); // Ahora debería mostrar el objeto del producto
      this.$emit('select-product', item.item);
    }
  }
};
</script>

