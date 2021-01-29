
export default{
  data(){
    return{
      state:false
    }
  },
  methods:{
    getRandomId(){
      return Math.floor((Math.random() * 10000) + 1)
    }
  }
}
