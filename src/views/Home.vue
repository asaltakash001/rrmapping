<template>
  <div class="pa-0">
    <v-carousel hide-delimiters height="400" >
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" reverse-transition="fade-transition" transition="fade-transition">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-3 black--text"> Slide {{ i + 1 }}</div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <!-- <v-parallax dark height="200" src="@/assets/images/parralax.jpg" class="mt-5">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12" >
          <h1 class="display-1 font-weight-black mb-4">
          Who We Are ?
          </h1>
        </v-col>
      </v-row>
    </v-parallax> -->
    <div>
      <v-card class="py-7">
        <v-row>
          <v-col cols="12"><h1 align="center" justify="center" class="blue--text">Who We Are ?</h1></v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="4" xl="4" md="4" sm="12" v-if="$vuetify.breakpoint.smAndDown"> <v-img src="@/assets/images/laptop.png" max-height="400" contain class="pt-3"></v-img></v-col>
          <v-col cols="12" lg="8" xl="8" md="8" sm="12" > <v-card-text align="center" justify="center" class="py-7 px-9 black--text body-1 text-justify">RR Mapping is one of the Fast growing and experienced full service geospatial solutions company in Trichy cosmopolitan city, Tamilnadu, India. We have a long tradition of consistent performance and enduring client relationships built along with the quality services. RR Mapping has the experience, Technical resources, and worldwide capacity to enable excellent performance on any geospatial projects (include Photogrammetric Data Processing, 3D city modelling, Ortho photo Processing, Lidar Data processing, Raster to Vector conversion, GIS Data Conversion, Geo referencing, etc.,) from multisensory data fusion for small sites to state-wide mapping programs. No job is too small or large, we provide our services to independent geomatics companies, government bodies and transport authorities. The information is provided in a format that is ready to integrate into various types of GIS and CAD systems to our clients.</v-card-text></v-col>
          <v-col cols="12" lg="4" xl="4" md="4" sm="12" v-if="!$vuetify.breakpoint.smAndDown"> <v-img src="@/assets/images/laptop.png" max-height="400" contain class="pt-3"></v-img></v-col>
        </v-row>
      </v-card>
    </div>
  <div>
  </div>
    <v-parallax dark height="200" src="@/assets/images/parralax.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12" >
          <h1 class="display-1 font-weight-black mb-4">
            Why RR Mapping ?
          </h1>
        </v-col>
      </v-row>
  </v-parallax>
  <div>
     <v-row class="px-3">
       <v-col v-for="(i, index) in company" :key="index" cols="12" lg="4" md="4" sm="7" xl="4" class="mx-auto">
         <v-card  elevation="24" :color="i.color">
          <v-row align="center" justify="center">
            <v-card-title class="text-centered black--text">{{i.name}}</v-card-title>
          </v-row>
          <v-divider class="black"></v-divider>
          <v-card-text v-html="i.text" class="text-centered black--text text-justify"></v-card-text>
      </v-card>
       </v-col>
     </v-row>
  </div>
    <v-parallax dark height="200" src="@/assets/images/parralax.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12" >
          <h1 class="display-1 font-weight-black mb-4">
            What We Do ?
          </h1>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container>
      <v-row v-for="(i,index) in whatwedo" :key="index">
        <v-card width="100%" v-if="index%2 === 0">
          <v-row>
            <v-col cols="12" sm="6" lg="6" md="6" xl="5">
              <v-img :src="i.src" height="200"></v-img>
              </v-col>
              <v-col cols="12" sm="6" lg="6" xl="7" md="6">
                <li v-for="(x, index) in i.options" :key="index" class="py-2 px-3">{{x}}</li>
              </v-col>
          </v-row>
        </v-card>
         <v-card width="100%" v-else color="blue-grey lighten-5">
          <v-row>
            <v-col cols="12" sm="6" lg="6" md="6" xl="5" v-if="$vuetify.breakpoint.xs">
              <v-img :src="i.src" height="200"></v-img>
            </v-col>
            <v-col cols="12" sm="6" lg="6" xl="7">
                <li v-for="(x, index) in i.options" :key="index" class="py-2 px-3">{{x}}</li>
              </v-col>
            <v-col cols="12" sm="6" lg="6" md="6" xl="5" v-if="!$vuetify.breakpoint.xs">
              <v-img :src="i.src" height="200"></v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        services:[{icon:'mdi-delete',name:'Ortho Photographic'},{icon:'mdi-delete',name:'Topographic Contour'},{icon:'mdi-delete',name:'Digital Surface Model'},{icon:'mdi-delete',name:'Stereo Compilation'}],
        company:[
        {icon:'mdi-delete',name:'Our Mission',color:'green', text : `RR Mapping provides professional geospatial services in strict adherence to the highest ethical and technical standards.
        We understand that each of our client's needs are unique, However they all require timely, technically sound and cost effective solutions.
        Our standard business practice is to work with each client to clearly define project scope and requirements and develop a solution that is right on target.
        We assist our clients through consulting, planning, design and implementation of viable and practical mapping programs that are delivered on time and on budget.
        To provide leading edge, state-of-art services and solutions to our valued clients so as to Prepare them for the challenges of globalization and the next millennium.
        Our aim is to gain acclaim through its absolute and unwavering commitment to quality and innovation.`},
        {icon:'mdi-delete',name:'Our Vission',color:'orange', text: `"Societal Sustainability is the fruit of Futuristic Imagination". To provide world-class services & solutions giving value for money to its Clients across the globe.`},
        {icon:'mdi-delete',name:'Our Goal',color:'yellow', text:`Our commitment to our clients is strong and lasting. Our goal is to continue to improve and diversify our range of services through the development and training of our staff and by constantly upgrading our technology resources. We want to build on our hard earned reputation for quality services and to strive toward ever higher standards.`}],
        items: [
          {src: require('@/assets/images/bg11.jpg',)},
          {src: require('@/assets/images/bg12.jpg',)},
          {src: require('@/assets/images/bg13.jpg',)},
          {src: require('@/assets/images/bg15.jpg',)},
        ],
        whatwedo:[
        {title:'Photogrammetry Services',src:require('@/assets/images/Photogrammetry.jpg'), options:['Aerial Triangulation','Digital Terrain Modelling/Digital Surface Modelling','Planimetric mapping - Small/Medium/Large Scale','3D City modelling / Facade-roof texturing']},
        {title:'Image Processing Service',src:require('@/assets/images/bg17.jpg'), options:['Orthophoto Generation','Image enhancement','Geo-referencing / Geo-rectification','Clutter data collation']},
        {title:'GIS Data Services',src:require('@/assets/images/gis-1.jpg'), options:['Parcel & Cadastral Mapping','Land base mapping – Small, Medium and Large Scale','Rail / Road Corridor mapping','City Maps','Forestry / Agriculture mapping','Positional Accuracy Improvement of Map features - Manual/Semi-Automatic']},
        {title:'Utility Mapping',src:require('@/assets/images/utility-mapping.jpg'),about:'RR Mapping has a wealth of experience in offering utility mapping services. It has executed fairly large electrical utility mapping projects, which has lead to the development a highly generic utility mapping production system. This generic system is flexible enough to accommodate complex business rules that differentiate one utility project from the other. This flexibility facilitates the creation Ortho Vista of a highly optimized production flow line for creating as-built Network Information Systems. RR Mapping has the expertise in ESRI, Arc GIS and Bentley etc.,', options:['Data Capture','Positional Accuracy Improvement','Data Maintenance']},
        {title:'Lidar Services',src:require('@/assets/images/lidar.webp'),about:'', options:[ 'Ground Features Classification','Non Ground Features Classification','Power line Classification','Contour Generation','Deliverables DEM, ASCII, RASTER Images etc.,']},
        {title:'CAD Services',src:require('@/assets/images/autocad.jpg'),about:'', options:['Raster to vector conversion', 'Format conversion', 'Data updation', 'Plotting']}],
        tabs: null,
      }
    },
  }
</script>