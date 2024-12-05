import { Outlet } from "react-router-dom"
import { PROFILE_URL } from "./utils/constant"
import { useEffect } from "react"
import axios from 'axios';
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router";



function Body() {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData=useSelector(store=>store.user)
  

  const userCheck = async () => {
    

    try {
        const res = await axios.get(PROFILE_URL, { withCredentials: true });
        dispatch(addUser(res.data));
    } catch (err) {
        if (err.response && err.response.status === 401) {
            navigate('/login');
        } else {
            console.log("Unexpected error inside the Body component:", err);
        }
    }
};

  useEffect(()=>{
    if(!userData){
      userCheck()
    }    
  },[])




  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body