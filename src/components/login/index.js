import React,{useState} from 'react';
import './login.css'
import Card from '../ui/card';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
const LoginForm = ({setLoginUser}) => {
    const history = useHistory()
    const [user,setUser] = useState({
        email:"",
        password:"",
    })
    const handleChange = e => {
        const {name,value} = e.target
        setUser({
            ...user,
            [name]:value,
        })
    }
    const UserLogin = async (e) => {
        e.preventDefault();
        try{
            await   axios.post('http://localhost:8080/api/auth',user)
            .then(res => {
                alert(res.data.msg)
                const saveToken = res.data.token
                const userDetail = res.data.payload.user
                localStorage.setItem('userData', JSON.stringify({userDetail,saveToken}));
                setLoginUser({userDetail,saveToken})
                history.push('/')
            })
           
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                // Check if the error response contains the specific condition
                alert(error.response.data.msg);
              } else {
                // Display a default error message when the condition is not met
                alert("Server Not Connected.");
              }
          }

    }
    return (
        <div className='backgroundImage'>
        <div className='loginForm'>
            <h1 className='heading'>Login User</h1>
        <Card className="cardColor">
            <div className='input-controls'>
        <form onSubmit={UserLogin}>
            <div className='input-control'>
                <label htmlFor='email'>Email</label>
                <input 
                type="email" 
                name="email"
                value={user.email}
                onChange={handleChange} 
                id="email" 
                placeholder='Enter your Email'
                />
            </div>
            <div className='input-control'>
                <label htmlFor='pass'>Password</label>
                <input 
                type="password" 
                name="password"
                value={user.password}
                onChange={handleChange} 
                id="pass" 
                placeholder='Enter Password'
                />
            </div>
            <div className='input-control add-expense-btn'>
                <Button type='submit'>Login</Button>
            </div>
                <p>New user ? <a onClick={()=>history.push('/register')} style={{color:'#4ca0f4',cursor:'pointer'}}>Sign up</a></p>
                </form>
            </div>
            </Card>
            </div>
            </div>
    );
}
export default LoginForm;