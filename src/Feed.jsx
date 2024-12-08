
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
      console.log("user feed is ",res.data)
    } catch (err) {
      console.log("Error in the FeedData: ", err);
    }
  };

  useEffect(() => {
    fetchFeedData(); 
  }, []);

  return feed.length>0? (
    <div className="flex justify-center items-center mt-10 pb-10">
      <UserCard data={feed[0]} />  
    </div>
  ) : (
    <p className="flex  text-3xl justify-center mt-20 items-center">No User On Feed</p>
  );
}

export default Feed;
