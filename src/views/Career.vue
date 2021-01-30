<template>
  <div>
    <v-card class="py-15" elevation="0" color="grey lighten-3">
      <h1 class="text-center">JOIN WITH US</h1>
      <v-row >
        <v-col cols="8" class="mx-auto pb-10"><v-divider></v-divider></v-col>
      </v-row>
      <p class="px-10 text-justify">
        RR Mapping possesses a wide range of state of the art geomatics equipment and is able to provide a complete range of photogrammetric services. Our investment in industry best equipment and software, combined with our focus on continuous training and education equips our staff to produce the best products in the market.
        We are committed to providing quality services to our clients, every time, through our highly trained staff utilizing the latest technology in an atmosphere of caring and creativity. Your interest and application to join the RR Mapping team is always welcome. We have opportunities for those who is having work experience.
        Send us resume to info@rrmapping.in (or) Fill the online career form.
      </p>
    </v-card>
    <v-row style="backgroundColor: #E0E0E0">
       <v-row>
      <v-col cols="12" lg="10" md="10" sm="10" xl="10" class="mx-auto" >
        <v-row>
          <v-col cols="12" lg="8" md="8" sm="6" xl="8" class="mx-0">
          <v-card class="pa-5">
         <v-form ref="form" v-model="valid" lazy-validation >
            <v-row>
              <v-col cols="12" lg="6" xl="6" md="6" sm="6"><v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" ></v-text-field></v-col>
              <v-col cols="12" lg="6" xl="6" md="6" sm="6"><v-text-field v-model="name" :rules="nameRules" label="Company Name" ></v-text-field></v-col>
              <v-col cols="12" lg="6" xl="6" md="6" sm="6"><v-text-field v-model="email" :rules="emailRules" label="E-mail" ></v-text-field></v-col>
              <v-col cols="12" lg="6" xl="6" md="6" sm="6"><v-text-field v-model="email" :rules="nameRules" label="Phone No" ></v-text-field></v-col>
              <v-col cols="12" lg="6" xl="6" md="6" sm="6"><v-text-field v-model="email" :rules="nameRules" label="Phone No" ></v-text-field></v-col>
              <v-col cols="12" lg="6" xl="6" md="6" sm="6"><v-text-field v-model="email" :rules="nameRules" label="Phone No" ></v-text-field></v-col>
              <v-col cols="12" lg="6" xl="6" md="6" sm="6"><v-select  v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Work Experience..." ></v-select></v-col>
              <v-col cols="12" lg="6" xl="6" md="6" sm="6"><v-text-field v-model="email" :rules="nameRules" label="Phone No" ></v-text-field></v-col>
              <v-col cols="12" lg="6" xl="6" md="6" sm="6"><v-file-input ></v-file-input></v-col>
            </v-row>
            <v-btn :disabled="!valid" color="success" class="mr-4 mx-auto" @click="validate" > SEND </v-btn>
          </v-form>
       </v-card>
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="6" xl="4" :order="$vuetify.breakpoint.xs ? 'first' : 'last'">
        <v-card class="" height="100%" elevation="0">
          <v-img :src="src" contain :max-width="$vuetify.breakpoint.xs ? '500' : '600'" :height="$vuetify.breakpoint.xs ? '400' : '500'"></v-img>
        </v-card>
      </v-col>
    </v-row>
     </v-col>
    </v-row>
    </v-row>
  </div>
</template>

<script>
export default {
   data: () => ({
      valid: true,
      src:require('@/assets/images/carreer.jpg'),
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