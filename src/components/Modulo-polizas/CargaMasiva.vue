<template>

  <v-container>
    <v-row>
      
      <v-col cols="12" sm="6">
        <!-- Componente de Vuetify para la selección de archivos -->
        <v-file-input
          label="Adjuntar Excel para carga masiva"
          @change="handleFileUpload"
          :clearable="true"
          clear-icon="mdi-file"
          prepend-icon="mdi-paperclip"
          accept=".xlsx"
        ></v-file-input>
      </v-col>
      <v-col cols="12" sm="6">
        <!-- Botón para subir el archivo -->
        <v-btn color="primary" @click="submitFile">
          Subir Archivo
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import axios from "axios";

import {mapState, mapMutations} from "vuex";

export default {
  data() {
    return {
      file: null,
    };
  },
  computed:{
      ...mapMutations("polizas",["SET_SHOW_ALERT","SET_MSG_ALERT"]),
      ...mapState("polizas", [
      "showAlert",
      "falertMessage"
    ]),
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async submitFile() {
      if (!this.file) return;
      let formData = new FormData();
      formData.append('file', this.file);

      try {

        console.log(formData)
        const url = "https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api/uploadfile/";
        let response = await axios.post(url, formData)
        this.$store.commit('polizas/SET_MSG_ALERT', "Poliza cargada con éxito")
        this.$store.commit('polizas/SET_SHOW_ALERT', true)
      } catch (error) {
        console.error(error);
      }
      finally {
    // Ocultar la alerta después de 3 segundos, independientemente del resultado de la carga
      setTimeout(() => {
      this.$store.commit('polizas/SET_SHOW_ALERT', false)
    }, 3000); // Ajusta este valor según lo necesites
  }
    },
  },
};
</script>
