import React, { useState } from "react";
import { axiosResponse } from "../../axios";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Form from "react-bootstrap/Form";
import Avatar from "@mui/joy/Avatar";
import styles from "../../styles/AddComment.module.css";

const AddComment = (props) => {
  const { post, setPost, setComments, profile_image } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosResponse.post("/comments/comments/", {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      // console.log(err)
    }
  };

  return (
    <Form className={styles.Form} onSubmit={handleSubmit}>
      <Avatar sx={{ width: "25px", height: "25px" }} src={profile_image} />

      <Input
        value={content}
        onChange={handleChange}
        name="comment"
        variant="plain"
        size="sm"
        placeholder="Add a comment…"
        sx={{ flexGrow: 1, mr: 1, "--Input-focusedThickness": "0px" }}
      />
      <Button
        type="submit"
        variant="plain"
        color="neutral"
        disabled={!content.trim()}
      >
        Post
      </Button>
    </Form>
  );
};

export default AddComment;
