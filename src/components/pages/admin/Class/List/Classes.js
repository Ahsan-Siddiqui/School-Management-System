import React, { useState, useEffect } from "react";
import axios from "axios";
import {
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";
import Alert from "@mui/material/Alert";
const ClassList = () => {
  const getUser = localStorage.getItem("userData");
  const user = JSON.parse(getUser);
  const authToken = user.saveToken;
  const [classListData, setClassListData] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [findClassList, setFindClassList] = useState([]);

  
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);
  
  const handleClassRemove = (classId) => {
    setSelectedClassId(classId);
    setOpenConfirmation(true);
  };

  const confirmDeleteClass = () => {
    axios.delete(`http://localhost:8080/api/createClass/${selectedClassId}`, {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      // Remove the deleted teacher from the list
      setTeacherList(prevList => prevList.filter(item => item._id !== selectedClassId));
      setSelectedClassId(null);
      setOpenConfirmation(false);
      setToastSeverity("success");
        setToastMessage("Class Deleted successfully");
        setToastOpen(true);
        setUpdateDialogOpen(false);
        window.location.reload();
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.msg) {
        setToastSeverity("error");
        setToastMessage(error.response.data.msg);
        setToastOpen(true);
      } else {
        setToastSeverity("error");
        setToastMessage("Server not Connected");
        setToastOpen(true);
      }
    });
  };

  const handleCloseConfirmation = () => {
    setSelectedClassId(null);
    setOpenConfirmation(false);
  };
  // State variables for toast notifications
  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const [teacherList, setTeacherList] = useState([]);
  const handleToastClose = () => {
    setToastOpen(false);
  };
  const SlideTransition = (props) => {
    return <Slide {...props} direction="down" />;
  };
  // State variables for toast notifications

  useEffect(() => {
   
  
    axios
      .get("http://localhost:8080/api/createClass", {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setClassListData(response.data.classes);
      })
      .catch((error) => console.error("Error fetching class list:", error));
  }, [authToken]);

  const handleDeleteClass = async (classId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this class?"
    );
    if (!confirmed) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/createClass/${classId}`,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setClassListData((prevClassList) =>
          prevClassList.filter((item) => item._id !== classId)
        );

        setToastSeverity("success");
        setToastMessage("Class deleted successfully");
        setToastOpen(true);
      }
    } catch (error) {
      console.error("Error deleting class:", error);

      setToastSeverity("error");
      setToastMessage("Error deleting class");
      setToastOpen(true);
    }
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
        `http://localhost:8080/api/createClass/${selectedClass._id}`,
        selectedClass,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setClassListData((prevClassList) =>
          prevClassList.map((item) =>
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
    <div className="px-3">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Delete Record</TableCell>
              <TableCell>Update Record</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classListData.map((item, index) => (
              <TableRow
                key={item._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>
               
               
                <TableCell>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleClassRemove(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateClick(item)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog
        open={updateDialogOpen}
        onClose={handleUpdateDialogClose}
        fullWidth
      >
        <DialogTitle>Update Class</DialogTitle>
        <DialogContent>
         
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="weekDay">Class - </InputLabel>
            <Input
              id="weekDay"
              value={selectedClass ? selectedClass.title : ""}
              onChange={(e) =>
                setSelectedClass({
                  ...selectedClass,
                  title: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="weekDay">Description</InputLabel>
            <Input
              id="weekDay"
              value={selectedClass ? selectedClass.description : ""}
              onChange={(e) =>
                setSelectedClass({
                  ...selectedClass,
                  weekDay: e.target.value,
                })
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateClass} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
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
          <Button onClick={confirmDeleteClass} color="secondary" autoFocus>
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

export default ClassList;