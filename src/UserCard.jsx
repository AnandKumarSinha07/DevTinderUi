import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { removeFeed } from "./utils/feedSlice";
import axios from 'axios'
import { SEND_REQUEST } from "./utils/constant";
import { ToastContainer,toast } from "react-toastify";


const UserCard = ({ data }) => {

    console.log("data in the usercard is ",data)
    const { firstName, lastName, about,  age, gender,_id,profile} = data;
    console.log("profile is ",profile)
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
          console.log(req)
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
      <ToastContainer toastStyle={{ backgroundColor: "green" }}/>
      <div className="card bg-white w-72 max-w-xs shadow-md shadow-white rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
        <figure>
          <img
            src={profile}
            alt="profile"
            className="w-full h-40 object-cover"
          />
        </figure>
        <div className="p-4">
          <h2 className="text-3xl font-semibold text-gray-800">{firstName} {lastName}</h2>
          <p className="text-md text-gray-600 mt-2">{about}</p>
          <p className="text-xs font-medium text-gray-500 mt-2">Age: {age} | Gender: {gender}</p>
          <div className="mt-4 flex gap-2">
            <button className="  bg-gradient-to-r from-black to-blue-600 p-2 mr-2 rounded-md text-slate-200 w-22"
             onClick={()=>handleSendRequest("interested",_id)}
            >Interested</button>
            <button className="  bg-gradient-to-r from-black to-red-500 p-2 rounded-md text-slate-200 w-20"
              onClick={()=>handleSendRequest("ignored",_id)}  
            >Ignore
             
            </button>
            
          </div>
          
        </div>
        
      </div>
      </>
    );
  };
  
  export default UserCard;
  