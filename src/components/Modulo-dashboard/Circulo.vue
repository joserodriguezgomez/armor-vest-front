<template>
  <v-card class="transparent-card">
    <v-card-title class="white--text">Stock Disponible por Talla de Chaleco</v-card-title>
    <v-card-text>
      <Pie :data="chartData" :options="chartOptions" class="chart-canvas" />
    </v-card-text>
  </v-card>
</template>

<script>
import { Pie } from "vue-chartjs";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
);

export default {
  name: "PieChart",
  components: { Pie },
  data() {
    return {
      chartData: {
        labels: ["Talla S", "Talla M", "Talla XL"],
        datasets: [
          {
            label: 'Stock Disponible',
            data: [50, 75, 25], // Aquí los datos del stock de ejemplo
            backgroundColor: ["#f87979", "#36a2eb", "#ffcd56"],
            hoverBackgroundColor: ["#f88f8f", "#5daeff", "#ffda87"]
          }
        ]
      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false, // Permite que el gráfico se ajuste mejor al contenedor
        plugins: {
          title: {
            display: false,
            text: "Stock Disponible",
            color: "white",
            font: {
              size: 20
            }
          },
          legend: {
            labels: {
              color: "white"
            }
          },
          datalabels: {
            color: 'white',
            formatter: (value, context) => `${value}`,
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        }
      }
    };
  }
};
</script>

<style scoped>
.transparent-card {
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #ccc;
}
.white--text {
  color: white !important;
}
.chart-canvas {
  position: relative;
  height: 300px; /* Ajusta la altura según sea necesario */
}
</style>
