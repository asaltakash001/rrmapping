import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false,
    status:['Logged In', 'Signed Out'],
    admin:{
      username: 'Akash',
      password: '0000',
      name:'AKASH J',
      image:'https://static.toiimg.com/photo/msid-71756742/71756742.jpg?134917',
      email:'akash@ceo.com',
      phoneno:'9750840534',
      code:'0001',
      role:'admin'
    },
    activeUser:{role:null},
    users:[],
  },
  mutations: {
    authUser(state,value){
      state.authenticated=true
      state.activeUser=Object.assign(value)
      localStorage.setItem("activeuser", JSON.stringify(state.activeUser))
    },
    RemoveAuth(state,value){
      state.authenticated=value.status
      state.activeUser=value.username
    }
  },
  actions: {
    validateUser({commit},value){
      if(value.admin){
        this.state.admin.username === value.user.username && this.state.admin.password === value.user.password ? commit('authUser',this.state.admin) : false
      }else{
        console.log(value)
        let y=JSON.parse(localStorage.getItem("employeesdata"))
        y ? this.users=y.slice() : this.users=[]
        this.users.forEach((x,index)=>{
          x.email === value.user.username && x.password === value.user.password ? commit('authUser',this.users[index]) : false
        })
      }
    }
  },
  modules: {
  },
  getters: {
    // findActive:{
    //   let x=JSON.parse(localStorage.getItem("customersdata"))
    //     x ? this.Customers=x.slice() : this.Customers=[]
    // }
  }
})
