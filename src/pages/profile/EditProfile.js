import React, { useEffect, useRef, useState } from "react";
import { useCurrentUser, useSetCurrentUser } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { axiosRequest } from "../../axios";
import styles from "../../styles/EditProfile.module.css";
import Form from "react-bootstrap/Form";
import Alert from "@mui/joy/Alert";
import Avatar from "@mui/joy/Avatar";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";

const EditProfile = () => {
  const [errors, setErrors] = useState({});
  const [accountData, setAccountData] = useState({
    bio: "",
    profile_image: "",
  });
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const imageFile = useRef();

  const { bio, profile_image } = accountData;
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosRequest.get(`/profile/${id}`);
        const { bio, profile_image } = data;
        setAccountData({ bio, profile_image });
      } catch (err) {
        navigate(-1);
      }
    };
    handleMount();
  }, [currentUser, navigate, id]);

  const handleChange = (event) => {
    setAccountData({
      ...accountData,
      [event.target.name]: event.target.value,
    });
  };

  console.log(accountData);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("bio", bio);

    if (imageFile?.current?.files[0]) {
      formData.append("profile_image", imageFile?.current?.files[0]);
    }
    try {
      const { data } = await axiosRequest.put(`/profile/${id}`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.profile_image,
      }));
      navigate(-1);
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  const textField = (
    <>
      <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Form.Control
          className={styles.Bio}
          as="textarea"
          value={bio}
          onChange={handleChange}
          name="bio"
          rows={4}
        />
      </Form.Group>
      {errors?.bio?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button
        variant="soft"
        color="info"
        className={styles.Button}
        onClick={() => navigate(-1)}
      >
        cancel
      </Button>
      <Button
        variant="soft"
        color="info"
        className={styles.Button}
        type="submit"
      >
        save
      </Button>
    </>
  );
  return (
    <Box>
      <Form className={styles.Form} onSubmit={handleSubmit}>
        <Form.Group className={styles.ProfileImage}>
          {profile_image && (
            <Avatar className={styles.Avatar} src={profile_image} />
          )}
          {errors?.profile_image?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Box>
            <Form.Label
              className={styles.AddProfileImage}
              htmlFor="profile_image-upload"
            >
              Change profile image
            </Form.Label>
          </Box>
          <Form.Control
            type="file"
            id="profile_image-upload"
            ref={imageFile}
            accept="image/*"
            hidden
            onChange={(event) => {
              if (event.target.files.length) {
                setAccountData({
                  ...accountData,
                  profile_image: URL.createObjectURL(event.target.files[0]),
                });
              }
            }}
          />
        </Form.Group>
        <Box>{textField}</Box>
      </Form>
    </Box>
  );
};

export default EditProfile;
