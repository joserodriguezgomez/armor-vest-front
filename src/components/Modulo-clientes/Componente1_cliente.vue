<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="search ? filteredDesserts : allClientes"
      :sort-by="[{ key: 'producto', order: 'asc' }]"
    >
      <template v-slot:top>
        <v-toolbar flat>
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
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1000px">
            <!-- boton registrar -->
            <template v-slot:activator="{ props }">
              <v-btn
                color="black"
                dark
                class="mb-2"
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
                icon="mdi-upload"
                @click="descargarExcell()"
              ></v-btn>
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
                        v-model="editedItem.nombre"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.rut"
                        label="Rut"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.direccion"
                        label="Dirección"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.contacto"
                        label="Contacto"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.correo"
                        label="Correo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.telefono"
                        label="Telefono"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="editedItem.comentarios"
                        label="Comentarios"
                      ></v-text-field>
                      <v-file-input
                        v-model="editedItem.archivoAdjunto"
                        label="Adjuntar Archivo"
                        show-size
                        show-overflow
                        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                      ></v-file-input>
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
        <v-icon size="small" class="me-2" @click="editItem(item)" color="black"
          >mdi-pencil</v-icon
        >
        <v-icon size="small" @click="deleteItem(item)" color="black"
          >mdi-delete</v-icon
        >
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import exportFromJSON from "export-from-json";

export default {
  data: () => ({
    filteredDesserts: [],
    search: "",
    showFilter: false,
    dialog: false,
    dialogDelete: false,
    dialogView: false,

    headers: [
      {
        title: "Nombre",
        align: "start",
        sortable: false,
        key: "name",
      },

      { title: "Rut", key: "rut" },
      { title: "Dirección", key: "direccion" },
      { title: "Contacto", key: "contacto" },
      { title: "Correo", key: "correo" },
      { title: "Telefono", key: "telefono" },
      { title: "Comentarios", key: "comentarios" },
      { title: "Acción", key: "actions", sortable: false },
      { title: "Adjunto", key: "archivoAdjunto", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      rut: 0,
      direccion: "",
      contacto: "",
      correo: "",
      telefono: 0,
      comentarios: "",
      archivoAdjunto: null,
    },
    defaultItem: {
      name: "",
      rut: 0,
      direccion: "",
      contacto: "",
      correo: "",
      telefono: 0,
      comentarios: "",
      archivoAdjunto: null,
    },
  }),

  computed: {
    ...mapGetters("clientesModule", ["allClientes"]), // Mapea el getter desde el módulo 'clientesModule'
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    search: function (newSearch) {
      this.filteredDesserts = this.desserts.filter((item) => {
        return item.name.toLowerCase().includes(newSearch.toLowerCase());
      });
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions("clientesModule", ["initialize"]), // Mapea la acción desde el módulo 'clientesModule'
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
    this.editedItem.archivoAdjunto = null;
  },
  descargarExcell() {
    const data = this.showFilter ? this.filteredDesserts : this.desserts;
    const fileName = "RegistroClientes";
    const exportType = exportFromJSON.types.xls;
    exportFromJSON({ data, fileName, exportType });
  },
  getAttachmentUrl(item) {
    return URL.createObjectURL(item.archivoAdjunto);
  },

  closeView() {
    this.dialogView = false;
  },
};
</script>
