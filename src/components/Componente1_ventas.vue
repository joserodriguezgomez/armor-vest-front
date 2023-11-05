<template>  
  <div  >    
    <v-container  > 
      <v-card class="mx-auto" max-width="1200" >   
      
 <v-row>
  <!-- Boton buscar -->
  <v-col  
      v-if="!allSelected"
          cols="6"
        >
          <v-text-field 
            ref="searchField"
            v-model="search"
            hide-details
            label="Search"
            single-line
          ></v-text-field>
  </v-col>
   
   <!-- Botones iconos -->
  <v-col
    cols="12"
    sm="6"
    class="py-2"
     align="end"
    >
  <v-btn-toggle
    v-model="text"
    rounded="0"
    color="deep-purple-accent-3"
    group
    >
  <v-btn value="left">
    <v-icon>mdi-history</v-icon>
    Filtrar
  </v-btn>

  <v-btn value="center">
    <v-icon>mdi-history</v-icon>
    Crear
  </v-btn>

  <v-btn value="right">
    <v-icon>mdi-history</v-icon>
    Exportar
  </v-btn>

  </v-btn-toggle>
  </v-col>

  <!-- Espacio entre boton buscar y cabecera  -->
  <v-col
    cols="6"
    class="py-2"
    >
  </v-col>
</v-row>
              
<v-table density="compact">
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
    <tr
          v-for="item in desserts" :key="item.name">
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

      
<v-pagination
  v-model="page"
  :length="15"
  :total-visible="7"
></v-pagination>

     
      </v-card>
    </v-container> 
  </div>
</template> 

<script>
export default {
  data () {
      return {
        page: 1,
      }
    },
    data() {
  return {
    text: "" 
  }
},

data() {
    return {
      search: 2, 
    }
  },
  data() {
  return {
    allSelected: false, // Inicializa la propiedad con el valor adecuado
    // otras propiedades de datos
  };
},
  data () {
    return {
      desserts: [
        {
          name: 'juan',
          calories: 159,
            },
             {
          name: 'Dieigo',
          calories: 237,
            },
             {
          name: 'Jose',
          calories: 262,
             },
             {
          name: 'Pedro',
          calories: 305,
             },
             {
          name: 'Claudio',
          calories: 356,
             },
            {
          name: 'Andres',
          calories: 375,
             },
          ],
         }
       },  
  
     
}
        
     
</script> 

<style >
/* .center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200vh; 
  margin: 0 90px; 
  text-align: center;  
  
} */

</style>