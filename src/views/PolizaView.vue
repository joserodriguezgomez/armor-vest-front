<template>
  <v-container fluid>
    <v-row>
      <v-col cols="7">
        <polizaTable @selected-poliza="selectRow" />
      </v-col>
      <v-col cols="5">
<<<<<<< HEAD
       
=======
         <ChalecosDetail :product="selectedChalecos" />
>>>>>>> 64cf06234f2462b5f7d4a7813865a17905e875ce
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
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
      selectedChalecos:[]
    }
  },
  components: {
    polizaTable,
    ChalecosDetail
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

