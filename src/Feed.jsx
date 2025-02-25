import React, { useEffect } from "react";
import axios from "axios";
import { addFeed } from "./utils/feedSlice";
import { BASE_URL } from "./utils/Constants";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);

  const getFeed = async () => {
    try {
      if (feed) return; // Prevent refetching if feed exists
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(response);
      
      dispatch(addFeed(response?.data));
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Add conditional rendering
  if (!feed) return <div className="text-center mt-10">Loading Feed...</div>;

  return (
    <div className="flex justify-center my-10 flex-wrap gap-4">
      {/* {feed.map((user) => ( */}
        <UserCard user={feed[8]} />
      {/* ))} */}
    </div>
  );
};

export default Feed;
