<template>
<v-container fluid class="min-height">
  <v-data-table
    :headers="headers"
    :items="userData"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title></v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              class="mb-2"
              color="primary"
              dark
              v-bind="props"
            >
              Nuevo usuario
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
                    cols="12"
                    md="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.username"
                      label="Usuario"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.full_name"
                      label="nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="12"
                    sm="6"
                  >
                    <!-- <v-select
                      v-model="editedItem.disabled"
                      :items="status_usuarios"
                      label="status"
                    ></v-select> -->
                  </v-col>
                  <v-col
                    cols="12"
                    md="12"
                    sm="6"
                  >
                    <!-- <v-text-field
                      v-model="editedItem.alias"
                      label="Alias"
                    ></v-text-field> -->
                    <v-select
                      v-model="editedItem.role"
                      :items="roles"
                      label="role"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Estás seguro de eliminar este usuario?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="me-2"
        size="small"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</v-container>
</template>
<script>

import { mapState, mapActions, mapMutations } from "vuex";

  export default {
    data: () => ({
      roles: ["admin","visualizador"],
      status_usuarios: ["true", "false"],
      dialog: false,
      dialogDelete: false,
      headers: [
        { title: 'usuario', key: 'username' },
        { title: 'email', key: 'email' },
        { title: 'nombre', key: 'full_name' },
        { title: 'rol', key: 'role' },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        username: '',
        email: '',
        full_name: '',
        hashed_password: "1234",
        disabled: "false",
        alias: '',
        role: '',
      },
      defaultItem: {
        username: '',
        email: '',
        full_name: '',
        hashed_password: '1234',
        disabled: "false",
        alias: '',
        role: 'visualizador',
      },
    }),

    computed: {
      ...mapState('usuarios', ['userData']),
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo usuario' : 'Editar usuario'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.$store.dispatch("usuarios/fetchUserData");
      console.log("data usuario: ",this.userData)
      this.initialize()
    },

    methods: {
      ...mapActions("usuarios", [
        "fetchUserData",
        "updateUser",
        "deleteUser",
        "addUser"
      ]),
      initialize () {

      },

      editItem (item) {
        this.editedIndex = this.userData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.$store.dispatch("usuarios/deleteUser",this.editedItem);
        // this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          this.$store.dispatch("usuarios/updateUser",this.editedItem);
        } else {
          this.$store.dispatch("usuarios/addUser",this.editedItem);
        }
        this.close()
      },
    },
  }
</script>



<style>
.min-height {
  min-height: 100vh; /* 80% del viewport height */
}
</style>