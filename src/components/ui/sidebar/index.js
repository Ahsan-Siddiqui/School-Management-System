import React from 'react';
import './style.css';

const Sidebar = (props) => {
 const userRole = props.userRole
 console.log(userRole)
  const handleLogout = () => {
    localStorage.removeItem("userData");
  };
  const AdminmenuItems = [
    { id: 1, title: 'Home', link: '/' },
    { id: 2, title: 'Classes', link: '/classes' },
    { id: 3, title: 'Students', link: '/students' },
    { id: 4, title: 'Teachers', link: '/teachers' },
    { id: 5, title: 'Logout', link: '/', action: handleLogout },
  ];
  const StudentmenuItems = [
    { id: 1, title: 'Home', link: '/' },
    { id: 2, title: 'Classes', link: '/classes' },
    { id: 3, title: 'Logout', link: '/', action: handleLogout },
  ];
  const TeachermenuItems = [
    { id: 1, title: 'Home', link: '/' },
    { id: 2, title: 'Classes', link: '/classes' },
    { id: 3, title: 'Students', link: '/students' },
    { id: 4, title: 'Logout', link: '/', action: handleLogout },
  ];

  return (
    <aside className="sidebar">
      <ul className="menu">
        {userRole === 'admin' ? (
            AdminmenuItems.map((item) => (
              <li key={item.id}>
                {item.title === 'Logout' ? 
                (<a href={item.link} onClick={item.action}>{item.title}</a>)
                :
                (<a href={item.link}>{item.title}</a>)
                }
                
              </li>
            )))
          : userRole === 'Student' ?
          StudentmenuItems.map((item) => (
            <li key={item.id}>
              {item.title === 'Logout' ? 
              (<a href={item.link} onClick={item.action}>{item.title}</a>)
              :
              (<a href={item.link}>{item.title}</a>)
              }
              
            </li>
          ))
          :
          (TeachermenuItems.map((item) => (
            <li key={item.id}>
              {item.title === 'Logout' ? 
              (<a href={item.link} onClick={item.action}>{item.title}</a>)
              :
              (<a href={item.link}>{item.title}</a>)
              }
              
            </li>
          )))
          }
    
      </ul>
    </aside>
  );
};

export default Sidebar;
