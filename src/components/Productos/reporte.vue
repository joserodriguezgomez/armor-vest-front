
<template>
    <v-container>
      <v-select
        v-model="selectedClient"
        :items="uniqueClients"
        label="Seleccione un cliente"
        outlined
      ></v-select>
  
      <div v-if="selectedClient && filteredChalecos.length" class="mt-5">
        <v-card class="mb-4">
          <v-card-title>
            Resumen del Cliente: {{ selectedClient }}
          </v-card-title>
          <v-card-text>
            <p>Total de chalecos vendidos: {{ totalChalecosVendidos }}</p>
            <p>Cantidad por talla:</p>
            <ul>
              <li v-for="(count, size) in chalecosPorTalla" :key="size">
                Talla {{ size }}: {{ count }}
              </li>
            </ul>
          </v-card-text>
          <v-btn color="primary" @click="exportToExcel">Exportar a Excel</v-btn>
          <v-btn color="secondary" @click="exportToPDF">Exportar a PDF</v-btn>
        </v-card>
  
        <v-data-table
          :headers="headers"
          :items="filteredChalecos"
          dense
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
  import * as XLSX from 'xlsx';
  import jsPDF from 'jspdf';
  import 'jspdf-autotable'; // Importa el módulo para crear tablas automáticamente
  
  export default {
    data() {
      return {
        selectedClient: null,
        chalecos: [
{
  _id: "6697029ecf520eab72cfc8ac",
  idChaleco: 20,
  lote: "Lote A",
  serie: "S001",
  idic: "IC001",
  polizaNombre: "Poliza A",
  vencimientoPoliza: "2024-07-16T23:30:36.701Z",
  vencimientoPanel: "2024-07-16T23:30:36.701Z",
  modelo: "Modelo X",
  status: "vendido",
  talla: "M",
  precio: 150.0,
  cliente: "Cliente A",
  vendedor: "Vendedor 1",
  factura: "F001",
  gd: "GD001",
  fechaVenta: "2024-08-17T00:00:00.000Z",
  comentarios: "Entregado sin observaciones",
  createdAt: "2024-07-16T23:30:36.701Z",
  createdBy: "Admin",
  updatedAt: "2024-07-16T23:30:36.701Z",
  updatedBy: "Admin",
  vencimiento_funda: "2024-07-16T23:30:36.701Z",
  precio_funda: 20.0,
  dup: "D1"
},
{
  _id: "6697029ecf520eab72cfc8ad",
  idChaleco: 21,
  lote: "Lote B",
  serie: "S002",
  idic: "IC002",
  polizaNombre: "Poliza B",
  vencimientoPoliza: "2024-08-16T23:30:36.701Z",
  vencimientoPanel: "2024-08-16T23:30:36.701Z",
  modelo: "Modelo Y",
  status: "vendido",
  talla: "L",
  precio: 160.0,
  cliente: "Cliente A",
  vendedor: "Vendedor 2",
  factura: "F002",
  gd: "GD002",
  fechaVenta: "2024-08-20T00:00:00.000Z",
  comentarios: "Requiere revisión",
  createdAt: "2024-07-20T23:30:36.701Z",
  createdBy: "Admin",
  updatedAt: "2024-07-20T23:30:36.701Z",
  updatedBy: "Admin",
  vencimiento_funda: "2024-08-16T23:30:36.701Z",
  precio_funda: 25.0,
  dup: "D2"
},
{
  _id: "6697029ecf520eab72cfc8ae",
  idChaleco: 22,
  lote: "Lote C",
  serie: "S003",
  idic: "IC003",
  polizaNombre: "Poliza C",
  vencimientoPoliza: "2024-09-16T23:30:36.701Z",
  vencimientoPanel: "2024-09-16T23:30:36.701Z",
  modelo: "Modelo Z",
  status: "vendido",
  talla: "M",
  precio: 140.0,
  cliente: "Cliente B",
  vendedor: "Vendedor 3",
  factura: "F003",
  gd: "GD003",
  fechaVenta: "2024-08-25T00:00:00.000Z",
  comentarios: "Pendiente de entrega",
  createdAt: "2024-07-25T23:30:36.701Z",
  createdBy: "Admin",
  updatedAt: "2024-07-25T23:30:36.701Z",
  updatedBy: "Admin",
  vencimiento_funda: "2024-09-16T23:30:36.701Z",
  precio_funda: 15.0,
  dup: "D3"
}
],
        headers: [
          { text: 'ID Chaleco', value: 'idChaleco' },
          { text: 'Modelo', value: 'modelo' },
          { text: 'Talla', value: 'talla' },
          { text: 'Precio', value: 'precio' },
          { text: 'Fecha Venta', value: 'fechaVenta' },
          { text: 'Vendedor', value: 'vendedor' }
        ]
      };
    },
    computed: {
      uniqueClients() {
        return [...new Set(this.chalecos.map(chaleco => chaleco.cliente))];
      },
      filteredChalecos() {
        return this.chalecos.filter(chaleco => chaleco.cliente === this.selectedClient);
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
    methods: {
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
    const headers = [['ID Chaleco', 'Modelo', 'Talla', 'Precio', 'Fecha Venta', 'Vendedor']];
    const data = this.filteredChalecos.map(chaleco => [
      chaleco.idChaleco,
      chaleco.modelo,
      chaleco.talla,
      chaleco.precio,
      chaleco.fechaVenta,
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
  </style>
  
  
  