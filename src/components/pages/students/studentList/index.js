import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import './studentList.css';

const StudentList = () => {
  const getUser = localStorage.getItem("userData");
  const user = JSON.parse(getUser);
  const authToken = user.saveToken;

  const [studentList, setStudentList] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/studentForm', {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      setStudentList(response.data);
    })
    .catch(error => console.error('Error fetching student list:', error));
  }, [authToken]);

  const handleDeleteStudent = (studentId) => {
    setSelectedStudentId(studentId);
    setOpenConfirmation(true);
  };

  const confirmDeleteStudent = () => {
    axios.delete(`http://localhost:8080/api/studentForm/${selectedStudentId}`, {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      // Remove the deleted student from the list
      setStudentList(prevList => prevList.filter(item => item._id !== selectedStudentId));
      setSelectedStudentId(null);
      setOpenConfirmation(false);
    })
    .catch(error => console.error('Error deleting student:', error));
  };

  const handleCloseConfirmation = () => {
    setSelectedStudentId(null);
    setOpenConfirmation(false);
  };

  return (
    <div className="px-3">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Student Email</TableCell>
              <TableCell>Parent Email</TableCell>
              <TableCell>Contact No</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {item.firstname}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.parntGardEmail}</TableCell>
                
                <TableCell>{item.contactNo}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteStudent(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this student?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteStudent} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StudentList;
