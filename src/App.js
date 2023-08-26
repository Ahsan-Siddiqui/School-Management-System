import "./App.css";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import Admin from "./components/pages/admin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Students from "./components/pages/students";
import TeacherDashboard from "./components/pages/teachers";
import UserApproval from "./components/pages/admin/user-approval/userApproval";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "./components/ui/sidebar";
import Navbar from "./components/ui/navbar";
import CreateStudentProfile from "./components/pages/students/studentForm/createProfile";
import CreateTeacherProfile from "./components/pages/teachers/teacherForm/createProfile";
import StudentProfile from "./components/pages/students/studentProfile/studentProfile";
import TeacherProfile from "./components/pages/teachers/teacherProfile/teacherProfile";
import StudentList from "./components/pages/students/studentList";
import TeacherList from "./components/pages/teachers/teacherList";
import Classes from "./components/pages/admin/Class";
import Subjects from "./components/pages/admin/Subject";
import TimeTable from "./components/pages/admin/timeTable";
import AssignStudents from "./components/pages/admin/AssignClass/AssignStudent";
import AssignTeachers from "./components/pages/admin/AssignClass/AssignTeacher";
import StudentDashboard from "./components/pages/students";
import Attendance from "./components/pages/teachers/Attendance";
function App() {
  const [loginUser, setLoginUser] = useState({});

  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };
  const getUser = localStorage.getItem("userData");
  const user = JSON.parse(getUser);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? (
              user.userDetail.role === "admin" ? (
                <div className="container-fluid bg-secondary min-vh-100 ">
                  <div className="row">
                    {toggle && (
                      <div className="col-2 bg-white">
                        <Sidebar setLoginUser={setLoginUser} />
                      </div>
                    )}
                    <div className="col">
                      <Navbar Toggle={Toggle} />
                      <Admin />
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
                      <Navbar Toggle={Toggle} />
                      <StudentDashboard />
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
                        <Navbar Toggle={Toggle} />
                        <TeacherDashboard />
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

          <Route path="/assign-student">
            <div className="container-fluid bg-secondary min-vh-100">
              <div className="row">
                {toggle && (
                  <div className="col-2 bg-white">
                    <Sidebar setLoginUser={setLoginUser} />
                  </div>
                )}
                <div className="col">
                  <Navbar Toggle={Toggle} />
                  <AssignStudents Toggle={Toggle} />
                </div>
              </div>
            </div>
          </Route>

          <Route path="/assign-teacher">
            <div className="container-fluid bg-secondary min-vh-100">
              <div className="row">
                {toggle && (
                  <div className="col-2 bg-white">
                    <Sidebar setLoginUser={setLoginUser} />
                  </div>
                )}
                <div className="col">
                  <Navbar Toggle={Toggle} />
                  <AssignTeachers Toggle={Toggle} />
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
                  <TeacherDashboard Toggle={Toggle} />
                </div>
              </div>
            </div>
          </Route>
          <Route path="/user-approval">
            <div className="container-fluid bg-secondary min-vh-100">
              <div className="row">
                {toggle && (
                  <div className="col-2 bg-white">
                    <Sidebar setLoginUser={setLoginUser} />
                  </div>
                )}
                <div className="col">
                  <Navbar Toggle={Toggle} />
                  <UserApproval />
                </div>
              </div>
            </div>
          </Route>
          <Route path="/add-class">
            <div className="container-fluid bg-secondary min-vh-100">
              <div className="row">
                {toggle && (
                  <div className="col-2 bg-white">
                    <Sidebar setLoginUser={setLoginUser} />
                  </div>
                )}
                <div className="col">
                  <Navbar Toggle={Toggle} />
                  <Classes />
                </div>
              </div>
            </div>
          </Route>
          <Route path="/add-subject">
            <div className="container-fluid bg-secondary min-vh-100">
              <div className="row">
                {toggle && (
                  <div className="col-2 bg-white">
                    <Sidebar setLoginUser={setLoginUser} />
                  </div>
                )}
                <div className="col">
                  <Navbar Toggle={Toggle} />
                  <Subjects />
                </div>
              </div>
            </div>
          </Route>
          <Route path="/createProfile">
            <div className="container-fluid bg-secondary min-vh-100">
              <div className="row">
                {toggle && (
                  <div className="col-2 bg-white">
                    <Sidebar setLoginUser={setLoginUser} />
                  </div>
                )}
                {user &&
                user.userDetail &&
                user.userDetail.role === "Student" ? (
                  <div className="col">
                    <Navbar Toggle={Toggle} />
                    <CreateStudentProfile />
                  </div>
                ) : (
                  <div className="col">
                    <Navbar Toggle={Toggle} />
                    <CreateTeacherProfile />
                  </div>
                )}
              </div>
            </div>
          </Route>
          <Route path="/profile">
            <div className="container-fluid bg-secondary min-vh-100">
              <div className="row">
                {toggle && (
                  <div className="col-2 bg-white">
                    <Sidebar setLoginUser={setLoginUser} />
                  </div>
                )}
                {user &&
                user.userDetail &&
                user.userDetail.role === "Student" ? (
                  <div className="col">
                    <Navbar Toggle={Toggle} />
                    <StudentProfile />
                  </div>
                ) : (
                  <div className="col">
                    <Navbar Toggle={Toggle} />
                    <TeacherProfile />
                  </div>
                )}
              </div>
            </div>
          </Route>
          <Route path="/time-table">
            <div className="container-fluid bg-secondary min-vh-100">
              <div className="row">
                {toggle && (
                  <div className="col-2 bg-white">
                    <Sidebar setLoginUser={setLoginUser} />
                  </div>
                )}
                <div className="col">
                  <Navbar Toggle={Toggle} />
                  <TimeTable />
                </div>
              </div>
            </div>
          </Route>
          <Route path="/students">
            <div className="container-fluid bg-secondary min-vh-100">
              <div className="row">
                {toggle && (
                  <div className="col-2 bg-white">
                    <Sidebar setLoginUser={setLoginUser} />
                  </div>
                )}
                <div className="col">
                  <Navbar Toggle={Toggle} />
                  <StudentList />
                </div>
              </div>
            </div>
          </Route>
          <Route path="/attendance">
            <div className="container-fluid bg-secondary min-vh-100">
              <div className="row">
                {toggle && (
                  <div className="col-2 bg-white">
                    <Sidebar setLoginUser={setLoginUser} />
                  </div>
                )}
                <div className="col">
                  <Navbar Toggle={Toggle} />
                  <Attendance />
                </div>
              </div>
            </div>
          </Route>
          <Route path="/teachers">
            <div className="container-fluid bg-secondary min-vh-100">
              <div className="row">
                {toggle && (
                  <div className="col-2 bg-white">
                    <Sidebar setLoginUser={setLoginUser} />
                  </div>
                )}
                <div className="col">
                  <Navbar Toggle={Toggle} />
                  <TeacherList />
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
