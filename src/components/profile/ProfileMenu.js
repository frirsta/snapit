import { Link, useNavigate, useParams } from "react-router-dom";
import { useSetCurrentUser } from "../../context/UserContext";
import { useRef, useState } from "react";
import { removeTokenTimestamp } from "../../utils/utils";
import axios from "axios";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import MoreVert from "@mui/icons-material/MoreVert";
import Edit from "@mui/icons-material/Edit";
import styles from "../../styles/ProfileCard.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/joy/Box";

export default function ProfileMenu() {
  const { id } = useParams();
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const setCurrentUser = useSetCurrentUser();
  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      navigate("/signin");
    } catch (err) {
      // console.log(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box className={styles.Menu}>
      <IconButton
        ref={buttonRef}
        id="positioned-dropdown-button"
        aria-controls={"positioned-dropdown-menu"}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="plain"
        color="neutral"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="positioned-dropdown-menu"
        anchorEl={buttonRef.current}
        open={open}
        onClose={handleClose}
        aria-labelledby="positioned-dropdown-button"
        placement="bottom-end"
      >
        <MenuItem onClick={handleClose}>
          <Link className={styles.MenuLink} to={`/profile/edit/${id}`}>
            <ListItemDecorator>
              <Edit />
            </ListItemDecorator>{" "}
            Edit profile
          </Link>
        </MenuItem>
        <MenuItem disabled onClick={handleClose}>
          <ListItemDecorator />
          Draft post
        </MenuItem>
        <ListDivider />
        <MenuItem onClick={handleSignOut} variant="soft">
          <ListItemDecorator sx={{ color: "inherit" }}>
            <LogoutIcon />
          </ListItemDecorator>
          Sign out
        </MenuItem>
      </Menu>
    </Box>
  );
}
