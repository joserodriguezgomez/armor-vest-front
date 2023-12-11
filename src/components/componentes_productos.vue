<template>
  <v-app>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="items"
        :pagination.sync="pagination"
        hide-default-footer
        :style="{
          width: '100%',
          margin: '0 auto',
          border: '1px solid #ccc',
        }"
      >
        <template v-slot:item.favourite-fruits="{ item }">
          <v-chip
            color="primary"
            class="ml-2"
            v-for="fruit in item.favouriteFruits"
            :key="fruit"
          >{{ fruit }}</v-chip>
        </template>
      </v-data-table>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Nombre", value: "name" },
        { text: "Dirección", value: "address" },
        { text: "Altura", value: "height" },
        { text: "Peso", value: "weight" },
        { text: "Edad", value: "age" },
        { text: "Deporte favorito", value: "favouriteSport" },
        { text: "Frutas favoritas", value: "favouriteFruits" },
      ],
      items: [
        {
          name: "name-1",
          address: "adores-1",
          height: 1,
          weight: 1,
          age: 25,
          favouriteSport: "football",
          favouriteFruits: ["apple", "banana"],
        },
        {
          name: "name-2",
          address: "address-2",
          height: 2,
          weight: 2,
          age: 26,
          favouriteSport: "running",
          favouriteFruits: ["orange", "peach"],
        },
        {
          name: "name-3",
          address: "address-3",
          height: 3,
          weight: 3,
          age: 27,
          favouriteSport: "swimming",
          favouriteFruits: ["strawberry", "grapes"],
        },
        {
          name: "name-4",
          address: "address-4",
          height: 4,
          weight: 4,
          age: 28,
          favouriteSport: "basketball",
          favouriteFruits: ["banana", "mango"],
        },
        {
          name: "name-5",
          address: "address-5",
          height: 5,
          weight: 5,
          age: 29,
          favouriteSport: "football",
          favouriteFruits: ["apple", "strawberry"],
        },
      ],
      pagination: {
        rowsPerPage: 25,
      },
    };
  },
};
</script>

<style>
.v-data-table {
  border-radius: 4px;
}

.v-data-table th {
  font-size: 16px;
  font-weight: bold;
}

.v-data-table td {
  font-size: 14px;
}

.v-data-table thead {
  background-color: #f1f1f1;
}
</style>
