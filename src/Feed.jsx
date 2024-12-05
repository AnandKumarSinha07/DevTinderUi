import { FEED_URL } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addFeed } from "./utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed); 
  

  const fetchFeedData = async () => {
    if (feed?.user?.length > 0) return; 

    try {
      const res = await axios.get(FEED_URL, { withCredentials: true });
      dispatch(addFeed(res.data)); 
    } catch (err) {
      console.log("Error in the FeedData: ", err);
    }
  };

  useEffect(() => {
    fetchFeedData(); 
  }, []);

  return feed?.user?.[0] ? (
    <div className="flex justify-center items-center mt-10 pb-10">
      <UserCard data={feed.user[0]} />  
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default Feed;
