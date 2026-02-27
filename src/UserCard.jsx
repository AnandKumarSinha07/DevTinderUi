import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { removeFeed } from "./utils/feedSlice";
import axios from 'axios'
import { SEND_REQUEST } from "./utils/constant";
import { ToastContainer,toast } from "react-toastify";


const UserCard = ({ data }) => {

    //console.log("data in the usercard is ",data)
    const { firstName, lastName, about,  age, gender,_id,profile} = data;
    
    const dispatch=useDispatch();

    const toastMessage=(status)=>{
        toast(`Request send to ${firstName}`,{style:{backgroundColor:'#edf8f7',color:'black'}})
    }

    const handleSendRequest=async(status,_id)=>{
      
       try{
          const req=await axios.post(
            SEND_REQUEST+"/"+status+"/"+_id,{},{withCredentials:true}
          )
          dispatch(removeFeed(_id));  
          toastMessage(status);
        } 
       catch(err){
          console.log(err);
       }
    }
   

    useEffect(()=>{
       handleSendRequest()
    },[])

  
    return (
      <>
  <ToastContainer />

  <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] 
                  border border-gray-800 
                  w-80 max-w-sm 
                  rounded-2xl 
                  shadow-2xl 
                  overflow-hidden 
                  transform transition duration-300 hover:scale-105">

    <figure>
      <img
        src={profile}
        alt="profile"
        className="w-full h-56 object-cover"
      />
    </figure>

    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold">
        {firstName} {lastName}
      </h2>

      <p className="text-gray-400 mt-2 text-sm">
        {about}
      </p>

      <p className="text-xs text-gray-500 mt-3">
        Age: {age} | Gender: {gender}
      </p>

      <div className="mt-6 flex gap-3">
        <button
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 
                     hover:from-blue-500 hover:to-indigo-500 
                     transition text-white py-2 rounded-lg shadow-md"
          onClick={() => handleSendRequest("interested", _id)}
        >
          Interested
        </button>

        <button
          className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 
                     hover:from-red-500 hover:to-pink-500 
                     transition text-white py-2 rounded-lg shadow-md"
          onClick={() => handleSendRequest("ignored", _id)}
        >
          Ignore
        </button>
      </div>
    </div>
  </div>
</>
    );
  };
  
  export default UserCard;
  