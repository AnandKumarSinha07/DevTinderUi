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

      console.log("Answer is ", res.data.data);
      dispatch(addUser(res?.data?.data));
      toastMessage();
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center mt-10 gap-5">
      <div className="card bg-base-300 text-white w-76 shadow-lg rounded-lg">
        <div className="card-body flex flex-col gap-3 rounded-lg bg-gradient-to-l from-white to-black">
          <h2 className="card-title">EDIT PROFILE!!</h2>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 rounded-md"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-2 rounded-md"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Age"
              className="w-full p-2 rounded-md"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              type="text"
              placeholder="Gender"
              className="w-full p-2 rounded-md"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>

          <textarea
            placeholder="Enter Skills (comma-separated)"
            className="w-full p-2 rounded-md"
            rows="3"
            value={skill.join(",")} 
            onChange={(e) => setSkills(e.target.value.split(","))}
          />
          <textarea
            placeholder="About Yourself"
            className="w-full p-2 rounded-md"
            rows="3"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Profile Url"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            className="w-full p-2 rounded-md"
          />

          <button
            className="text-white w-20 ml-2 bg-black border-orange-600 font-medium rounded-md text-md px-5 py-2.5 text-center me-2 mb-2"
            onClick={handleEdit}
          >
            Save
          </button>
          <ToastContainer />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <NewProfile data={{ firstName, lastName, age, gender, skill, about, profile }} />
    </div>
  );
};

export default EditProfile;
