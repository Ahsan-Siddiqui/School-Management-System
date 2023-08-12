import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './studentList.css';
import Navbar from '../../../ui/navbar';

const StudentList = ({ setLoginUser }) => {
  const getUser = localStorage.getItem("userData");
  const user = JSON.parse(getUser);
  const authToken = user.saveToken;
  // console.log(user.saveToken)
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/Student', {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json', // Set the Content-Type header
      },
    })
    .then(response => {
      console.log(response)
      setStudentList(response.data); // Update the StudentList state with response data
    })
    .catch(error => console.error('Error fetching class list:', error));
  }, [authToken]);

  return (
    <div className="px-3">
        
          <table className="table">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact No</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((classItem,index) => (
              <tr key={classItem._id}>
                <td>{index + 1}</td>
              <td style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{classItem.firstname}</td>
              <td>{classItem.email}</td>
              <td>{classItem.contactNo}</td>
            </tr>
              ))}
          </tbody>
          </table>

    </div>
  );
};

export default StudentList;
