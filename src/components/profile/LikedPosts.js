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

const LikedPosts = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [likedPosts, setLikedPosts] = useState({ results: [] });
  const { id } = useParams();

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const { data } = await axiosRequest.get(
          `/posts/?owner__profile=&likes__owner__profile=${id}`
        );
        setLikedPosts(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchLikedPosts();
  }, [id]);
  return (
    <Box>
      <>
        {hasLoaded ? (
          <>
            <Box>
              {likedPosts?.results?.length ? (
                <InfiniteScroll
                  children={likedPosts?.results?.map((post) => (
                    <Post setPosts={setLikedPosts} key={post.id} {...post} />
                  ))}
                  dataLength={likedPosts?.results?.length}
                  loader={<LinearProgress color="secondary" />}
                  hasMore={!!likedPosts.next}
                  next={() => fetchMoreData(likedPosts, setLikedPosts)}
                />
              ) : (
                <Box sx={{ textAlign: "center", margin: "20px 0" }}>
                  <Typography level="body1">No liked posts</Typography>
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

export default LikedPosts;
