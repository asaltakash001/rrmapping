<template>
  <v-app light>
    <div >
      <nav>
      <v-toolbar id="navbar" style="backgroundColor: #002749" class="white--text">
          <v-toolbar-title>
            <v-img src="'@/assets/images/logo.png'"></v-img>
            <span class="font-weight-light pr-3">RR Mapping </span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <div v-if="!$vuetify.breakpoint.smAndDown"> 
            <v-btn text v-for="(item, i) in items" :key="i" :to="item.link" class="white--text"> {{item.text}}</v-btn>
          </div>
          <v-app-bar-nav-icon @click="side= !side" v-if="$vuetify.breakpoint.smAndDown"></v-app-bar-nav-icon>
      </v-toolbar>
    </nav>
    <v-navigation-drawer app v-model="side" v-if="$vuetify.breakpoint.smAndDown">
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="$store.state.activeUser.image">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>RR MAPPING</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
        <v-list-item-icon><v-icon v-text="item.icon"></v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title v-text="item.text"></v-list-item-title></v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid class="pa-0">
          <router-view /> 
      </v-container>
    </v-main>
    <v-footer dark padless>
    <v-card flat tile class="white--text text-center col-12" style="backgroundColor: #002749">      
     <v-row>
         <v-col cols="12" lg="4" xl="4" md="4" sm="12" >
          <v-card-text class="text-center title">Meet Us At</v-card-text>
          <v-divider></v-divider>
          <v-card-text> RR Mapping <br> 6/9, Vayalur Road, Uyya Kondan Thirumalai <br> Tirchy, India - 620 102.<br>
          </v-card-text>
      </v-col>
      <v-col cols="12" lg="4" xl="4" md="4" sm="12">
          <v-card-title>About RR Mapping</v-card-title>
          <v-card-text class="text-justify">
            RR Mapping is one of the Fast growing and experienced full service geospatial solutions company in Trichy cosmopolitan city, India. We have a long tradition of consistent performance and enduring client relationships built on over along to quality service. No job is too small or large, we provide our services to independent geomatics companies, government bodies and transport authorities.
          </v-card-text>
      </v-col>
      <v-col cols="12" lg="4" xl="4" md="4" sm="12">
          <v-card-text class="text-center "><v-icon large>mdi-twitter</v-icon></v-card-text>
          <v-card-text class="text-justify">
            RR Mapping has the experience, Technical resources, and worldwide capacity to enable excellent performance on any geospatial projrcts. <a href="#">www.twitter.com</a> Nov 7, 2014
          </v-card-text>
      </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>RR Mapping.</strong> All Rights Reserved.
      </v-card-text>
    </v-card>
  </v-footer>
    </div>
  </v-app>
</template>
<script>
export default {
  data(){
    return{
      side:false,
      transitionName: 'scale-transition',
      items: [
        { text: 'Home', icon: 'mdi-home-variant',link:'/' },
        { text: 'About Us', icon: 'mdi-cart',link:'/aboutus' },
        { text: 'Our Services', icon: 'mdi-format-list-checks', link:'/services' },
        { text: 'Career', icon: 'mdi-account-tie',link:'/career'},
        { text: 'Enquiry', icon: 'mdi-account',link:'/enquiry'},
        { text: 'Contact Us', icon: 'mdi-account',link:'/contact'},
      ],
    }
  },
  mounted() {
    console.log(this.$vuetify.breakpoint);
  }
}
</script>

<style>
#navbar a{
  color: black;
  padding-inline-end: 3%;
  text-align: center;
  padding: 10px 20px;
  text-decoration: none;
}
#navbar a:hover{
   background-color:grey;
    color: white;
}
</style>
