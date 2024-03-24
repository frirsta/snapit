import React, { useRef, useState } from "react";
import { axiosResponse } from "../../axios";
import { useCurrentUser } from "../../context/UserContext";
import { Link } from "react-router-dom";
import Avatar from "@mui/joy/Avatar";
import DeleteForever from "@mui/icons-material/DeleteForever";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/joy/IconButton";
import styles from "../../styles/Comment.module.css";
import Menu from "@mui/joy/Menu";
import Box from "@mui/joy/Box";
const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_date,
    content,
    id,
    setPost,
    setComments,
  } = props;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosResponse.delete(`/comments/comments/${id}`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box className={styles.CommentContainer}>
      <Box className={styles.Comment}>
        <Box className={styles.ContentContainer}>
          <Link to={`/profile/${profile_id}`}>
            <Avatar className={styles.Avatar} src={profile_image} />
          </Link>
          <Box className={styles.CommentOwner}>
            <span className={styles.Owner}>{owner}</span>
            <span className={styles.Content}>{content}</span>
          </Box>
        </Box>
        <Box className={styles.Menu}>
          {is_owner && (
            <IconButton
              ref={buttonRef}
              aria-expanded={open ? "true" : undefined}
              variant="plain"
              color="neutral"
              size="sm"
              sx={{ ml: "auto" }}
              onClick={() => {
                setOpen(!open);
              }}
            >
              <MoreHorizIcon />
            </IconButton>
          )}
          <Menu
            id="positioned-demo-menu"
            anchorEl={buttonRef.current}
            open={open}
            onClose={handleClose}
            aria-labelledby="positioned-demo-button"
            placement="bottom-end"
          >
            <IconButton color="neutral" variant="plain" onClick={handleDelete}>
              <DeleteForever />
            </IconButton>
          </Menu>
          <span className={styles.Time}>{updated_date}</span>
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;
