import React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

const NotFound = () => {
  return (
    <Box sx={{ width: "100%", textAlign: "center", paddingTop: "20%" }}>
      <Typography level="h2">
        404 <br /> Page not found
      </Typography>
    </Box>
  );
};

export default NotFound;
