
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addFeed } from "./utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { FEED_URL } from "./utils/constant";
import { Link } from "react-router-dom";



function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed); 
  

  const fetchFeedData = async () => {

    try {
      const res = await axios.get(FEED_URL, { withCredentials: true });
      dispatch(addFeed(res.data)); 
      console.log("user feed is ",res.data)
    } catch (err) {
      console.log("Error in the FeedData: ", err);
    }
  };

  useEffect(() => {
    fetchFeedData(); 
  }, []);

 return feed.length > 0 ? (
  <div className="flex justify-center items-center 
                  min-h-[70vh] 
                  bg-gradient-to-br from-black via-[#0a0f1c] to-[#111827] 
                  px-4">

    <UserCard data={feed[0]} />

  </div>
) : (
  <div className="flex flex-col items-center justify-center 
                  min-h-[70vh] 
                  text-white 
                  bg-gradient-to-br from-black via-[#0a0f1c] to-[#111827]">

    <p className="text-3xl font-semibold mb-6">
      Oops! No Users in Feed
    </p>

    <Link to={"/game"}>
      <button className="px-6 py-3 
                         bg-gradient-to-r from-blue-600 to-purple-600 
                         hover:from-blue-500 hover:to-purple-500 
                         transition rounded-lg shadow-lg">
        Explore Our Game
      </button>
    </Link>
  </div>
);
}

export default Feed;
