<template>
  <div style="backgroundColor: #E0E0E0">
     <v-card color="grey lighten-3 py-8" elevation="0">
        <h1 class="text-center pt-5">JOIN WITH US</h1>
     </v-card>
    <v-row>
      <v-col cols="12" lg="6" xl="6" md="6" sm="4" v-if="$vuetify.breakpoint.smAndDown" class="mx-0">
        <v-img src="@/assets/images/enquirry.jpg"  height="450" ></v-img>
      </v-col>
      <v-col cols="12" lg="6" xl="6" md="6" sm="8" class="my-auto mx-0">
        <v-card class="mx-5 pa-3 my-auto" color="grey lighten-5">
          <v-form ref="form" v-model="valid" lazy-validation >
            <v-row>
              <v-col cols="12" lg="6" xl="6" md="6" sm="6"><v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" ></v-text-field></v-col>
              <v-col cols="12" lg="6" xl="6" md="6" sm="6"><v-text-field v-model="name" :rules="nameRules" label="Company Name" required ></v-text-field></v-col>
              <v-col cols="12" lg="6" xl="6" md="6" sm="6"><v-text-field v-model="email" :rules="emailRules" label="E-mail" required ></v-text-field></v-col>
              <v-col cols="12" lg="6" xl="6" md="6" sm="6"><v-text-field v-model="email" :rules="nameRules" label="Phone No" required ></v-text-field></v-col>
              <v-col cols="12" lg="6" xl="6" md="6" sm="6"><v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Enquiry For..." required ></v-select></v-col>
              <v-col cols="12" lg="6" xl="6" md="6" sm="6"><v-textarea name="input-7-4" label="Message" value=""></v-textarea></v-col>
            </v-row>
            <v-btn :disabled="!valid" color="success" class="mr-4 mx-auto" @click="validate" > SEND </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6" xl="6" md="6" sm="4" v-if="!$vuetify.breakpoint.smAndDown" class="mx-0">
        <v-img src="@/assets/images/enquirry.jpg"  height="500" contain></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
   data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
}
</script>

<style>

</style>