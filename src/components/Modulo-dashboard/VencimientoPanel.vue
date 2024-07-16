<template>
  <v-card class="transparent-card">
    <v-card-title class="white--text">Vencimiento de paneles</v-card-title>
    <v-card-text>
      <Bar :data="chartData" :options="chartOptions" />
    </v-card-text>
  </v-card>
</template>

<script>
import { Bar } from "vue-chartjs";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
);

export default {
  name: "HorizontalBarChart",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ["nov-2023", "jul-2027"],
        datasets: [
          {
            label: 'Monto',
            data: [114, 285], // Datos de ejemplo
            backgroundColor: ["#f87979", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"],
            hoverBackgroundColor: ["#f88f8f", "#5daeff", "#ffda87", "#70d1d1", "#b08eff"]
          }
        ]
      },

      chartOptions: {
        responsive: true,
        indexAxis: 'x',
        plugins: {
          title: {
            display: false,
            text: "Principales Clientes por Monto",
            color: "white",
            font: {
              size: 20
            }
          },
          legend: {
            display: false // Ocultar la leyenda
          },
          datalabels: {
            color: 'white',
            anchor: 'end',
            align: 'start',
            formatter: (value) => `${value}`,
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: "white"
            }
          },
          y: {
            ticks: {
              color: "white"
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
</style>