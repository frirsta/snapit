import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosRequest } from "../../axios";
import Form from "react-bootstrap/Form";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/joy/Button";
import CardOverflow from "@mui/joy/CardOverflow";
import Textarea from "@mui/joy/Textarea";
import styles from "../../styles/EditPost.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/joy/IconButton";
import Tooltip from "@mui/joy/Tooltip";

const PostEdit = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    caption: "",
    post_image: "",
  });

  const { caption, post_image } = data;

  useEffect(() => {
    const handleData = async () => {
      try {
        const { data } = await axiosRequest.get(`/posts/posts/${id}`);
        const { caption, post_image, is_owner } = data;

        is_owner ? setData({ caption, post_image }) : navigate(`/`);
      } catch (err) {
        // console.log(err);
        navigate(`/`);
      }
    };
    handleData();
  }, [id, navigate]);

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleGoBack = (event) => {
    navigate(-1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("caption", caption);

    try {
      setLoading(true);
      await axiosRequest.put(`/posts/${id}`, formData);
      navigate(`/post/${id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.EditPost}>
      <h2>Edit Post</h2>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <Form.Group>
          <Box sx={{ margin: "15px 0" }}>
            <CardOverflow>
              <Tooltip className={styles.GoBack} title="Go back">
                <IconButton
                  variant="plain"
                  color="neutral"
                  onClick={handleGoBack}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
              <AspectRatio ratio="4/4">
                <img src={post_image} alt="current" />
              </AspectRatio>
            </CardOverflow>
          </Box>
        </Form.Group>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Form.Group>
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
          {errors.caption?.map((message, idx) => (
            <Alert key={idx} severity="warning">
              {message}
            </Alert>
          ))}

          <Button
            className={styles.Button}
            type="submit"
            color="info"
            variant="soft"
          >
            {loading ? "uploading..." : "upload post"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PostEdit;
