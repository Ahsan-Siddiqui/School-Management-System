import React,{useState } from 'react'
import './classes.css'
import ClassForm from './ClassForm'
import ClassList from './classList'
import { Button,TableContainer,Grid, Container } from '@mui/material'

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

{showForm ? 
<ClassForm /> 
: 
<ClassList/>
}
</Container>
   
  )
}

export default Classes