<template>
   
  <v-card>
    
       <v-layout align-center justify-space-around wrap>
      <v-navigation-drawer
        style="color"
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
        color= 'grey-lighten-5'
      >
        <v-list-item density="compact" nav>
          <v-avatar color="amber">
            <span class="white--text headline"> AA </span>
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
            prepend-icon="mdi-chart-bar"
            title="Dashboard"
            value="Home"
            to="/"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-store"
            title="Ventas"
            value="Ventas"
            to="/ventas"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-headset"
            title="Clientes"
            value="clientes"
            to="/clientes"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-package"
            title="Productos"
            value="productos"
            to="/productos"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-folder-outline"
            title="Polizas"
            value="polizas"
            to="/polizas"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-folder-outline"
            title="Polizas"
            value="polizas"
            to="/polizas"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="custom-main" style="height: 1300px">
        <div class="main-header">{{this.main_title}}</div>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      drawer: true,
      rail: true,
    };
  },
  computed:{
    ...mapState('menu', ['main_title'])
  }
};
</script>


<style scoped>
/* color de fondo  */
.custom-main {
  background: #f1f2f4; 
}


.main-header {
  background-color: #FFB71A;  /* Color de fondo: Azul oscuro, puedes cambiarlo */
  color: rgba(0, 0, 0, 0.7);              /* Color del texto */
  padding: 10px 20px;        /* Relleno: 15px arriba/abajo, 20px izquierda/derecha */
  text-align: center;        /* Alineación del texto: centrado */     /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para dar efecto elevado */
  font-size: 1.5rem;         /* Tamaño de la fuente */
  font-weight: 500;          /* Grosor de la fuente */
  margin-bottom: 3px;       /* Espacio debajo del encabezado */
}

/* Media query para pantallas pequeñas */
@media (max-width: 600px) {
  .main-header {
    font-size: 1.2rem;       /* Tamaño de fuente más pequeño para pantallas pequeñas */
    padding: 10px 15px;      /* Relleno más pequeño para pantallas pequeñas */
  }
}



</style>




