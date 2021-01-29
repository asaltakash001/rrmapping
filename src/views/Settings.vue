<template>
  <div>
     <v-row>
      <v-col cols="10"><h1>Order Management Portal</h1></v-col>
      <v-col cols="2"><v-btn dark @click="addproduct()" v-if="allAccessFor.includes($store.state.activeUser.role)">Add</v-btn></v-col>
    </v-row>
   <v-snackbar v-model="modal.snackbar">Order Added Successfully </v-snackbar>
     <v-simple-table >
        <template v-slot:default>
          <thead>
            <tr >
              <th class="text-left">Code </th>
              <th class="text-left">Customer </th>
              <th class="text-left">Managing By</th>
              <th class="text-left">Date</th>
              <th class="text-left">Total Amount</th>
              <th class="text-left">Status</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody v-if="allData.Orders.length>0">
            <tr v-for="(item,index) in allData.Orders" :key="index">
              <td class="text-left">{{ item.code }}</td>
              <td class="text-left">{{item.customer.name}}</td>
              <td class="text-left"> {{item.employee.name}}</td>
              <td class="text-left">{{formatDate(item.date)}}</td>
              <td class="text-left">{{findTotalAmount(item)}}</td>
              <td>{{item.status}}</td>
              <td class="text-left"> <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" @click="EditProduct(index);">mdi-pencil</v-icon>
                  </template>
                  <span>Edit</span>
                </v-tooltip><v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }" v-if="allAccessFor.includes($store.state.activeUser.role)">
                  <v-icon v-bind="attrs" v-on="on" @click="modal.dialog1=true;selectedProductIndex=index" >mdi-delete</v-icon>
                </template>
                  <span>Delete</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td class="text-left">No Records..</td>
              </tr>
          </tbody>
        </template>
      </v-simple-table>
      
      <v-data-table :headers="headers" :items="allData.Orders" class="elevation-1">
        <template v-slot:[`item.date`]="{ item }">
          <span >{{formatDate(item.date)}}</span> 
        </template>
        <template v-slot:[`item.total`]="{ item }">
          <span >{{findTotalAmount(item)}}</span> 
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2"  @click="EditProduct(item);"> mdi-pencil</v-icon>
          <v-icon small  @click="modal.dialog1=true;selectedProductIndex=index;item" v-if="allAccessFor.includes($store.state.activeUser.role)"> mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <span>No Records..</span> 
        </template>
      </v-data-table>

      <v-dialog v-model="modal.dialog1" max-width="500">
        <v-card>
          <v-card-title>  Are You sure to Remove this Order from cart? </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1"  text @click="modal.dialog1 = false;selectedProductIndex=null">Cancel</v-btn>
            <v-btn color="red darken-5" text  @click="deleteorder()">Proceed</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
        <!-- foRM tO tO cREATE A nEW oRDER -->
        <v-dialog v-model="modal.dialog" fullscreen  transition="dialog-bottom-transition" scrollable>
        <v-card tile>
          <v-toolbar dark >
            <v-btn icon dark @click="modal.dialog = false;reset();"><v-icon>mdi-close</v-icon></v-btn>
            <v-toolbar-title>Add Orders...</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items><v-btn dark text @click="modal.dialog = false;AddOrder()" v-if="!EditBtn" :disabled="!modal.valid"> Save</v-btn>
            <v-btn dark text @click="modal.dialog = false;UpdateOrder()" v-else :disabled="!modal.valid"> Update</v-btn></v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="modal.valid">
              <v-card>
                <v-card-title>
                  <span class="headline">Add Order</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-select v-model="form.customer" :items="allData.Users" item-text="name" item-value="id" label="Select Customer" persistent-hint return-object :rules="[v => !!v || 'Customer is required']"></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select v-model="form.employee" :items="allData.Employees" item-text="name" item-value="id" label="Select Mangaging" persistent-hint return-object :rules="[v => !!v || 'Responsible Person is required']"></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="form.dateFormatted" readonly label="Date" persistent-hint prepend-icon="mdi-calendar" v-bind="attrs" v-on="on"></v-text-field>
                          </template>
                          <v-date-picker v-model="form.date" no-title @input="menu1 = false"></v-date-picker>
                        </v-menu>
                      </v-col>
                       <v-col cols="12" sm="6" md="6">
                        <v-select v-model="form.status" :items="['Initialized','On Going', 'Completed']" label="Select Status" persistent-hint return-object  v-if="EditBtn"></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-img :src="form.path" v-if="form.path" height="200px" contain></v-img>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-form>
            <v-divider></v-divider>
            <v-btn @click="modal.dialog3=true;addProductBtn=true">Add Products...</v-btn>
            <v-row class="pa-5">
              <v-dialog v-model="modal.dialog3" persistent max-width="600px">
                <v-form ref="form" v-model="modal.valid1">
                <v-card>
                  <v-card-title>
                    <span class="headline">Update Order Product</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-select v-model="product" :items="allData.Products" item-text="name" item-value="id" label="Select Product" multiple chips persistent-hint return-object :rules="[v => !!v || 'Products is required']"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field label="Enter Quantity" v-model="quantity" type="Number" :rules="[v => !!v || 'Quantity is required', v=> !isNaN(v) || 'Quantity Shoud be Number']"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="modal.dialog3=false" > Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="AddProduct" v-if="addProductBtn" :disabled="!modal.valid1"> Add </v-btn>
                    <v-btn color="blue darken-1" text @click="updateProduct" v-if="!addProductBtn" :disabled="!modal.valid1"> Update </v-btn>
                  </v-card-actions>
                </v-card>
                </v-form>
              </v-dialog>
            </v-row>
            <v-card>
              <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Product Name</th>
                    <th class="text-left">Price</th>
                    <th class="text-left">Quantity</th>
                    <th class="text-left">Total</th>
                     <th class="text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(i,index) in form.product" :key="index">
                        <td>{{i.name}}</td>
                        <td>{{i.saleprice}}</td>
                        <td><v-icon class="px-3" @click="updateQuantity(-1,index)" :disabled="i.quantity < 2">mdi-minus</v-icon>{{i.quantity}}<v-icon class="px-3" @click="updateQuantity(1,index)">mdi-plus</v-icon></td>
                        <td>{{i.quantity*i.saleprice}}</td>
                        <td><v-icon small @click="EditProducts(index);selectedOrderProductIndex=index;addProductBtn=false">mdi-pencil</v-icon>
                        <v-icon small @click="modal.dialog2=true;selectedOrderProductIndex=index" class="mx-3">mdi-delete</v-icon>
                        </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            </v-card>
          </v-card-text>
          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
      <v-dialog v-model="modal.dialog2" max-width="500">
        <v-card>
          <v-card-title>  Are You sure to Remove this product from Order List? </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1"  text @click="modal.dialog2 = false;selectedEmployeeIndex=null">Cancel</v-btn>
            <v-btn color="red darken-5" text  @click="DeleteProducts()">Proceed</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>
