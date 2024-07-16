<template>
  <v-container>
    <!-- Filtros por status y talla -->
    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="product in filteredProducts" :key="product.id">
        <v-card
          :color="getProductColor(product)"
          max-width="300"
          class="mx-auto mb-4"
          @click="selectProduct(product)"
        >
          <v-chip v-if="product.status === 'sold'" color="red" class="ma-2" dark>Vendido</v-chip>
          <v-chip v-else-if="product.status === 'available'" color="green" class="ma-2" dark>Disponible</v-chip>
          <v-card-title>{{ product.numero_poliza }}</v-card-title>
          <v-card-text>
            <p>Talla: {{ product.talla }}</p>
            <p>Precio: ${{ product.precio }}</p>
            <p v-if="product.fecha_vencimiento">Vencimiento: {{ product.fecha_vencimiento }}</p>
            <p v-if="product.panel">Panel: {{ product.panel }}</p>
            <p v-if="product.funda">Funda: {{ product.funda }}</p>
            <p v-if="product.cliente">Cliente: {{ product.cliente }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="editProduct(product)">Editar</v-btn>
            <v-btn text @click="deleteProduct(product)">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Botones para operaciones -->
    <v-row class="mt-4">
      <v-col cols="12" md="4">
        <v-btn color="primary" @click="openSellModal" :disabled="!hasSelectedProducts">Vender Chalecos Seleccionados</v-btn>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn color="error" @click="deleteSelectedProducts" :disabled="!hasSelectedProducts">Eliminar Chalecos Seleccionados</v-btn>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn color="success" @click="addNewProduct">+</v-btn>
      </v-col>
    </v-row>

    <!-- Diálogo para vender productos -->
    <v-dialog v-model="sellModal" max-width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Vender Chalecos</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field v-model="customer" label="Nombre del Cliente" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeSellModal">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="sellProducts">Vender</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'ProductCards',
  data() {
    return {
      products: [
        {
          id: 1,
          numero_poliza: 'P001',
          talla: 'M',
          precio: 1500,
          cliente: null,
          status: 'sold',
          selected: false,
          fecha_vencimiento: '2025-12-31',
          panel: 'Panel frontal',
          funda: 'Exterior',
        },
        {
          id: 2,
          numero_poliza: 'P002',
          talla: 'L',
          precio: 1800,
          cliente: null,
          status: 'available',
          selected: false,
          fecha_vencimiento: '2024-10-15',
          panel: 'Panel trasero',
          funda: 'Interior',
        },
        // Agregar más productos según sea necesario
      ],
      sellModal: false,
      customer: '',
      valid: false,
      filters: {
        status: '',
        talla: '',
      },
    };
  },
  computed: {
    filteredProducts() {
      let filtered = this.products;
      if (this.filters.status) {
        filtered = filtered.filter(product => product.status === this.filters.status);
      }
      if (this.filters.talla) {
        filtered = filtered.filter(product => product.talla === this.filters.talla);
      }
      return filtered;
    },
    hasSelectedProducts() {
      return this.products.some(product => product.selected);
    },
  },
  methods: {
    getProductColor(product) {
      if (product.selected) {
        return 'green lighten-2';
      } else if (product.status === 'sold') {
        return 'red lighten-2';
      } else {
        return 'grey lighten-2';
      }
    },
    selectProduct(product) {
      if (product.status === 'available') {
        product.selected = !product.selected;
      }
    },
    openSellModal() {
      this.sellModal = true;
    },
    closeSellModal() {
      this.sellModal = false;
      this.customer = '';
    },
    sellProducts() {
      if (this.$refs.form.validate()) {
        this.products.forEach(product => {
          if (product.selected) {
            product.status = 'sold';
            product.cliente = this.customer;
            product.selected = false;
          }
        });
        this.closeSellModal();
      }
    },
    deleteProduct(product) {
      const index = this.products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
    },
    deleteSelectedProducts() {
      this.products = this.products.filter(product => !product.selected);
    },
    addNewProduct() {
      const newProductId = this.products.length + 1;
      const newProduct = {
        id: newProductId,
        numero_poliza: `P00${newProductId}`,
        talla: 'M',
        precio: 1500,
        cliente: null,
        status: 'available',
        selected: false,
        fecha_vencimiento: '',
        panel: '',
        funda: '',
      };
      this.products.push(newProduct);
    },
    editProduct(product) {
      // Implementar edición si es necesario
    },
  },
};
</script>

<style scoped>
.v-card {
  cursor: pointer;
  margin: 10px;
}
</style>
