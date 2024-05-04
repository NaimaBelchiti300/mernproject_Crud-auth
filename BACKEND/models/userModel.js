const mongoose=require('mongoose')
const userSchema=mongoose.Schema({

name:{
    type:String,
    required:[true,'ajouter le nom']
},
email:{
    type:String,
    required:[true,'ajouter email'],
    unique:true

},
password:{
    type:String,
    required:[true,'ajouter password'],

}






}
,
{
    timestamps:true,
}

)



module.exports=mongoose.model('Userss',userSchema)