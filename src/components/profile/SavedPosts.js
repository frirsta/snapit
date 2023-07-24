import React, { useEffect, useState } from "react";
import { axiosRequest } from "../../axios";
import { useParams } from "react-router-dom";
import { fetchMoreData } from "../../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Post from "../../pages/posts/Post";

const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const { data } = await axiosRequest.get(
          `/posts/?favorite__owner__profile=${id}`
        );
        setSavedPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSavedPosts();
  }, [id]);
  return (
    <Box>
      <>
        {hasLoaded ? (
          <>
            <Box>
              {savedPosts?.results?.length ? (
                <InfiniteScroll
                  children={savedPosts?.results?.map((post) => (
                    <Post setPosts={setSavedPosts} key={post.id} {...post} />
                  ))}
                  dataLength={savedPosts?.results?.length}
                  loader={<LinearProgress color="secondary" />}
                  hasMore={!!savedPosts.next}
                  next={() => fetchMoreData(savedPosts, setSavedPosts)}
                />
              ) : (
                <Box sx={{ textAlign: "center", margin: "20px 0" }}>
                  <Typography level="body1">No saved posts</Typography>
                </Box>
              )}
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress color="secondary" />
          </Box>
        )}
      </>
    </Box>
  );
};

export default SavedPosts;
