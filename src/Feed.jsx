
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addFeed } from "./utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { FEED_URL } from "./utils/constant";




function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed); 
  

  const fetchFeedData = async () => {

    try {
      const res = await axios.get(FEED_URL, { withCredentials: true });
      dispatch(addFeed(res.data)); 
      //console.log("user feed is ",res.data)
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
                  px-4">

    <UserCard data={feed[0]} />

  </div>
) : (
  <div className="flex flex-col items-center justify-center 
                  min-h-[70vh] 
                  text-white 
                  ">

    

    <div className="flex gap-3  items-center justify-center">
        <h1 className="text-3xl  text-white">Oops No User On the Feed Load.....</h1>
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>

  </div>
);
}

export default Feed;
