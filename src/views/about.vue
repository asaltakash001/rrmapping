<template>
  <div>
    <div class="pt-10">
      <v-card>
        <h1>About Us</h1>
        <v-row class="pa-5">
          <v-card-text class="h6">
           <strong> RR Mapping </strong> is one of the Fast growing and experienced full service geospatial solutions company in Trichy cosmopolitan city, Tamilnadu, India. We have a long tradition of consistent performance and enduring client relationships built along with the quality services. <br> <br>
            <strong> RR Mapping </strong> has the experience, Technical resources, and worldwide capacity to enable excellent performance on any geospatial projects (include Photogrammetric Data Processing, 3D city modelling, Ortho photo Processing, Lidar Data processing, Raster to Vector conversion, GIS Data Conversion, Geo referencing, etc.,), from multisensory data fusion for small sites to state-wide mapping programs. <br> <br>
            No job is too small or large, we provide our services to independent geomatics companies, government bodies and transport authorities. The information is provided in a format that is ready to integrate into various types of GIS and CAD systems to our clients. <br> <br>
            Every member of the team has the knowledge and expertise to understand and address the consumer pain points. Right from the early stages we remember that the DNA of the leaders is the DNA of the company. All the team members are excited and proud in working towards building the next generation global business.</v-card-text>
        </v-row>
      </v-card>
    </div>
    <v-container>
      <v-row v-for="(i,index) in whatwedo" :key="index">
        <v-card width="100%" v-if="index%2 === 0">
          <v-row>
            <v-col cols="12" sm="6" lg="6" md="6" xl="5">
              <v-img :src="i.src" height="300"></v-img>
              </v-col>
              <v-col cols="12" sm="6" lg="6" xl="7" md="6">
                {{i.text}}
              </v-col>
          </v-row>
        </v-card>
         <v-card width="100%" v-else color="blue-grey lighten-5">
          <v-row>
            <v-col cols="12" sm="6" lg="6" md="6" xl="5" v-if="$vuetify.breakpoint.xs">
              <v-img :src="i.src" height="300"></v-img>
            </v-col>
            <v-col cols="12" sm="6" lg="6" xl="7">
                {{i.text}}
              </v-col>
            <v-col cols="12" sm="6" lg="6" md="6" xl="5" v-if="!$vuetify.breakpoint.xs">
              <v-img :src="i.src" height="300"></v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
    <div>
         <v-row class="pt-6">
      <v-col class="pa-8">
        <v-card>
            <v-tabs v-model="tabs" fixed-tabs>
              <v-tab href="#tabContent-1" class="primary--text pt-5">
                <p class="title" >Our Mission</p>
              </v-tab>
              <v-tab href="#tabContent-2" class="primary--text pt-5">
                <p class="title" >Our Vision</p>
              </v-tab>
              <v-tab href="#tabContent-3" class="primary--text pt-5">
                <p class="title">Our Goal</p>
              </v-tab>
              <v-tab href="#tabContent-4" class="primary--text pt-5">
                <p class="title">Our Aim</p>
              </v-tab>
            </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item v-for="i in 4" :key="i" :value="'tabContent-' + i">
            <v-card flat>
              <v-card-text v-text="text1" v-if="i==1">{</v-card-text>
              <v-card-text v-text="text2" v-if="i==2"></v-card-text>
              <v-card-text v-text="text3" v-if="i==3"></v-card-text>
              <v-card-text v-text="text4" v-if="i==4"></v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
      </v-col>
  </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
        tabs: null,
         whatwedo:[
        {title:'Photogrammetry Services',src:require('@/assets/images/mission-1.png'), text: ' RR Mapping provides professional geospatial services in strict adherence to the highest ethical and technical standards. We understand that each of our client"s needs are unique, However they all require timely, technically sound and cost effective solutions. Our standard business practice is to work with each client to clearly define project scope and requirements and develop a solution that is right on target. We assist our clients through consulting, planning, design and implementation of viable and practical mapping programs that are delivered on time and on budget.',
},
        {title:'Image Processing Service',src:require('@/assets/images/vision.png'), text: '"Societal Sustainability is the fruit of Futuristic Imagination" To provide world-class services solutions giving value for money to its Clients across the globe.',
},
        {title:'GIS Data Services',src:require('@/assets/images/goal.png'), text: ' Our commitment to our clients is strong and lasting. Our goal is to continue to improve and diversify our range of services through the development and training of our staff and by constantly upgrading our technology resources. We want to build on our hard earned reputation for quality services and to strive toward ever higher standards.',
},
        {title:'CAD Services',src:require('@/assets/images/goal.svg'),about:'',text: 'To provide leading edge, state-of-art services and solutions to our valued clients so as to Prepare them for the challenges of globalization and the next millennium. Our aim is to gain acclaim through its absolute and unwavering commitment to quality and innovation. To make our operations rising and create an identity of our own in the Geo Spatial Services.',
}],
        
    }
  }
}
</script>

<style>

</style>