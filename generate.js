const generatePDF = require('./pdfGenerator');
const path = require('path');

// Define output folder
const outputFolder = path.join(__dirname, 'pdfs');

// Generate PDF from specific URL
generatePDF(
    'http://localhost:8000/export/cover/256',
    outputFolder
)
    .then(pdfPath => console.log(`PDF saved at: ${pdfPath}`))
    .catch(console.error);
