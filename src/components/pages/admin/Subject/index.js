import React, { useState } from "react";
import { Button, Grid, Container } from "@mui/material";
import AddSubject from "./Form/AddSubject";
import SubjectList from "./List/Subjects";

const Subjects = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <Container>
      <Grid container justifyContent="flex-end" onClick={toggleForm}>
        <Button type="submit" variant="contained" color="primary">
          {showForm ? "Back to List" : "Add Subject"}
        </Button>
      </Grid>
      {showForm ? <AddSubject /> : <SubjectList />}
    </Container>
  );
};

export default Subjects;
