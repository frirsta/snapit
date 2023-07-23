import React, { useEffect, useState } from "react";
import { fetchMoreData } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../axios";
import ProfileCard from "../../components/profile/ProfileCard";
import Post from "../posts/Post";
import CircularProgress from "@mui/joy/CircularProgress";
import LinearProgress from "@mui/joy/LinearProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

const Profile = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [accountPosts, setAccountsPosts] = useState({ results: [] });
  const [likedPosts, setLikedPosts] = useState({ results: [] });
  const [savedPosts, setSavedPosts] = useState({ results: [] });
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosRequest.get(`/posts/?owner__profile=${id}`);
        setAccountsPosts(data.results);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    const fetchLikedPosts = async () => {
      try {
        const { data } = await axiosRequest.get(
          `/posts/?owner__profile=&likes__owner__profile=${id}`
        );
        setLikedPosts(data.results);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchSavedPosts = async () => {
      try {
        const { data } = await axiosRequest.get(
          `/posts/?favorite__owner__profile=${id}`
        );
        setSavedPosts(data.results);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    fetchLikedPosts();
    fetchSavedPosts();
  }, [id]);

  return (
    <div>
      <ProfileCard
        saved_posts={
          <>
            {hasLoaded ? (
              <>
                <div>
                  {savedPosts?.length ? (
                    <InfiniteScroll
                      children={savedPosts?.map((post) => (
                        <Post key={post.id} {...post} />
                      ))}
                      dataLength={savedPosts?.length}
                      loader={<LinearProgress color="secondary" />}
                      hasMore={!!savedPosts.next}
                      next={() => fetchMoreData(savedPosts, setSavedPosts)}
                    />
                  ) : (
                    <Box sx={{ textAlign: "center", margin: "20px 0" }}>
                      <Typography level="body1">No saved posts</Typography>
                    </Box>
                  )}
                </div>
              </>
            ) : (
              <CircularProgress color="secondary" />
            )}
          </>
        }
        liked_posts={
          <>
            {hasLoaded ? (
              <>
                <div>
                  {likedPosts?.length ? (
                    <InfiniteScroll
                      children={likedPosts?.map((post) => (
                        <Post key={post.id} {...post} />
                      ))}
                      dataLength={likedPosts?.length}
                      loader={<LinearProgress color="secondary" />}
                      hasMore={!!likedPosts.next}
                      next={() => fetchMoreData(likedPosts, setLikedPosts)}
                    />
                  ) : (
                    <Box sx={{ textAlign: "center", margin: "20px 0" }}>
                      <Typography level="body1">No liked posts</Typography>
                    </Box>
                  )}
                </div>
              </>
            ) : (
              <CircularProgress color="secondary" />
            )}
          </>
        }
        posts={
          <>
            {hasLoaded ? (
              <>
                <div>
                  {accountPosts?.length ? (
                    <InfiniteScroll
                      children={accountPosts?.map((post) => (
                        <Post key={post.id} {...post} />
                      ))}
                      dataLength={accountPosts?.length}
                      loader={<LinearProgress color="secondary" />}
                      hasMore={!!accountPosts.next}
                      next={() => fetchMoreData(accountPosts, setAccountsPosts)}
                    />
                  ) : (
                    <Box sx={{ textAlign: "center", margin: "20px 0" }}>
                      <Typography level="body1">No posts yet</Typography>
                    </Box>
                  )}
                </div>
              </>
            ) : (
              <CircularProgress color="secondary" />
            )}
          </>
        }
      />
    </div>
  );
};

export default Profile;
