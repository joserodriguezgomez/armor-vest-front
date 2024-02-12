<template>
  <v-data-table :headers="usuariosHeaders"  :items="search ? filteredChalecos : usuarios">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{}}
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
                  <v-col v-for="field in fields" :key="field.model" cols="12" sm="6" md="4">
                    <v-text-field :label="field.label" v-model="editedItemLocal[field.model]"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">Cancelar</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Esta seguro de eliminar este registro?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">Eliminar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item)">mdi-pencil</v-icon>
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

  data() {
    // Función para obtener la fecha actual formateada como DD-MM-YYYY
    const obtenerFechaFormateada = () => {
      const fechaActual = new Date();
      const dia = ('0' + fechaActual.getDate()).slice(-2); // Añade un cero inicial y luego toma los últimos 2 dígitos para asegurar el formato DD
      const mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2); // Los meses en JavaScript van de 0 a 11, así que añade 1
      const año = fechaActual.getFullYear();
      return `${dia}-${mes}-${año}`; // Formatea la fecha como DD-MM-YYYY
    };

    return {
      editedItemLocal: {
        id_user: 1,
        user: "",
        fecha_creacion: "01-01-2022", // Usa la fecha formateada aquí
        password: "123",
        rol: ""
        // ... otros campos
      },
      editedItemDefault: {
        id_user: 1,
        user: "",
        fecha_creacion: "01-01-2022", // Usa la fecha formateada aquí
        password: "123",
        rol: ""
        // ... otros campos
      },
      search: "",
      filteredVentas: [],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1
    };
  },



  computed: {
    ...mapState("usuarios", [
      "editedItem",
      "fields",
      "usuarios",
      "usuariosHeaders"
    ]),
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo usuario" : "Editar usuario";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    search: function (newSearch) {
      this.filteredChalecos = this.usuarios.filter((item) => {
        return Object.values(item).some((value) =>
          String(value).toLowerCase().includes(newSearch.toLowerCase())
        );
      });
    },
  },

  created() {},

  mounted(){
    this.$store.dispatch("usuarios/leerUsuarios")
  },


  methods: {
    ...mapMutations("usuarios", ["updateField"]),
    ...mapActions("usuarios", ["leerUsuarios","updateUsuario", "createUsuario", "deleteUsuario"]),

    editItem(item) {
      this.editedIndex = this.usuarios.indexOf(item);
      this.editedItemLocal = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.usuarios.indexOf(item);
      this.editedItemLocal = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch("usuarios/deleteUsuario", { item: this.editedItemLocal });
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
      if (this.editedIndex > -1) {
        // Object.assign(this.bla[this.editedIndex], this.editedItem)
        this.$store.dispatch("usuarios/updateUsuario", {
          index: this.editedIndex,
          item: this.editedItemLocal
        });
        this.editedItemLocal = this.editedItemDefault;
      } else {
        this.$store.dispatch("usuarios/createUsuario", {
          item: this.editedItemLocal
        });
      }
    },

    descargarExcell() {
      const data = this.showFilter ? this.filteredChalecos : this.usuarios;
      const fileName = "RegistroChalecos";
      const exportType = exportFromJSON.types.xls;
      exportFromJSON({ data, fileName, exportType });
    },
  }
};
</script>