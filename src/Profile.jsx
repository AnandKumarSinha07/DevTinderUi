import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"


function Profile() {

  const user=useSelector(store=>store.user)
 
  // we are doing this untill the user data comes then only we are going to pass it in the prop
  return user&&(
    <div>
      <EditProfile user={user}/>
    </div>
  )
}

export default Profile