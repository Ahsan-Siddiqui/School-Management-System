import './App.css';
import LoginForm from './components/login';
import RegisterForm from './components/register';
import Home from './components/pages/home';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import { useState } from 'react';
import Classes from './components/pages/classes';
import Students from './components/pages/students';
import Teachers from './components/pages/teachers';
function App() {
  const [loginUser,setLoginUser] = useState({})
  // const getUser = localStorage.getItem("userData")
  // const user = JSON.parse(getUser);
  return (
    
    <div className="App">
      <Router>
      <Switch>
          <Route exact path='/'>
          {loginUser ? (
            loginUser.role === 'admin'  ? (
              <Home setLoginUser={loginUser}/>
            ) : 
            loginUser.role === 'Student' 
              ? <Students setLoginUser={loginUser} /> 
              : <LoginForm setLoginUser={setLoginUser} />
              ? 
              loginUser.role === 'Teacher' 
              ? <Teachers setLoginUser={loginUser} /> 
              : <LoginForm setLoginUser={setLoginUser} />
              : <LoginForm setLoginUser={setLoginUser} />
            ) : ( <LoginForm setLoginUser={setLoginUser} />)}
            </Route>
          <Route path='/login'><LoginForm setLoginUser={setLoginUser}/></Route>
          <Route path='/register'><RegisterForm/></Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
