<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :search="search"
    :headers="headers"
    :items-length="totalItems"
    :items="serverItems"
    :loading="loading"
    item-value="name"
    @update:options="loadItems"
  >
  
    <template v-slot:tfoot>
      <tr>
        <td>
          <v-text-field
            v-model="name"
            hide-details
            placeholder="Buscar..."
            class="ma-2"
            density="compact"
          ></v-text-field>
        </td>
      </tr>
    </template>
    
  </v-data-table-server>
</template> 

<script>
const desserts = [
  {
    name: "Banco Santander",
    calories: "Chaleco",
    fat: 123,
    carbs: "S",
    protein: 32156,
    iron: "7415821",
    vencimiento: 2 
  },
  {
    name: "Banco Falabella",
    calories: "Casco",
    fat: 852,
    carbs: "L",
    protein: 147963,
    iron: "123654",
    vencimiento: 7
  },
  {
    name: "Prosegur",
    calories: "Panel",
    fat: 258,
    carbs: "M",
    protein: 963258,
    iron: "753951",
    vencimiento: 7
  },
  {
    name: "Municipalidad Providencia",
    calories: "Chaleco",
    fat: 746,
    carbs: "XL",
    protein: 829375,
    iron: "1839725",
    vencimiento: 2
  },
  {
    name: "Caja los Andes",
    calories: "Chaleco",
    fat: 951,
    carbs: "S",
    protein: 97318,
    iron: "7456321",
    vencimiento: 2
  },
  {
    name: "Banco Santander",
    calories: "Chaleco",
    fat: 123,
    carbs: "S",
    protein: 32156,
    iron: "7415821",
    vencimiento: 7
  },
  {
    name: "Banco Santander",
    calories: "Chaleco",
    fat: 123,
    carbs: "S",
    protein: 32156,
    iron: "7415821",
    vencimiento: 2
  },
  {
    name: "Banco Chile",
    calories: "Casco",
    fat: 519,
    carbs: "M",
    protein: 15632,
    iron: "3579515",
    vencimiento: 2
  },
  {
    name: "Prosegur",
    calories: "Chaleco",
    fat: 123,
    carbs: "M",
    protein: 32156,
    iron: "7415821",
    vencimiento: 7
  },
  {
    name: "Municipalidad Las Condes",
    calories: "Panel",
    fat: 123,
    carbs: "L",
    protein: 32156,
    iron: "7415821",
    vencimiento: 7
  },
];

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy, search }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = desserts.slice().filter((item) => {
          if (
            search.name &&
            !item.name.toLowerCase().includes(search.name.toLowerCase())
          ) {
            return false;
          }

          // eslint-disable-next-line sonarjs/prefer-single-boolean-return
          if (search.calories && !(item.calories >= Text(search.calories))) {
            return false;
          }

          return true;
        });

        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;
          items.sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];
            return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
          });
        }

        const paginated = items.slice(start, end);

        resolve({ items: paginated, total: items.length });
      }, 500);
    });
  },
};

export default {
  data: () => ({
    itemsPerPage: 5,
    headers: [
      {
        title: "Clientes",
        align: "s6tart",
        sortable: false,
        key: "name",
      },
      { title: "Articulo", key: "calories", align: "end" },
      { title: "N° Serie", key: "fat", align: "end" },
      { title: "Talla", key: "carbs", align: "end" },
      { title: "GD", key: "protein", align: "end" },
      { title: "Idic", key: "iron", align: "end" },
      { title: "Duración", key: "vencimiento", align: "center" },
    ],
    serverItems: [],
    loading: true,
    totalItems: 0,
    name: "",
    calories: "",
    search: "",
  }),
  watch: {
    name() {
      this.search = String(Date.now());
    },
    calories() {
      this.search = String(Date.now());
    },
  },
  methods: {
    loadItems({ page, itemsPerPage, sortBy }) {
      this.loading = true;
      FakeAPI.fetch({
        page,
        itemsPerPage,
        sortBy,
        search: { name: this.name, calories: this.calories },
      }).then(({ items, total }) => {
        this.serverItems = items;
        this.totalItems = total;
        this.loading = false;
      });
    },
  },
};
</script>