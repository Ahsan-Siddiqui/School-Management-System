import React from 'react';
import './sidebar.css';

const Sidebar = () => {
  const getUser = localStorage.getItem("userData")
  const user = JSON.parse(getUser);
  const handleLogout = () => {
    localStorage.removeItem("userData");
  };
  const AdminmenuItems = [
    { id: 1, title: 'Dashboard', link: '/' },
    { id: 2, title: 'Classes', link: '/class',icon:'bi bi-house' },
    { id: 3, title: 'Students', link: '/student' },
    { id: 4, title: 'Teachers', link: '/teacher' },
    { id: 5, title: 'Logout', link: '/', action: handleLogout },
  ];
  const StudentmenuItems = [
    { id: 1, title: 'Dashboard', link: '/' },
    { id: 2, title: 'Classes', link: '/class' },
    { id: 3, title: 'Logout', link: '/', action: handleLogout },
  ];
  const TeachermenuItems = [
    { id: 1, title: 'Dashboard', link: '/' },
    { id: 2, title: 'Classes', link: '/class' },
    { id: 3, title: 'Students', link: '/student' },
    { id: 4, title: 'Logout', link: '/', action: handleLogout },
  ];

  return (
    <div className='col-2 bg-white sidebar p-2'>
      <div className='m-2'>
        <i className='bi bi-bootstrap-fill me-3 fs-4'></i>
        <span className='brand-name fs-4'>BQ School</span>
      </div>
      <hr className='text-dark'/>
      <div className='list-group list-group-flush'>
        <ul className="menu">
      {user.userDetail.role === 'admin' ? (
            AdminmenuItems.map((item) => (
              <li key={item.id}>
                {item.title === 'Logout' ? 
                (<a 
                className='list-group-item py-2' 
                href={item.link} 
                onClick={item.action}>
                  <i className='fs-5 me-3'></i>
                  <span>{item.title}</span>
                  
                  </a>)
                :
                (<a className='list-group-item py-2 '  href={item.link}>
                  <i className='fs-5 me-3'></i>
                  <span>{item.title}</span></a>)
                }
                
              </li>
            )))
          : user.userDetail.role === 'Student' ?
          StudentmenuItems.map((item) => (
            <li key={item.id}>
              {item.title === 'Logout' ? 
              (<a className='list-group-item py-2' 
              href={item.link} 
              onClick={item.action}>
                <i className='fs-5 me-3'></i>
                <span>{item.title}</span></a>)
              :
              (<a className='list-group-item py-2 '  href={item.link}>
              <i className='fs-5 me-3'></i>
              <span>{item.title}</span></a>)
              }
              
            </li>
          ))
          :
          (TeachermenuItems.map((item) => (
            <li key={item.id}>
              {item.title === 'Logout' ? 
              (<a className='list-group-item py-2' 
              href={item.link} onClick={item.action}>
                <i className='fs-5 me-3'></i>
              <span>{item.title}</span></a>)
              :
              (<a className='list-group-item py-2 '  href={item.link}>
              <i className='fs-5 me-3'></i>
              <span>{item.title}</span></a>)
              }
              
            </li>
          )))
        }
        </ul>
      </div>
    </div>
    // <aside className="sidebar">
    //   <ul className="menu">
    //     {user.userDetail.role === 'admin' ? (
    //         AdminmenuItems.map((item) => (
    //           <li key={item.id}>
    //             {item.title === 'Logout' ? 
    //             (<a href={item.link} onClick={item.action}>{item.title}</a>)
    //             :
    //             (<a href={item.link}>{item.title}</a>)
    //             }
                
    //           </li>
    //         )))
    //       : user.userDetail.role === 'Student' ?
    //       StudentmenuItems.map((item) => (
    //         <li key={item.id}>
    //           {item.title === 'Logout' ? 
    //           (<a href={item.link} onClick={item.action}>{item.title}</a>)
    //           :
    //           (<a href={item.link}>{item.title}</a>)
    //           }
              
    //         </li>
    //       ))
    //       :
    //       (TeachermenuItems.map((item) => (
    //         <li key={item.id}>
    //           {item.title === 'Logout' ? 
    //           (<a href={item.link} onClick={item.action}>{item.title}</a>)
    //           :
    //           (<a href={item.link}>{item.title}</a>)
    //           }
              
    //         </li>
    //       )))
    //       }
    
    //   </ul>
    // </aside>
  );
};

export default Sidebar;
