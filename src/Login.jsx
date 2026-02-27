import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import {LOGIN_URL ,SIGNUP} from "./utils/constant";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

function Login() {
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName,setFirstName]=useState('')
  const [LastName,setLastName]=useState('');
  const [isLogedin,setislogedin]=useState(true);
  const [error, setError] = useState("");
  const [showPassowrd,setShowPassword] = useState(false);

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkPassword=()=>{
       if(password.length>0){
         alert("ok")
         showPassowrd(true)
       }
       else{
          alert("no ok")
          showPassowrd(false);
       }
  }

  const handleLogin = async () => {
    try {

      if(email=='' || password==''){
        return setError("Please Enter Details!!")
      }
      const res = await axios.post(LOGIN_URL,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      
      navigate("/");
    } catch (err) {
      console.log("Error inside the handleLogin", err);
      setError(err?.response?.data || "Something Went Wrong");
    }
  };

  const handleSignup= async()=>{
    try{
        const res=await axios.post(SIGNUP,
          {firstName,LastName,email,password},
          {withCredentials:true}
        )
        dispatch(addUser(res.data.data))
        navigate("/profile")
        
    }catch(err){
      console.log(err);
      setError(err?.response?.data || "Something Went Wrong");
    }
  }

  
  return (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-[#010408ab] border border-gray-800 rounded-2xl p-8 shadow-2xl">
      
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-white">
          {isLogedin ? "Welcome back" : "Create account"}
        </h1>
        <p className="text-gray-400 mt-2">
          {isLogedin
            ? "Sign in to continue to your account"
            : "Sign up to get started"}
        </p>
      </div>

      {/* Signup fields */}
      {!isLogedin && (
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              className="w-full bg-[#1e293b] text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              className="w-full bg-[#1e293b] text-white border border-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full bg-[#1e293b] text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => SetEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm text-gray-300">
            Password
          </label>
         
        </div>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full bg-[#1e293b] text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
       
      </div>
       

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}

      {/* Button */}
      <button
        className="w-full bg-white text-black font-medium rounded-lg py-2.5 hover:bg-gray-200 transition"
        onClick={isLogedin ? handleLogin : handleSignup}
      >
        {isLogedin ? "Sign In" : "Sign Up"}
      </button>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-700"></div>
        <span className="px-3 text-gray-400 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-700"></div>
      </div>

      {/* Toggle */}
      <p
        className="text-center text-gray-400 text-sm cursor-pointer"
        onClick={() => setislogedin((value) => !value)}
      >
        {isLogedin ? (
          <>
            Don't have an account?{" "}
            <span className="text-blue-500 hover:underline">
              Sign Up
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span className="text-blue-500 hover:underline text-2xl">
              Sign In
            </span>
          </>
        )}
      </p>

      {/* Terms */}
      <p className="text-center text-xs text-gray-500 mt-6">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  </div>
);
}

export default Login;
