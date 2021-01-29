<template>
  <v-card>
    <v-form ref="validateForm" autocomplete="off">
      <v-card-title primary-title  class="pa-3" v-if="references.title">
        <h5> {{ references.title }} </h5>
      </v-card-title>
      <v-divider v-if="references.title"></v-divider>
      <v-container grid-list-xl>
        <v-layout wrap class="pa-3">
          <slot name="salesproduct"></slot>
          <v-flex :class="prop.class" v-for="(prop, index) in references.properties" :key="index" :style="prop.style">
            <template v-if="prop.type === formType.TEXT">
              <v-text-field outlined hide-details :label="prop.label" :suffix="prop.suffix" :id="prop.model" :ref="prop.ref" @input="prop.input" :disabled="prop.disabled" :rules="prop.rules" v-model="model[prop.model]"> </v-text-field>
            </template>
            <template v-if="prop.type === formType.NUMBER">
              <v-text-field outlined hide-details :type="formType.NUMBER" :id="prop.model" :label="prop.label" :rules="prop.rules" v-model="model[prop.model]" :disabled="prop.disabled"> </v-text-field>
            </template>
            <template v-else-if="prop.type === formType.TEXTAREA">
              <v-textarea outlined hide-details :label="prop.label" v-if="!prop.is_show" :id="prop.model" :rules="prop.rules" v-model="model[prop.model]" :disabled="prop.disabled" :rows="prop.rows"></v-textarea>
            </template>
            <template v-else-if="prop.type === formType.CHECKBOX">
              <v-checkbox :label="prop.label" :id="prop.model" color="primary" :rules="prop.rules" v-model="model[prop.model]" @change="prop.click ? prop.click(prop.model): ''"> </v-checkbox>
            </template>
            <template v-else-if="prop.type === formType.AUTO_COMPLETE">
              <v-autocomplete outlined hide-details :items="prop.items" :id="prop.model" :disabled="prop.disabled"
                :rules="prop.rules" :item-text="prop.select_text" :multiple="prop.multiple" autocomplete="off"
                @click:append="prop.click(prop.term)"
                :item-value="prop.select_value" :label="prop.label"
                :ref="prop.term? '' + prop.term : ''"
                :append-icon="prop.is_list ? 'mdi-plus-circle' : ''"
                clearable
                v-model="model[prop.model]">
                <template v-slot:selection="{ item, index }" v-if="prop.multiple">
                  <span v-if="index === 0">{{ item[prop.select_text] }}</span>
                  <span
                    v-if="index === 1"
                    class="grey--text caption"
                  >(+{{ model[prop.model].length - 1 }} {{ $t('message.common.others') }})</span>
                </template>
              </v-autocomplete>
            </template>
            <template v-else-if="prop.type === formType.SELECT">
              <v-select outlined hide-details :items="prop.items" :id="prop.model" :rules="prop.rules" :item-text="prop.select_text" :multiple="prop.multiple" :item-value="prop.select_value" :label="prop.label" :disabled="prop.disabled" v-model="model[prop.model]"></v-select>
            </template>
            <template v-else-if="prop.type === formType.PASSWORD">
              <v-text-field outlined hide-details :label="prop.label" :id="prop.model" :rules="prop.rules" :type="formType.PASSWORD" v-model="model[prop.model]"> </v-text-field>
            </template>
            <template v-else-if="prop.type === formType.COMBOBOX" class="pt-2">
              <div class="combo">
                <v-combobox v-model="model[prop.model]" :items="prop.items"  hide-selected  :rules="prop.rules" :label="prop.label" multiple persistent-hint small-chips :id="prop.model" :disabled="prop.disabled" outlined></v-combobox>
              </div>
            </template>
            <template v-else-if="prop.type === formType.DATEPICKER">
              <v-menu :close-on-content-click="false" v-model="model[prop.menu]" transition="scale-transition" offset-y min-width="290px" v-if="prop.is_show !== undefined ? prop.is_show : true">
                <template v-slot:activator="{ on }">
                  <v-text-field outlined hide-details v-model="model[prop.model]" :rules="prop.rules" clearable :label="prop.label" prepend-icon="mdi-calendar"
                  readonly v-on="on" :disabled="prop.disabled" @click:clear="$nextTick(() => model[prop.picker] = null)"></v-text-field>
                </template>
                <v-date-picker :color="prop.color" @input="model[prop.menu] = false" :min="model[prop.min]" :max="model[prop.max]" v-model="model[prop.picker]" first-day-of-week='1' :disabled="prop.disabled"></v-date-picker>
              </v-menu>
            </template>
            <!--Date picker for sales product-->
            <template v-else-if="prop.type === formType.DATEPICKER">
              <v-menu :close-on-content-click="false" v-model="model[prop.menu]" transition="scale-transition" offset-y min-width="290px" v-if="prop.is_show">
                <template v-slot:activator="{ on }">
                  <v-text-field outlined hide-details v-model="model[prop.model]" :rules="prop.rules" clearable :label="prop.label" prepend-icon="mdi-calendar"
                  readonly v-on="on" :disabled="prop.disabled" @click:clear="$nextTick(() => model[prop.picker] = null)"></v-text-field>
                </template>
                <v-date-picker :color="prop.color" @input="model[prop.menu] = false" :min="model[prop.min]" :max="model[prop.max]" v-model="model[prop.picker]" first-day-of-week='1' :disabled="prop.disabled"></v-date-picker>
              </v-menu>
            </template>
            <template v-else-if="prop.type === formType.QUICKADD">
              <v-btn fab small outline color="primary" :id="prop.type" @click="$router.push(prop.to)" :disabled="prop.disabled">
                <v-icon color="primary">perm_identity</v-icon>
              </v-btn>
            </template>
            <template v-else-if="prop.type === formType.TIMEPICKER">
              <v-menu :close-on-content-click="false" :ref="prop.menu" v-model="model[prop.menu]" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field  outlined hide-details slot="activator" :label="prop.label" :rules="prop.rules" v-model="model[prop.model]" readonly v-on="on" prepend-icon="mdi-clock" clearable :disabled="prop.disabled"></v-text-field>
                </template>
                <v-time-picker color="primary" v-model="model[prop.model]" :min="model[prop.min]" :max="model[prop.max]" @click:minute="$refs[prop.menu][0].save(model[prop.model])" :allowed-minutes="allowedStep" format="24hr" :disabled="prop.disabled"></v-time-picker>
              </v-menu>
            </template>
            <template v-else-if="prop.type === formType.FILES && prop.is_show">
              <v-file-input :accept="prop.accept" :disabled="prop.disabled" outlined v-model="model[prop.model]" :rules="prop.rules" :label="prop.label" :multiple="prop.multiple"></v-file-input>
              <slot :name="prop.slot"></slot>
            </template>
            <template v-else-if="prop.type === formType.COLORPICKER">
              <v-menu bottom :close-on-content-click="false" offset-y v-model="model[prop.menu]">
                <template v-slot:activator="{ on }">
                  <v-text-field :label="prop.label" v-model="model[prop.model]" outlined hide-details class="ma-0 pa-0" readonly slot="activator" v-on="on" :disabled="prop.disabled"></v-text-field>
                </template>
                <v-color-picker v-if="[prop.menu]" v-model="model[prop.model]" bottom flat :disabled="prop.disabled" />
              </v-menu>
            </template>
            <template v-else-if="prop.type === formType.RADIO && prop.is_show">
              <v-radio-group v-model="model[prop.model]" row @change="prop.click ? prop.click(prop.model): ''">
                <template v-for="items in prop.items">
                   <v-radio :label="items.text" :value="items.value" :key="items.value"></v-radio>
                </template>
              </v-radio-group>
            </template>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-text class="pa-0">
        <slot name="extraDetails"></slot>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions v-if="references.buttons">
        <v-spacer></v-spacer>
        <v-layout justify-center>
          <v-flex>
            <template v-for="(button, index) in references.buttons">
              <v-btn :key="index" :loading="button.loading" :id="button.name" v-if="button.is_show" @click="button.click" :color="button.color" :disabled="button.disabled"> {{ button.label }} </v-btn>&nbsp;
            </template>
          </v-flex>
        </v-layout>
      </v-card-actions>
      <slot name="button" v-else></slot>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    references: {
      type: Object
    },
    model: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(['formType'])
  },
  methods: {
    allowedStep: m => m % 5 === 0
  }
}
</script>
