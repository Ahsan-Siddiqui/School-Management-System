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
const SubjectList = () => {
  const getUser = localStorage.getItem("userData");
  const user = JSON.parse(getUser);
  const authToken = user.saveToken;
  const [SubjectListData, setSubjectListData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  
  const handleSubjectRemove = (subjectId) => {
    setSelectedSubjectId(subjectId);
    setOpenConfirmation(true);
  };

  const confirmDeleteSubject = () => {
    axios.delete(`http://localhost:8080/api/createSubject/${selectedSubjectId}`, {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      // Remove the deleted teacher from the list
      setTeacherList(prevList => prevList.filter(item => item._id !== selectedSubjectId));
      setSelectedSubjectId(null);
      setOpenConfirmation(false);
      setToastSeverity("success");
        setToastMessage("Subject Deleted successfully");
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
    setSelectedSubjectId(null);
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
      .get("http://localhost:8080/api/createSubject", {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSubjectListData(response.data.Subjects);
      })
      .catch((error) => console.error("Error fetching subject list:", error));
  }, [authToken]);

  const handleDeleteSubject = async (subjectId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this subject?"
    );
    if (!confirmed) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/createSubject/${subjectId}`,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSubjectListData((prevSubjectList) =>
          prevSubjectList.filter((item) => item._id !== subjectId)
        );

        setToastSeverity("success");
        setToastMessage("Subject deleted successfully");
        setToastOpen(true);
      }
    } catch (error) {
      console.error("Error deleting subject:", error);

      setToastSeverity("error");
      setToastMessage("Error deleting subject");
      setToastOpen(true);
    }
  };
  const handleUpdateClick = (item) => {
    setSelectedSubject(item);
    setUpdateDialogOpen(true);
  };

  const handleUpdateDialogClose = () => {
    setSelectedSubject(null);
    setUpdateDialogOpen(false);
  };
  const handleUpdateSubject = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/createSubject/${selectedSubject._id}`,
        selectedSubject,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSubjectListData((prevSubjectList) =>
          prevSubjectList.map((item) =>
            item._id === selectedSubject._id ? selectedSubject : item
          )
        );

        setToastSeverity("success");
        setToastMessage("Subject updated successfully");
        setToastOpen(true);
        setUpdateDialogOpen(false);
        setSelectedSubject(null);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating Subject:", error);

      setToastSeverity("error");
      setToastMessage("Error updating Subject");
      setToastOpen(true);
      setUpdateDialogOpen(false);
      setSelectedSubject(null);
    }
  };
  return (
    <div className="px-3">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Delete Record</TableCell>
              <TableCell>Update Record</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SubjectListData.map((item, index) => (
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
                    onClick={() => handleSubjectRemove(item._id)}
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
        <DialogTitle>Update Subject</DialogTitle>
        <DialogContent>
         
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="weekDay">Subject - </InputLabel>
            <Input
              id="weekDay"
              value={selectedSubject ? selectedSubject.title : ""}
              onChange={(e) =>
                setSelectedSubject({
                  ...selectedSubject,
                  title: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="weekDay">Description</InputLabel>
            <Input
              id="weekDay"
              value={selectedSubject ? selectedSubject.description : ""}
              onChange={(e) =>
                setSelectedSubject({
                  ...selectedSubject,
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
          <Button onClick={handleUpdateSubject} color="primary">
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
          <Button onClick={confirmDeleteSubject} color="secondary" autoFocus>
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

export default SubjectList;
