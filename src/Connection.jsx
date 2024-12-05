import { useEffect } from "react";
import { USER_CONNECTION } from "./utils/constant";
import axios from "axios";
import { addConnection } from "./utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";

const Connection = () => {
  const connection = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const FetConnection = async () => {
    try {
      const res = await axios.get(USER_CONNECTION, { withCredentials: true });
      console.log("res", res?.data?.data);
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  console.log("connection is ", connection);

  useEffect(() => {
    FetConnection();
  }, []);

  if (connection.length === 0) {
    return (
      <div className="flex justify-center items-center mt-60">
        <a href="#my_modal_8" className="btn text-xl">
          open connection 😊
        </a>

      
        <div className="modal" role="dialog" id="my_modal_8">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Oops!!</h3>
            <p className="py-4">You Have No Connection Request Explore More</p>
            <div className="modal-action">
              <a href="#" className="btn">
                Okay
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!connection) {
    return (
      <div>
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center my-10 space-y-2">
      <h1 className="font-bold text-3xl text-white mb-6">Connection Details</h1>
      {connection.map((connection, index) => {
        const { firstName, lastName, age, gender, about } = connection;
        return (
          <div
            key={index}
            className="w-[90%] sm:w-[70%] md:w-[50%] p-6 border border-gray-300 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow"
          >
            <p className="text-lg text-gray-700">
              <strong className="text-gray-900">First Name:</strong> {firstName}
            </p>
            <p className="text-lg text-gray-700">
              <strong className="text-gray-900">Last Name:</strong> {lastName}
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
          </div>
        );
      })}
    </div>
  );
};

export default Connection;
