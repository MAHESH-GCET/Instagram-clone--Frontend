import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

//User Login
export const userLogin=createAsyncThunk('/login',async(userCred,{rejectWithValue})=>{
    try{
        let response=await axios.post('http://localhost:5000/userApi/login',userCred)
        console.log(response);
        if(response.data.message==='success'){
            sessionStorage.setItem('token',response.data.token)
            sessionStorage.setItem('status','success')
            sessionStorage.setItem('user',JSON.stringify(response.data.user))
            return response.data;
        }
        else{
            throw new Error(response.data.message);
        }
    } catch (err){
        return rejectWithValue(err)
    }
})
let user=sessionStorage.getItem("user")

if(user){
    user=JSON.parse(user)
}
else{
    user={}
}
let status=sessionStorage.getItem("status")
if(!status){
    status='idle'
}


export const loginSlice=createSlice({
    name:"login",
    initialState:{
        user:user,
        errorMessage:"",
        status:status
    },
    reducers:{
        clearState:(state)=>{
            state.user={};
            state.errorMessage="";
            state.status='idle'
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userLogin.pending,(state,action)=>{
            state.status="pending"
        });
        builder.addCase(userLogin.fulfilled,(state,action)=>{
            state.user=action.payload.user;
            state.errorMessage="";
            state.status="success";
        });
        builder.addCase(userLogin.rejected,(state,action)=>{
            state.errorMessage = action.payload.message;
            state.status = "failed";
        })
    }
})

//export reducer functions
export const {clearState}=loginSlice.actions;

//export reducer
export default loginSlice.reducer;