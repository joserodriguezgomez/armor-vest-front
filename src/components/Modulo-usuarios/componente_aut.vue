<template>
  <v-sheet :class="['login-sheet', 'mx-auto']" width="300" >
    <v-form @submit.prevent="submitForm">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="email"
              label="Correo Coorporativo"
              :rules="[isNotEmpty, isValidEmail]"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="password"
              label="Contraseña"
              :rules="[isNotEmpty, minLength(6)]"
              type="password"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn type="submit" block class="mt-4">Entrar</v-btn>
          </v-col>
        </v-row>

         <v-row>
          <v-col class="text-center">
            <!-- Utilizando <router-link> si estás usando Vue Router -->
            <router-link to="/forgot-password">¿Olvidaste tu contraseña?</router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    isNotEmpty: value => !!value || "Este campo es obligatorio.",
    isValidEmail: value => /.+@.+\..+/.test(value) || "Introduzca una dirección de correo valida.",
    minLength: length => value => (value && value.length >= length) || `Debe tener al menos ${length} caracteres.`,
  }),
  methods: {
    submitForm() {
      // Aquí puedes manejar la lógica de inicio de sesión utilizando this.email y this.password
      console.log("Email:", this.email);
      console.log("Password:", this.password);
    },
    forgotPassword() {
      // Aquí puedes manejar la redirección a la página de recuperación de contraseña
      // Utiliza this.$router.push("/forgot-password") si estás utilizando Vue Router
      console.log("Redirecting to forgot password page");
    },
  },
};
</script>

<style>
body {
  background-color: black !important; /* Fondo negro para toda la página */
  margin: 0; /* Elimina los márgenes predeterminados del cuerpo */
}

.login-sheet {
  background-color: yellow; /* Fondo amarillo para el formulario */
  color: black; /* Texto en negro para contrastar con el fondo amarillo */
  padding: 20px; /* Añade un poco de espacio alrededor del formulario */
  border-radius: 10px; /* Bordes redondeados para el formulario */
}
</style>