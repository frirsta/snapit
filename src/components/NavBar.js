import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCurrentUser, useSetCurrentUser } from "../context/UserContext";
import { removeTokenTimestamp } from "../utils/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import styles from "../styles/Navbar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const NavBar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const location = useLocation();
  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (location.pathname === "/signin" || location.pathname === "/signup") {
      setMenu(false);
    } else {
      setMenu(true);
    }
  }, [currentUser, location]);

  const bottomNavigation = (
    <BottomNavigation
      className={styles.BottomNavigation}
      showLabels
      sx={{
        display: { xs: "flex", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      <BottomNavigationAction
        component={Link}
        to={`/`}
        icon={<HomeIcon className={styles.DrawerIcon} />}
      />
      <BottomNavigationAction
        component={Link}
        to={"/addpost"}
        icon={<AddBoxOutlinedIcon className={styles.DrawerIcon} />}
      />
      <BottomNavigationAction
        component={Link}
        to={`/profile/${currentUser?.profile_id}`}
        icon={
          <Avatar
            className={styles.DrawerIcon}
            alt="user profile"
            src={currentUser?.profile_image}
          />
        }
      />
    </BottomNavigation>
  );
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const iconNavigation = (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "transparent",
        },
      }}
      variant="permanent"
    >
      <DrawerHeader>
        <Box className={styles.Brand}></Box>
      </DrawerHeader>
      <Divider />
      <Box
        className={styles.List}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
              component={Link}
              to={`/`}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                }}
              >
                <HomeIcon className={styles.DrawerIcon} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
              component={Link}
              to={"/addpost"}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                }}
              >
                <AddBoxOutlinedIcon className={styles.DrawerIcon} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
              component={Link}
              to={`/profile/${currentUser?.profile_id}`}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                }}
              >
                <Avatar
                  className={styles.DrawerIcon}
                  alt="user profile"
                  src={currentUser?.profile_image}
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
              onClick={handleSignOut}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                }}
              >
                <LogoutIcon className={styles.DrawerIcon} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
  const drawer = (
    <Box>
      <DrawerHeader className={styles.BrandContainer}>
        <Box className={styles.Brand}></Box>
        <Box className={styles.BrandName}>Snapit</Box>
      </DrawerHeader>
      <Divider />
      <Box className={styles.List}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={`/`}>
              <ListItemIcon>
                <HomeIcon className={styles.DrawerIcon} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={"/addpost"}>
              <ListItemIcon>
                <AddBoxOutlinedIcon className={styles.DrawerIcon} />
              </ListItemIcon>
              <ListItemText primary="Add post" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={`/profile/${currentUser?.profile_id}`}
            >
              <ListItemIcon>
                <Avatar
                  className={styles.DrawerIcon}
                  alt="user profile"
                  src={currentUser?.profile_image}
                />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={handleSignOut}>
              <ListItemIcon>
                <LogoutIcon className={styles.DrawerIcon} />
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
  return (
    <>
      {menu && (
        <Box>
          <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            aria-label="mailbox folders"
          >
            <Box
              className={styles.BottomNavigation}
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              {bottomNavigation}
            </Box>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", md: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  backgroundColor: "transparent",
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex", md: "none" },
            }}
          >
            {iconNavigation}
          </Box>
        </Box>
      )}
    </>
  );
};

export default NavBar;
