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
import './teacherList.css';
import Navbar from '../../../ui/navbar';

const TeacherList = ({ setLoginUser }) => {
  const getUser = localStorage.getItem("userData");
  const user = JSON.parse(getUser);
  const authToken = user.saveToken;

  const [teacherList, setTeacherList] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/teacherForm', {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      setTeacherList(response.data);
    })
    .catch(error => console.error('Error fetching teacher list:', error));
  }, [authToken]);

  const handleDeleteTeacher = (teacherId) => {
    setSelectedTeacherId(teacherId);
    setOpenConfirmation(true);
  };

  const confirmDeleteTeacher = () => {
    axios.delete(`http://localhost:8080/api/teacherForm/${selectedTeacherId}`, {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      // Remove the deleted teacher from the list
      setTeacherList(prevList => prevList.filter(item => item._id !== selectedTeacherId));
      setSelectedTeacherId(null);
      setOpenConfirmation(false);
    })
    .catch(error => console.error('Error deleting teacher:', error));
  };

  const handleCloseConfirmation = () => {
    setSelectedTeacherId(null);
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
              <TableCell>Email</TableCell>
              <TableCell>Contact No</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teacherList.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {item.firstname}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.contactNo}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteTeacher(item._id)}
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
            Are you sure you want to delete this teacher?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteTeacher} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeacherList;
