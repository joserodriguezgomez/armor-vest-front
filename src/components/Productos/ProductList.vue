<template>
  <v-container fluid class="mi-fondo-personalizado">
    <v-alert
      v-if="alertSuccess"
      text="Los datos han sido cargados con éxito"
      title="Alerta"
      type="success"
    ></v-alert>

    <v-row>
      <v-col cols="12" sm="3" v-for="(filter, index) in filters" :key="index">
        <v-select
          v-model="filter.value"
          :items="filter.items"
          :label="filter.label"
          @change="applyFilters"
          outlined
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="1" offset="9">
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

      <v-col cols="1">
        <v-btn class="v-btn--floating" color="primary" dark fab @click="excelDownload()">
          <v-icon>mdi-download</v-icon>
          <!-- Icono dentro del botón -->
        </v-btn>
      </v-col>

      <v-col cols="1">
        <v-btn class="v-btn--floating" color="primary" dark fab @click="openDialogFile()">
          <v-icon>mdi-file-excel</v-icon>
          <!-- Icono dentro del botón -->
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="chaleco in filteredProductData"
        :key="chaleco.idChaleco"
        cols="12"
        sm="3"
        md="3"
      >
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
            <v-icon small @click="deleteChaleco(chaleco)">mdi-delete</v-icon>
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
                    :items="filters.find(filter => filter.key === 'cliente').items"
                    label="Cliente"
                    
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

    <v-dialog v-model="dialog2" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Subir Archivo Excel</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="submitForm">
            <v-file-input
              label="Adjuntar Excel para carga masiva"
              @change="handleFileUpload"
              :clearable="true"
              clear-icon="mdi-file"
              prepend-icon="mdi-paperclip"
              accept=".xlsx"
            ></v-file-input>
          </v-form>
          <v-progress-circular v-if="loading" indeterminate color="primary" class="my-4"></v-progress-circular>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- Botón para cancelar y cerrar el diálogo -->
          <v-btn color="blue-grey" @click="dialog2 = false">Cancelar</v-btn>
          <!-- Botón para enviar el formulario -->
          <v-btn color="primary" @click="submitFile">Enviar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">¿Esta seguro de eliminar este registro?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm()">Eliminar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import exportFromJSON from "export-from-json";
import axios from "axios";

export default {
  data() {
    return {
      dialogDelete: false,
      alertSuccess: false,
      file: null,
      dialog: false,
      dialog2: false,
      selectedChaleco: null,
      isEditing: false,
      valid: false,
      loading: false,
      filters: [
        { key: "talla", label: "Talla", value: "Todas", items: [] },
        { key: "cliente", label: "Cliente", value: "Todas", items: [] },
        { key: "polizaNombre", label: "Poliza", value: "Todas", items: [] },
        { key: "status", label: "Status", value: "Todas", items: [] }
      ]
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
      let filteredData = this.productData;

      this.filters.forEach(filter => {
        if (filter.value !== "Todas" && filter.value !== "") {
          filteredData = filteredData.filter(chaleco => {
            // Verificar si el valor del filtro existe antes de aplicar toLowerCase
            const chalecoValue = chaleco[filter.key];
            return (
              chalecoValue &&
              chalecoValue.toLowerCase() === filter.value.toLowerCase()
            );
          });
        }
      });

      return filteredData;
    }
  },
  mounted() {
    this.$store.dispatch("products/fetchProductData");
  },
  watch: {
    productData: {
      handler(newVal) {
        this.initializeFilters();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapMutations("products", ["SET_PRODUCT_DATA"]),
    ...mapActions("products", [
      "fetchProductData",
      "updateProduct",
      "addProduct",
      "deleteProduct"
    ]),
    initializeFilters() {
      this.filters.forEach(filter => {
        const uniqueItems = [
          ...new Set(
            this.productData.map(chaleco => chaleco[filter.key]).filter(Boolean)
          )
        ];
        filter.items = ["Todas", ...uniqueItems];
      });
    },

    applyFilters() {
      // Forzar la actualización de la lista filtrada
      this.filteredProductData;
    },

    openDialogFile() {
      this.dialog2 = true;
    },

    openDialog(chaleco, edit = false, agregar = false) {
      this.isEditing = edit;
      this.isAgregar = agregar;
      if (agregar) {
        // Aquí inicializas un nuevo objeto para agregar
        this.selectedChaleco = {
          idChaleco: 0,
          lote: "",
          serie: "",
          idic: "",
          polizaNombre: "",
          vencimientoPoliza: null,
          vencimientoPanel: null,
          modelo: "",
          status: "",
          talla: "",
          precio: 0,
          cliente: "",
          vendedor: "",
          factura: "",
          gd: "",
          fechaVenta: "2050-01-01",
          comentarios: "",
          createdAt: "2050-01-01",
          createdBy: "",
          updatedAt: "2050-01-01",
          updatedBy: "",
          vencimiento_funda: "2050-01-01",
          precio_funda: 0,
          dup: ""

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

    deleteChaleco(chaleco) {
      this.deleteItem = chaleco;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      console.log("chaleco eliminado");
      this.deleteProduct(this.deleteItem);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    excelDownload() {
      const data = this.filteredProductData;
      const fileName = "productos";
      const exportType = exportFromJSON.types.xls;
      exportFromJSON({ data, fileName, exportType });
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async submitFile() {
      if (!this.file) return;
      this.loading = true; // Activar el indicador de carga
      let formData = new FormData();
      formData.append("file", this.file);

      try {
        console.log(formData);
        const url =
          "https://armor-vest-backend-b3be97e8ab51.herokuapp.com/api/uploadExcelFile/";
        let response = await axios.post(url, formData);
        this.alertSuccess = true;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false; // Desactivar el indicador de carga
        setTimeout(() => {
          this.alertSuccess = false;
        }, 3000); // Ajusta este valor según lo necesites
      }
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

.mi-fondo-personalizado {
  background-color: white;
}
</style>
