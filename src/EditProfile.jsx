import { useState } from "react";
import axios from "axios";
import { EDIT_URL } from "./utils/constant.js";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewProfile from "./NewProfile.jsx";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName || "User");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skill, setSkills] = useState(user?.skill || []);
  const [profile, setProfile] = useState(user?.profile || "");
  const [error, setError] = useState("");

  const handleEdit = async () => {
    const toastMessage = () => {
      toast(`${firstName} Profile Updated Successfully`);
    };

    try {
      const res = await axios.patch(
        EDIT_URL,
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          skill,
          profile,
        },
        { withCredentials: true }
      );
       if(age<18){
        setError("Please Enter age more than 18")
       }
       if(gender!=='Male' && gender!="female" && gender!='others' && gender!='male' && gender!='Female'){
           setError("Please Enter Gender as Male or male , Female or female");
       }

      console.log("Answer is ", res.data.data);
      dispatch(addUser(res?.data?.data));
      toastMessage();
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred");
      return;
    }
  };

  return (
  <div className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl">

    {/* LEFT SIDE - EDIT FORM */}
    <div className="w-full lg:w-1/2 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 text-white transition-all duration-300 hover:scale-[1.02]">

      <h2 className="text-2xl font-bold mb-6 bg-white bg-clip-text text-transparent">
        Edit Your Profile 🚀
      </h2>

      {/* Name */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="First Name"
          className="inputStyle"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="inputStyle"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      {/* Age + Gender */}
      <div className="flex gap-4 mb-4">
        <input
          type="number"
          placeholder="Age"
          className="inputStyle"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Gender"
          className="inputStyle"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </div>

      <textarea
        placeholder="Enter Skills (comma separated)"
        className="inputStyle mb-4"
        rows="2"
        value={skill.join(",")}
        onChange={(e) => setSkills(e.target.value.split(","))}
      />

      <textarea
        placeholder="About Yourself"
        className="inputStyle mb-4"
        rows="3"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />

      <input
        type="text"
        placeholder="Profile Image URL"
        className="inputStyle mb-6"
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
      />

      <button
        onClick={handleEdit}
        className="w-full py-3 rounded-xl font-semibold text-lg 
        bg-gradient-to-r from-black via-gray-600 to-white 
       text-white hover:opacity-90 transition duration-300 shadow-lg shadow-gray-500/30"
       >
        Save Changes ✨
    </button>

      {error && (
        <p className="text-red-400 mt-3 text-sm font-medium">
          {error}
        </p>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>

    {/* RIGHT SIDE - LIVE PREVIEW */}
    <NewProfile
      data={{ firstName, lastName, age, gender, skill, about, profile }}
    />
  </div>
);
};

export default EditProfile;
