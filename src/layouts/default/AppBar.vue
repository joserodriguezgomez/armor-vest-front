<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title=""
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home-city"
            title="Dashboard"
            value="Home"
            to="/"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account"
            title="Ventas"
            value="Ventas"
            to="/ventas"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Clientes"
            value="clientes"
            to="/clientes"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class = "custom-main" style="height: 700px"> <router-view></router-view> </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
    };
  },
};
</script>


<style scoped>
  .custom-main{
    background: #e2e5e8;
  }

</style>