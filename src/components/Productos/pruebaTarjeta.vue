<template>
  <v-container fluid class="mi-fondo-personalizado">
    <!-- Filtros -->
    <v-row>
      <v-col cols="12" sm="3">
        <v-text-field v-model="filterTalla" label="Filtrar por Talla"></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <v-text-field v-model="filterCliente" label="Filtrar por Cliente"></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <v-text-field v-model="filterSerie" label="Filtrar por Serie"></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <v-btn color="primary" dark @click="resetFilters">Limpiar Filtros</v-btn>
      </v-col>
    </v-row>

    <!-- Botón Agregar -->
    <v-row>
      <v-col cols="12" offset="11">
        <v-btn
          class="v-btn--floating"
          color="primary"
          dark
          fab
          @click="openDialog(null, true, true)"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Lista de Productos -->
    <v-row>
      <v-col v-for="chaleco in filteredProductData" :key="chaleco.idChaleco" cols="12" sm="3" md="3">
        <!-- Aquí tu tarjeta de producto -->
      </v-col>
    </v-row>

    <!-- Diálogo para Ver/Editar -->
    <v-dialog v-model="dialog" max-width="800px">
      <!-- Contenido del diálogo -->
    </v-dialog>
  </v-container>
</template>


<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      selectedChaleco: null,
      isEditing: false,
      filterTalla: "",
      filterCliente: "",
      filterSerie: "",
    };
  },
  computed: {
    ...mapState("products", ["productData"]),
    filteredProductData() {
      // Aplica filtros según los valores actuales de filterTalla, filterCliente y filterSerie
      let filtered = this.productData;

      if (this.filterTalla) {
        filtered = filtered.filter(chaleco => chaleco.talla.toLowerCase().includes(this.filterTalla.toLowerCase()));
      }

      if (this.filterCliente) {
        filtered = filtered.filter(chaleco => chaleco.cliente.toLowerCase().includes(this.filterCliente.toLowerCase()));
      }

      if (this.filterSerie) {
        filtered = filtered.filter(chaleco => chaleco.serie.toLowerCase().includes(this.filterSerie.toLowerCase()));
      }

      return filtered;
    },
  },
  methods: {
    ...mapActions("products", ["fetchProductData", "updateProduct", "addProduct"]),

    // Método para limpiar filtros
    resetFilters() {
      this.filterTalla = "";
      this.filterCliente = "";
      this.filterSerie = "";
    },

    // Resto de métodos como openDialog, closeDialog, saveChanges, deleteChaleco, etc.
  },
  mounted() {
    this.$store.dispatch("products/fetchProductData");
  },
};
</script>

