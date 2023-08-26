import React, { useState } from "react";
import { Button, Grid, Container } from "@mui/material";
import TimeTableList from "./List/TimeTable";
import TimetableForm from "./Form/AddTimeTable";

const TimeTable = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <Container>
      <Grid container justifyContent="flex-end" onClick={toggleForm}>
        <Button type="submit" variant="contained" color="primary">
          {showForm ? "Back to List" : "Add Time Table"}
        </Button>
      </Grid>
      {showForm ? <TimetableForm /> : <TimeTableList />}
    </Container>
  );
};

export default TimeTable;
