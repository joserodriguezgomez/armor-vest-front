<template>
  <v-card
    :class="{
      'card-style': true,
      'card-style-red': status === 'vendido',
      'card-style-green': status !== 'vendido'
    }"
  >
    <div class="border-top-right">{{ talla }}</div>

    <v-card-title
      class="veamos"
      :class="status === 'vendido' ? 'red lighten-4 primary--text' : 'grey lighten-4'"
    >
      <v-chip variant="flat" color="white" text-color="orange" class="mr-2">{{ dup }}</v-chip>
      {{ polizaNombre }} - {{ serie }}
      <v-spacer></v-spacer>
    </v-card-title>

    <v-card-text @click="$emit('open-dialog', product)">
      <p>
        <strong>Vencimiento Poliza:</strong>
        {{ new Date(vencimientoPoliza).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
      </p>
      <p>
        <strong>Vencimiento Panel:</strong>
        {{ new Date(vencimientoPanel).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
      </p>
      <p>
        <strong>Vencimiento Funda:</strong>
        {{ new Date(vencimiento_funda).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
      </p>
      <p>
        <strong>Precio:</strong>
        {{ precio }}
      </p>
      <div v-if="status === 'vendido'">
        <p>
          <strong>Cliente:</strong>
          {{ cliente }}
        </p>
        <p>
          <strong>Fecha de venta:</strong>
          {{ new Date(fechaVenta).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
        </p>
      </div>
    </v-card-text>

    <v-card-actions class="primary lighten-4">
      <v-spacer></v-spacer>
      <v-icon small class="mr-2" @click="$emit('edit-product', product)">mdi-pencil</v-icon>
      <v-icon small @click="$emit('delete-product', product.idChaleco)">mdi-delete</v-icon>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  emits: ['open-dialog', 'edit-product', 'delete-product'],
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
</style>

