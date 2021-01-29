<template>
  <div>
    <v-row no-gutters v-if="fieldsLoading">
      <v-col v-for="n in 9" :key="n" cols="12" sm="6" lg="3">
       <v-sheet class="mt-2">
        <v-skeleton-loader class="mx-auto" type="list-item"></v-skeleton-loader>
      </v-sheet>
      </v-col>
    </v-row>
    <form-data :references.sync="formReferences" :model="companyObj" ref="crmReference" v-else>
      <template slot="combo">
       <!-- <v-combobox :label="$t('message.common.name')" hide-details v-model="companyObj.name" outlined :rules="$_requiredValidation" :loading="isLoading" :search-input.sync="search" :items="companyArray" item-text='navn' autofocus></v-combobox> -->
      </template>
    </form-data>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import FormTemplate from '../../components/FormTemplate'
export default {
  data () {
    return {
      isLoading: false,
      companyObj: {
        id: this.$route.params.crm_id,
        isactive: true
      },
      fieldsLoading: false,
      companyArray: [],
      search: '',
      loading: false,
      COMPANY: 'companies'
    }
  },
  components: {
    'form-data': FormTemplate
  },
  computed: {
    ...mapGetters(['formType']),
    formReferences () {
      return {
        title: this.$route.params.crm_id ? this.$t('message.company.updateCompany') : this.$t('message.company.addCompany'),
        properties: [ {
          model: 'name',
          type: this.formType.TEXT,
          rules: this.$_requiredValidation,
          label: this.$t('message.common.name'),
          class: 'lg3 sm6'
        }, {
          model: 'email',
          type: this.formType.TEXT,
          rules: this.$_emailValidation,
          label: this.$t('message.user.email'),
          class: 'lg3 sm6'
        }, {
          model: 'address',
          type: this.formType.TEXT,
          rules: [],
          label: this.$t('message.common.address'),
          class: 'lg3 sm6'
        }, {
          model: 'address2',
          type: this.formType.TEXT,
          rules: [],
          label: `${this.$t('message.common.address')} 2`,
          class: 'lg3 sm6'
        }, {
          model: 'address3',
          type: this.formType.TEXT,
          rules: [],
          label: `${this.$t('message.common.address')} 3`,
          class: 'lg3 sm6'
        }, {
          model: 'phone',
          type: this.formType.TEXT,
          rules: [],
          label: this.$t('message.common.phone'),
          class: 'lg3 sm6'
        }, {
          model: 'web',
          type: this.formType.TEXT,
          rules: [],
          label: this.$t('message.common.web'),
          class: 'lg3 sm6'
        }, {
          model: 'is_customer',
          rules: [],
          type: this.formType.CHECKBOX,
          class: 'lg3 sm6 pt-2',
          label: this.$t('message.common.isCustomer')
        }, {
          model: 'is_supplier',
          rules: [],
          type: this.formType.CHECKBOX,
          class: 'lg3 sm6 pt-2',
          label: this.$t('message.common.isSupplier')
        }, {
          model: 'is_active',
          rules: [],
          type: this.formType.CHECKBOX,
          class: 'lg3 sm6 pt-2',
          label: this.$t('message.common.isActive')
        }, {
          model: 'description',
          type: this.formType.TEXTAREA,
          rules: [],
          label: this.$t('message.hse.description'),
          class: 'lg6 sm6'
        }],
        buttons: [{
          name: 'action_handler',
          color: 'success',
          label: this.$route.params.crm_id ? this.$t('message.common.update') : this.$t('message.common.save'),
          click: () => this.saveUpdateHandler(this.SAVE),
          loading: this.loading,
          is_show: true
        }, {
          name: 'action_handler_update',
          color: 'primary',
          label: this.$t('message.common.updateAndClose'),
          click: () => this.saveUpdateHandler(this.UPDATE_CLOSE),
          loading: this.loading,
          is_show: this.$route.params.crm_id
        }, {
          name: 'back_to_list',
          color: 'info',
          // eslint-disable-next-line
          click: () => this.$router.push('/company'),
          label: this.$t('message.common.backToList'),
          to: '/company',
          is_show: true
        }, {
          name: 'delete_btn',
          color: 'error',
          label: this.$t('message.common.delete'),
          click: this.deleteHandler,
          is_show: this.$route.params.crm_id
        }]
      }
    }
  },
  mounted () {
    if (this.companyObj.id) this.getSingleRecordHandler()
    let text = 'message.common.deleteMsg'
    this.$eventBus.$on('deleteSuccess', (data) => {
      if (data === this.COMPANY) {
        this.$root.$emit('snackbar', { snackbar: true, color: 'success', text })
        this.$store.commit('hideDialog')
        this.$router.push('/company')
      }
    })
  },
  watch: {
    // 'companyObj.post' (val) {
    //   if (val) this.getCityByPost(val)
    // },
    // 'companyObj.name': function (val) {
    //   if (val !== undefined) {
    //     this.autoFillAddress(val)
    //   }
    // },
    'search' (val) {
      if (val === null || val.length <= 1) {
        let model = Object.assign({ ...this.companyObj }, { city: '', address: '', post: '' })
        this.companyObj = model
        this.companyArray = []
      } else {
        this.isLoading = true
        this.loadCompanyData()
      }
    }
  },
  methods: {
    getSingleRecordHandler () {
      this.fieldsLoading = true
      this.$apiServices.getSingleRecordHandler(`${this.COMPANY}/${this.companyObj.id}`)
        .then((result) => {
          if (result.data) this.companyObj = result.data
        })
        .finally(() => {
          this.fieldsLoading = false
        })
    },
    loadCompanyData () {
      this.$apiServices.executeApi('get', 'https://data.brreg.no/enhetsregisteret/enhet.json?$filter=startswith(navn,%27' + encodeURIComponent(this.search) + '%27)', { headers: '' }).then(response => {
        this.items = response.data.data
        this.companyArray = []
        if (this.items) {
          for (let i = 0; i < this.items.length; i++) {
            this.companyArray.push(this.items[i].navn)
          }
        }
      }).finally(() => {
        this.isLoading = false
      })
    },
    saveUpdateHandler (type) {
      if (this.$refs.crmReference.$refs.validateForm.validate()) {
        this.loading = true
        let model = this.companyObj
        let url = this.COMPANY
        this.$apiServices.saveUpdateHandler(url, model)
          .then((response) => {
            if (type === this.SAVE && !model.id) this.$router.push(`/company/actions/${response.id}`)
            else if (type === this.UPDATE_CLOSE) this.$router.push('/company')
          })
          .finally(() => {
            this.loading = false
          })
      } else this.$root.$emit('snackbar', { snackbar: true, color: 'error', text: 'message.common.validationIssue' })
    },
    deleteHandler () {
      let ids = [this.companyObj.id]
      let payload = { ids, url: `${this.COMPANY}/delete_multiple`, module: this.COMPANY }
      this.$store.commit('showDeleteDialog', payload)
    },
    getCityByPost (post) {
      this.$apiServices.executeApi('get', `/cities/get_by_post/${post || ''}`)
        .then((response) => {
          if (response) {
            let { name, municipality } = response.data
            let model = Object.assign({ ...this.companyObj }, { city: name, municipality: municipality })
            this.companyObj = model
          }
        })
    },
    autoFillAddress (name) {
      if (this.companyArray.length > 0 && this.items) {
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].navn === name) {
            this.companyObj.address = this.items[i].forretningsadresse.adresse
            this.companyObj.city = this.items[i].forretningsadresse.poststed
            this.companyObj.post = this.items[i].forretningsadresse.postnummer
          }
        }
      }
    }
  },
  beforeDestroy () {
    this.$eventBus.$off('deleteSuccess')
  }
}
</script>
