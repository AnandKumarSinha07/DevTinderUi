import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"


function Profile() {
  const user = useSelector((store) => store.user);

  return (
    user && (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-6">
        <EditProfile user={user} />
      </div>
    )
  );
}
export default Profile