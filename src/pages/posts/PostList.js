import React, { useEffect, useState } from "react";
import { useRedirect } from "../../hooks/useRedirect";
import { axiosRequest } from "../../axios";
import { styled, alpha } from "@mui/material/styles";
import { fetchMoreData } from "../../utils/utils";
import Post from "./Post";
import styles from "../../styles/PostList.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Form from "react-bootstrap/Form";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/joy/Box";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginTop: "20px",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "50vw",
    maxWidth: "500px",
    [theme.breakpoints.up("md")]: {},
  },
}));
const PostList = () => {
  useRedirect("loggedOut");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [posts, setPosts] = useState({ results: [] });
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosRequest.get(`/posts/?search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };
  return (
    <Box className={styles.PostList}>
      <Form onSubmit={handleSearch}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search for user…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Form>
      {hasLoaded ? (
        <>
          <Box className={styles.PostsList}>
            {posts?.results?.length ? (
              <InfiniteScroll
                className={styles.InfiniteScroll}
                dataLength={posts?.results?.length}
                loader={<LinearProgress color="secondary" />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
                children={posts?.results?.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
              />
            ) : (
              <Box>
                <p>Not found</p>
              </Box>
            )}
          </Box>
        </>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </Box>
  );
};

export default PostList;
