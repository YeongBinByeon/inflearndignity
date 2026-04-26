<template>
  <div class="mt-3">
    <div class="row gy-2 gx-3 align-items-center">
      <div class="col-auto">
        <label class="visually-hidden" for="customerName">Name</label>
        <input
          type="text"
          class="form-control"
          id="customerName"
          placeholder="Customer Name"
          v-model="searchName"
          @keyup.enter="doSearch"
        />
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary me-1" @click="doSearch">
          Search
        </button>
        <button
          class="btn btn-success me-1"
          :disabled="selectedCustomers.length === 0"
          @click="doSave"
        >
          Save
        </button>
        <button
          class="btn btn-danger"
          :disabled="selectedCustomers.length === 0"
          @click="doDelete"
        >
          Delete
        </button>
      </div>
    </div>
    <table class="table table-bordered mt-2">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Company</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="customer.id" v-for="customer in customers">
          <td>
            <input
              type="checkbox"
              class="form-check-input"
              :value="customer.id"
              v-model="selectedCustomers"
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.name"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.company"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.email"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.phone"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.address"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      customers: [],
      searchName: '',
      selectedCustomers: []
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    async doSearch() {
      this.customers = await this.$get(
        `/customers?name_contains=${this.searchName}`
      )
    },
    async doSave() {
      const selectedCustomerData = []
      this.selectedCustomers.forEach((id) => {
        selectedCustomerData.push(
          this.customers.filter((customers) => customers.id === id)[0]
        )
      })
      console.log(selectedCustomerData)

      let isEmptyName = false
      let isEmptyCompany = false
      let isEmptyEmail = false
      let isEmptyPhone = false
      let isEmptyAddress = false
      selectedCustomerData.forEach((customer) => {
        if (customer.name === '') {
          isEmptyName = true
        }
        if (customer.company === '') {
          isEmptyCompany = true
        }
        if (customer.email === '') {
          isEmptyEmail = true
        }
        if (customer.phone === '') {
          isEmptyPhone = true
        }
        if (customer.address === '') {
          isEmptyAddress = true
        }
      })
      if (isEmptyName) {
        return alert('입력되지 않은 Name이 있습니다.')
      }
      if (isEmptyCompany) {
        return alert('입력되지 않은 Company가 있습니다.')
      }
      if (isEmptyEmail) {
        return alert('입력되지 않은 Email이 있습니다.')
      }
      if (isEmptyPhone) {
        return alert('입력되지 않은 Phone이 있습니다.')
      }
      if (isEmptyAddress) {
        return alert('입력되지 않은 Address가 있습니다.')
      }

      if (confirm('정말 저장하시겠습니까?')) {
        let isSuccess = true

        selectedCustomerData.forEach(async (customer) => {
          const r = await this.$put(`/customers/${customer.id}`, customer)
          if (r.status !== 200) {
            isSuccess = false
          }
        })

        if (isSuccess) {
          alert('고객 정보가 수정 되었습니다.')
          this.editMode = false
        } else {
          alert('저장에 실패한 데이터가 있습니다. 다시 시도하세요.')
        }

        this.selectedCustomers = []
        this.doSearch()
      }
    },
    async doDelete() {
      if (confirm('정말 삭제하시겠습니까?')) {
        let isSuccess = true

        this.selectedCustomers.forEach(async (id) => {
          const r = await this.$delete(`/customers/${id}`)
          if (r.status !== 200) {
            isSuccess = false
          }
        })

        if (isSuccess) {
          alert('고객 정보가 삭제 되었습니다.')
          this.editMode = false
        } else {
          alert('삭제에 실패한 데이터가 있습니다. 다시 시도하세요.')
        }

        this.selectedCustomers = []
        this.doSearch()
      }
    }
  }
}
</script>