<script>
export default {
data(){
  return{
    form:{customer: '',employee: '',date:new Date().toISOString().substr(0, 10),dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),product:[], status:''},
    product:'',
    quantity: null,
    date:new Date().toISOString().substr(0, 10),
    dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
    modal:{dialog:false,dialog1:false,dialog2:false,dialog3:false,snackbar: false,valid: true,valid1:true,menu1: false,},
    menu1: false,
    allData:{Products:[], Users:[], Employees:[], Orders:[],AllOrders:[]},
    EditBtn:false,
    selectedProductIndex:null,
    selectedOrderProductIndex:null,
    selectedOrderIndex:null,
    addProductBtn:false,
    allAccessFor:['admin','manager'],
    headers:[{text: 'Code', align: 'start',sortable: false,value: 'code',},
          { text: 'Customer', value: 'customer.name' },
          { text: 'Managing By', value: 'employee.name' },
          { text: 'Date', value: 'date' },
          { text: 'Total Amount',value:'total'},
          { text: 'Status', value: 'status'},
          { text: 'Actions',value:'actions'},
        ],
  }
},
methods:{
   formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${day}-${month}-${year}`
      },
  getAllRecords(){
    let x=JSON.parse(localStorage.getItem("customersdata"))
    x ? this.allData.Users=x.slice() : this.allData.Users=[]
    let y=JSON.parse(localStorage.getItem("employeesdata"))
    y ? this.allData.Employees=y.slice() : this.allData.Employees=[]
    let z=JSON.parse(localStorage.getItem("Productsdata"))
    z ? this.allData.Products=z.slice() : this.allData.Products=[]
  },getOrderdata(){
    let x=JSON.parse(localStorage.getItem("orderdata"))
    x ? this.allData.Orders=x.slice() : this.allData.Orders=[]
  },
  addproduct(){
    this.modal.dialog=true
    this.EditBtn=false
    this.$refs.form.resetValidation()
  },
  reset(){
    this.form={customer: '',employee: '',date:new Date().toISOString().substr(0, 10),dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),product:[], status:'Initialized'}
    this.modal.dialog = false;
    this.$refs.form.resetValidation()
  },
  findTotalAmount(item){
    let total=0
    item.products.forEach(x=>{
     total=total+ x.saleprice*x.quantity
    })
    return total
  },
  AddProduct(){
    var findex=null
    for(let j in this.product){
      if(this.form.product.length){
       let result= this.form.product.find((x,index)=>{
         findex=index
         return x.code===this.product[j].code ? true : false
       })
       if(result){
         this.form.product[findex].quantity=Number(this.form.product[findex].quantity)+Number(this.quantity)
       }
       else{
         let x =Object.assign({},this.product[j],{quantity: this.quantity})
         this.form.product.push(x)
       }
      }else{
        let x =Object.assign({},this.product[j],{quantity: this.quantity})
        this.form.product.push(x)
      }
    }
      this.product = []
      this.quantity = null
      this.modal.dialog3=false
  },
  AddOrder(){
    this.allData.Orders.push({code:this.getRandomId(),customer:this.form.customer,employee:this.form.employee,date:this.form.date,status:'Initialized',products:this.form.product.slice()})
    this.form={customer: '',employee: '',date: '',product:[]}
    this.storetolocal()
    this.modal.snackbar=true
  },
  EditProduct(index){
    console.log
    this.EditBtn=true
    this.modal.dialog=true
    this.form.customer=this.allData.Orders[index].customer
    this.form.employee=this.allData.Orders[index].employee
    this.form.date=this.allData.Orders[index].date
    this.form.status=this.allData.Orders[index].status
    this.form.product=this.allData.Orders[index].products.slice()
    this.selectedOrderIndex=index
  },
  EditProducts(index){
    this.modal.dialog3=true
    this.product=this.form.product[index].name
    this.quantity=this.form.product[index].quantity
  },
  UpdateOrder(){
    this.allData.Orders[this.selectedOrderIndex].customer=this.form.customer
    this.allData.Orders[this.selectedOrderIndex].employee=this.form.employee
    this.allData.Orders[this.selectedOrderIndex].date=this.form.date
    this.allData.Orders[this.selectedOrderIndex].status=this.form.status
    this.allData.Orders[this.selectedOrderIndex].products=this.form.product.slice()
    this.storetolocal()
  },
  updateProduct(){
    this.form.product[this.selectedOrderProductIndex].name=this.product
    this.form.product[this.selectedOrderProductIndex].quantity=this.quantity
    this.modal.dialog3=false
    this.product=''
    this.quantity=''
  },updateQuantity(value,index){
     this.form.product[index].quantity=Number(this.form.product[index].quantity)+(value)
  },
  deleteorder(){
    this.modal.dialog1 = false
    this.allData.Orders.splice(this.selectedProductIndex,1)
    this.storetolocal()
  },DeleteProducts(){
    this.form.product.splice(this.selectedOrderProductIndex,1)
    this.modal.dialog2=false
  },storetolocal(){
    if(!this.allAccessFor.includes(this.$store.state.activeUser.role)){
      this.allData.Orders.forEach((x,index)=>{
      this.allData.AllOrders.forEach((y,yindex)=>{
        x.code === y.code ? this.allData.AllOrders[yindex]=Object.assign(this.allData.Orders[index]) : false
      })
    })
      localStorage.setItem("orderdata", JSON.stringify(this.allData.AllOrders))
      this.allAccessFor.includes(this.$store.state.activeUser.role) ? this.getOrderdata() : this.getEmployeeDetails()
    }else{
      localStorage.setItem("orderdata", JSON.stringify(this.allData.Orders))
      this.allAccessFor.includes(this.$store.state.activeUser.role) ? this.getOrderdata() : this.getEmployeeDetails()
    }
    
  },
  getEmployeeDetails(){
    var Result=[]
    this.allData.Orders=[]
    let x=JSON.parse(localStorage.getItem("orderdata"))
    x ? Result=x.slice() : Result=[]
    this.allData.AllOrders=Result.slice()
    Result.forEach((x)=>{
        x.employee.name === this.$store.state.activeUser.name ? this.allData.Orders.push(x) : false
    })
  }
},
mounted(){
    this.getAllRecords()
    this.allAccessFor.includes(this.$store.state.activeUser.role) ? this.getOrderdata() : this.getEmployeeDetails()
  },
watch:{
  'form.date' () {
      this.form.dateFormatted = this.formatDate(this.form.date)
    },
  }
}
</script>
