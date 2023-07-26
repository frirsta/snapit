import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../axios";

const Followers = ({ handleOpen, handleClose, open, followers }) => {
  const { id } = useParams();
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosRequest.get(
          `/profile/?owner__following__follower__profile=&owner__follower__owner__profile=${id}`
        );
        setFollowing(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);
  console.log(following);
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
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Followers;
