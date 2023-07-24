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
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosRequest.get(`/posts/?owner__profile=${id}`);
        setAccountsPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <ProfileCard
        posts={
          <>
            {hasLoaded ? (
              <>
                <div>
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
