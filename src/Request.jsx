import { useEffect } from "react"
import { BASE_URL, REQUEST_RECEIVED } from "./utils/constant"
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { addRequest, removeRequest } from "./utils/requestSlice"
import { toast, ToastContainer } from "react-toastify"



const Request = () => {
  const dispatch = useDispatch();  
  const request = useSelector(store => store.requests)
 

  const reviewRequest=async(status,_id)=>{
      try{
          const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,
            {},
            {withCredentials:true}
          );
          console.log(res);
          toast("Request Accepted")
         dispatch(removeRequest(_id))
      }
      catch(err){
        console.log("Error in the api of review post request",err)
       
      }
  }

  const FetchRequest = async () => {
    try {
      const res = await axios.get(REQUEST_RECEIVED, { withCredentials: true });
      console.log("API response:", res?.data?.findConnection);
      dispatch(addRequest(res?.data?.findConnection)); 
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    FetchRequest()
  }, [])

  
  if (!request || request.length === 0) {
    return (
      <div className="flex   items-center justify-center mt-[230px]">
        <h1 className="text-2xl   text-white">No Request Found </h1>
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center  gap-2">

      <h1 className="font-bold text-3xl text-white mb-6">Request Details</h1>
      {request.map((req) => {
        const { _id, status } = req;
        const { firstName, lastName, about, profile, age, gender } = req.fromUserId;

        return (
          <div
            key={_id}
            className="w-[90%] sm:w-[80%] md:w-[50%] p-6 border border-gray-300 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <img src={profile} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
              <div>
                <p className="text-lg text-gray-700">
                  <strong className="text-gray-900">Name:</strong> {firstName} {lastName}
                </p>
                <p className="text-lg text-gray-700">
                  <strong className="text-gray-900">Age:</strong> {age}
                </p>
                <p className="text-lg text-gray-700">
                  <strong className="text-gray-900">Gender:</strong> {gender}
                </p>
                <p className="text-lg text-gray-700">
                  <strong className="text-gray-900">About:</strong> {about}
                </p>
                <p className="text-lg text-gray-700">
                  <strong className="text-gray-900">Status:</strong> {status}
                </p>
                <button className=" w-20 ml-[-8px]  bg-black text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
                 onClick={()=>reviewRequest("accepted",_id)}
                >Accept</button>
                <button className=" w-20 m-2  bg-black text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
                 onClick={()=>reviewRequest("rejected",_id)}
                 
                >Reject
                  <ToastContainer/>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
