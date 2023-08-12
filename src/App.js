import "./App.css";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import Home from "./components/pages/home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Classes from "./components/pages/classes";
import Students from "./components/pages/students";
import Teachers from "./components/pages/teachers";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "./components/ui/sidebar";
import Navbar from "./components/ui/navbar";
function App() {
  const [loginUser, setLoginUser] = useState({});
  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };
  const getUser = localStorage.getItem("userData");
  const user = JSON.parse(getUser);
  // console.log('teststs',user.userDetail)
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? (
              user.userDetail.role === "admin" ? (
                <div className="container-fluid bg-secondary min-vh-100">
                  <div className="row">
                    {toggle && (
                      <div className="col-2 bg-white">
                        <Sidebar setLoginUser={setLoginUser} />
                      </div>
                    )}
                    <div className="col">
                      <Home Toggle={Toggle} />
                    </div>
                  </div>
                </div>
              ) : user.userDetail.role === "Student" ? (
                <div className="container-fluid bg-secondary min-vh-100">
                  <div className="row">
                    {toggle && (
                      <div className="col-2 bg-white">
                        <Sidebar setLoginUser={setLoginUser} />
                      </div>
                    )}
                    <div className="col">
                      <Students Toggle={Toggle} />
                    </div>
                  </div>
                </div>
              ) : <LoginForm setLoginUser={setLoginUser} /> ? (
                user.userDetail.role === "Teacher" ? (
                  <div className="container-fluid bg-secondary min-vh-100">
                    <div className="row">
                      {toggle && (
                        <div className="col-2 bg-white">
                          <Sidebar setLoginUser={setLoginUser} />
                        </div>
                      )}
                      <div className="col">
                        <Teachers Toggle={Toggle} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <LoginForm setLoginUser={setLoginUser} />
                )
              ) : (
                <LoginForm setLoginUser={setLoginUser} />
              )
            ) : (
              <LoginForm setLoginUser={setLoginUser} />
            )}
          </Route>
          <Route path="/login">
            <LoginForm setLoginUser={setLoginUser} />
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/class">
            <div className="container-fluid bg-secondary min-vh-100">
              <div className="row">
                {toggle && (
                  <div className="col-2 bg-white">
                    <Sidebar setLoginUser={setLoginUser} />
                  </div>
                )}
                <div className="col">
                  <Classes Toggle={Toggle} />
                </div>
              </div>
            </div>
          </Route>
          <Route path="/student">
            <div className="container-fluid bg-secondary min-vh-100">
              <div className="row">
                {toggle && (
                  <div className="col-2 bg-white">
                    <Sidebar setLoginUser={setLoginUser} />
                  </div>
                )}
                <div className="col">
                  <Students Toggle={Toggle} />
                </div>
              </div>
            </div>
          </Route>
          <Route path="/teacher">
            <div className="container-fluid bg-secondary min-vh-100">
              <div className="row">
                {toggle && (
                  <div className="col-2 bg-white">
                    <Sidebar setLoginUser={setLoginUser} />
                  </div>
                )}
                <div className="col">
                  <Teachers Toggle={Toggle} />
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
