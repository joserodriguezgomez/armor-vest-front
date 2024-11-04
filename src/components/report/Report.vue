
<template>
    <v-container fluid class="min-height">
      <v-select
        class = "selectStyle"
        v-model="selectedClient"
        :items="uniqueClients"
        label="Seleccione un cliente"
        outlined
      ></v-select>
  
      <div v-if="selectedClient && filteredChalecos.length" class="mt-5">
        <v-card class="mb-4">
  <v-card-title class="headline">
    Resumen del Cliente: {{ selectedClient }}
  </v-card-title>
  <v-card-text>
    <v-row class="mb-3">
      <v-col cols="12">
        <p>Total de chalecos vendidos: <strong>{{ totalChalecosVendidos }}</strong></p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p>Cantidad por talla:</p>
        <v-chip-group
          column
          class="d-flex flex-wrap"
        >
          <v-chip
            v-for="(count, size) in chalecosPorTalla"
            :key="size"
            color="primary"
            text-color="white"
            class="ma-1"
          >
            Talla {{ size }}: {{ count }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>


    <v-row>
  <v-col cols="12">
    <p>Fecha vencimiento panel:</p>
    <v-chip
      v-if="filteredChalecos.length > 0"
      color="primary"
      text-color="white"
      class="ma-1"
    >
    {{ formatDate(filteredChalecos[0].vencimientoPanel) }}
    </v-chip>
  </v-col>
</v-row>


  </v-card-text>
  <v-card-actions>
    <v-btn color="primary" @click="exportToExcel">Exportar a Excel</v-btn>
    <v-btn color="secondary" @click="exportToPDF">Exportar a PDF</v-btn>
  </v-card-actions>
</v-card>

  
        <v-data-table
          :headers="headers"
          :items="filteredChalecos"
          class="mt-3"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Detalle de Chalecos</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
        </v-data-table>
      </div>
  
      <v-alert v-else type="info" class="mt-5">
        No hay chalecos para el cliente seleccionado.
      </v-alert>
    </v-container>
  </template>
  
  <script>
   import { mapState, mapActions, mapMutations } from "vuex";
  import * as XLSX from 'xlsx';
  import jsPDF from 'jspdf';
  import 'jspdf-autotable'; // Importa el módulo para crear tablas automáticamente
  
  export default {
    data() {
      return {
        selectedClient: null,
        headers: [
          { title: 'Serie', key: 'serie' },
          { title: 'Factura', key: 'factura' },
          { title: 'Talla', key: 'talla' },
          { title: 'Precio', key: 'precio' },
          { title: 'Poliza', key: 'polizaNombre' },
          { title: 'Vendedor', key: 'vendedor' }
        ]
      };
    },
    computed: {
      ...mapState('products', ['productData','lote_data']),
      uniqueClients() {
        return [...new Set(this.productData.map(chaleco => chaleco.cliente))];
      },
      filteredChalecos() {
        return this.productData.filter(chaleco => chaleco.cliente === this.selectedClient);
      },
      totalChalecosVendidos() {
        return this.filteredChalecos.length;
      },
      chalecosPorTalla() {
        return this.filteredChalecos.reduce((acc, chaleco) => {
          acc[chaleco.talla] = (acc[chaleco.talla] || 0) + 1;
          return acc;
        }, {});
      }
    },
    mounted() {
        console.log("desde report:",this.productData)
    },
    methods: {
        formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formatea la fecha a "YYYY-MM-DD"
  },
      exportToExcel() {
        const worksheetData = [
          ['Resumen de Cliente: ' + this.selectedClient],
          ['Total de chalecos vendidos', this.totalChalecosVendidos],
          [],
          ['Cantidad por talla:'],
          ...Object.entries(this.chalecosPorTalla).map(([talla, count]) => [talla, count]),
          [],
          ['ID Chaleco', 'Modelo', 'Talla', 'Precio', 'Fecha Venta', 'Vendedor'],
          ...this.filteredChalecos.map(chaleco => [
            chaleco.idChaleco,
            chaleco.modelo,
            chaleco.talla,
            chaleco.precio,
            chaleco.fechaVenta,
            chaleco.vendedor
          ])
        ];
  
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte Cliente');
        XLSX.writeFile(workbook, `Reporte_${this.selectedClient}.xlsx`);
      },
      exportToPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Reporte para ${this.selectedClient}`, 14, 20);
    doc.setFontSize(12);
    doc.text(`Total de chalecos vendidos: ${this.totalChalecosVendidos}`, 14, 30);
    doc.text(`Vencimiento Panel: ${this.formatDate(this.filteredChalecos[0].vencimientoPanel)}`, 14, 35);
    // Datos de "Cantidad por talla"
    doc.text('Cantidad por talla:', 14, 40);
    const sizes = this.chalecosPorTalla; // Obtener los datos de cantidad por talla
    let startY = 45; // Posición vertical para el inicio de los datos de tallas

    // Agregar la cantidad por talla al PDF
    for (const [size, count] of Object.entries(sizes)) {
      doc.text(`Talla ${size}: ${count}`, 14, startY);
      startY += 5; // Aumentar la posición vertical para la siguiente talla
    }

    // Encabezados para la tabla de detalles
    const headers = [['Serie', 'factura', 'Talla', 'Precio', 'Poliza', 'Vendedor']];
    const data = this.filteredChalecos.map(chaleco => [
      chaleco.serie,
      chaleco.factura,
      chaleco.talla,
      chaleco.precio,
      chaleco.polizaNombre,
      chaleco.vendedor
    ]);

    // Crear la tabla
    doc.autoTable({
      head: headers,
      body: data,
      startY: startY + 10 // Ajustar la posición vertical para comenzar la tabla
    });
    
    // Guardar el PDF
    doc.save(`Reporte_${this.selectedClient}.pdf`);
  }

    }
  };
  </script>
  
  <style scoped>
  .mt-5 {
    margin-top: 20px;
  }
  .mb-4 {
    margin-bottom: 20px;
  }

  .min-height {
  min-height: 100vh; /* 80% del viewport height */
}

.selectStyle{
    background: white;
}
  </style>
  