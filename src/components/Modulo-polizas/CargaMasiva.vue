<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <!-- Componente de Vuetify para la selección de archivos -->
        <v-file-input
          label="Adjuntar Excel para carga masiva"
          @change="handleFileUpload"
          :clearable="true"
          clear-icon="mdi-close-circle-outline"
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
export default {
  data() {
    return {
      file: null,
    };
  },
  methods: {
    handleFileUpload(file) {
      this.file = file;
    },
    async submitFile() {
      if (!this.file) return;
      let formData = new FormData();
      formData.append('file', this.file);

      try {
        let response = await this.$axios.post('http://tu-backend.com/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
