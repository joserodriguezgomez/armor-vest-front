<template>
    <v-container fluid class="mi-fondo-personalizado">
        <div class="card-container">
      <v-card
        v-for="(poliza, index) in this.lote_data"
        :key="index"
        class="customer-card"
        @click="goToDetails(poliza.lote)"
      >
        <v-card-text>
          <div class="title-section">
            <h1>{{ poliza.lote }}</h1>
            <a :href="poliza.detailsLink" class="details-link" target="_blank" @click.stop>
              <v-icon>mdi-information</v-icon>
            </a>
          </div>
  
          <div class="details-section">
            <div class="detail-item">
              <v-icon class="detail-icon">mdi-package-variant</v-icon>
              <span class="detail-label">Stock:</span>
              <span class="detail-value">{{ poliza.stock }}</span>
            </div>
            <div class="detail-item">
              <v-icon class="detail-icon">mdi-cart</v-icon>
              <span class="detail-label">Ventas:</span>
              <span class="detail-value">{{ poliza.ventas }}</span>
            </div>
            <div class="detail-item">
              <v-icon class="detail-icon">mdi-calendar</v-icon>
              <span class="detail-label">Fecha vencimiento:</span>
              <span class="detail-value">{{ poliza.vencimientoPoliza }}</span>
            </div>
          </div>
  
          <div class="icon-section">
            <v-icon>mdi-shield</v-icon>
          </div>
        </v-card-text>
  
        <v-progress-linear :value="66.7" height="8" color="green lighten-2" class="animated-progress"></v-progress-linear>
      </v-card>
    </div>

    </v-container>
   
  </template>
  
  <script>

import { mapState, mapActions, mapMutations } from "vuex";

  export default {
    name: 'CustomerCard',
    data() {
      return {
      };
    },
    mounted() {
      this.$store.dispatch("products/fetchProductData","all");
      this.$store.dispatch("products/fetchLoteData");
      
    },
    computed: {
      ...mapState('products', ['productData','lote_data'])},
    methods: {
      ...mapMutations("products", ["SET_LOTE_DATA"]),
      ...mapActions("products", [
        "fetchLoteData",
      ]),
      goToDetails(poliza) {
        console.log("veamos desde cop:",poliza)
        this.$store.dispatch("products/fetchLoteData",poliza);
      }
    }
  };
  </script>
  
  <style scoped>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .customer-card {
    background: linear-gradient(135deg, #0c2857, #060a23f4);
    border-radius: 10px;
    color: white;
    padding: 16px;
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
    animation: fadeIn 0.5s ease-in-out;
    max-width: 100%;
    cursor: pointer;
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .customer-card:hover {
    box-shadow: 0 10px 20px rgba(229, 221, 221, 0.2);
    transform: translateY(-5px) scale(1.05);
  }
  
  .title-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .title-section h1 {
    margin: 0;
    font-size: 32px;
    font-weight: bold;
    transition: text-shadow 0.3s ease-in-out;
  }
  
  .details-link {
    color: white;
    transition: opacity 0.3s ease-in-out;
  }
  
  .details-link:hover {
    opacity: 0.7;
  }
  
  .customer-card:hover .title-section h1 {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
  }
  
  .details-section {
    margin-top: 16px;
  }
  
  .detail-item {
    font-size: 16px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
  }
  
  .detail-icon {
    margin-right: 8px;
    opacity: 0.7;
  }
  
  .detail-label {
    font-weight: bold;
    margin-right: 4px;
  }
  
  .detail-value {
    font-size: 14px;
    color: #a1c4fd;
  }
  
  .icon-section {
    position: absolute;
    right: 16px;
    bottom: 16px;
    opacity: 0.2;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }
  
  .customer-card:hover .icon-section {
    opacity: 0.5;
    transform: rotate(10deg);
  }
  
  .icon-section v-icon {
    font-size: 120px;
  }
  
  .v-progress-linear {
    margin-top: 16px;
  }
  
  .animated-progress {
    width: 66.7%;
  }
  
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: opacity 0.5s, transform 0.5s;
  }
  
  .fade-slide-enter,
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }

  .mi-fondo-personalizado {
  background-color: silver;
}
  </style>
  