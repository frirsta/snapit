import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCurrentUser } from "../../context/UserContext";
import { useSetUserData, useUserData } from "../../context/UserDataContext";
import { axiosRequest } from "../../axios";
import styles from "../../styles/ProfileCard.module.css";
import Avatar from "@mui/joy/Avatar";
import Button from "@mui/joy/Button";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Divider from "@mui/material/Divider";
import Box from "@mui/joy/Box";
import ProfileMenu from "./ProfileMenu";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import SavedPosts from "./SavedPosts";
import LikedPosts from "./LikedPosts";

export default function BioCard({ posts }) {
  const { setUserData, handleFollow, handleUnfollow } = useSetUserData();
  const { profilePage } = useUserData();
  const currentUser = useCurrentUser();
  const [account] = profilePage.results;
  const { id } = useParams();
  const is_owner = currentUser?.username === account?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosRequest.get(`/profile/${id}`);
        setUserData((prevState) => ({
          ...prevState,
          profilePage: { results: [data] },
        }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setUserData]);

  return (
    <>
      <Box
        className={styles.Card}
        sx={{
          width: "100%",
        }}
      >
        {currentUser && is_owner && <ProfileMenu />}
        <Box>
          <CardContent
            className={styles.CardContent}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Avatar src={account?.profile_image} className={styles.Avatar} />
            <Box className={styles.ContentContainer}>
              <Box className={styles.Content}>
                <Typography
                  className={styles.Name}
                  fontSize="lg"
                  fontWeight="lg"
                >
                  {account?.owner}
                </Typography>

                <CardActions buttonFlex="1">
                  {currentUser &&
                    !is_owner &&
                    (account?.following_id ? (
                      <Button
                        className={`${styles.Button} ${styles.Unfollow}`}
                        onClick={() => handleUnfollow(account)}
                      >
                        unfollow
                      </Button>
                    ) : (
                      <Button
                        className={`${styles.Button} ${styles.Follow}`}
                        onClick={() => handleFollow(account)}
                      >
                        follow
                      </Button>
                    ))}
                  {currentUser && is_owner && (
                    <Box className={styles.Buttons}>
                      <Button
                        component={Link}
                        to={`/profile/edit/${id}`}
                        className={`${styles.Button}`}
                      >
                        Edit profile
                      </Button>{" "}
                      <Button
                        component={Link}
                        to={`/profile/edit/${id}`}
                        className={`${styles.Button}`}
                      >
                        Edit bio
                      </Button>
                    </Box>
                  )}
                </CardActions>
              </Box>
              <Typography className={styles.Bio} level="body2">
                {account?.bio}
              </Typography>
            </Box>
          </CardContent>
        </Box>
        <Divider variant="middle" />
        <Sheet
          className={styles.Sheet}
          sx={{
            p: 1.5,

            display: "flex",
            gap: 2,
            "& > div": { flex: 1 },
          }}
        >
          <Box className={styles.ProfileInformation}>
            <Typography level="body3" fontWeight="lg">
              Posts
            </Typography>
            <Typography fontWeight="lg"> {account?.posts_count}</Typography>
          </Box>
          <Box className={styles.ProfileInformation}>
            <Typography level="body3" fontWeight="lg">
              Followers
            </Typography>
            <Typography fontWeight="lg">{account?.follower_count}</Typography>
          </Box>
          <Box className={styles.ProfileInformation}>
            <Typography level="body3" fontWeight="lg">
              Following
            </Typography>
            <Typography fontWeight="lg"> {account?.following_count}</Typography>
          </Box>
        </Sheet>

        {currentUser && is_owner ? (
          <Tabs
            aria-label="Basic tabs"
            defaultValue={0}
            sx={{ backgroundColor: "transparent" }}
          >
            <TabList sx={{ borderRadius: 0 }}>
              <Tab sx={{ borderRadius: 0, width: "10%" }}>Posts</Tab>
              <Tab sx={{ borderRadius: 0, width: "10%" }}>Liked posts</Tab>
              <Tab sx={{ borderRadius: 0, width: "10%" }}>Saved posts</Tab>
            </TabList>
            <TabPanel value={0}>{posts}</TabPanel>

            <TabPanel value={1}>
              <LikedPosts />
            </TabPanel>
            <TabPanel value={2}>
              <SavedPosts />
            </TabPanel>
          </Tabs>
        ) : (
          posts
        )}
        <Divider variant="middle" />
      </Box>
    </>
  );
}
