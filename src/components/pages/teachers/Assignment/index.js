import React, { useState } from "react";
import { Button, Grid, Container } from "@mui/material";
import CreateAssignmentForm from "./Form";
import StudentAssignmentList from "./List";

const Assignment = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <Container>
      <Grid container justifyContent="flex-end" onClick={toggleForm}>
        <Button type="submit" variant="contained" color="primary">
          {showForm ? "Back to List" : "Give Assignment"}
        </Button>
      </Grid>
      {showForm ? <CreateAssignmentForm /> : <StudentAssignmentList />}
    </Container>
  );
};

export default Assignment;
