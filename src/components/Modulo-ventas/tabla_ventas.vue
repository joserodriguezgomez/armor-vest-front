<template >
  <div class="bg-white relative border round-lg">
    <v-table class="w-full text-m text-left text-gray-500 tabla-ventas">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-4 py-3">N°</th>
          <th class="px-4 py-3">Cliente</th>
          <th class="px-4 py-3">Lote</th>
          <th class="px-4 py-3">Serie</th>
          <th class="px-4 py-3">Idic</th>
          <th class="px-4 py-3">Talla</th>
          <th class="px-4 py-3">Poliza</th>
          <th class="px-4 py-3">Factura</th>
          <th class="px-4 py-3">GD</th>
          <th class="px-4 py-3">Funda</th>
          <th class="px-4 py-3">Paneles</th>
          <th class="px-4 py-3">Vendedor</th>
          <th class="px-4 py-3">Comentarios</th>
          <th class="px-4 py-3">
            <span class="sr-only"> Acción </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in desserts"
          :key="item.N"
          class="border-b hover:bg-gray-100 cursor-pointer"
        >
          <td class="px-4 py-3">{{ item.N }}</td>
          <td class="px-4 py-3">{{ item.Cliente }}</td>
          <td class="px-4 py-3">{{ item.Lote }}</td>
          <td class="px-4 py-3">{{ item.Serie }}</td>
          <td class="px-4 py-3">{{ item.Idic }}</td>
          <td class="px-4 py-3">{{ item.Talla }}</td>
          <td class="px-4 py-3">{{ item.Poliza }}</td>
          <td class="px-4 py-3">{{ item.Factura }}</td>
          <td class="px-4 py-3">{{ item.GD }}</td>
          <td class="px-4 py-3">{{ item.Funda }}</td>
          <td class="px-4 py-3">{{ item.Paneles }}</td>
          <td class="px-4 py-3">{{ item.Vendedor }}</td>
          <td>{{ item.Comentarios }}</td>

          <div class="flex justify-end items-center">
            <v-btn
              icon
              size="x-small"
              variant="tonal"
              color="info"
              @click="editItem(item)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              size="x-small"
              variant="tonal"
              color="error"
              @click="deleteItem(item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      desserts: [
        {
          N: 1,
          Cliente: "Banco de Chile",
          Lote: 123,
          Serie: 321,
          Idic: 25,
          Talla: "S",
          Poliza: 741852,
          Factura: 852963,
          GD: 123654,
          Funda: 963,
          Paneles: 632,
          Vendedor: "Claudio",
          Comentarios: "sin comentarios",
        },
        {
          N: 2,
          Cliente: "Santander",
          Lote: 321,
          Serie: 852,
          Idic: 30,
          Talla: "L",
          Poliza: 321456,
          Factura: 123156,
          GD: 852147,
          Funda: 369,
          Paneles: 852,
          Vendedor: "Mily",
          Comentarios: "sin comentarios",
        },
        {
          N: 3,
          Cliente: "Caja los Andres",
          Lote: 123,
          Serie: 456,
          Idic: 25,
          Talla: "M",
          Poliza: 741852,
          Factura: 852963,
          GD: 123654,
          Funda: 963,
          Paneles: 632,
          Vendedor: "Claudio",
          Comentarios: "sin comentarios",
        },
        {
          N: 4,
          Cliente: "Mun- Providencia",
          Lote: 123,
          Serie: 321,
          Idic: 25,
          Talla: "L",
          Poliza: 8765421,
          Factura: 357159,
          GD: 951753,
          Funda: 963,
          Paneles: 632,
          Vendedor: "Mily",
          Comentarios: "sin comentarios",
        },
        {
          N: 5,
          Cliente: "Prosegur",
          Lote: 123,
          Serie: 321,
          Idic: 25,
          Talla: "S",
          Poliza: 852258,
          Factura: 655958,
          GD: 352489,
          Funda: 7139,
          Paneles: 632,
          Vendedor: "Claudio",
          Comentarios: "sin comentarios",
        },
        {
          N: 6,
          Cliente: "Prosegur",
          Lote: 123,
          Serie: 321,
          Idic: 25,
          Talla: "L",
          Poliza: 829371,
          Factura: 136479,
          GD: 873251,
          Funda: 963,
          Paneles: 632,
          Vendedor: "Mily",
          Comentarios: "sin comentarios",
        },
      ],
    };
  },
  methods: {
    editItem(item) {
      // Lógica para editar un elemento
    },
    deleteItem(item) {
      // Lógica para eliminar un elemento
    },
  },
};
</script> 

<style scoped>
/* .tabla-ventas {
  margin: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
} */

/* Resaltar filas al pasar el cursor */
.tabla-ventas tbody tr:hover {
  background-color: #f0f0f0;
}
</style>