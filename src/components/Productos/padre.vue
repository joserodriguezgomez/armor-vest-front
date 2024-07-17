<template>
  <v-container fluid class="mi-fondo-personalizado">
    <v-row>
      <v-col cols="12" md="6" sm="4">
        <v-text-field
          v-model="filterTalla"
          label="Filtrar por Talla"
          placeholder="Ej: S, M, L"
          @keyup.native="filterProducts"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" sm="4">
        <v-text-field
          v-model="filterCliente"
          label="Filtrar por Cliente"
          placeholder="Ej: Juan Pérez"
          @keyup.native="filterProducts"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" sm="4">
        <v-text-field
          v-model="filterSerie"
          label="Filtrar por Serie"
          placeholder="Ej: 123456"
          @keyup.native="filterProducts"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="3" md="2">
        <v-btn color="primary" dark fab @click="openDialog(null, true, true)">
          <v-icon>mdi-plus</v-icon>Agregar Producto
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="product in filteredProducts" :key="product.idChaleco" cols="12" sm="6" md="4">
        <product-card
          :product="product"
          @open-dialog="openDialog"
          @edit-product="editProduct"
          @delete-product="deleteProduct"
        />
      </v-col>
    </v-row>

    <product-dialog
      :product="selectedProduct"
      :is-editing="isEditing"
      :dialog="dialog"
      @close-dialog="closeDialog"
      @save-changes="updateProduct"
    />

    <v-dialog v-model="showLoader" persistent>
      <v-card>
        <v-card-title>Cargando...</v-card-title>
        <v-card-text>
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ProductCard from "./productCard.vue";
import ProductDialog from "./productDialog.vue";

import { mapState, mapActions, mapMutations } from "vuex";

export default {
  components: {
    ProductCard,
    ProductDialog
  },
  data() {
    return {
      dialog: false,
      selectedProduct: null,
      isEditing: false,
      filterTalla: "",
      filterCliente: "",
      filterSerie: "",
      isAgregar: false,
      showLoader: false // Indicador de carga
    };
  },
  computed: {
    ...mapState("products", ["productData"]),
    filteredProducts() {
      return this.productData.filter(product => {
        const matchesTalla =
          this.filterTalla === "" ||
          product.talla.toLowerCase().includes(this.filterTalla.toLowerCase());
        const matchesCliente =
          this.filterCliente === "" ||
          product.cliente
            .toLowerCase()
            .includes(this.filterCliente.toLowerCase());
        const matchesSerie =
          this.filterSerie === "" ||
          product.serie.toLowerCase().includes(this.filterSerie.toLowerCase());
        return matchesTalla && matchesCliente && matchesSerie;
      });
    }
  },
  mounted() {
    this.$store.dispatch("products/fetchProductData");
  },
  methods: {
    ...mapMutations("products", ["SET_PRODUCT_DATA"]),
    ...mapActions("products", [
      "fetchProductData",
      "updateProduct",
      "addProduct",
      "deleteProduct"
    ]),

    filterProducts() {
      // Filtra los productos en tiempo real mientras se escriben los filtros
      this.$store.commit(
        "products/SET_FILTERED_PRODUCTS",
        this.filteredProducts
      );
    },

    openDialog(product = null, edit = false, agregar = false) {
      this.isEditing = edit;
      this.isAgregar = agregar;
      if (agregar) {
        // Inicializa un nuevo objeto para agregar
        this.selectedProduct = {
          idChaleco: null,
          lote: null,
          serie: null,
          idic: null,
          polizaNombre: null,
          vencimientoPoliza: null,
          vencimientoPanel: null,
          modelo: null,
          status: null,
          talla: null,
          precio: null,
          cliente: null,
          vendedor: null,
          factura: null,
          gd: null,
          fechaVenta: null,
          comentarios: null,
          createdAt: null,
          createdBy: null,
          updatedAt: null,
          updatedBy: null,
          vencimiento_funda: null,
          precio_funda: null,
          dup: null
        };
      } else {
        this.selectedProduct = { ...product };
      }
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
      this.selectedProduct = null;
    },

    editProduct(product) {
      this.openDialog(product, true);
    },

    deleteProduct(idChaleco) {
      if (
        confirm(`¿Estás seguro de eliminar el producto con ID ${idChaleco}?`)
      ) {
        this.showLoader = true; // Muestra el indicador de carga
        this.$store
          .dispatch("products/deleteProduct", idChaleco)
          .then(() => {
            this.showLoader = false; // Oculta el indicador de carga
            this.$store.dispatch("products/fetchProductData"); // Recarga los datos
          })
          .catch(error => {
            this.showLoader = false; // Oculta el indicador de carga
            console.error("Error al eliminar el producto:", error);
            alert("Error al eliminar el producto. Inténtalo de nuevo.");
          });
      }
    },

    updateProduct(updatedProduct) {
      this.showLoader = true; // Muestra el indicador de carga
      this.$store
        .dispatch("products/updateProduct", updatedProduct)
        .then(() => {
          this.showLoader = false; // Oculta el indicador de carga
          this.closeDialog(); // Cierra el diálogo
          this.$store.dispatch("products/fetchProductData"); // Recarga los datos
        })
        .catch(error => {
          this.showLoader = false; // Oculta el indicador de carga
          console.error("Error al actualizar el producto:", error);
          alert("Error al actualizar el producto. Inténtalo de nuevo.");
        });
    }
  }
};
</script>

<style scoped>
.mi-fondo-personalizado {
  background-color: #f5f5f5; /* Cambia el color de fondo aquí */
}
</style>

