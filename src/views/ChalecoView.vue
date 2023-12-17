<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <chalecoTable  />
      </v-col>

    </v-row>
  </v-container>
</template>



<script>
import chalecoTable from "@/components/Modulo-chalecos/ChalecoTabla.vue"



export default {
  components: {
    chalecoTable,
  },
  name: 'ListaProductos',
  computed: {
  }
};
</script>
