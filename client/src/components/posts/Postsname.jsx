import React, { useState, useEffect } from "react";
import Post from "../post/Postname";
import "./posts.css"; // Import CSS for posts component
import axios from "axios";
import { useLocation } from "react-router";


export default function Posts({ searchQuery }) {
  const [loading, setLoading] = useState(true); // State to track loading status
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const [posts, setPosts] = useState([]);

  /*useEffect(() => {
    setLoading(true); // Set loading to true when starting to fetch data

    // Simulate fetching data from an API (replace with actual API call)
    setTimeout(() => {
      setLoading(false); // Set loading to false once data is fetched
    }, 2000); // Adjust delay as needed
  }, [posts]); // Execute when posts change*/


  useEffect(() => {
    setLoading(true); // Set loading to true when starting to fetch data

    // Perform the actual API call here
    const fetchPosts = async () => {
      try {
        let url = "https://insight-kmwu.onrender.com/api/posts";
        if (searchQuery && searchQuery.trim() !== '') {
          url += `?user=${searchQuery}`;
        }
        const res = await axios.get(url);
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched (whether successful or not)
    }

    };

    fetchPosts();
  }, [searchQuery]); // Call the fetchData function to initiate the API call





  // Logic to calculate the index of the first and last post on the current page
  const postsPerPage = 6; // Adjust as needed
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate total number of pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Generate array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Function to handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="posts-container">
      {loading ? ( // Display loader if loading is true
        <div className="loader-container">
          <div className="loader"></div>
          <p className="loader-text">Loading...</p>
        </div>
      ) : (
        <>
          {posts.length === 0 ? (
            <p className="no-posts">No posts found.</p>
          ) : (
            <>
              <div className="posts">
                {currentPosts.map((p) => (
                  <Post key={p._id} post={p} />
                ))}
              </div>

              {/* Pagination UI */}
              <div className="pagination">
                <button
                  className="pagination-button"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`pagination-button ${pageNumber === currentPage ? "active" : ""}`}
                    onClick={() => paginate(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  className="pagination-button"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={indexOfLastPost >= posts.length}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
