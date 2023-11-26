<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'producto', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Registro de ventas</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
         
          
          <!-- boton registrar -->
          <template v-slot:activator="{ props }">
            <v-btn
              color="black"
              dark
              class="mb-2"
              v-bind="props"
              icon="mdi-filter"
              @click="toggleFilter"
            >
            </v-btn>

            <v-btn
              color="black"
              dark
              class="mb-2"
              v-bind="props"
              icon="mdi-plus"
            >
            </v-btn>
            <v-btn
              color="Black"
              dark
              class="mb-2"
              v-bind="props"
              icon="mdi-upload"
              @click="descargarExcell()"
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Cliente"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.producto"
                      label="Producto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.talla"
                      label="Talla"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.factura"
                      label="Factura"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.gd"
                      label="GD"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.vencimiento"
                      label="Vencimiento"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.vendedor"
                      label="Vendedor"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field
                      v-model="editedItem.comentarios"
                      label="Comentarios"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancelar
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
          </v-dialog>
       
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >¿Seguro que desea eliminar el registro?</v-card-title
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
                >Seguro</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="viewItem(item)" color="black">
        mdi-eye
      </v-icon>
      <v-icon size="small" class="me-2" @click="editItem(item)" color="black">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)" color="black">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import exportXlsFile from "export-from-json";

export default {
  data: () => ({
    filteredDesserts: [],
    showFilter: false,
    dialog: false,
    dialogDelete: false,
    dialogView: false,
    headers: [
      {
        title: "Clientes",
        align: "start",
        sortable: false,
        key: "name",
      },
      { title: "Producto", key: "producto" },
      { title: "Talla", key: "talla" },
      { title: "Factura", key: "factura" },
      { title: "GD", key: "gd" },
      { title: "Vencimiento", key: "vencimiento" },
      { title: "Vendedor", key: "vendedor" },
      { title: "Comentarios", key: "comentarios" },
      { title: "Acción", key: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      producto: "",
      talla: "",
      factura: 0,
      gd: 0,
      vencimiento: 0,
      vendedor: "",
      comentarios: "",
    },
    defaultItem: {
      name: "",
      producto: "",
      talla: "",
      factura: 0,
      gd: 0,
      vencimiento: 0,
      vendedor: "",
      comentarios: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Registro" : "Editar Registro";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: "Muni Providencia",
          producto: "Chaleco",
          talla: "L",
          factura: 24,
          gd: 4.0,
          vencimiento: 23,
          vendedor: "Veronica",
          comentarios: "",
        },
        {
          name: "Banco Falabella",
          producto: "Chaleco",
          talla: "M",
          factura: 37,
          gd: 4.3,
          vencimiento: 24,
          vendedor: "Mileydis",
          comentarios: "",
        },
        {
          name: "Prosegur",
          producto: "Chaleco",
          talla: "L",
          factura: 23,
          gd: 6.0,
          vencimiento: 23,
          vendedor: "Veronica",
          comentarios: "",
        },
        {
          name: "Banco Ripley",
          producto: "Funda",
          talla: "S",
          factura: 67,
          gd: 4.3,
          vencimiento: 23,
          vendedor: "Veronica",
          comentarios: "",
        },
        {
          name: "Muni Las Condes",
          producto: "Funda",
          talla: "M",
          factura: 49,
          gd: 3.9,
          vencimiento: 26,
          vendedor: "Mileydis",
          comentarios: "",
        },
        {
          name: "Muni La Serena",
          producto: "Funda",
          talla: "XL",
          factura: 94,
          gd: 0.0,
          vencimiento: 26,
          vendedor: "Mileydis",
          comentarios: "",
        },
        {
          name: "Banco Ripley",
          producto: "Chaleco",
          talla: "M",
          factura: 98,
          gd: 0,
          vencimiento: 25,
          vendedor: "Mileydis",
          comentarios: "",
        },
        {
          name: "Prosegur",
          producto: "Chaleco",
          talla: "S",
          factura: 87,
          gd: 6.5,
          vencimiento: 25,
          vendedor: "Veronica",
          comentarios: "",
        },
        {
          name: "Banco Santander",
          producto: "Chaleco",
          talla: "L",
          factura: 51,
          gd: 4.9,
          vencimiento: 28,
          vendedor: "Mileydis",
          comentarios: "",
        },
        {
          name: "Muni Lo Ovalle",
          producto: "Chaleco",
          talla: "XL",
          factura: 65,
          gd: 7,
          vencimiento: 28,
          vendedor: "Veronica",
          comentarios: "",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    viewItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogView = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    descargarExcell() {
  const data = this.showFilter ? this.filteredDesserts : this.desserts;

  const options = {
    data: data.map(item => ({
      Clientes: item.name,
      Producto: item.producto,
      Talla: item.talla,
      Factura: item.factura,
      GD: item.gd,
      Vencimiento: item.vencimiento,
      Vendedor: item.vendedor,
      Comentarios: item.comentarios,
    })),
    fileName: 'ventas',
    exportType: exportFromJSON.types.xls,
  };

  exportFromJSON(options);

   
},
  },
   toggleFilter() {
    if (this.showFilter) {
      // Aplicar filtro si está activado
      this.filteredDesserts = this.desserts.filter(item => {
        // Reemplaza 'texto_a_filtrar' con el texto real que estás buscando
        return item.name.toLowerCase().includes(this.desserts.toLowerCase());
      });
    } else {
      // Limpiar el filtro si está desactivado
      this.filteredDesserts = [];
    }
  },
};
</script>