<template>
  <div class="mt-e">
    <div class="row">
      <div class="row mb-3">
        <label for="inputEmail3" class="col-sm-2 col-form-label"
          >Customer</label
        >
        <div class="col-sm-10">
          <select class="form-select">
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
        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input type="email" class="form-control" id="inputEmail3" />
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputPassword3" class="col-sm-2 col-form-label"
          >Password</label
        >
        <div class="col-sm-10">
          <input type="password" class="form-control" id="inputPassword3" />
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Sign in</button>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      customers: []
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
