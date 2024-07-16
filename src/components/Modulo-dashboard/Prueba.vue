<template>
  <v-card class="transparent-card">
    <v-card-title class="white--text">Ventas mensuales: Principales clientes</v-card-title>
    <!-- <v-card-subtitle class="white--text">Visual representation of monthly data</v-card-subtitle> -->
    <v-card-text>
      <Bar :data="chartData" :options="chartOptions" />
    </v-card-text>
  </v-card>
</template>




<script>
import { Bar } from "vue-chartjs";
import ChartDataLabels from 'chartjs-plugin-datalabels'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels)

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
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ["Loomis", "BCI", "Defensa Cobra","M.La florida","Dicrep","Interpolar",
        "M.Villa alemana","Vertycal","EFE Valparaiso","M.Quintero"],
        datasets: [
          {
            label: 'Clientes',
            data: [48, 31, 30,27, 18, 14,13, 12, 12,10],
            backgroundColor: "#f87979"
          }
        ]
      },

      chartOptions: {
        responsive: true,
        indexAxis: 'y',
        plugins: {
          title: {
            display: false,
            text: "Ventas",
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
            anchor: 'end',
            align: 'start',
            formatter: (value) => value,
            font: {
              size: 14, // Tamaño de la letra
              weight: 'bold' // Negrita
            }
          },
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
  },
}

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

