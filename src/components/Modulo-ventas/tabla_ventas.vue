<template>
  <v-data-table
    :headers="ventasHeaders"
    :items="search ? filteredVentas : ventas"
    :sort-by="[{ key: 'ID', order: 'desc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title
          >{{}}
          <v-row align="center">
            <v-col cols="8" sm="6" md="10">
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                density="compact"
                label="Search"
                single-line
                flat
                hide-details
                variant="solo-filled"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-toolbar-title>

        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn
              density="compact"
              icon="mdi-plus"
              v-bind="props"
              size="x-large"
              color="black"
            ></v-btn>
            <v-btn
              density="compact"
              icon="mdi-download"
              @click="descargarExcell()"
              size="x-large"
              color="Black"
            ></v-btn>
            <v-btn
              density="compact"
              icon="mdi-filter"
              size="x-large"
              color="black"
              @click="showFilterMenu = !showFilterMenu"
            >
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    v-for="field in fields"
                    :key="field.model"
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      :label="field.label"
                      v-model="editedItemLocal[field.model]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="blue-darken-1" variant="text" @click="close"
                >Cancelar</v-btn
              >
              <v-btn color="blue-darken-1" variant="text" @click="save"
                >Guardar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >¿Esta seguro de eliminar este registro?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >Eliminar</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item)"
        >mdi-pencil</v-icon
      >
      <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import exportFromJSON from "export-from-json";

export default {
  data: () => ({
    editedItemLocal: {
      ID: "",
      LOTE: "",
      SERIE: "",
      TALLA: 0,
      MODELO: "",
      IDIC: "",
      POLIZA: 0,
      FACTURA: 0,
      GD: 0,
      VENTA: new Date(),
      CLIENTE: "",
      VEN_FUNDA: new Date(),  
      VEN_PANEL: new Date(),
      VEN_POLIZA: new Date(),
      VENDEDOR: "",
      COMENTARIOS: "",
      ADJUNTO: null,

      // ... otros campos
    },
    editedItemDefault: {
      ID: "",
      LOTE: "",
      SERIE: "",
      TALLA: 0,
      MODELO: "",
      IDIC: "",
      POLIZA: 0,
      FACTURA: 0,
      GD: 0,
      VENTA: new Date(),
      CLIENTE: "",
      VEN_FUNDA: new Date(),
      VEN_PANEL: new Date(),
      VEN_POLIZA: new Date(),
      VENDEDOR: "",
      COMENTARIOS: "",
      ADJUNTO: null,
      // ... otros campos
    },
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    filteredVentas: [],
    search: "",
  }),

  computed: {
    ...mapGetters("ventas", ["getVentas", "getventasHeaders"]),
    ...mapState("ventas", ["editedItem", "fields", "ventas", "ventasHeaders"]),
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Venta" : "Editar Venta";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    search: function (newSearch) {
      this.filteredVentas = this.ventas.filter((item) => {
        return Object.values(item).some((value) =>
          String(value).toLowerCase().includes(newSearch.toLowerCase())
        );
      });
    },
  },

  created() {},

  methods: {
    ...mapActions("ventas", ["updateDessert", "createVenta", "deleteVenta"]),

    editItem(item) {
      console.log("editando");
      this.editedIndex = this.ventas.indexOf(item);
      this.editedItemLocal = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.ventas.indexOf(item);
      this.editedItemLocal = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch("ventas/deleteVenta", { index: this.editedIndex });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.editedItemLocal = this.editedItemDefault;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    save() {
      this.dialog = false;
      console.log("guardando");
      if (this.editedIndex > -1) {
        // Object.assign(this.bla[this.editedIndex], this.editedItem)
        this.$store.dispatch("ventas/updateDessert", {
          index: this.editedIndex,
          item: this.editedItemLocal,
        });
        this.editedItemLocal = this.editedItemDefault;
      } else {
        this.$store.dispatch("ventas/createVenta", {
          item: this.editedItemLocal,
        });
      }
    },

    descargarExcell() {
      const data = this.showFilter ? this.filteredVentas : this.ventas;
      const fileName = "RegistroVentas";
      const exportType = exportFromJSON.types.xls;
      exportFromJSON({ data, fileName, exportType });
    },
  },
};
</script>
