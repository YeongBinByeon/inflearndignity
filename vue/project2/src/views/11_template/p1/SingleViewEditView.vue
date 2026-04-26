<template>
  <div class="mt-e">
    <div class="row">
      <div class="row mb-3">
        <label for="selectCustomer" class="col-sm-2 col-form-label"
          >Customer</label
        >
        <div class="col-sm-10">
          <select
            class="form-select"
            id="selectCustomer"
            v-model="selectedCustomerId"
            @change="getCustomer"
          >
            <option value="">==Select Cusomter==</option>
            <option
              :value="customer.id"
              :key="customer.id"
              v-for="customer in customers"
            >
              {{ customer.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="row mb-3">
        <label for="customerName" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="customerName"
            v-model="customer.name"
            :disabled="!editMode"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="customerCompany" class="col-sm-2 col-form-label"
          >Company</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="customerCompany"
            v-model="customer.company"
            :disabled="!editMode"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="customerEmail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input
            type="email"
            class="form-control"
            id="customerEmail"
            v-model="customer.email"
            :disabled="!editMode"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="customerPhone" class="col-sm-2 col-form-label">Phone</label>
        <div class="col-sm-10">
          <input
            type="tel"
            class="form-control"
            id="customerPhone"
            v-model="customer.phone"
            :disabled="!editMode"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="customerAddress" class="col-sm-2 col-form-label"
          >Address</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="customerAddress"
            v-model="customer.address"
            :disabled="!editMode"
          />
        </div>
      </div>
    </div>
    <button
      class="btn btn-primary me-1"
      @click="editMode = true"
      v-show="!editMode"
      :disabled="selectedCustomerId === ''"
    >
      Edit
    </button>
    <button
      class="btn btn-secondary me-1"
      v-show="editMode"
      @click="editMode = false"
    >
      Cancel
    </button>
    <button class="btn btn-danger" v-show="editMode" @click="doSave">
      Save
    </button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      selectedCustomerId: '',
      customers: [],
      customer: {
        name: '',
        company: '',
        email: '',
        phone: '',
        address: ''
      },
      editMode: false
    }
  },
  created() {
    this.getCustomerList()
  },
  mounted() {},
  unmounted() {},
  methods: {
    async getCustomerList() {
      this.customers = await this.$get('/customers')
    },

    async getCustomer() {
      this.editMode = false
      if (this.selectedCustomerId === '') {
        this.customer = {
          name: '',
          company: '',
          email: '',
          phone: '',
          address: ''
        }
      } else {
        this.customer = await this.$get(`/customers/${this.selectedCustomerId}`)
      }
    },

    async doSave() {
      if (this.customer.name === '') {
        return alert('Name을 입력하세요.')
      }
      if (this.customer.company === '') {
        return alert('Company을 입력하세요.')
      }
      if (this.customer.email === '') {
        return alert('Email을 입력하세요.')
      }
      if (this.customer.phone === '') {
        return alert('phone을 입력하세요.')
      }
      if (this.customer.address === '') {
        return alert('Address을 입력하세요.')
      }

      // 정규식 - 이메일, 전화번호 체크 로직 추가

      if (confirm('정말 저장하시겠습니까?')) {
        const r = await this.$put(
          `/customers/${this.selectedCustomerId}`,
          this.customer
        )

        if (r.status === 200) {
          alert('고객 정보가 수정 되었습니다.')
          this.editMode = false
        }
      }
    }
  }
}
</script>
