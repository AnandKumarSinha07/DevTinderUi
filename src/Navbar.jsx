import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { removeUser } from "./utils/userSlice"
import axios from 'axios'
import { LOGOUT_URL } from "./utils/constant"

function Navbar() {
  const user = useSelector(store => store.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
  
      await axios.post(LOGOUT_URL, {}, { withCredentials: true }); 
      dispatch(removeUser())
      navigate('/login')
    } catch (err) {
      console.log("Error inside the logout function", err)
    }
  }

  return (

    <div className="navbar bg-[#0f172a] border-b border-gray-800 px-4 md:px-8 h-16 sticky top-0 z-[100] w-full">
      
      <div className="flex-1">
        <Link to={'/'} className="text-xl font-bold text-white hover:text-blue-400 transition-all">
          DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex-none flex items-center gap-2 sm:gap-4">
          
          <div className="hidden sm:block text-gray-300 font-medium">
            Welcome, {user.firstName}
          </div>
          
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border border-gray-700"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Profile"
                  src={user.profile || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>

            {/* FIX: z-[100] aur bg-base-100 fix kiya taaki transparent na dikhe */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#1e293b] text-white rounded-box z-[100] mt-3 w-52 p-2 shadow-2xl border border-gray-700"
            >
              <li className="sm:hidden border-b border-gray-700 mb-1 pointer-events-none">
                <span className="text-blue-400 font-bold">Hi, {user.firstName}</span>
              </li>

              <li>
                <Link to='/profile' className="justify-between py-2">
                  Profile
                  <span className="badge badge-info badge-xs">New</span>
                </Link>
              </li>

              <li><Link to='/connection' className="py-2">Connections</Link></li>
              <li><Link to='/request' className="py-2">Requests</Link></li>

              <div className="divider my-0 opacity-20"></div>

              <li>
                <a onClick={handleLogout} className="text-red-400 hover:bg-red-900/20 font-bold">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;