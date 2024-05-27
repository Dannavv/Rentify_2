"use client";

import { useEffect, useState } from "react";
import PostHome from "../post/hpost";
import { getAll, getBySearch } from "@/lib/postHelper";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUser } from "@/context/User";

export default function Posts({filter, search, mode ,setDataForFilter}) {

  console.log(search);
  const [allposts, setAllPosts] = useState([]);
  const [myposts, setMyposts] = useState([])
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const { user } = useUser();

  const filterData = (fetchedPosts) => {
    // Initialize sets with "any"
    const areas = new Set(["any"]);
    const rents = new Set(["any"]);
    const bedrooms = new Set(["any"]);
    const bathrooms = new Set(["any"]);
  
    // Add the values from fetchedPosts to the sets
    fetchedPosts.forEach((post) => {
      areas.add(post.area);
      rents.add(post.rent);
      bedrooms.add(post.bedrooms);
      bathrooms.add(post.bathrooms);
    });
  
    // Convert sets to arrays and set the data for filter
    setDataForFilter({
      area: Array.from(areas),
      rent: Array.from(rents),
      bedroom: Array.from(bedrooms),
      bathroom: Array.from(bathrooms),
    });
  };
  
  

  useEffect(() => {
    getAll().then((fetchedPosts) => {
      setAllPosts(fetchedPosts);
      setPosts(fetchedPosts);
      filterData(fetchedPosts)
    });
    console.log("all data");
    
  }, []);

  useEffect(() => {
    if (mode === "my") {
      const userPosts = allposts.filter(
        (post) => post.createdBy._id === user._id
      );
      console.log(userPosts);
      setPosts(userPosts);
      setMyposts(userPosts)
      // filterData(userPosts)
      console.log("my post");
    } else if (mode === "all") {
      console.log("setiing all posts");
      setPosts(allposts);
      console.log(allposts);
      // filterData(allposts)
    }
    if (search) {

      console.log("searching data");
      if(mode === "my"){
        const filteredPosts = myposts.filter((post) => {
          return (
            post.address.includes(search) ||
            post.area.includes(search) ||
            post.bathrooms.toString().includes(search) ||
            post.bedrooms.toString().includes(search) ||
            post.colleges.includes(search) ||
            post.description.includes(search) ||
            post.hospital.includes(search) ||
            post.landmark.includes(search) ||
            post.rent.toString().includes(search)
          );
        });
        console.log(filteredPosts);
        setPosts(filteredPosts);
        // filterData(filteredPosts)
      }
      else{
        const filteredPosts = allposts.filter((post) => {
          return (
            post.address.includes(search) ||
            post.area.includes(search) ||
            post.bathrooms.toString().includes(search) ||
            post.bedrooms.toString().includes(search) ||
            post.colleges.includes(search) ||
            post.description.includes(search) ||
            post.hospital.includes(search) ||
            post.landmark.includes(search) ||
            post.rent.toString().includes(search)
          );
        });
        console.log(filteredPosts);
        setPosts(filteredPosts);
        // filterData(filteredPosts)
      }
      
    }
  }, [search, mode]);


  useEffect(() => {
    console.log("here");
    const filteredPosts = allposts.filter((post) => {
      // Initialize a condition array to hold individual filter conditions
      const conditions = [];
  
      // Check if filter.area is available and not "any"
      if (filter.area && filter.area !== "any") {
        conditions.push(post.area.includes(filter.area));
      }
  
      // Check if filter.bathroom is available and not "any"
      if (filter.bathroom && filter.bathroom !== "any") {
        conditions.push(post.bathrooms.toString().includes(filter.bathroom));
      }
  
      // Check if filter.bedroom is available and not "any"
      if (filter.bedroom && filter.bedroom !== "any") {
        conditions.push(post.bedrooms.toString().includes(filter.bedroom));
      }
  
      // Check if filter.rent is available and not "any"
      if (filter.rent && filter.rent !== "any") {
        conditions.push(post.rent.toString().includes(filter.rent));
      }
  
      // Apply logical AND to all conditions
      return conditions.every(condition => condition);
    });
  
    console.log(filteredPosts);
    setPosts(filteredPosts);
  }, [filter]);
  
  

  // Calculate index of the first and last post on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Get the current posts to display on the page
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div class="flex flex-col h-auto ">
      <div className="w-full px-20  grid grid-cols-1">
        <div className="grid sm:grid-cols-3 gap-4 w-full ">
          {currentPosts.map((post) => (
            <div key={post._id} className="">
              <PostHome post={post} search={search} mode={mode} />
            </div>
          ))}
        </div>
        <div className="pt-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  //   href="#"
                  onClick={() =>
                    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                  }
                />
              </PaginationItem>
              {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(
                (number) => (
                  <PaginationItem key={number}>
                    <PaginationLink
                      //   href="#"
                      onClick={() => paginate(number + 1)}
                      isActive={currentPage === number + 1}
                    >
                      {number + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  //   href="#"
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      Math.min(
                        prevPage + 1,
                        Math.ceil(posts.length / postsPerPage)
                      )
                    )
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
