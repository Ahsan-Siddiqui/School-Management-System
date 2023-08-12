import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './home.css'
import Navbar from '../../ui/navbar'
const Home = ({Toggle}) => {
  const getUser = localStorage.getItem("userData");
  const users = JSON.parse(getUser);
  const authToken = users.saveToken;
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  useEffect(() => {
       // First the total number of teachers
       axios
       .get("http://localhost:8080/api/Teacher", {
         headers: {
           Authorization: authToken,
           "Content-Type": "application/json", // Set the Content-Type header
         },
       })
       .then((response) => {
        // console.log('totalteacher',response.data)
        setTotalTeachers(response.data.length); // Update the teacherList state with response data
       })
       .catch((error) => console.error("Error fetching teacher list:", error));
 
    // Fetch the total number of students
    axios
      .get('http://localhost:8080/api/student', {
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // console.log('totalstudent',response.data)
        setTotalStudents(response.data.length);
      })
      .catch((error) => {
        console.error('Error fetching total students:', error);
      });
  }, [authToken]);
  return (
    <div className=' px-3'>
      <Navbar Toggle={Toggle}/>
      <div className='container-fluid'>
        <div className='row g-3 my-2'>
          <div className='col-md-3 p-1'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
              <h3 className='fs-2'>{totalStudents}</h3>
              <p className='fs-5'>Total Students</p>
              </div>
            <i className='bi bi-people-fill p-3 fs-1'></i>
            </div>
          </div>
          <div className='col-md-3 p-1'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
            <div>
              <h3 className='fs-2'>{totalTeachers}</h3>
              <p className='fs-5'>Total Faculty</p>
              </div>
            <i className='bi bi-person-badge p-3 fs-1'></i>
            </div>
          </div>
          <div className='col-md-3 p-1'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
              <h3 className='fs-2'>14</h3>
              <p className='fs-5'>Rooms</p>
              </div>
            <i className='bi bi-hospital-fill p-3 fs-1'></i>
            </div>
          </div>
          <div className='col-md-3 p-1'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
              <h3 className='fs-2'>54%</h3>
              <p className='fs-5'>Our Progress</p>
              </div>
            <i className='bi bi-graph-up-arrow p-3 fs-1'></i>
            </div>
          </div>
        </div>
      </div>
        </div>
  )
}

export default Home