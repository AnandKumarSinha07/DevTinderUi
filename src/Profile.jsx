import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"


function Profile() {
  const user = useSelector((store) => store.user);

  return (
    user && (
      <div className="min-h-screen flex items-center justify-center p-6">
        <EditProfile user={user} />
      </div>
    )
  );
}
export default Profile