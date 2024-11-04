<template>
  <v-card>
    <div>
      <v-toolbar density="compact" color="black">
        <v-app-bar-nav-icon @click.stop="rail = !rail"></v-app-bar-nav-icon>
        <img
          src="@/assets/armor2.png"
          alt="Imagen de perfil"
          class="imagen-perfil"
          @click="rail = false"
        />

        <v-spacer></v-spacer>

        <v-menu
          offset-y
          :close-on-content-click="false"
          v-slot:activator="{ on, attrs }"
          class="logout-style"
          v-if="isAuthenticated"
        >
          <v-list>
            <!-- Opción de cerrar sesión estilizada -->
            <v-list-item @click="handleLogout" class="logout-style">
              <v-list-item-icon>
                <v-icon color="white">mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="logout-style">Cerrar sesión</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </div>
    <v-layout align-center justify-space-around wrap>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
        app
        class="drawer-with-background"
      >
        <v-list-item class="user-info" dense>
          <v-list-item-avatar>
            <v-icon color="hielo" size="28">mdi-account-circle</v-icon>
          </v-list-item-avatar>
        </v-list-item>

        <v-divider value="Users"></v-divider>

        <v-list dense nav>
          <v-list-item
            prepend-icon="mdi-chart-bar"
            title="Dashboard"
            value="Dashboard"
            to="/Dashboard"
          ></v-list-item>

         <!-- <v-list-item
            prepend-icon="mdi-handshake"
            title="Clientes"
            value="clientes"
            to="/clientes"
          ></v-list-item> -->

          <v-list-item
            prepend-icon="mdi-account-multiple"
            title="Usuarios"
            value="usuarios"
            to="/usuarios"
          ></v-list-item>

          <v-list-item
            prepend-icon="mdi-file-document"
            title="Reporte"
            value="reporte"
            to="/reporte"
          ></v-list-item>

        </v-list>
      </v-navigation-drawer>

      <my-toolbar :drawer="drawer"></my-toolbar>
      <v-main class="custom-main">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      drawer: true,
      rail: true,
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async handleLogout() {
      try {
        await this.logout(); // Ejecuta la acción de logout
        this.$router.push({ name: 'Login' }); // Redirige a la página de login
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Colores */
.custom-main {
  background: #333232;
  /* background: url("@/assets/chaleco14.jpg") center/cover; */
  /* background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("@/assets/chaleco14.jpg") center/cover;
  z-index: -1;
  filter: blur(5px); /* Ajusta el valor de desenfoque según sea necesario */
  
}



.main-header {
  background-color: #ffb71a;
  color: rgba(0, 0, 0, 0.7);
  padding: 10px 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 3px;
}

.v-navigation-drawer {
  background-color: #ffffff;
}

.drawer-with-background {
  background: url("@/assets/chaleco13.jpg") center/cover;
  color: #ffffff;
  padding: 0px;
  background-size: 200% 100%;
}

.drawer-with-background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("@/assets/chaleco13.jpg") center/cover;
  z-index: -1;
  filter: blur(4px); /* Ajusta el valor de desenfoque según sea necesario */
  background-size: 200% 100%;
}
.v-navigation-drawer .v-list-item:hover {
  background-color: #ffb71a; /* Cambia 'your-hover-color' por el color deseado al pasar el mouse */
  color: #000000; /* Cambia 'your-hover-text-color' por el color del texto deseado al pasar el mouse */
}

/* Media query para pantallas pequeñas */
@media (max-width: 600px) {
  .main-header {
    font-size: 1.2rem;
    padding: 10px 15px;
  }
}
/* Cambia el color del menú al pasar el mouse */
.v-navigation-drawer:hover {
  background-color: #ffb71a; /* Cambia 'your-hover-color' por el color deseado al pasar el mouse */
}

.v-navigation-drawer:hover .drawer-with-background h2,
.v-navigation-drawer:hover .drawer-with-background p {
  color: #ffb71a; /* Cambia 'your-hover-text-color' por el color del texto deseado al pasar el mouse */
}
.custom-head {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  color: rgb(255, 255, 255);
  padding: 5px;
}

.imagen-perfil {
  width: 100px;
  height: 40px;
}

.logout-style{
  background-color: black;
  color:white

}


</style>