import React, { useState } from 'react';
import './student.css';
import StudentForm from './studentForm';
import StudentList from './studentList';
import { Button } from 'react-bootstrap';
import Navbar from '../../ui/navbar';

const Students = ({ Toggle }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="px-3">
      <Navbar Toggle={Toggle} />
      <Button
        variant="primary"
        className="addBackBtn"
        onClick={toggleForm}
      >
        {showForm ? 'Back to List' : 'Add Student'}
      </Button>
      {showForm ? (
        <div className="container-fluid col-md-12">
          <StudentForm />
        </div>
      ) : (
        <StudentList/>
      )}
    </div>
  );
};

export default Students;
