import React, { useState } from "react";
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

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = setData;
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", data);
      navigate("/signin");
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
      <Box className={`${styles.Background} ${styles.SignUpBackground}`}></Box>
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
          Sign up to continue
        </h2>
        <Box className={styles.FormContainer}>
          <form onSubmit={handleSubmit} className={styles.Form}>
            <Grid className={styles.Container} container>
              <Grid item>
                <FormControl sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    className={styles.Input}
                    autoComplete="username"
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
                    className={styles.Input}
                    autoComplete="new-password"
                    name="password1"
                    value={password1}
                    onChange={handleChange}
                    color="secondary"
                    id="password1"
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
                {errors.password1?.map((message, idx) => (
                  <Alert key={idx} severity="error">
                    {message}
                  </Alert>
                ))}
              </Grid>
              <Grid item>
                <FormControl sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="password2">Confirm Password</InputLabel>
                  <Input
                    className={styles.Input}
                    autoComplete="new-password"
                    name="password2"
                    value={password2}
                    onChange={handleChange}
                    color="secondary"
                    id="password2"
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
                {errors.password2?.map((message, idx) => (
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
                Signup
              </Button>
            </Grid>
          </form>
        </Box>
        <Box className={styles.HaveAccount}>
          <span>
            Already have an account? <br></br>
            <Link className={styles.Link} to="/signin">
              Sign in
            </Link>
          </span>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
