<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Expense Management</div>
        <q-btn label="Add Expense" color="primary" @click="showDialog = true" />
      </q-card-section>

      <q-table
        :rows="expenses"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[5, 10, 25]"
      >
        <template v-slot:body-cell-actions="props">
          <q-td>
            <q-btn flat icon="edit" color="primary" @click="editExpense(props.row)" />
            <q-btn flat icon="delete" color="negative" @click="deleteExpense(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ editing ? 'Edit Expense' : 'Add New Expense' }}</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="form.description" label="Description" />
          <q-input v-model="form.amount" type="number" label="Amount" />
          <q-input v-model="form.date" type="date" label="Date" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="negative" @click="showDialog = false" />
          <q-btn flat label="Save" color="primary" @click="saveExpense" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      expenses: [],
      columns: [
        { name: 'description', label: 'Description', align: 'left', field: 'description' },
        { name: 'amount', label: 'Amount', align: 'left', field: 'amount' },
        { name: 'date', label: 'Date', align: 'left', field: 'date' },
        { name: 'actions', label: 'Actions', align: 'center', field: 'actions' }
      ],
      showDialog: false,
      editing: false,
      form: {
        id: null,
        description: '',
        amount: '',
        date: ''
      }
    }
  },
  methods: {
    fetchExpenses() {
      // Fetch data from backend
      fetch('http://localhost/backend/expenses.php?action=fetch')
        .then(response => response.json())
        .then(data => {
          this.expenses = data;
        });
    },
    saveExpense() {
      let action = this.editing ? 'update' : 'create';
      fetch(`http://localhost/backend/expenses.php?action=${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      })
        .then(() => {
          this.fetchExpenses();
          this.showDialog = false;
        });
    },
    editExpense(expense) {
      this.editing = true;
      this.form = { ...expense };
      this.showDialog = true;
    },
    deleteExpense(id) {
      fetch(`http://localhost/backend/expenses.php?action=delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      }).then(() => {
        this.fetchExpenses();
      });
    }
  },
  mounted() {
    this.fetchExpenses();
  }
};
</script>

<style scoped>
</style>
