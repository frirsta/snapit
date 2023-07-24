import React, { useRef, useState } from "react";
import { axiosRequest } from "../../axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Form from "react-bootstrap/Form";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import styles from "../../styles/AddPost.module.css";
import CardOverflow from "@mui/joy/CardOverflow";
import Textarea from "@mui/joy/Textarea";
import AspectRatio from "@mui/joy/AspectRatio";

const AddPost = () => {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    caption: "",
    post_image: "",
  });

  const [loading, setLoading] = useState(false);
  const { caption, post_image } = postData;
  const imageInput = useRef(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(post_image);
      setPostData({
        ...postData,
        post_image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("caption", caption);
      formData.append("post_image", imageInput.current.files[0]);
      const { data } = await axiosRequest.post("/posts/", formData);
      navigate(`/post/${data.id}`);
    } catch (err) {
      setErrors(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.AddPost}>
      <h2>Add Post</h2>
      <Box sx={{ paddingBottom: "10px" }}>
        {errors.post_image?.map((message, idx) => (
          <Alert
            sx={{ padding: "2px", maxWidth: "80vw" }}
            key={idx}
            severity="error"
          >
            {message}
          </Alert>
        ))}
      </Box>

      <form className={styles.Form} onSubmit={handleSubmit}>
        <Grid className={styles.FormContainer} container>
          <Grid className={styles.AddImageContainer} item xs={12}>
            <Form.Group>
              {post_image ? (
                <Box className={styles.AddPostBox}>
                  <CardOverflow>
                    <AspectRatio className={styles.AspectRatio} ratio="4/4">
                      <img src={post_image} alt="current" />
                      <Form.Label htmlFor="formId">
                        <Box className={styles.ChangeImage}></Box>
                      </Form.Label>
                    </AspectRatio>
                  </CardOverflow>
                </Box>
              ) : (
                <Form.Label htmlFor="formId">
                  <Box className={styles.UploadImage}></Box>
                </Form.Label>
              )}
              <Form.Control
                accept="image/*"
                ref={imageInput}
                type="file"
                id="formId"
                name="formId"
                onChange={handleImageChange}
                multiple
                hidden
              />
            </Form.Group>
          </Grid>
          <Box
            className={styles.CaptionContainer}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Grid item xs={12}>
              <Form.Group className={styles.TextArea}>
                <Form.Label htmlFor="caption">Caption</Form.Label>
                <Textarea
                  id="caption"
                  color="info"
                  minRows={2}
                  size="lg"
                  variant="plain"
                  type="text"
                  name="caption"
                  onChange={handleChange}
                  value={caption}
                />
              </Form.Group>
              <Box>
                {errors.caption?.map((message, idx) => (
                  <Alert
                    sx={{ padding: "2px", maxWidth: "80vw", marginTop: "10px" }}
                    key={idx}
                    severity="error"
                  >
                    {message}
                  </Alert>
                ))}
              </Box>
            </Grid>
            {post_image && (
              <>
                <Button
                  className={styles.Button}
                  type="submit"
                  color="secondary"
                  variant="outlined"
                >
                  {loading ? "uploading..." : "upload post"}
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </form>
    </Box>
  );
};

export default AddPost;
