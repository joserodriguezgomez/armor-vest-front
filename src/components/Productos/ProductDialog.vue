<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title
        class="primary darken-1 white--text"
      >{{ isEditing ? 'Editar Chaleco' : 'Ver Chaleco' }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="product" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="product.lote" label="Lote" :disabled="!isEditing"></v-text-field>
                <v-text-field
                  v-model="product.serie"
                  label="Serie"
                  :disabled="!isEditing"
                ></v-text-field>
                <v-text-field
                  v-model="product.polizaNombre"
                  label="Póliza"
                  :disabled="!isEditing"
                ></v-text-field>
                <v-text-field
                  v-model="product.vencimientoPoliza"
                  type="date"
                  label="Vencimiento Póliza"
                  :disabled="!isEditing"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="product.vencimientoPanel"
                  type="date"
                  label="Vencimiento Panel"
                  :disabled="!isEditing"
                ></v-text-field>
                <v-text-field
                  v-model="product.precio"
                  label="Precio"
                  :disabled="!isEditing"
                ></v-text-field>

                <v-select
                  v-model="product.talla"
                  label="Talla"
                  :items="['XL', 'S', 'M']"
                  :disabled="!isEditing"
                ></v-select>

                <v-select
                  v-model="product.status"
                  label="Status"
                  :items="['vendido', 'stock', 'muestra']"
                  :disabled="!isEditing"
                ></v-select>

                <v-select
                  v-if="product.status === 'vendido'"
                  v-model="product.cliente"
                  label="Cliente"
                  :items="['A', 'B', 'C']"
                  :disabled="!isEditing"
                ></v-select>

                <v-text-field
                  v-if="product.status === 'vendido'"
                  v-model="product.fechaVenta"
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
</template>

<script>
export default {
  props: {
    product: Object,
    isEditing: Boolean,
    dialog: Boolean,
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
    },
    saveChanges() {
      this.$emit('save-changes', this.product);
    },
  },
};
</script>

<style scoped>
</style>
