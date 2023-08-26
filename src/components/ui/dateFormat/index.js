import React from 'react';

const DisplayFormattedDate = ({ dateString }) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
    // second: '2-digit',
    // timeZoneName: 'short',
  });

  return <div>{formattedDate}</div>;
};

export default DisplayFormattedDate;
