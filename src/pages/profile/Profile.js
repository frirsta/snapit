import React, { useEffect, useState } from "react";
import { fetchMoreData } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../axios";
import ProfileCard from "../../components/profile/ProfileCard";
import Post from "../posts/Post";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

const Profile = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [accountPosts, setAccountsPosts] = useState({ results: [] });
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosRequest.get(`/posts/?owner__profile=${id}`);
        setAccountsPosts(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Box>
      <ProfileCard
        posts={
          <>
            {hasLoaded ? (
              <>
                <Box>
                  {accountPosts?.results?.length ? (
                    <InfiniteScroll
                      children={accountPosts?.results?.map((post) => (
                        <Post
                          setPosts={setAccountsPosts}
                          key={post.id}
                          {...post}
                        />
                      ))}
                      dataLength={accountPosts?.results?.length}
                      loader={<LinearProgress color="secondary" />}
                      hasMore={!!accountPosts.next}
                      next={() => fetchMoreData(accountPosts, setAccountsPosts)}
                    />
                  ) : (
                    <Box sx={{ textAlign: "center", margin: "20px 0" }}>
                      <Typography level="body1">No posts yet</Typography>
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
        }
      />
    </Box>
  );
};

export default Profile;
