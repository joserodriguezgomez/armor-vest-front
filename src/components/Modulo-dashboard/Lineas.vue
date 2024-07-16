<template>
  <v-card class="transparent-card">
    <v-card-title class="white--text">Ventas mensuales por talla de chaleco</v-card-title>
    <v-card-text>
      <Line :data="chartData" :options="chartOptions" />
    </v-card-text>
  </v-card>
</template>

<script>
import { Line } from "vue-chartjs";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
);

export default {
  name: "LineChart",
  components: { Line },
  data() {
    return {
      chartData: {
        labels: [
          "dic/22", "dic/23", "ene/24", "feb/24"],
        datasets: [
          {
            label: 'Talla L',
            data: [119, 35, 9, 0],
            borderColor: "#f87979",
            backgroundColor: "rgba(248, 121, 121, 0.5)",
            fill: true
          },
          {
            label: 'Talla M',
            data: [49,92,6,0],
            borderColor: "#36a2eb",
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            fill: true
          },
          {
            label: 'Talla S',
            data: [30,0,0,0],
            borderColor: "#ffcd56",
            backgroundColor: "rgba(255, 205, 86, 0.5)",
            fill: true
          },
          {
            label: 'Talla XL',
            data: [69,12,8,2],
            borderColor: "#00913f",
            backgroundColor: "rgba(0, 205, 0, 0.5)",
            fill: true
          },
          {
            label: 'Talla XXL',
            data: [18,0,0,0],
            borderColor: "#FF5733",
            backgroundColor: "rgba(255, 87, 51, 0.5)",
            fill: true
          }
        ]
      },
      chartOptions: {
        responsive: true,
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
