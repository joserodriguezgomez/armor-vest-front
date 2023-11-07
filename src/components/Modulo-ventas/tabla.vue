<template>
  <v-table density="compact" class="tabla-ventas">
    <thead>
      <tr>
        <th class="text-left"></th>
        <th class="text-left">Cliente</th>
        <th class="text-left">Lote</th>
        <th class="text-left">Serie</th>
        <th class="text-left">Idic</th>
        <th class="text-left">Talla</th>
        <th class="text-left">Poliza</th>
        <th class="text-left">Factura</th>
        <th class="text-left">GD</th>
        <th class="text-left">Funda</th>
        <th class="text-left">Paneles</th>
        <th class="text-left">Vendedor</th>
        <th class="text-left">Comentarios</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td><v-checkbox label=""></v-checkbox></td>
        <td>{{ item.name }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </v-table>

  
</template>

<script>
export default {
  data() {
    return {
      desserts: [
        {
          name: "juan",
          calories: 555,
        },
        {
          name: "Dieigo",
          calories: 777,
        },
        {
          name: "Jose",
          calories: 667,
        },
        {
          name: "Pedro",
          calories: 888,
        },
        {
          name: "Claudio",
          calories: 998,
        },
        {
          name: "Andres",
          calories: 12345,
        },
      ],
    };
  },
};
</script> 

<style scoped>
.tabla-ventas {
  margin: 5px;
  border: 2px solid rgb(239, 233, 233);
  border-radius: 10px;
}

</style>