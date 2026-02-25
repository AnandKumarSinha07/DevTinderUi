
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

  return feed.length>0? (
    <div className="flex justify-center items-center mt-10 pb-10 bg-zinc-50">
      <UserCard data={feed[0]} />  
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-7 ">
    <p className="flex  text-3xl justify-center mt-20 items-center">
       Oops Sorry !! No User On Feed
    </p>
      <Link to={"/game"}>
      <button className="px-3 py-3 w-30  bg-black text-white rounded-md">Expore Our Game</button></Link>
    </div>
  );
}

export default Feed;
