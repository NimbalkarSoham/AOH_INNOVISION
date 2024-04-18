import React, { useEffect } from "react";
import Card from "./Card";
import { useState } from "react";
import { useSession } from "next-auth/react";

const PostCardList = ({ allPosts }) => {
  const { data: session } = useSession();

  // Define a function to compare the ratings of two posts
  // const compareRatings = (postA, postB) => {
  //   const ratingA = postA.product.rating || 0; // Default to 0 if rating is undefined
  //   const ratingB = postB.product.rating || 0; // Default to 0 if rating is undefined
  //   return ratingB - ratingA; // Sort in descending order of rating
  // };

  // // Sort the posts based on their ratings
  // const sortedPosts = allPosts
  //   .filter(
  //     (post) => post.creator !== session?.user.id && post.status === "verified"
  //   )
  //   .sort(compareRatings);

  return (
    <div className="mt-12 prompt_layout">
      {allPosts.map((post) => (
        <Card
          key={post._id}
          post={post}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPost = async () => {
    debugger;
    const response = await fetch("/api/product");
    const data = await response.json();
    console.log(data);

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const filterPosts = (searchText) => {
    const searchLowerCase = searchText.toLowerCase();
    return allPosts.filter(
      (item) => item.name.toLowerCase().indexOf(searchLowerCase) !== -1
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <div id="feed" className="mt-16 mx-5 px-5 w-full">
      <div className="flex justify-center">
        {" "}
        {/* Centering the search bar */}
        <form className="relative flex-center w-full max-w-lg px-4">
          {" "}
          {/* Added max-w-lg for width restriction */}
          <input
            type="text"
            placeholder="Search for product"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer w-full"
          />
        </form>
      </div>
      <div className="container mx-auto">
        {" "}
        {/* Added container to wrap PostCardList */}
        {searchText ? (
          <PostCardList allPosts={searchedResults} />
        ) : (
          <PostCardList allPosts={allPosts} />
        )}
      </div>
    </div>
  );
};

export default Feed;
