import React from 'react';
import jsPDF from 'jspdf';

const PdfGenerator = ({ data, filename, template: TemplateComponent }) => {
  const createPdf = () => {
    const pdf = new jsPDF('p', 'pt', 'letter');
    
    if (TemplateComponent) {
      // Use the template component to generate the PDF content
      const content = TemplateComponent(data);
      pdf.text(content, 20, 30);
    } else {
      // Fallback to default behavior
      pdf.text('Student Profile', 20, 30);

      // Add specific fields to the PDF
      pdf.text(`First Name: ${data.firstname}`, 20, 60);
      pdf.text(`Last Name: ${data.lastname}`, 20, 80);
      // Add more fields...
    }

    pdf.save(`${filename}.pdf`);
  };

  return (
    <button onClick={createPdf}>
      Generate PDF
    </button>
  );
};

export default PdfGenerator;
