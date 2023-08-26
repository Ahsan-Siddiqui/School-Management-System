import React, { useState } from "react";
import { Button, Grid, Container } from "@mui/material";
import AddClass from "./Form/AddClass";
import ClassList from "./List/Classes";

const Classes = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <Container>
      <Grid container justifyContent="flex-end" onClick={toggleForm}>
        <Button type="submit" variant="contained" color="primary">
          {showForm ? "Back to List" : "Add Class"}
        </Button>
      </Grid>
      {showForm ? <AddClass /> : <ClassList />}
    </Container>
  );
};

export default Classes;
