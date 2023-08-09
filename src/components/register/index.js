import React,{useState} from 'react';
import './style.css'
import Card from '../ui/card';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const RegisterForm = () => {
    const history = useHistory()
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
                alert('Password Not Match')
            }
            else
            {
                await axios.post('http://localhost:8080/api/users',user)
                .then(res => {
                    alert(res.data.msg)
                    console.log(res)
                    history.push('/login')
                })
            
            }
           
        }
        catch (response) {
            alert(response.response.data.msg);
          }
    }
    return (
        <div className='backgroundImage'>
            {console.log("user",user)}
        <div className='loginForm'>
            <h1 className='heading'>New User</h1>
        <Card className="cardColor">
            <div className='input-controls'>
        <form onSubmit={UserRegister}>
            <div className='input-control'>
                <label htmlFor='name'>Name</label>
                <input 
                type="text" 
                name="name"
                id="name" 
                value={user.name}
                onChange={handleChange} 
                placeholder='Enter Your Name'
                />
            </div>
            <div className='input-control'>
                <label htmlFor='email'>Email</label>
                <input 
                type="email" 
                name="email"
                onChange={handleChange} 
                id="email" 
                value={user.email}
                placeholder='Enter Your Email'
                />
            </div>
            <div className='input-control'>
                <label htmlFor='amount'>Password</label>
                <input 
                type="password" 
                name="password"
                onChange={handleChange} 
                id="pass" 
                value={user.password}
                placeholder='Enter Password'
                />
            </div>
            <div className='input-control'>
                <label htmlFor='amount'>Re-Enter Password</label>
                <input 
                type="password" 
                name="reEnterPassword"
                onChange={handleChange} 
                id="repass" 
                value={user.reEnterPassword}
                placeholder='Re-Enter Password'
                />
            </div>
            <div className='input-control select-container'>
            <label htmlFor='selectOpt'>Faculty</label>
                <select id="selectOption" 
                 name="role"
                value={user.role}
                onChange={handleChange} 
                className="custom-select"
                >
                    <option value="" name=""></option>
                    <option>Teacher</option>
                    <option>Student</option>
                </select>
            </div>
            <div className='input-control add-expense-btn'>
                <button type='submit'>Register</button>
            </div>
            <p>Already SignIn ? <a onClick={()=>history.push('/login')} style={{color:'#4ca0f4',cursor:'pointer'}}>Login</a></p>
                </form>
            </div>
            </Card>
            </div>
            </div>
    );
}
export default RegisterForm;