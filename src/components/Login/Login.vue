<template>
  <v-container class="login-container">
    <v-card class="login-card" max-width="400">
      <v-card-title class="text-center">Login</v-card-title>
      <v-card-subtitle class="text-center">Ingresa tus credenciales para acceder al dashbaord </v-card-subtitle>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            label="Username"
            v-model="username"
            required
            class="login-input"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            type="password"
            required
            class="login-input"
            outlined
            dense
          ></v-text-field>
          <v-btn
            type="submit"
            :disabled="loading"
            class="login-btn"
            elevation="2"
            block
          >
            Login
          </v-btn>
          <v-alert
            v-if="authStatus === 'error'"
            type="error"
            dismissible
            class="login-alert"
          >
            Usuario o contraseña incorrecta.
          </v-alert>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["authStatus"]),
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async handleLogin() {
      this.loading = true;
      try {
        await this.login({ username: this.username, password: this.password });
        this.$router.push({ name: 'Dashboard' });
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #121212; /* Fondo oscuro */
}

.login-card {
  background: #ffffff; /* Fondo blanco del card */
  border-radius: 12px;
  padding: 1rem;
}

.login-input {
  margin-bottom: 1rem;
}

.login-btn {
  background-color: #1e88e5; /* Color de fondo del botón */
  color: white;
  margin-top: 1rem;
}

.login-alert {
  margin-top: 1rem;
}
</style>


