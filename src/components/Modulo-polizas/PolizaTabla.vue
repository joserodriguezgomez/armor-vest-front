<template>
  <v-data-table 
    :headers="polizaHeaders" 
    :items="search ? filteredPolizas : polizas"
    :sort-by="[{ key: 'ID', order: 'desc' }]"
    @click:row="handleRowClick"
    >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{}}
          <v-row align="center">
            <v-col cols="8" sm="6" md="12">
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


          <v-btn
              density="compact"
              icon="mdi-cloud-upload"
              size="x-large"
              color="black"
              @click="dialogCargaMasiva = true"
            >
            </v-btn>


            <v-btn
              density="compact"
              icon="mdi-delete"
              size="x-large"
              color="black"
              @click="dialogEliminaMasiva = true"
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

    <v-alert v-if="showAlert" type="success" dismissible @dismiss="showAlert = false">
    {{ falertMessage }}
  </v-alert>


      <v-dialog v-model="dialogCargaMasiva" max-width="800px">
    <v-card>
      <v-card-title>
        Carga masiva
      </v-card-title>
      <v-card-text>
        <cargaMasiva/>
        <!-- Aquí puedes agregar contenido más adelante si lo deseas -->
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialogCargaMasiva = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>



      <v-dialog v-model="dialogEliminaMasiva" max-width="800px">
    <v-card>
      <v-card-title>
        Elimina poliza
      </v-card-title>
      <v-card-text>
        <eliminaMasiva/>
        <!-- Aquí puedes agregar contenido más adelante si lo deseas -->
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialogEliminaMasiva = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>






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
import cargaMasiva from '@/components/Modulo-polizas/CargaMasiva.vue';
import eliminaMasiva from '@/components/Modulo-polizas/EliminaMasiva.vue';
export default {
  data: () => ({
    dialogEliminaMasiva:false,
    dialogCargaMasiva:false,
    editedItemLocal: {
      id_idic: 1,
      lote: "",
      serie: "",
      talla: 0,
      idic: "",
      poliza_nombre: "",
      fecha_poliza: null,
      fecha_poliza_vencimiento:null
      // ... otros campos
    },
    editedItemDefault: {
      id_idic: 1,
      lote: "",
      serie: "",
      talla: 0,
      idic: "",
      poliza_nombre: "",
      fecha_poliza: null,
      fecha_poliza_vencimiento: null
      // ... otros campos
    },
    search: "",
    dialog: false,
    dialogDelete: false,
    editedIndex: -1
    
  }),
  components:{
    cargaMasiva,
    eliminaMasiva
  },
  computed: {
    ...mapGetters("polizas", ["getPolizas", "getPolizaHeaders"]),
    ...mapState("polizas", [
      "editedItem",
      "fields",
      "polizas",
      "poli",
      "polizaHeaders",
      "showAlert",
      "falertMessage"
    ]),
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Poliza" : "Editar Poliza";
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
      this.filteredPolizas = this.polizas.filter((item) => {
        return Object.values(item).some((value) =>
          String(value).toLowerCase().includes(newSearch.toLowerCase())
        );
      });
    },
  },

  mounted(){
    this.$store.dispatch("polizas/leerIdics")
  },

  created() {},

  methods: {
    ...mapMutations("polizas", ["updateField", "SET_IDICS","SET_SHOW_ALERT"]),
    ...mapActions("polizas", ["updateDessert", "createPoliza", "deletePoliza", "leerIdics"]),

    handleRowClick(event, item) {
      this.$emit('selected-poliza', item.item);
    },
    editItem(item) {
      console.log("editando");
      this.editedIndex = this.polizas.indexOf(item);
      this.editedItemLocal = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.polizas.indexOf(item);
      this.editedItemLocal = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch("polizas/deletePoliza", { item: this.editedItemLocal });
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
        this.$store.dispatch("polizas/updateDessert", {
          index: this.editedIndex,
          item: this.editedItemLocal
        });
        this.editedItemLocal = this.editedItemDefault;
      } else {
        this.$store.dispatch("polizas/createPoliza", {
          item: this.editedItemLocal
        });
        this.editedItemLocal = this.editedItemDefault;
      }
    }
    
  }
};
</script>

