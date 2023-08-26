import React from "react";
import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ClassIcon from "@mui/icons-material/Class";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useLocation } from "react-router-dom";
import { ListItem } from "@mui/material";
import ApprovalIcon from '@mui/icons-material/Approval';
const Sidebar = () => {
  const location = useLocation();

  const getUser = localStorage.getItem("userData");
  const user = JSON.parse(getUser);
  const AdminmenuItems = [
    { id: 1, title: "Dashboard", link: "/", icon: <DashboardIcon /> },
    { id: 2, title: "User Approval", link: "/user-approval", icon: <ApprovalIcon /> },
    { id: 3, title: "Assign Class To Student", link: "/assign-student", icon: <ClassIcon /> },
    { id: 4, title: "Assign Class To Teacher", link: "/assign-teacher", icon: <ClassIcon /> },
    { id: 5, title: "Class", link: "/add-class", icon: <PeopleIcon /> },
    { id: 6, title: "Subject", link: "/add-subject", icon: <PeopleIcon /> },
    { id: 7, title: "Student-List", link: "/students", icon: <PersonIcon /> },
    { id: 8, title: "Teacher-List", link: "/teachers", icon: <PersonIcon /> },
    { id: 9, title: "Time Table", link: "/time-table", icon: <PeopleIcon /> },
  ];
  const StudentmenuItems = [
    { id: 2, title: "Create Profile", link: "/createProfile", icon: <PeopleIcon /> },
    { id: 1, title: "Dashboard", link: "/" },
  ];
  const TeachermenuItems = [
    { id: 2, title: "Create Profile", link: "/createProfile", icon: <PeopleIcon /> },
    { id: 1, title: "Dashboard", link: "/" },
    { id: 3, title: "Attendance", link: "/attendance" },
  ];

  return (
    <div className="col-2 bg-white sidebar p-2">
      <div className="m-2">
        <i className="bi bi-bootstrap-fill me-3 fs-4"></i>
        <span className="brand-name fs-4">BQ School</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <ul className="menu">
          {user.userDetail.role === "admin"
            ? AdminmenuItems.map((item) => (
                <li key={item.id}>
                  <ListItem
                    className={`list-group-item py-2 ${
                      location.pathname === item.link ? "active" : ""
                    }`}
                    component={Link}
                    to={item.link}
                    onClick={item.action}
                  >
                    {item.icon}
                    <span className="px-2">{item.title}</span>
                  </ListItem>
                </li>
              ))
            : user.userDetail.role === "Student"
            ? StudentmenuItems.map((item) => (
                <li key={item.id}>
                  <ListItem
                    className={`list-group-item py-2 ${
                      location.pathname === item.link ? "active" : ""
                    }`}
                    component={Link}
                    to={item.link}
                    onClick={item.action}
                  >
                    {item.icon}
                    <span className="px-2">{item.title}</span>
                  </ListItem>
                </li>
              ))
            : TeachermenuItems.map((item) => (
                <li key={item.id}>
                  <ListItem
                    className={`list-group-item py-2 ${
                      location.pathname === item.link ? "active" : ""
                    }`}
                    component={Link}
                    to={item.link}
                    onClick={item.action}
                  >
                    {item.icon}
                    <span className="px-2">{item.title}</span>
                  </ListItem>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
