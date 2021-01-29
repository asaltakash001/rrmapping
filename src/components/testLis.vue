<template>
  <data-list :payload="companyObj" v-model="pagination" :total="total" :pagination="pagination"></data-list>
</template>
<script>
import DataList from '../../components/DataList.vue'
export default {
  data () {
    return {
      companyObj: {
        isHeader: true,
        isHideAdd: false,
        selection: [],
        showSelect: true,
        addNewRoute: () => this.$router.push('/company/actions'),
        headers: [],
        list: [],
        loading: true,
        editProp: 'name',
        editURL: (item) => `company/actions/${item.id}`
      },
      total: 0,
      pagination: !this.$formatter.isEmptyObject(this.$store.state.common.CRM_INDEX) ? this.$store.state.common.CRM_INDEX : { sortBy: ['name'], itemsPerPage: 25, sortDesc: [false], search: '' }
    }
  },
  components: {
    DataList
  },
  computed: {
    headers () {
      return [{
        text: this.$t('message.common.name'),
        value: 'name',
        width: '20%'
      }, {
        text: `${this.$t('message.common.address')}`,
        value: 'address',
        width: '10%'
      }, {
        text: this.$t('message.common.phone'),
        value: 'phone',
        width: '10%'
      }, {
        text: this.$t('message.user.email'),
        value: 'email',
        width: '10%'
      }, {
        text: this.$t('message.common.web'),
        value: 'web',
        width: '10%'
      }, {
        text: this.$t('message.hse.description'),
        value: 'description',
        width: '10%'
      }, {
        text: this.$t('message.common.isCustomer'),
        value: 'is_customer',
        isBoolean: true,
        sortable: false,
        width: '10%'
      }, {
        text: this.$t('message.common.isSupplier'),
        value: 'is_supplier',
        isBoolean: true,
        sortable: false,
        width: '10%'
      }, {
        text: this.$t('message.common.isActive'),
        value: 'is_active',
        isBoolean: true,
        sortable: false,
        width: '10%'
      }]
    }
  },
  watch: {
    pagination (val) {
      let model = { type: 'CRM_INDEX', data: val }
      this.$store.dispatch('rememberPagination', model)
      this.getUsersHandler()
    }
  },
  mounted () {
    let text = 'message.common.deleteMsg'
    this.$eventBus.$on('deleteItems', (data) => {
      if (data.module === this.COMPANY) {
        let payload = { ids: data.ids, url: `${this.COMPANY}/delete_multiple`, module: this.COMPANY }
        this.$store.commit('showDeleteDialog', payload)
      }
    })
    this.$eventBus.$on('deleteSuccess', (data) => {
      if (data === this.COMPANY) {
        this.companyObj.selection = []
        this.$root.$emit('snackbar', { snackbar: true, color: 'success', text })
        this.$store.commit('hideDialog')
        this.getUsersHandler()
      }
    })
  },
  methods: {
    getUsersHandler () {
      this.companyObj.loading = true
      this.companyObj.module = this.COMPANY
      let queryFields = this.$formatter.cloneVariable(this.headers)
      let { page, search, sortBy, sortDesc, itemsPerPage } = this.$formatter.cloneVariable(this.pagination)
      let pageVal = page || 1
      let query = {
        'order_by': {
          'field': sortBy.join(''),
          'asc_or_desc': sortDesc[0] ? 'desc' : 'asc'
        },
        'skip': ((pageVal - 1) * itemsPerPage),
        'limit': itemsPerPage,
        'include_count': true,
        'filter': `${queryFields.map(x => x.value).join(` contains '${search || ''}' OR `)} contains '${search || ''}'`
      }
      this.$apiServices.executeApi('post', 'companies/query', query)
        .then((response) => {
          let { values, count } = response.data
          this.companyObj.headers = this.headers
          this.companyObj.loading = false
          this.companyObj.list = values
          this.total = count
        })
    }
  },
  beforeDestroy () {
    this.$eventBus.$off('deleteSuccess')
    this.$eventBus.$off('deleteItems')
  }
}
</script>
