<template>
    <div class="chart-container">
      <canvas ref="chart"></canvas>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default defineComponent({
    props: {
      isThisWeek: {
        type: Boolean,
        default: false,
      },
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const ctx = this.$refs.chart.getContext('2d');
  
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'Data',
                backgroundColor: this.isThisWeek ? '#4dabf5' : '#DDDEEE',
                data: [100, 150, 200, 250, 200, 150, 100, 50, 75, 100, 125, 150],
                borderWidth: 0,
                borderRadius: 5,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    family: 'Inter, sans-serif',
                    size: 14,
                  },
                  color: '#9ca3af',
                },
              },
              y: {
                grid: {
                  color: '#e5e7eb',
                  borderDash: [5],
                  drawBorder: false,
                },
                ticks: {
                  font: {
                    family: 'Inter, sans-serif',
                    size: 14,
                  },
                  color: '#9ca3af',
                },
              },
            },
          },
        });
      },
    },
  });
  </script>
  
  <style>
  .chart-container {
    margin: 5px 0px;
    border: 1px solid #eff1f5;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);
  }
  
  canvas {
    width: 100%;
    height: 100%;
  }
  </style>
  