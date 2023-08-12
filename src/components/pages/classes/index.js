import React,{useState } from 'react'
import './classes.css'
import ClassForm from './ClassForm'
import ClassList from './classList'
import { Button, Container } from 'react-bootstrap';
import Navbar from '../../ui/navbar'

const Classes = ({Toggle}) => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (

    <div className=' px-3'>    
    <Navbar Toggle={Toggle}/>
  <Button variant="primary" className='addBackBtn' onClick={toggleForm}>{showForm ? 'Back to List' : 'Add Class'}</Button>
  {showForm ? 
  <div className='container-fluid col-md-12'>
  <ClassForm /> 
  </div>
  : 
  <ClassList/>
  }
  </div>
  )
}

export default Classes