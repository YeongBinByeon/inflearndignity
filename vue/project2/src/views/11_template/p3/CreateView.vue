<template>
  <div class="row mb-3">
    <label for="customerName" class="col-sm-2 col-form-label">Name</label>
    <div class="col-sm-10">
      <input
        type="text"
        name=""
        id="customerName"
        class="form-control"
        v-model="customer.name"
      />
    </div>
  </div>
  <div class="row mb-3">
    <label for="customerCompany" class="col-sm-2 col-form-label">Company</label>
    <div class="col-sm-10">
      <input
        type="text"
        name=""
        id="customerCompany"
        class="form-control"
        v-model="customer.company"
      />
    </div>
  </div>
  <div class="row mb-3">
    <label for="customerEmail" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input
        type="email"
        name=""
        id="customerEmail"
        class="form-control"
        v-model="customer.email"
      />
    </div>
  </div>
  <div class="row mb-3">
    <label for="customerPhone" class="col-sm-2 col-form-label">Phone</label>
    <div class="col-sm-10">
      <input
        type="tel"
        name=""
        id="customerPhone"
        class="form-control"
        v-model="customer.phone"
      />
    </div>
  </div>
  <div class="row mb-3">
    <label for="customerAddress" class="col-sm-2 col-form-label">Address</label>
    <div class="col-sm-10">
      <input
        type="text"
        name=""
        id="customerAddress"
        class="form-control"
        v-model="customer.address"
      />
    </div>
  </div>
  <button class="btn btn-secondary me-1" @click="goToList">Cancel</button>
  <button class="btn btn-primary" @click="doSave">Save</button>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      customer: {
        name: '',
        company: '',
        email: '',
        phone: '',
        address: ''
      }
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
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
        const r = await this.$post('/customers', this.customer)
        console.log(r)

        if (r.status === 201) {
          alert('신규 고객이 생성 되었습니다.')

          this.$router.push({
            path: '/template/p3/detail',
            query: { id: r.data.id }
          })
        }
      }
    },
    goToList() {
      this.$router.push({ path: '/template/p3/list' })
    }
  }
}
</script>
