<template>
  <v-container fluid class = "mi-fondo-personalizado">
    <v-row>
      <v-col cols="12" sm="3">
        <v-select v-model="filterTalla" :items="tallaItems" label="Filtrar por Talla"></v-select>
      </v-col>
      <v-col cols="12" sm="3">
        <v-text-field v-model="filterCliente" label="Filtrar por Cliente"></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <v-text-field v-model="filterSerie" label="Filtrar por Serie"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" offset="11">
        <v-btn
          class="v-btn--floating"
          color="primary"
          dark
          fab
          @click="openDialog(chaleco, true, true)"
        >
          <v-icon>mdi-plus</v-icon>
          <!-- Icono dentro del botón -->
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="chaleco in filteredProductData" :key="chaleco.idChaleco" cols="12" sm="3" md="3">
        <v-card
          :class="{
            'card-style': true,
            'card-style-red': chaleco.status === 'vendido',
            'card-style-green': chaleco.status !== 'vendido'
          }"
        >
          <div class="border-top-right">{{chaleco.talla}}</div>

          <v-card-title
            class="veamos"
            :class="chaleco.status === 'vendido' ? 'red lighten-4 primary--text' : 'grey lighten-4'"
          >
            <v-chip variant="flat" color="white" text-color="orange" class="mr-2">{{ chaleco.dup }}</v-chip>
            {{ chaleco.polizaNombre }} - {{ chaleco.serie }}
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text @click="openDialog(chaleco)">
            <p>
              <strong>Vencimiento Poliza:</strong>
              {{ new Date(chaleco.vencimientoPoliza).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
            </p>
            <p>
              <strong>Vencimiento Panel:</strong>
              {{ new Date(chaleco.vencimientoPanel).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
            </p>
            <p>
              <strong>Vencimiento Funda:</strong>
              {{ new Date(chaleco.vencimiento_funda).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
            </p>
            <p>
              <strong>Precio:</strong>
              {{ chaleco.precio }}
            </p>
            <div v-if="chaleco.status === 'vendido'">
              <p>
              <strong>Cliente:</strong>
              {{ chaleco.cliente }}
            </p>
            <p>
              <strong>Fecha de venta:</strong>
              {{ new Date(chaleco.fechaVenta).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
            </p>
            </div>
          </v-card-text>
          <v-card-actions class="primary lighten-4">
            <v-spacer></v-spacer>
            <v-icon small class="mr-2" @click="openDialog(chaleco, true)">mdi-pencil</v-icon>
            <v-icon small @click="deleteChaleco(chaleco.idChaleco)">mdi-delete</v-icon>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="800px">
      <v-card v-if="selectedChaleco">
        <v-card-title
          class="primary darken-1 white--text"
        >{{ isEditing ? 'Editar Chaleco' : 'Ver Chaleco' }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="selectedChaleco.lote" label="Lote" :disabled="!isEditing"></v-text-field>
                  <v-text-field
                    v-model="selectedChaleco.serie"
                    label="Serie"
                    :disabled="!isEditing"
                  ></v-text-field>
                  <v-text-field
                    v-model="selectedChaleco.polizaNombre"
                    label="Póliza"
                    :disabled="!isEditing"
                  ></v-text-field>
                  <v-text-field
                    v-model="selectedChaleco.vencimientoPoliza"
                    type="date"
                    label="Vencimiento Póliza"
                    :disabled="!isEditing"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="selectedChaleco.vencimientoPanel"
                    type="date"
                    label="Vencimiento Panel"
                    :disabled="!isEditing"
                  ></v-text-field>
                  <v-text-field
                    v-model="selectedChaleco.precio"
                    label="Precio"
                    :disabled="!isEditing"
                  ></v-text-field>

                  <v-select
                    v-model="selectedChaleco.talla"
                    label="Talla"
                    :items="['XL', 'S', 'M']"
                    :disabled="!isEditing"
                  ></v-select>

                  <v-select
                    v-model="selectedChaleco.status"
                    label="Status"
                    :items="['vendido', 'stock', 'muestra']"
                    :disabled="!isEditing"
                  ></v-select>

                  <v-select
                    v-if="selectedChaleco.status === 'vendido'"
                    v-model="selectedChaleco.cliente"
                    label="Cliente"
                    :items="['A', 'B', 'C']"
                    :disabled="!isEditing"
                  ></v-select>

                  <v-text-field
                    v-if="selectedChaleco.status === 'vendido'"
                    v-model="selectedChaleco.fechaVenta"
                    type="date"
                    label="Fecha venta"
                    :disabled="!isEditing"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions class="primary lighten-4">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cerrar</v-btn>
          <v-btn v-if="isEditing" color="blue darken-1" text @click="saveChanges">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      selectedChaleco: null,
      isEditing: false,
      valid: false,
      filterTalla: "",
      filterCliente: "",
      filterSerie: ""
    };
  },
  computed: {
    ...mapState("products", ["productData"]),
    tallaItems() {
      const tallas = this.productData.map(chaleco => chaleco.talla);
      // Obtener tallas únicas y agregar "Todas"
      const uniqueTallas = [...new Set(tallas)];
      return ["Todas", ...uniqueTallas];
    },
    filteredProductData() {
      return this.productData.filter(chaleco =>
        chaleco.talla.toLowerCase().includes(this.filterTalla.toLowerCase()) &&
        chaleco.cliente.toLowerCase().includes(this.filterCliente.toLowerCase()) &&
        chaleco.serie.toLowerCase().includes(this.filterSerie.toLowerCase())
      );
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
      "addProduct"
    ]),

    openDialog(chaleco, edit = false, agregar = false) {
      this.isEditing = edit;
      this.isAgregar = agregar;
      if (agregar) {
        // Aquí inicializas un nuevo objeto para agregar
        this.selectedChaleco = {
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

          // Añade más campos según tus necesidades
        };
      } else {
        this.selectedChaleco = { ...chaleco }; // Clona el objeto seleccionado para editar/visualizar
      }
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
      this.selectedChaleco = null;
      this.isEditing = false;
    },
    saveChanges() {
      if (this.isAgregar) {
        // Lógica para agregar un nuevo documento
        // Por ejemplo, dispatch a tu acción para agregar aquí
        this.addProduct(this.selectedChaleco);
      } else if (this.isEditing) {
        // Lógica para guardar los cambios editados
        if (this.$refs.form.validate()) {
          this.updateProduct(this.selectedChaleco);
        }
      }
      this.closeDialog();
    },

    deleteChaleco(idChaleco) {
      // Lógica para eliminar el chaleco
      console.log("Delete chaleco with ID:", idChaleco);
    }
  }
};
</script>

<style scoped>
.card-style {
  max-width: 100%;
  background-color: stee;
  border-radius: 16px;
  box-shadow: 0 4px 8px silver(190, 16, 16, 0.833);
  padding: 16px;
}

.border-top-right {
  color: white;
  position: absolute;
  top: 0;
  right: 0;
  background: orangered;
  border: 2px solid silver;
  border-top: none;
  border-right: none;
  padding: 8px;
  font-size: 18px;
  font-weight: bold;
  border-bottom-left-radius: 20px;
}

.card-style-red {
  background-color: rgb(248, 177, 177); /* Color rojo para vendido */
}

.card-style-green {
  background-color: #95e8d7; /* Color verde u otro color para no vendido */
}

.mi-fondo-personalizado{
  background-color: white;
}
</style>
