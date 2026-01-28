<template>
  <div></div>
</template>
<script>
import Formatter from '@/mixins/formatter'
// import Axios from '@/mixins/axios'
export default {
  components: {},
  mixins: [Formatter],
  data() {
    return {
      sampleData: ''
    }
  },
  created() {
    console.log('MixinView created')
  },
  mounted() {
    console.log('MixinView mounted')
    console.log(this.$convertDateFormat('20220601', 'YYYY-MM-DD'))
    console.log(this.$convertDateFormat('20220601', 'DD.MM.YYYY'))

    console.log(this.$convertNumberFormat(2547500, '#,###'))
    console.log(this.$convertNumberFormat(2547500, '#,###.#0'))
    console.log(this.$convertNumberFormat(2547500.4, '#,###.#0'))
    console.log(this.$convertNumberFormat(2547500.4, '#,###.##'))
    console.log(this.$convertNumberFormat(-2547500.4, '#,###.##'))
    console.log(this.$convertNumberFormat(-2547500.4, '$#,###.##'))
    console.log(this.$convertNumberFormat(125.23, '#,###.#0%'))
    console.log(this.$convertNumberFormat(125.5, '#,###.#0%'))
    console.log(this.$convertNumberFormat(125, '#,###원'))

    this.getCustomers()
  },
  unmounted() {},
  methods: {
    async getCustomers() {
      const data = await this.$get('https://www.naver.com/')
      console.log(data)
    }
  }
}
</script>
