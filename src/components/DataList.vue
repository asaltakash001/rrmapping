<template>
  <div>
    <v-data-table v-model="payload.selection" :headers="payload.headers"
      :must-sort="true"
      :loading="payload.loading"
      :item-key="payload.list.id"
      :items="payload.list"
      :footer-props="paginationList"
      :show-select="payload.showSelect"
      :show-expand="payload.expand"
      :single-expand = "true"
      :expanded.sync="payload.expanded"
      :search="!total ? search : undefined"
      :server-items-length="total ? total : undefined"
      :options.sync="paginationMap" dense class="elevation-1 bordered--table">
      <template v-slot:item.data-table-select="{ isSelected, select }">
        <v-simple-checkbox :ripple="false" color="primary" :value="isSelected" @input="select($event)"></v-simple-checkbox>
      </template>
      <template v-slot:top>
        <v-toolbar :elevation="!!payload.selection.length ? 5 : 0" :color="!!payload.selection.length ? 'primary' : 'white'">
          <template v-if="!payload.selection.length">
            <template class="mt-0">
              <v-flex sm8 xs4 v-if="!payload.hasFilters">
                <v-btn v-if="!payload.isHideAdd" color="primary" dark id="newbtn" @click="payload.addNewRoute">{{ $t('message.common.new') }}</v-btn>
                <v-btn v-else-if="payload.addClickHandler" color="primary" dark id="newbtn" @click="payload.addClickHandler">{{ $t('message.common.new') }}</v-btn>
              </v-flex>
              <slot name="filterForm" v-if="payload.hasFilters">
              </slot>
              <v-flex sm4 xs8 v-if="!payload.isStock">
                <v-text-field append-icon="mdi-magnify" single-line v-model="search" label="Search" class="mt-4 text-xs-right" id="searchbtn"></v-text-field>
              </v-flex>
            </template>
          </template>
          <v-slide-y-transition v-if="payload.selection.length">
            <v-btn icon @click="payload.selection = []">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </v-slide-y-transition>
          <v-slide-y-transition>
            <v-toolbar-title v-if="payload.selection.length">
              <div class="white--text">{{ `${payload.selection.length} selected` }}</div>
            </v-toolbar-title>
          </v-slide-y-transition>
          <v-spacer  v-if="payload.selection.length"></v-spacer>
          <template v-if="payload.selection.length">
            <v-slide-y-transition>
              <v-btn rounded @click="deleteEntries" class="black--text" color="white" key="delete">
                DELETE
              </v-btn>
            </v-slide-y-transition>
          </template>
        </v-toolbar>
      </template>
      <template #[`item.${payload.editProp}`]="{ item }">
        <template>
          <router-link v-if="payload.editURL" :to="payload.editURL(item)">{{ item[payload.editProp] }}</router-link>
          <a v-else @click="payload.editHandler(item.id)" class="underline">{{ item[payload.editProp] }}</a>
        </template>
      </template>
      <template v-for="(field, index) in booleanItems" #[`item.${field}`]="{ item }">
        <v-icon class="font--style" :key="index"> {{ item[field] ? 'mdi-check' : 'mdi-close' }} </v-icon>
      </template>
      <template v-slot:expanded-item="{ headers }">
        <td :colspan="headers.length">
          <slot name="expand"></slot>
        </td>
      </template>
      <!-- <template v-slot:expanded-item="{ item, headers }">
        <td :colspan="headers.length">
          <template v-if="payload.expandHeader">
            <v-simple-table dense width="100%" class="dense_table bordered--table">
              <thead>
                <tr>
                  <th v-for="(headers, index) in payload.expandHeader" :key="index">{{headers.text}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product, i) in item[payload.expandItem]" :key="i">
                  <td v-for="(headers, index) in payload.expandHeader" :key="index">{{product[`${headers.value}`] }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </template>
          <slot name="expand" v-else></slot>
        </td>
      </template> -->
      <template v-slot:item.color="{ item }">
        <v-chip small :color="item.color" v-if="item.color" :text-color="$formatter.foreGroundColor(item.color)">{{ item.color }}</v-chip>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn icon v-for="(action, index) in payload.actionsList" text
          v-show="action.is_show(item)"
          class="pa-0 action--btns ml-1"
          :style="{ color: action.color ? action.color(item) : '' }"
          @click="action.click(item)" :key="index">
          <v-icon>{{ action.icon }}</v-icon> <!-- action.icon(item) -->
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  props: ['payload', 'pagination', 'total'],
  model: {
    prop: 'pagination',
    event: 'change'
  },
  data () {
    return {
      paginationList: {
        'itemsPerPageOptions': [10, 25, 50, 100, -1]
      },
      paginationMap: this.pagination,
      search: '',
      booleanItems: []
    }
  },
  watch: {
    paginationMap (newValue) {
      if (!this.$formatter.isEmptyObject(newValue)) {
        let result = Object.assign({ ...this.paginationMap }, { search: this.search })
        this.$emit('change', result)
      }
    },
    search (val) {
      let search = Object.assign({ ...this.paginationMap }, { search: val })
      this.$emit('change', search)
    },
    'payload.headers' (val) {
      let booleanList = this.payload.headers.filter(x => x.isBoolean)
      this.booleanItems = booleanList.map(x => x.value)
    }
  },
  methods: {
    deleteEntries () {
      let ids = this.payload.selection.map(x => x.id)
      let data = { module: this.payload.module, ids }
      this.$eventBus.$emit('deleteItems', data)
    }
  }
}
</script>
<style>
.action--btns.v-btn--icon.v-size--default {
  height: 25px !important;
  width: 25px !important;
}
.underline {
  text-decoration: underline;
}
</style>
