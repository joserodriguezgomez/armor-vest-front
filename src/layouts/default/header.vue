 <template>
  <div>
    <v-toolbar density="compact" color="black">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <img src="@/assets/armor2.png" alt="Imagen de perfil" class="imagen-perfil">
      
      <v-spacer> </v-spacer>

      <v-btn class="text-none" stacked>
      <v-badge content="2" color="error">
        <v-icon>mdi-bell-outline</v-icon>
      </v-badge>
    </v-btn>

      <v-btn icon>
         <v-icon icon="mdi-account-circle"></v-icon>  
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>





 <style>
.custom-head {
  background-color: #13195c; /* Color de fondo personalizado */
  color: rgb(255, 255, 255); /* Color de texto personalizado */
  padding: 5px; /* Espaciado personalizado */
  /* Agrega estilos CSS personalizados según tus necesidades */
}
.imagen-perfil {
  width: 100px; /* Ancho personalizado */
  height: 40px; /* Alto personalizado */
 /* Forma de círculo (opcional) */
  /* Otros estilos personalizados según tus necesidades */
}

</style>

<!-- amarillo armor-vest
ffb71a -->