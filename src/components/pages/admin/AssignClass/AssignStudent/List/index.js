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
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import DisplayFormattedDate from "../../../../../ui/dateFormat";
import { useHistory } from "react-router-dom";
const StudentList = () => {
  const history = useHistory();
  const getUser = localStorage.getItem("userData");
  const user = JSON.parse(getUser);
  const authToken = user.saveToken;
  const [stdList, setStudentList] = useState([]);
  const [selectedClass, setSelectedClass] = useState({
    gradeName: {
      id: "", // Initialize with an empty string or the appropriate default value
      name: "Class - 01", // Set the initial default value
    },
    // ... other properties
  });

  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [findStdList, setFindStdList] = useState([]);
  const [studentNames, setStudentNames] = useState([]);

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const handleClassRemove = (classId) => {
    setSelectedClassId(classId);
    setOpenConfirmation(true);
  };

  const confirmDeleteClass = () => {
    axios
      .delete(`http://localhost:8080/api/assignSClass/${selectedClassId}`, {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Remove the deleted teacher from the list
        setTeacherList((prevList) =>
          prevList.filter((item) => item._id !== selectedClassId)
        );
        setSelectedClassId(null);
        setOpenConfirmation(false);
        setToastSeverity("success");
        setToastMessage("Class Deleted successfully");
        setToastOpen(true);
        setUpdateDialogOpen(false);
        history.push("/assign-student");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
    // GET CLASSE request
    axios
      .get("http://localhost:8080/api/createClass", {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setFindStdList(response.data.classes);
      })
      .catch((error) => console.error("Error fetching teacher list:", error));

    axios
      .get("http://localhost:8080/api/assignSClass", {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setStudentList(response.data);
        setStudentNames(
          response.data.map((student) => ({ name: student.studentsNames }))
        );
      })
      .catch((error) => console.error("Error fetching class list:", error));
  }, [authToken]);

  // const handleDeleteClass = async (classId) => {
  //   const confirmed = window.confirm(
  //     "Are you sure you want to delete this class?"
  //   );
  //   if (!confirmed) {
  //     return;
  //   }

  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:8080/api/assignSClass/${classId}`,
  //       {
  //         headers: {
  //           Authorization: authToken,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       setStudentList((prevStdList) =>
  //         prevStdList.filter((item) => item._id !== classId)
  //       );

  //       setToastSeverity("success");
  //       setToastMessage("Class deleted successfully");
  //       setToastOpen(true);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting class:", error);

  //     setToastSeverity("error");
  //     setToastMessage("Error deleting class");
  //     setToastOpen(true);
  //   }
  // };
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
        `http://localhost:8080/api/assignSClass/${selectedClass._id}`,
        selectedClass,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setStudentList((prevStdList) =>
          prevStdList.map((item) =>
            item._id === selectedClass._id ? selectedClass : item
          )
        );

        setToastSeverity("success");
        setToastMessage("Class updated successfully");
        setToastOpen(true);
        setUpdateDialogOpen(false);
        setSelectedClass(null);
        // window.location.reload();
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
              <TableCell>Created Date</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Delete Record</TableCell>
              <TableCell>Update Record</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stdList.map((item, index) => (
              <TableRow
                key={item._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.gradeName.name}</TableCell>
                <TableCell>
                  <DisplayFormattedDate dateString={item.schedule}>
                    {item.schedule}
                  </DisplayFormattedDate>
                </TableCell>
                <TableCell>{studentNames[index]?.name.join(", ")}</TableCell>
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
        <DialogTitle>Update Record</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal" sx={{ mt: 4 }}>
            <InputLabel htmlFor="gradeName" sx={{ mt: -2 }}>
              Select Class
            </InputLabel>
            <Select
              sx={{ p: 0 }}
              value={selectedClass.gradeName.name}
              onChange={(e) =>
                setSelectedClass({
                  ...selectedClass,
                  gradeName: {
                    id: findStdList.find(
                      (classN) => classN.title === e.target.value
                    )._id, // Find and set the corresponding ID
                    name: e.target.value,
                  },
                })
              }
              className="custom-select"
            >
              {findStdList.map((classN) => (
                <MenuItem key={classN._id} value={classN.title}>
                  {classN.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ mt: 4, width: "100%" }}>
            <Input
              type="date"
              id="schedule"
              value={selectedClass ? selectedClass.schedule : ""}
              onChange={(e) =>
                setSelectedClass({
                  ...selectedClass,
                  schedule: e.target.value,
                })
              }
            />
            {selectedClass && (
              <Typography variant="body2" color="textSecondary">
                <DisplayFormattedDate dateString={selectedClass.schedule} />
              </Typography>
            )}
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

export default StudentList;
