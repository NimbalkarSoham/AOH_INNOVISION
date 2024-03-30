"use client";
import React, { useEffect } from "react";
import Card from "./Card";
import { useState } from "react";
import { useSession } from "next-auth/react";

const PostCardList = ({ allPosts }) => {
  const { data: session } = useSession();
  return (
    <div className="mt-16 prompt_layout">
      {allPosts.map((post) => {
        if (post.creator != session?.user.id && post.status == "verified") {
          return (
            <Card
              key={post._id}
              post={post}
              handleEdit={() => {}}
              handleDelete={() => {}}
            />
          );
        }
      })}
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

  const filterPosts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter((item) => regex.test(item.name));
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
    <div className="mt-16 mx-5 px-5 w-full">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for product"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PostCardList allPosts={searchedResults} />
      ) : (
        <PostCardList allPosts={allPosts} />
      )}
    </div>
  );
};

export default Feed;
