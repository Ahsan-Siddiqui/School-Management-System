import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './classList.css';
import Navbar from '../../../ui/navbar';

const ClassList = ({ setLoginUser }) => {
  const getUser = localStorage.getItem("userData");
  const user = JSON.parse(getUser);
  const authToken = user.saveToken;
  // console.log(user.saveToken)
  const [classList, setClassList] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/classes', {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json', // Set the Content-Type header
      },
    })
    .then(response => {
      setClassList(response.data); // Update the classList state with response data
    })
    .catch(error => console.error('Error fetching class list:', error));
  }, [authToken]);

  return (
    <div className="px-3">
        
          <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Class</th>
              <th scope="col">Room No</th>
              <th scope="col">Time and Day</th>
              <th scope="col">Teacher Name</th>
            </tr>
          </thead>
          <tbody>
            {classList.map((classItem,index) => (
              <tr key={classItem._id}>
                <td>{index + 1}</td>
              <td>{classItem.gradeName}</td>
              <td>{classItem.room}</td>
              <td>{classItem.schedule}</td>
              <td style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{classItem.teacherName}</td>
            </tr>
              ))}
          </tbody>
          </table>

    </div>
  );
};

export default ClassList;
