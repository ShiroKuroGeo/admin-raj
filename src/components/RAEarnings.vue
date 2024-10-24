<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <div class="text-h5">Earning Report Overview</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <div class="row q-col-gutter-md">
          <!-- Date Range Inputs -->
          <div class="col-12 col-md-4">
            <q-input
              v-model="dateRange.start"
              mask="##/##/####"
              outlined
              label="From"
              type="date"
              dense
              filled
            >
              <template v-slot:append>
                <q-icon name="event" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-4">
            <q-input
              v-model="dateRange.end"
              mask="##/##/####"
              outlined
              label="To"
              type="date"
              dense
              filled
            >
              <template v-slot:append>
                <q-icon name="event" />
              </template>
            </q-input>
          </div>

          <!-- Show Button -->
          <div class="col-12 col-md-4 flex flex-center">
            <q-btn
              color="primary"
              label="Show"
              @click="fetchStatistics"
              unelevated
            />
          </div>
        </div>

        <!-- Total Sold Display -->
        <q-input
          outlined
          label="Total Sold:"
          v-model="statistics.totalSold"
          readonly
          dense
        />

        <!-- Total Sales Display -->
        <div class="text-subtitle1 q-mt-md">
          Total Sale (2024): {{ statistics.totalEarnings | currency }}
        </div>

        <!-- Sales Chart Placeholder -->
        <div>
          <q-card flat bordered>
            <q-card-section>
              <canvas id="salesChart" ref="salesChart"></canvas>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  data() {
    return {
      statistics: {
        totalEarnings: 0,
        totalSold: 0,
      },
      dateRange: {
        start: '',
        end: '',
      },
    };
  },
  methods: {
    fetchStatistics() {
      // Fetching earnings statistics based on date range
      fetch(`http://localhost/backend/earnings_statistics.php?start=${this.dateRange.start}&end=${this.dateRange.end}`)
        .then((response) => response.json())
        .then((data) => {
          this.statistics = data;
          this.updateChart(data.salesData); // Update chart with fetched data
        });
    },
    updateChart(salesData) {
      // Create or update the chart with the new sales data
      if (!this.chart) {
        this.chart = new Chart(this.$refs.salesChart, {
          type: 'line',
          data: {
            labels: salesData.months,
            datasets: [
              {
                label: 'Sales',
                data: salesData.values,
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
                borderColor: 'rgba(255, 159, 64, 1)',
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      } else {
        this.chart.data.labels = salesData.months;
        this.chart.data.datasets[0].data = salesData.values;
        this.chart.update();
      }
    },
  },
  mounted() {
    this.fetchStatistics();
  },
  filters: {
    currency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
      }).format(value);
    },
  },
};
</script>

<style scoped>
.q-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.q-card-section {
  max-width: 900px;
}
</style>
