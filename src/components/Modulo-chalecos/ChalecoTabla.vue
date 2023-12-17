<template>
  <v-data-table :headers="chalecoHeaders" :items="chalecos">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{}}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
           <v-btn density="compact" icon="mdi-plus" v-bind="props" size="x-large" color="blue"></v-btn>
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

export default {
  data: () => ({
    editedItemLocal: {
      ID_CHALECO: "",
      ID_POLIZA: "",
      MODELO: "",
      TALLA: "",
      VENCIMIENTO_FUNDA: "",
      VENCIMIENTO_PANEL: "",
      CLIENTE : ""
      // ... otros campos
    },
    editedItemDefault: {
      ID_CHALECO: "",
      ID_POLIZA: "",
      MODELO: "",
      TALLA: "",
      VENCIMIENTO_FUNDA: "",
      VENCIMIENTO_PANEL: "",
      CLIENTE : ""
      // ... otros campos
    },
    dialog: false,
    dialogDelete: false,
    editedIndex: -1
  }),

  computed: {
    ...mapState("chalecos", [
      "editedItem",
      "fields",
      "chalecos",
      "chalecoHeaders"
    ]),
    formTitle() {
      return this.editedIndex === -1 ? "Nuev chaleco" : "Editar chaleco";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  created() {},

  methods: {
    ...mapMutations("chalecos", ["updateField"]),
    ...mapActions("chalecos", ["updateChaleco", "createChaleco", "deleteChaleco"]),

    editItem(item) {
      this.editedIndex = this.chalecos.indexOf(item);
      this.editedItemLocal = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.chalecos.indexOf(item);
      this.editedItemLocal = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch("chalecos/deleteChaleco", { index: this.editedIndex });
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
        this.$store.dispatch("chalecos/updateChaleco", {
          index: this.editedIndex,
          item: this.editedItemLocal
        });
        this.editedItemLocal = this.editedItemDefault;
      } else {
        this.$store.dispatch("chalecos/createChaleco", {
          item: this.editedItemLocal
        });
      }
    }
  }
};
</script>