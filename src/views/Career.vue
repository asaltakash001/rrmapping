<template>
  <div>
    <v-row>
      <v-col cols="12" lg="6" md="6" xl="6" sm="12" v-if="$vuetify.breakpoint.smAndDown" class="pa-5">
        <v-card class="px-5">
        <v-card-title>Online Career Form</v-card-title>
        <v-divider class="pa-3"></v-divider>
        <v-card-text class="px-2 text--black">
          RR Mapping possesses a wide range of state of the art geomatics equipment and is able to provide a complete range of photogrammetric services. Our investment in industry best equipment and software, combined with our focus on continuous training and education equips our staff to produce the best products in the market.
          We are committed to providing quality services to our clients, every time, through our highly trained staff utilizing the latest technology in an atmosphere of caring and creativity. Your interest and application to join the RR Mapping team is always welcome. We have opportunities for those who is having work experience.
          Send us resume to info@rrmapping.in (or) Fill the online career form
        </v-card-text>
      </v-card>
      </v-col>
      <v-col cols="12" lg="6" md="6" xl="6" sm="12" class="pa-5">
        <v-card class="pa-5">
          <v-form ref="form" v-model="valid" lazy-validation >
            <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" ></v-text-field>
            <v-text-field v-model="name" :rules="nameRules" label="Company Name" ></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" ></v-text-field>
            <v-text-field v-model="email" :rules="nameRules" label="Phone No" ></v-text-field>
            <v-text-field v-model="email" :rules="nameRules" label="Phone No" ></v-text-field>
            <v-text-field v-model="email" :rules="nameRules" label="Phone No" ></v-text-field>
            <v-select  v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Work Experience..." ></v-select>
            <v-text-field v-model="email" :rules="nameRules" label="Phone No" ></v-text-field>
            <v-file-input ></v-file-input>
            <v-btn :disabled="!valid" color="success" class="mr-4 mx-auto" @click="validate" > SEND </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6" md="6" xl="6" sm="12" v-if="!$vuetify.breakpoint.smAndDown">
        <v-card>
        <v-card-title>Online Career Form</v-card-title>
        <v-divider class="pa-3"></v-divider>
        <v-card-text class="px-2 text--black">
          RR Mapping possesses a wide range of state of the art geomatics equipment and is able to provide a complete range of photogrammetric services. Our investment in industry best equipment and software, combined with our focus on continuous training and education equips our staff to produce the best products in the market.
          We are committed to providing quality services to our clients, every time, through our highly trained staff utilizing the latest technology in an atmosphere of caring and creativity. Your interest and application to join the RR Mapping team is always welcome. We have opportunities for those who is having work experience.
          Send us resume to info@rrmapping.in (or) Fill the online career form
        </v-card-text>
      </v-card>
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