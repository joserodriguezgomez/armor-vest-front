<template>

  <v-card>
    
    <v-layout align-center justify-space-around wrap>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item prepend-avatar=" ccount_circle" title="" nav>
          <v-avatar color="teal">
            <span class="white--text headline">C</span>
          </v-avatar>
          <template v-slot:append > 
            
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
            prepend-icon="mdi-view-dashboard"
            title="Dashboard"
            value="Home"
            to="/"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-star"
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
          <v-list-item
            prepend-icon="mdi-folder-outline"
            title="Productos"
            value="productos"
            to="/productos"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="custom-main" style="height: 700px">
        <router-view></router-view>
      </v-main>
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
/* color de fondo  */
.custom-main {
  background: #e2e5e8; 
}
</style>

// background: #e2e5e8