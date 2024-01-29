<template>
  <v-data-table
    :headers="clientesHeaders"
    :items="search ? filteredClientes : clientes"
    :sort-by="[{ key: 'ID', order: 'desc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title
          >{{}}
          <v-row align="center">
            <v-col
              v-for="field in clientesHeaders"
              :key="field.key"
              cols="12"
              sm="6"
              md="3"
            >
              <v-text-field
                v-if="field.key !== 'actions'"
                :label="field.label"
                v-model="field.search"
                @input="applyFilter"
                dense
                hide-details
                outlined
                solo-inverted
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

            <v-btn-group>
              <v-combobox
                chips
                v-model="selectedField"
                :items="clientesHeaders"
                item-text="title"
                item-value="key"
                dense
                hide-details
                outlined
                multiple
                label="Filtrar por"
                @change="applyFilter"
                max-height="350"
                style="width: 350 px"
              >
                <template v-slot:prepend-inner-icon> </template>
              </v-combobox>

              <v-menu v-model="showFilterMenu" offset-y>
                <v-list>
                  <v-list-item
                    v-for="field in clientesHeaders"
                    :key="field.key"
                  >
                    <v-list-item-content>
                      <v-list-item-title @click="applyFilter(field.key)">
                        {{ field.title }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item v-for="cliente in clientes" :key="cliente.ID">
                    <v-list-item-content>
                      <v-row align="center">
                        <v-col>
                          <v-btn @click="applyFilter(cliente)"
                            >Seleccionar</v-btn
                          >
                        </v-col>
                        <v-col>{{ cliente.NOMBRE }}</v-col>
                      </v-row>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-btn-group>
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
      ID: 0,
      NOMBRE: "",
      RUT: 0,
      DIRECCION: "",
      CONTACTO: "",
      CORREO: "",
      TELEFONO: 0,
      COMENTARIOS: "",
      ADJUNTO: null,

      // ... otros campos
    },
    editedItemDefault: {
      ID: 0,
      NOMBRE: "",
      RUT: 0,
      DIRECCION: "",
      CONTACTO: "",
      CORREO: "",
      TELEFONO: 0,
      COMENTARIOS: "",
      ADJUNTO: null,
      // ... otros campos
    },
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    filteredVentas: [],
    search: "",
    showFilterMenu: false,
    selectedField: [],
    filteredClientes: [],
    filterValues: {},
    clientesHeaders: [
      { text: 'ID', value: 'ID', search: '' },
      { text: 'Nombre', value: 'NOMBRE', search: '' },
      // Agrega más columnas según tus necesidades
    ],
  }),

  computed: {
    ...mapGetters("clientes", ["getClientes", "getClientesHeaders"]),
    ...mapState("clientes", [
      "editedItem",
      "fields",
      "clientes",
      "clientesHeaders",
    ]),
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Cliente" : "Editar cliente";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    clientesHeaders: {
      deep: true,
      handler(newVal) {
        // Filtrar clientes según las nuevas configuraciones de búsqueda
        const filterOptions = newVal.reduce((acc, header) => {
          acc[header.value] = header.search.toLowerCase();
          return acc;
        }, {});
       this.filteredClientes = this.clientes.filter((item) => {
          return Object.entries(filterOptions).every(([key, value]) => {
            return String(item[key]).toLowerCase().includes(value);
          });
        });
      },
    
      },
  },

  created() {},

  methods: {
    ...mapActions("clientes", [
      "updateDessert",
      "createCliente",
      "deleteCliente",
    ]),

    editItem(item) {
      console.log("editando");
      this.editedIndex = this.clientes.indexOf(item);
      this.editedItemLocal = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.clientes.indexOf(item);
      this.editedItemLocal = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch("clientes/deleteCliente", {
        index: this.editedIndex,
      });
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
        this.$store.dispatch("clientes/updateDessert", {
          index: this.editedIndex,
          item: this.editedItemLocal,
        });
        this.editedItemLocal = this.editedItemDefault;
      } else {
        this.$store.dispatch("clientes/createCliente", {
          item: this.editedItemLocal,
        });
      }
    },

    descargarExcell() {
      const data = this.showFilter ? this.filteredClientes : this.clientes;
      const fileName = "RegistroClientes";
      const exportType = exportFromJSON.types.xls;
      exportFromJSON({ data, fileName, exportType });
    },
    applyFilter(fieldKey) {
      this.showFilterMenu = false;

      // Filtra los clientes según los valores de filtro
      this.filteredClientes = this.clientes.filter((cliente) => {
        return Object.keys(this.filterValues).every((key) => {
          const filterValue = this.filterValues[key];
          return (
            !filterValue ||
            String(cliente[key])
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          );
        });
      });
    },
  },
};
</script>
