
import React, { useState } from 'react';
import './register.css';
import Card from '../ui/card';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Box, FormControl, InputLabel, Input, InputAdornment, Button, Snackbar, Slide } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
//for toast
import Alert from "@mui/material/Alert";

const RegisterForm = () => {
    const history = useHistory()
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
  
    const [user,setUser] = useState({
        name:"",
        email:"",
        role:"",
        password:"",
        reEnterPassword:""
    })
    const handleChange = e => {
        const {name,value} = e.target
        setUser({
            ...user,
            [name]:value,
        })
    }
    const UserRegister = async (e) => {
        e.preventDefault();
        try{
            const {password,reEnterPassword} = user
            if(password !== reEnterPassword)
            {
                setToastSeverity("error");
                setToastMessage("Password does not match");
                setToastOpen(true);
            }
            else
            {
                await axios.post('http://localhost:8080/api/users',user)
                .then(res => {
                    setToastSeverity("success");
                    setToastMessage(res.data.msg);
                    setToastOpen(true);
                    setTimeout(() => {
                        history.push("/login");
                      }, 2000);
                })
            
            }
           
        }
        catch (error) {
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
    }
    const roles = ['Teacher', 'Student'];

    return (
        <div className='backgroundImage'>
        <div className='registerForm'>
          <h1 className='heading'>New User</h1>
          <Card className='cardColor'>
            <div >
                <Box sx={{ p: 4 }}>
              <form onSubmit={UserRegister}>
                <FormControl  sx={{ m: 1, width: "100%" }} variant="standard">
                  <InputLabel htmlFor='name'>Name</InputLabel>
                  <Input
                    type='text'
                    name='name'
                    id='name'
                    value={user.name}
                    onChange={handleChange}
                    placeholder='Enter Your Name'
                  />
                </FormControl>
                <FormControl  sx={{ m: 1, width: "100%" }} variant="standard">
                  <InputLabel htmlFor='email'>Email</InputLabel>
                  <Input
                    type='email'
                    name='email'
                    onChange={handleChange}
                    id='email'
                    value={user.email}
                    placeholder='Enter Your Email'
                    endAdornment={
                      <InputAdornment position='end'>
                        <EmailIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl  sx={{ m: 1, width: "100%" }} variant="standard">
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <Input
                    name='password'
                    onChange={handleChange}
                    id='pass'
                    value={user.password}
                    placeholder='Enter Password'
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position='end'>
                          <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ?  <Visibility />  : <VisibilityOff />}
                      </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl  sx={{ m: 1, width: "100%" }} variant="standard">
                  <InputLabel htmlFor='reEnterPassword'>Re-Enter Password</InputLabel>
                  <Input
                    type='password'
                    name='reEnterPassword'
                    onChange={handleChange}
                    id='repass'
                    value={user.reEnterPassword}
                    placeholder='Re-Enter Password'
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                <Autocomplete
                  id='disable-close-on-select'
                  disableCloseOnSelect
                  options={roles}
                  value={user.role}
                  onChange={(event, newValue) => {
                    setUser({
                      ...user,
                      role: newValue,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label='Faculty' variant='standard' />
                  )}
                />
              </FormControl>
                <div className='input-control add-expense-btn'>
                  <Button type='submit'>Register</Button>
                </div>
                <p>
                  Already SignIn ?{' '}
                  <a
                    onClick={() => history.push('/login')}
                    style={{ color: '#4ca0f4', cursor: 'pointer' }}
                  >
                    Login
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
            </div>
          </Card>
        </div>
      </div>
    );
}
export default RegisterForm;