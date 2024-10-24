<template>
    <q-page>
      <q-card>
        <q-card-section>
          <div class="text-h6">Product History</div>
        </q-card-section>
        <q-table
          :rows="productHistory"
          :columns="columns"
          row-key="id"
          :loading="loading"
        />
      </q-card>
    </q-page>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        productHistory: [],
        loading: true,
        columns: [
          { name: 'product_name', label: 'Product Name', align: 'left', field: 'product_name' },
          { name: 'action', label: 'Action', align: 'left', field: 'action' },
          { name: 'date', label: 'Date', align: 'left', field: 'date' },
          { name: 'user', label: 'Performed By', align: 'left', field: 'user' }
        ]
      };
    },
    async created() {
      await this.fetchProductHistory();
    },
    methods: {
      async fetchProductHistory() {
        try {
          const response = await axios.get('/api/product-history');
          this.productHistory = response.data;
        } catch (error) {
          console.error('Error fetching product history:', error);
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>