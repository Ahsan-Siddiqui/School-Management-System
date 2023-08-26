import React, { useState } from "react";
import "./login.css";
import Card from "../ui/card";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

//for toast
import { Button, Snackbar, Slide } from "@mui/material";
import Alert from "@mui/material/Alert";

const LoginForm = ({ setLoginUser }) => {
  const history = useHistory();
  //State variables for set hide and show password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // State variables for toast notifications
  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const handleToastClose = () => {setToastOpen(false)};
  const SlideTransition = (props) => { return <Slide {...props} direction="down" />};
  // State variables for toast notifications
  
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const UserLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:8080/api/auth", user)
        if (response.status === 200) {
            // Set toast for successful login
            setToastSeverity("success");
            setToastMessage(response.data.msg);
            setToastOpen(true);
      
            
            setTimeout(() => {
              const saveToken = response.data.token;
              const userDetail = response.data.payload.user;
              localStorage.setItem("userData", JSON.stringify({ userDetail, saveToken }));
              setLoginUser({ userDetail, saveToken });
              history.push("/");
            }, 2000); 
          }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setToastSeverity("error");
        setToastMessage(error.response.data.msg);
        setToastOpen(true);
      } else {
        setToastSeverity("error");
        setToastMessage("Server not Connected");
        setToastOpen(true);
      }
    }
  };
  return (
    <div className="loginBackground">
      <div className="loginClass">
        <h1 className="heading">Login User</h1>
        <Card>
          <Box sx={{ p: 4 }}>
            <form onSubmit={UserLogin}>
              <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-email">
                  Email
                </InputLabel>
                <Input
                  variant="standard"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  id="email"
                  label="Email"
                  placeholder="Enter your Email"
                  endAdornment={
                    <InputAdornment position="end">
                      <EmailIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl
                fullWidth
                sx={{ m: 1, width: "100%" }}
                variant="standard"
              >
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  id="pass"
                  label="Password"
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Box component="div" className="input-control add-expense-btn">
                <Button type="submit">Login</Button>
              </Box>
              <p>
                New user ?{" "}
                <a
                  onClick={() => history.push("/register")}
                  style={{ color: "#4ca0f4", cursor: "pointer" }}
                >
                  Sign up
                </a>
              </p>
              <Snackbar
                open={toastOpen}
                autoHideDuration={6000}
                onClose={handleToastClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }} 
                TransitionComponent={SlideTransition}
              >
                <Alert onClose={handleToastClose} severity={toastSeverity}>
                  {toastMessage}
                </Alert>
              </Snackbar>
            </form>
          </Box>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
