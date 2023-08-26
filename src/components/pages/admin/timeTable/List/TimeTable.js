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
  FormControl,
  InputLabel,
  Input,
  Snackbar,
  Slide,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import Alert from "@mui/material/Alert";
const TimeTableList = () => {
  const getUser = localStorage.getItem("userData");
  const user = JSON.parse(getUser);
  const authToken = user.saveToken;

  // State variables for toast notifications
  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const handleToastClose = () => {
    setToastOpen(false);
  };
  const SlideTransition = (props) => {
    return <Slide {...props} direction="down" />;
  };
  // State variables for toast notifications
  
  const [tTableList, setTTableList] = useState([]);
  const [tableLst, setTimeTableList] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedTimeTableId, setSelecteTimeTableId] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  useEffect(() => {
    axios.get('http://localhost:8080/api/getTimetableDetails', {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      setTTableList(response.data.Subjects);
    })
    .catch(error => console.error('Error fetching time table list:', error));
  }, [authToken]);

  const handleDeleteTable = (tableId) => {
    setSelecteTimeTableId(tableId);
    setOpenConfirmation(true);
  };

  const confirmDeleteTable = () => {
    axios.delete(`http://localhost:8080/api/getTimetableDetails/${selectedTimeTableId}`, {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      // Remove the deleted time table from the list
      setTTableList(prevList => prevList.filter(item => item._id !== selectedTimeTableId));
      setSelecteTimeTableId(null);
      setOpenConfirmation(false);
      
      setToastSeverity("success");
      setToastMessage("Record Has Been Deleted");
      setToastOpen(true);
    })
    .catch((error) => {
        console.error("Error deleting subject:", error);
  
        setToastSeverity("error");
        setToastMessage("Error deleting subject");
        setToastOpen(true);
      });
  };

  const handleCloseConfirmation = () => {
    setSelecteTimeTableId(null);
    setOpenConfirmation(false);
  };
  const handleUpdateClick = (item) => {
    setSelectedClass(item);
    setUpdateDialogOpen(true);
  };

  const handleUpdateDialogClose = () => {
    setSelectedClass(null);
    setUpdateDialogOpen(false);
  };
  const handleUpdateClass = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/getTimetableDetails/${selectedClass._id}`,
        selectedClass,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setTimeTableList((prevTableList) =>
        prevTableList.map((item) =>
            item._id === selectedClass._id ? selectedClass : item
          )
        );

        setToastSeverity("success");
        setToastMessage("Class updated successfully");
        setToastOpen(true);
        setUpdateDialogOpen(false);
        setSelectedClass(null);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating class:", error);

      setToastSeverity("error");
      setToastMessage("Error updating class");
      setToastOpen(true);
      setUpdateDialogOpen(false);
      setSelectedClass(null);
    }
  };
  return (
    <div className="py-3">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Days</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tTableList.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {item.gradeName.name}
                </TableCell>
                <TableCell>{item.teacherAssign.name}</TableCell>
                <TableCell>{item.selectSubject}</TableCell>
                <TableCell>{item.selectedTimeSlot}</TableCell>
                <TableCell>{tTableList[index]?.selectedDays.join(", ")}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteTable(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateClass(item)}
                  >
                    Update
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
            Are you sure you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteTable} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
            open={toastOpen}
            autoHideDuration={6000}
            onClose={handleToastClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            TransitionComponent={SlideTransition}
          >
            <Alert onClose={handleToastClose} severity={toastSeverity}>
              {toastMessage}
            </Alert>
          </Snackbar>
    </div>
  );
};

export default TimeTableList;
