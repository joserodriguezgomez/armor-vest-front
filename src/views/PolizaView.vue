<template>
  <v-container fluid>
    <v-row>
      <v-col cols="7">
        <polizaTable  />
      </v-col>
      <v-col cols="5">
       bla
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import polizaTable from "@/components/Modulo-polizas/PolizaTabla.vue"

import { mapGetters } from 'vuex'


export default {
  components: {
    polizaTable,
  },
  name: 'ListaProductos',
  computed: {
    ...mapGetters('polizas', ['getPolizas'])
  },
  mounted() {
    console.log('polizas:', this.getPolizas);
  }
};
</script>

