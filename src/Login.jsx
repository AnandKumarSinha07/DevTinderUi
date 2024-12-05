import axios from 'axios';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL } from './utils/constant';




function Login() {

  const [email,SetEmail]=useState('anandkr7808@gmail.com');
  const [password,setPassword]=useState('Anand123@');
  const [error,setError]=useState('')
  const dispatch=useDispatch()
  const navigate=useNavigate();
 

  const handleLogin = async()=>{
      try{

        const res=await axios.post(LOGIN_URL,
          {
            email,
            password
          },
          {withCredentials:true}
        );

        console.log("data is ",res.data);  
        dispatch(addUser(res.data))
        navigate('/')
      }catch(err){
        console.log("Error inside the handleLogin",err)
        setError(err?.response?.data || "Something Went Wrong")
      }
  }
  
  

  return (
    <div className="flex justify-center items-center mt-14 ">

      <div className="card bg-base-300 text-white w-96 shadow-lg rounded-lg">

        <div className="card-body flex flex-col gap-4 rounded-lg   bg-gradient-to-l from-white to-black">
          <h2 className="card-title">Enter Email!</h2>

          <input type="email" 
            placeholder="Enter email"
            className="w-full p-2 rounded-md"
            value={email}
            onChange={(e)=>(SetEmail(e.target.value))}
            />

          <h2 className="card-title">Enter Password!</h2>
              <input type="password" 
              placeholder="Enter Password"
              className="w-full p-2 rounded-md"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

         {error && <p className="text-red-500 ml-1">{error}</p>}
           <button
            className=" w-20 ml-2  bg-white text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={handleLogin}
            >Login   
           </button>
        </div>
      </div>
    </div>
  );
}

export default Login;