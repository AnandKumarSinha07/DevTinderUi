import { useDispatch, useSelector } from "react-redux"
import {Link, useNavigate} from 'react-router-dom'
import { LOGOUT_URL } from "./utils/constant"
import { removeUser } from "./utils/userSlice"
import axios from 'axios'



function Navbar() {

  const user=useSelector(store=>store.user)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  

  const handleLogout=async()=>{
    try{
         await axios.post(LOGOUT_URL,{},{witcredentials:true}); 
         navigate('/login')
         dispatch(removeUser())
        
    }catch(err){
      console.log("Error inside the logout function",err)
    }
  }




  return (
    <div className="navbar bg-info-content w-[100%]">

      <div className="flex-1">
        <Link to={'/'}   className="btn btn-ghost text-xl">DevTinder</Link>
      </div>

        {user &&<div className="flex-none gap-2">
        <div className="form-control decoration-[#50d71e]">Welcome {user.firstName}</div>
        
        <div className="dropdown dropdown-end mx-6 ">
         
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
          
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.profile}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to='/profile' className="justify-between">
                 Profile
                <span className="badge">New</span>
              </Link>
            </li>

            <li>
              <Link to='/connection'>Connection</Link>
            </li>

            <li>
              <Link to='/request'>Request</Link>
            </li>

            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>

          </ul>
        </div>
        </div>}



    </div>
  );
};



export default Navbar