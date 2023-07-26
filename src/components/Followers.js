import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosRequest } from "../axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Avatar from "@mui/joy/Avatar";
import Close from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import styles from "../styles/Followers.module.css";

const Followers = ({ handleOpen, handleClose, open, followers }) => {
  const { id } = useParams();
  const [following, setFollowing] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosRequest.get(
          `/profiles/?owner__following__follower__profile=&owner__follower__owner__profile=${id}`
        );
        setFollowing(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);
  return (
    <div>
      <Box variant="plain" onClick={handleOpen}>
        <Typography level="body3" fontWeight="lg">
          {followers}
        </Typography>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogActions>
          <IconButton color="neutral" variant="plain" onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogActions>
        <DialogContent sx={{ width: "70vw", maxWidth: "400px" }}>
          <Paper>
            {following?.results?.map((item) => (
              <Box sx={{ padding: "10px" }} key={item.id}>
                <Link className={styles.Link} to={`/profile/${item.id}`}>
                  <Avatar src={item.profile_image} />{" "}
                  <Typography
                    sx={{ padding: "0 10px", textTransform: "capitalize" }}
                  >
                    {item.owner}
                  </Typography>
                </Link>
              </Box>
            ))}
          </Paper>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Followers;
