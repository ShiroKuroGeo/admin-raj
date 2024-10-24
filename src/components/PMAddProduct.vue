<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <h4>Add New Product</h4>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleSubmit" @reset="handleReset">
          <!-- Product Name Input -->
          <q-input 
            v-model="product.name" 
            label="Product Name" 
            placeholder="New Product" 
            outlined
            required />

          <!-- Short Description -->
          <q-input 
            v-model="product.description" 
            label="Short Description" 
            placeholder="Short description" 
            outlined
            type="textarea" 
            required />

          <!-- Upload Image -->
          <q-uploader
            label="Upload Product Image"
            url=""
            @uploaded="handleUpload"
            accept=".jpg, .png"
            outlined
            square
            hide-upload-button>
            <div class="text-center q-pa-md">
              <q-icon name="cloud_upload" size="42px" />
              <span>Upload Image</span>
            </div>
          </q-uploader>

          <!-- Stock Information -->
          <q-select
            v-model="product.stockType"
            label="Stock Type"
            :options="['Daily', 'Weekly', 'Monthly']"
            outlined
            required />

          <!-- Category Information -->
          <q-select
            v-model="product.category"
            label="Category"
            :options="categories"
            outlined
            required />

          <!-- Price Information -->
          <q-input 
            v-model="product.price" 
            label="Default Price" 
            placeholder="Type" 
            type="number"
            outlined 
            required />

          <!-- Action Buttons -->
          <div class="row justify-end q-gutter-md">
            <q-btn label="Reset" type="reset" color="grey" />
            <q-btn label="Submit" type="submit" color="orange" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      product: {
        name: '',
        description: '',
        image: null,
        stockType: '',
        category: '', // Add category property
        price: 0,
      },
      categories: [
        'Drinks',
        'Specialty Foods',
        'Daily Foods',
        // Add more categories as needed
      ],
    };
  },
  methods: {
    handleUpload(file) {
      // Handle the uploaded file, possibly save it in backend or cloud storage
      this.product.image = file; // Save the image
    },
    handleSubmit() {
      const formData = new FormData();
      formData.append('name', this.product.name);
      formData.append('description', this.product.description);
      formData.append('stockType', this.product.stockType);
      formData.append('category', this.product.category); // Add category to form data
      formData.append('price', this.product.price);
      if (this.product.image) {
        formData.append('image', this.product.image);
      }

      fetch('add_product.php', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.handleReset();
        // Notify NewSale.vue to refresh product list
        this.$router.push({ name: 'PosNewSale' }); // Navigate to NewSale page to refresh
      })
      .catch(error => {
        console.error('Error:', error);
      });
    },
    handleReset() {
      // Clear the form
      this.product = {
        name: '',
        description: '',
        image: null,
        stockType: '',
        category: '', // Reset category
        price: 0,
      };
    }
  }
};
</script>

<style scoped>
.q-uploader .q-uploader__header {
  display: none;
}
</style>
