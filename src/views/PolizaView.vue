<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="12">
        <polizaTable @selected-poliza="selectRow" />
      </v-col>
      <!-- Botón para abrir la ventana desplegable -->
      <!-- Ventana desplegable para cargaMasiva -->
    </v-row>
  </v-container>
</template>




<script>
import cargaMasiva from '@/components/Modulo-polizas/CargaMasiva.vue';
import ChalecosDetail from '@/components/Modulo-polizas/DetailChalecos.vue';
function buscarChalecosPorPoliza(chalecos,polizaId) {
  // Primero, encuentra la póliza que coincide con el ID y la serie proporcionados
  const chalecosEncontrados = chalecos.find(chaleco => chaleco.ID_POLIZA === polizaId );

  // Si no se encuentra la póliza, retorna un array vacío
  if (!chalecosEncontrados) {
    console.log("no se encontraron chalecos asociados a la poliza con id bla")
    return [];
  }

  // Filtra y devuelve los chalecos que están asociados con la póliza encontrada
  return chalecos.filter(chaleco => chaleco.ID_POLIZA === polizaId);
}




import polizaTable from "@/components/Modulo-polizas/PolizaTabla.vue"
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";


export default {
  data() {
    return {
      selectedChalecos:[],
      mostrarCargaMasiva: false
    }
  },
  components: {
    polizaTable,
    ChalecosDetail,
    cargaMasiva
  },
  name: 'ListaProductos',
  computed: {
    ...mapState(
      'chalecos',['chalecos']
      )
  },
  created() {
    this.main_title = "Modulo Polizas";
  },
  methods: {
    selectRow(row) {
      this.selectedChalecos = buscarChalecosPorPoliza(this.chalecos,row.ID)
      console.log(this.selectedChalecos)
    },
  },
};
</script>

