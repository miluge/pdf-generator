const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF(url, outputFolder) {
    try {
        // Create output folder if it doesn't exist
        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder, { recursive: true });
        }

        // Create filename with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const outputPath = path.join(outputFolder, `document-${timestamp}.pdf`);

        // Launch the browser
        const browser = await puppeteer.launch({
            headless: 'new'
        });

        // Create a new page
        const page = await browser.newPage();

        // Set viewport to A4 size at 72 DPI
        await page.setViewport({
            width: 595,
            height: 842,
            deviceScaleFactor: 4,
        });


        // Navigate to localhost URL
        await page.goto(url, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });


        // Generate PDF with A4 format
        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true,
            scale: 1.5
        });

        // Close the browser
        await browser.close();

        console.log(`PDF generated successfully at: ${outputPath}`);
        return outputPath;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}

module.exports = generatePDF;
