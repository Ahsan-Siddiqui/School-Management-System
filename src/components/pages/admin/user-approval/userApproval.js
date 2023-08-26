import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Snackbar,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import axios from "axios";
//for toast
import Alert from "@mui/material/Alert";

const UserApproval = () => {
  const getUser = localStorage.getItem("userData");
  const users = JSON.parse(getUser);
  const authToken = users.saveToken;

  const [approveUser, setApproveUser] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedUserForDeletion, setSelectedUserForDeletion] = useState(null);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const handleToastClose = () => {
    setToastOpen(false);
  };
  const SlideTransition = (props) => {
    return <Slide {...props} direction="down" />;
  };
  const handleOpenConfirmDialog = (userId) => {
    setSelectedUserForDeletion(userId);
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setSelectedUserForDeletion(null);
    setConfirmDialogOpen(false);
  };

  const handleToggle = async (userId, approved) => {
    try {
      await axios.put(
        `http://localhost:8080/api/users/${userId}`,
        {},
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );

      // Update the user's approval status locally
      setApproveUser((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, approved: !approved } : user
        )
      );

      // Show toast message based on the approval status change
      const userName = approveUser.find((user) => user._id === userId).name;

      if (!approved) {
        setToastSeverity("success");
        setToastMessage(`${userName} has been approved successfully.`);
        setToastOpen(true);
      } else {
        setToastSeverity("error");
        setToastMessage(`${userName} has been unapproved.`);
        setToastOpen(true);
      }
    } catch (error) {
      console.error("Error updating approval status:", error);
    }
  };
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`, {
        headers: {
          Authorization: authToken,
        },
      });

      // Remove the deleted user from the local state
      setApproveUser((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );

      // Show a toast message to indicate successful deletion
      setToastSeverity("success");
      setToastMessage("User deleted successfully.");
      setToastOpen(true);
    } catch (error) {
      console.error("Error deleting user:", error);
      setToastSeverity("error");
      setToastMessage("Error deleting user.");
      setToastOpen(true);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users", {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setDisplayUsers(response.data.users);
        setApproveUser(response.data.users);
      })
      .catch((error) => console.error("Error fetching teacher list:", error));
  }, [authToken]);

  const filteredUsers = approveUser.filter((user) => user.role !== "admin");

  return (
    <TableContainer
      maxWidth="lg"
      style={{
        padding: "20px",
        margin: "20px auto",
        maxWidth: "none",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          backgroundColor: "#333",
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          padding: 2,
        }}
      >
        Admin Approval User Profile
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.no</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell sx={{ width: "60%", float: "right" }}>
                Approve Status
              </TableCell>
              <TableCell>Delete User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    sx={{ width: "60%", float: "right" }}
                    variant="outlined"
                    color={user.approved ? "primary" : "secondary"}
                    onClick={() => handleToggle(user._id, user.approved)} // Make sure user.id is passed correctly
                  >
                    {user.approved ? "Approved" : "Pending"}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    // variant="outlined"
                    variant="contained"
                    // color="secondary"
                    onClick={() => handleOpenConfirmDialog(user._id)}
                    sx={{
                      backgroundColor: "#d14242",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#8f1010", // New hover color
                      },
                    }}

                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(selectedUserForDeletion);
              handleCloseConfirmDialog();
            }}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default UserApproval;
