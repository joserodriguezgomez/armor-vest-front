<template>

  <v-container>
    <v-row>
      
      <v-col cols="12" sm="6">
        <!-- Componente de Vuetify para la selección de archivos -->
        <v-text-field
          v-model="polizaData"
          label="Ingresar poliza"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <!-- Botón para subir el archivo -->
        <v-btn color="primary" @click="submitFile">
          Enviar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>

import axios from "axios";
import {mapState, mapMutations} from "vuex";

export default {
    data(){
        return {
            polizaData: ''
        }
    },
    computed:{
        ...mapMutations("polizas",["SET_SHOW_ALERT","SET_MSG_ALERT"]),
    },
    methods: {
        async submitFile(){

            try {
            const url = `https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api/deletePoliza/${this.polizaData}`;
            let response = await axios.get(url)
            this.$store.commit('polizas/SET_MSG_ALERT', "Poliza eliminada con éxito")
            this.$store.commit('polizas/SET_SHOW_ALERT', true)
                
            } catch (error) {
                console.log(error)
            } finally {
                setTimeout(() => {
                this.$store.commit('polizas/SET_SHOW_ALERT', false)
                }, 3000); // Ajusta este valor según lo necesites
            }


        }
    },
}
</script>