import React, { useState } from "react";
import { useSetCurrentUser } from "../context/UserContext";
import { setTokenTimestamp } from "../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../axios";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import styles from "../styles/Signup.module.css";
import Alert from "@mui/material/Alert";
import Box from "@mui/joy/Box";

const SignIn = () => {
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [signin, setSignin] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signin;
  const handleChange = (event) => {
    setSignin({
      ...signin,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/login/", signin);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box className={styles.SignInContainer}>
      <Box className={`${styles.Background} ${styles.SignInBackground}`}></Box>

      <Box className={styles.SignIn}>
        <Box>
          {errors.non_field_errors?.map((message, idx) => (
            <Alert
              sx={{
                padding: "2px",
                maxWidth: "80vw",
                position: "absolute",
                top: 50,
              }}
              key={idx}
              severity="error"
            >
              {message}
            </Alert>
          ))}
        </Box>
        <h2 className={styles.Title}>
          Welcome to Snap it <br></br>
          Sign in to continue
        </h2>
        <Box className={styles.Account}>
          <span>
            Don't have an account?{" "}
            <Link className={styles.Link} to="/signup">
              Create an account
            </Link>
          </span>
          <span>It takes less than a minute.</span>
        </Box>
        <Box className={styles.FormContainer}>
          <form onSubmit={handleSubmit} className={styles.Form}>
            <Grid className={styles.Container} container>
              <Grid item>
                <FormControl sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    autoComplete="username"
                    className={styles.Input}
                    name="username"
                    value={username}
                    onChange={handleChange}
                    color="secondary"
                    id="username"
                    type="text"
                  />
                </FormControl>
                {errors.username?.map((message, idx) => (
                  <Alert key={idx} severity="error">
                    {message}
                  </Alert>
                ))}
              </Grid>
              <Grid item>
                <FormControl sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="password1">Password</InputLabel>
                  <Input
                    autoComplete="current-password"
                    className={styles.Input}
                    name="password"
                    value={password}
                    onChange={handleChange}
                    color="secondary"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {errors.password?.map((message, idx) => (
                  <Alert key={idx} severity="error">
                    {message}
                  </Alert>
                ))}
              </Grid>
              <Button
                className={styles.Button}
                variant="contained"
                type="submit"
              >
                SignIn
              </Button>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
