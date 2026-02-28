import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addFeed } from "./utils/feedSlice";
import { useEffect, useState } from "react"; 
import UserCard from "./UserCard";
import { FEED_URL } from "./utils/constant";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
 
  const [isLoading, setIsLoading] = useState(true);

  const fetchFeedData = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(FEED_URL, { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log("Error in the FeedData: ", err);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, []);


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-white">
        <span className="loading loading-spinner loading-lg text-cyan-500"></span>
        <p className="mt-4 text-xl font-medium animate-pulse">Loading Feed, Please wait...</p>
      </div>
    );
  }

  if (feed && feed.length > 0) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] px-4">
        <UserCard data={feed[0]} />
      </div>
    );
  }

 
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-white px-4">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
          Oops! No User On the Feed...
        </h1>
        <div className="flex gap-2 items-center">
          <span className="loading loading-ring loading-xs text-white"></span>
          <span className="loading loading-ring loading-sm text-white"></span>
          <span className="loading loading-ring loading-md text-white"></span>
          <span className="loading loading-ring loading-lg text-white"></span>
        </div>
      </div>
      <p className="mt-4 text-gray-400 text-sm md:text-base">
         Sabko dekh liya aapne! Thoda wait karo, naye log aate hi honge 😂.
      </p>
    </div>
  );
}

export default Feed;