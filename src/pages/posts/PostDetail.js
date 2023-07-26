import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../context/UserContext";
import { axiosRequest } from "../../axios";
import Post from "../posts/Post";
import styles from "../../styles/PostDetail.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "../../components/comments/Comment";
import AddComment from "../../components/comments/AddComment";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import { CircularProgress } from "@mui/joy";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosRequest.get(`/posts/${id}`),
          axiosRequest.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Box className={styles.PostDetail}>
      <Post
        {...post.results[0]}
        setPosts={setPost}
        setComments={
          comments.results.length ? (
            <InfiniteScroll
              dataLength={comments.results.length}
              loader={<CircularProgress color="secondary" />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  setPost={setPost}
                  {...comment}
                  setComments={setComments}
                />
              ))}
            />
          ) : (
            <Typography
              sx={{ textAlign: "center", padding: "20px" }}
              level="body1"
            >
              {" "}
              No comments yet{" "}
            </Typography>
          )
        }
        addComments={
          <AddComment
            profile_id={currentUser?.profile_id}
            profile_image={profile_image}
            post={id}
            setPost={setPost}
            setComments={setComments}
          />
        }
      />
    </Box>
  );
};

export default PostDetail;
