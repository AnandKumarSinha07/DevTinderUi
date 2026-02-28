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
      setIsLoading(true);
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
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-white px-6">
        <span className="loading loading-spinner w-12 sm:w-16 text-cyan-500"></span>
        <p className="mt-6 text-lg sm:text-xl font-medium animate-pulse text-center">
          Searching for your matches... 🚀
        </p>
      </div>
    );
  }


  if (feed && feed.length > 0) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] px-4 py-6">
        <UserCard data={feed[0]} />
      </div>
    );
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-white px-6">
      <div className="flex flex-col items-center gap-6 text-center max-w-lg">
        
       
        <div className="text-6xl mb-2">🤷‍♂️</div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          Oops! No more users...
        </h1>

  
        <div className="flex gap-2 items-center justify-center opacity-50">
          <span className="loading loading-ring loading-xs"></span>
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
        </div>

        <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed mt-2">
          Sabko dekh liya aapne! Thoda wait karo, naye log aate hi honge 😂.
        </p>

        <button 
          onClick={fetchFeedData}
          className="mt-6 btn btn-outline btn-info btn-sm sm:btn-md rounded-full px-8"
        >
          Refresh Feed
        </button>
      </div>
    </div>
  );
}

export default Feed;