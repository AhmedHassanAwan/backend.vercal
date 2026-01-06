import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name : {type : String , requiure : true  } , 
        email : {type : String , requiure : true  , unique : true , } , 
        password : {type : String , requiure : true},
        role : {type: String , enum : ["superadmin", "doctor", "patient" , "nurse" , "Receptionist"] , default : "patient"} ,
        refreshToken : {type :String} , 
        isFirstLogin : {
            type : Boolean,
            default : true

        }
    },
  
    {
        timestamps : true   
    }
)

const User = mongoose.model('User' , userSchema);
export default User;