<template>
  <div>
    <v-card>
      <v-card-title >Our Services</v-card-title>
      <p class="px-9 text-justify">
        RR Mapping has provided photogrammetric solutions with technically skilled team in Trichy & across World. A lot of changes have occurred since this time and we have been a key driver of new technology. Our derived products go through a barrage of quality control procedures designed to ensure a good product. All Photogrammetry services are performed using the most advanced softcopy workstations operating the latest proven software tools.
      </p>
    </v-card>
    <v-row class="mx-5">
      <v-col v-for="(i, index) in services" :key="index" class="" cols="12" lg="4" md="4" sm="12" xl="3">
        <v-card min-height="400" class="">
          <v-img height="150" :src="i.src"></v-img>
          <v-card-title class="title">{{i.title}}</v-card-title>
          <v-card-text>
            <li v-for="(x, index) in i.options" :key="index" class="py-2">{{x}}</li>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions >
            <v-btn>More Info</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
    data(){
      return{
        services:{1:{title:'Photogrammetry Services',src:require('@/assets/images/Photogrammetry.jpg'),about:'RR Mapping offers services almost across the entire spectrum of photogrammetry. RR Mapping undertakes simple to complex, small scale to large scale projects at very competitive rates with fast turnaround times. It leverages on process driven approach, technology enablers and high levels of automation to ensure a highly scalable yet lean production flow line. The range services include', options:['Aerial Triangulation','Digital Terrain Modelling/Digital Surface Modelling','Planimetric mapping - Small/Medium/Large Scale','3D City modelling / Facade-roof texturing']},
        2:{title:'Image Processing Service',src:require('@/assets/images/bg17.jpg'),about:'RR Mapping provides a range of image processing services including ortho-rectification, mosaicing, color balancing, geo-referencing / geo-rectification of all types of high resolution imagery (aerial and satellite). RR Mapping has executed a number of high volume image processing production projects', options:['Orthophoto Generation','Image enhancement','Geo-referencing / Geo-rectification','Clutter data collation']},
        3:{title:'GIS Data Services',src:require('@/assets/images/gis-1.jpg'),about:'RR Mapping undertakes high volume geospatial 2D/3D data conversion projects and has successfully executed mapping projects from disparate and wide ranging sources (including ortho-photos, satellite images, aerial photographs, and other legacy inputs) and delivered in multiple GIS formats. RR Mapping has a strong customer base in United Kingdom, France, Germany, United States, Kuwait, Newzealand, Dubai, Benelux etc. The range of services offered includes.', options:['Parcel & Cadastral Mapping','Land base mapping – Small, Medium and Large Scale','Rail / Road Corridor mapping','City Maps','Forestry / Agriculture mapping','Positional Accuracy Improvement of Map features - Manual/Semi-Automatic']},
        4:{title:'Utility Mapping',src:require('@/assets/images/utility-mapping.jpg'),about:'RR Mapping has a wealth of experience in offering utility mapping services. It has executed fairly large electrical utility mapping projects, which has lead to the development a highly generic utility mapping production system. This generic system is flexible enough to accommodate complex business rules that differentiate one utility project from the other. This flexibility facilitates the creation Ortho Vista of a highly optimized production flow line for creating as-built Network Information Systems. RR Mapping has the expertise in ESRI, Arc GIS and Bentley etc.,', options:['Data Capture','Positional Accuracy Improvement','Data Maintenance']},
        5:{title:'Lidar Services',src:require('@/assets/images/lidar.webp'),about:'', options:[ 'Ground Features Classification','Non Ground Features Classification','Power line Classification','Contour Generation','Deliverables DEM, ASCII, RASTER Images etc.,']},
        6:{title:'CAD Services',src:require('@/assets/images/autocad.jpg'),about:'', options:['Raster to vector conversion', 'Format conversion', 'Data updation', 'Plotting']}}
      }
    },
    mounted(){
      console.log(this.$vuetify);
    }
}
</script>

<style>

</style>