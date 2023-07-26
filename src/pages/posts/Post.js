import { useCurrentUser } from "../../context/UserContext";
import { useRef, useState } from "react";
import { useRedirect } from "../../hooks/useRedirect";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { axiosResponse } from "../../axios";
import styles from "../../styles/Post.module.css";
/* eslint-disable jsx-a11y/anchor-is-valid */
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import Edit from "@mui/icons-material/Edit";
import DeleteForever from "@mui/icons-material/DeleteForever";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import Tooltip from "@mui/material/Tooltip";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function InstagramPost(props) {
  useRedirect("loggedOut");
  const {
    id,
    owner,
    profile_id,
    profile_image,
    likes_count,
    likes_id,
    favorite_count,
    comments_count,
    favorite_id,
    caption,
    post_image,
    created_date,
    setPosts,
    setComments,
    addComments,
  } = props;
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const is_owner = currentUser?.username === owner;

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axiosResponse.delete(`/posts/${id}`);
      navigate(`/profile/${profile_id}`);
    } catch (err) {
      // console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosResponse.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, likes_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosResponse.delete(`/likes/${likes_id}`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, likes_id: null }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };
  const handleFavorite = async () => {
    try {
      const { data } = await axiosResponse.post("/favorite/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? {
                ...post,
                favorite_count: post.favorite_count + 1,
                favorite_id: data.id,
              }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      await axiosResponse.delete(`/favorite/${favorite_id}`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? {
                ...post,
                favorite_count: post.favorite_count - 1,
                favorite_id: null,
              }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card
      className={styles.Post}
      variant="outlined"
      sx={{
        "--Card-radius": (theme) => theme.vars.radius.xs,
      }}
    >
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", gap: 1 }}
      >
        <Box
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: "-2px",
              borderRadius: "50%",
              background:
                "linear-gradient(90deg, rgba(240,229,245,0.7864077669902912) 0%, rgba(173,117,198,0.44796380090497734) 50%, rgba(240,229,245,1) 100%)",
              filter:
                "progid:DXImageTransform.Microsoft.gradient(startColorstr='#f0e5f5',endColorstr='#f0e5f5',GradientType=1)",
            },
          }}
        >
          <RouterLink to={`/profile/${profile_id}`}>
            <Avatar
              size="sm"
              src={profile_image}
              sx={{
                border: "2px solid",
                borderColor: "background.body",
              }}
            />
          </RouterLink>
        </Box>
        <RouterLink className={styles.Link} to={`/profile/${profile_id}`}>
          <Typography fontWeight="lg">{owner}</Typography>
        </RouterLink>
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
            <MoreHoriz />
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
          <MenuItem onClick={handleClose}>
            <RouterLink className={styles.Link} to={`/editpost/${id}`}>
              <ListItemDecorator>
                <Edit />
              </ListItemDecorator>{" "}
              Edit post
            </RouterLink>
          </MenuItem>
          <ListDivider />
          <MenuItem onClick={handleDelete} variant="soft" color="danger">
            <ListItemDecorator sx={{ color: "inherit" }}>
              <DeleteForever />
            </ListItemDecorator>{" "}
            Delete
          </MenuItem>
        </Menu>
      </CardContent>
      <CardOverflow>
        <AspectRatio ratio="4/4">
          <RouterLink to={`/post/${id}`}>
            <img src={post_image} alt={caption} loading="lazy" />
          </RouterLink>
        </AspectRatio>
      </CardOverflow>
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", mx: -1 }}
      >
        <Box sx={{ width: 0, display: "flex", gap: 0.5, alignItems: "center" }}>
          {is_owner ? (
            <Tooltip title="You can't like your own post">
              <IconButton variant="plain" color="neutral" size="sm">
                <FavoriteBorderOutlined />
              </IconButton>
            </Tooltip>
          ) : likes_id ? (
            <>
              <IconButton
                onClick={handleUnlike}
                variant="plain"
                color="neutral"
                size="sm"
              >
                <FavoriteIcon />
              </IconButton>
            </>
          ) : currentUser ? (
            <IconButton
              onClick={handleLike}
              variant="plain"
              color="neutral"
              size="sm"
            >
              <FavoriteBorderOutlined />
            </IconButton>
          ) : (
            <Tooltip title="Log in to like post">
              <IconButton variant="plain" color="neutral" size="sm">
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
          )}
          <Typography level="h6" fontWeight={"500"}>
            {likes_count}
          </Typography>
          <IconButton
            component={RouterLink}
            to={`/post/${id}`}
            variant="plain"
            color="neutral"
            size="sm"
          >
            <ModeCommentOutlined />
          </IconButton>
          <Typography level="h6" fontWeight={"500"}>
            {comments_count}
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 0.5, mx: "auto" }}
        >
          {[...Array(5)].map((_, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: "50%",
                width: `max(${6 - index}px, 3px)`,
                height: `max(${6 - index}px, 3px)`,
                bgcolor: index === 0 ? "primary.solidBg" : "background.level3",
              }}
            />
          ))}
        </Box>
        <Box
          sx={{
            width: 0,
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Box>
            {is_owner ? (
              <Tooltip title="You cant save your own post">
                <IconButton variant="plain" color="neutral" size="sm">
                  <BookmarkBorderRoundedIcon />
                </IconButton>
              </Tooltip>
            ) : favorite_id ? (
              <IconButton
                onClick={handleRemoveFavorite}
                variant="plain"
                color="neutral"
                size="sm"
              >
                <BookmarkIcon />
              </IconButton>
            ) : currentUser ? (
              <IconButton
                onClick={handleFavorite}
                variant="plain"
                color="neutral"
                size="sm"
              >
                <BookmarkBorderRoundedIcon />
              </IconButton>
            ) : (
              <>
                <Tooltip title="Log in to save post">
                  <IconButton variant="plain" color="neutral" size="sm">
                    <BookmarkBorderRoundedIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
          <Typography level="h6" fontWeight={"500"}>
            {favorite_count}
          </Typography>
        </Box>
      </CardContent>
      <CardContent>
        <Link
          component="button"
          underline="none"
          fontSize="sm"
          fontWeight="lg"
          textColor="text.primary"
        >
          {likes_count} Likes
        </Link>
        <Typography fontSize="sm">
          <Link
            component={RouterLink}
            to={`/profile/${profile_id}`}
            color="neutral"
            fontWeight="lg"
            textColor="text.primary"
          >
            {owner}
          </Link>{" "}
          {caption}
        </Typography>
        {setComments}
        {addComments}
        <Link
          component="button"
          underline="none"
          fontSize="10px"
          sx={{ color: "text.tertiary", my: 0.5 }}
        >
          {created_date}
        </Link>
      </CardContent>
    </Card>
  );
}
