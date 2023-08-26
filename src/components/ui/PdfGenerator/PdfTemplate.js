import React from 'react';
import DisplayFormattedDate from '../dateFormat';
const PdfTemplate = (data) => {
    const formattedContactNumber = data.contactNo;
    const formattedEmail = data.email;
    const formattedAddress = data.address;
    const formattedParentGuardianInfo = data.parntGardInfo;
    const formattedParentGuardianName = data.parntGardName;
    const formattedRelation = data.relation;
    const formattedParentGuardianNumber = data.parntGardNumber;
    const formattedParentGuardianEmail = data.parntGardEmail;
    const formattedParentGuardianAddress = data.parntGardAddress;
  return `
    Student Profile
    First Name: ${data.firstname}
    Last Name: ${data.lastname}
    Date of Birth: ${DisplayFormattedDate({ dateString: data.dob }).props.children}
    Gender: ${data.gender}
    Contact Number: ${formattedContactNumber}
    Email: ${formattedEmail}
    Address: ${formattedAddress}
    Parent/Guardian Info: ${formattedParentGuardianInfo}
    Parent/Guardian Name: ${formattedParentGuardianName}
    Relation: ${formattedRelation}
    Parent/Guardian Number: ${formattedParentGuardianNumber}
    Parent/Guardian Email: ${formattedParentGuardianEmail}
    Parent/Guardian Address: ${formattedParentGuardianAddress}
  `;
};

export default PdfTemplate;
