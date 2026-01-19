/**
 * GOOGLE APPS SCRIPT - ABAMA RESORT OPEN DAY FORM HANDLER
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open Google Sheets and create a new spreadsheet (or use existing one)
 * 2. Name it "Abama Resort - Open Day Submissions" (optional but recommended)
 * 3. Go to Extensions → Apps Script
 * 4. Paste this entire script into the editor
 * 5. Save the project (name it "Abama Form Handler")
 * 6. Click "Deploy" → "New deployment"
 * 7. Select type: "Web app"
 * 8. Set "Execute as" to your Google account
 * 9. Set "Who has access" to "Anyone"
 * 10. Copy the deployment URL and paste it in the HTML file's GOOGLE_APPS_SCRIPT_URL variable
 * 11. Click "Deploy"
 * 
 * HOW IT WORKS:
 * - Receives POST requests from the HTML form via fetch()
 * - Automatically creates/updates a Google Sheet with all submissions
 * - Adds headers on first submission
 * - Logs timestamp, name, email, phone, and GDPR consent
 */

// Global spreadsheet ID - will be set on first run
let SPREADSHEET_ID = null;
let SHEET_NAME = "Form Submissions";

/**
 * Main function to handle POST requests from the form
 */
function doPost(e) {
  try {
    // Parse incoming JSON data
    const postData = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!postData.name || !postData.email || !postData.phone) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Missing required fields'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get or create the spreadsheet
    const sheet = getOrCreateSheet();
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      addHeaders(sheet);
    }
    
    // Add the new submission as a row
    const newRow = [
      postData.timestamp || new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }),
      postData.name,
      postData.email,
      postData.phone,
      postData.gdpr || 'No'
    ];
    
    sheet.appendRow(newRow);
    
    // Optional: Send confirmation email to the applicant
    sendConfirmationEmail(postData.email, postData.name);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Submission received successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error for debugging
    Logger.log('Error: ' + error.toString());
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Server error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get existing spreadsheet or create a new one
 */
function getOrCreateSheet() {
  if (SPREADSHEET_ID === null) {
    // Get the current spreadsheet (Apps Script is bound to it)
    SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
  }
  
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  // Check if sheet exists, if not create it
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  
  return sheet;
}

/**
 * Add column headers to the sheet
 */
function addHeaders(sheet) {
  const headers = ['Timestamp', 'Full Name', 'Email Address', 'Phone Number', 'GDPR Consent'];
  sheet.appendRow(headers);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#d4af37');
  headerRange.setFontColor('#1a1a1a');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
}

/**
 * Send a confirmation email to the applicant
 */
function sendConfirmationEmail(email, name) {
  try {
    const subject = 'Abama Resort - Your Open Day Invitation Request Received';
    
    const htmlMessage = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #2a2a2a; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            h1 { font-size: 28px; color: #d4af37; margin: 0; }
            .content { line-height: 1.6; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5ddd5; text-align: center; font-size: 12px; color: #a89968; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Abama Resort</h1>
              <p style="color: #a89968; margin: 5px 0;">Exclusive Open Day Experience</p>
            </div>
            
            <div class="content">
              <p>Dear <strong>${name}</strong>,</p>
              
              <p>Thank you for submitting your invitation request for the Abama Resort Exclusive Open Day Experience.</p>
              
              <p>We have received your application and appreciate your interest in joining us for this exclusive event.</p>
              
              <h3 style="color: #a89968; margin-top: 30px;">Event Details</h3>
              <ul style="color: #2a2a2a;">
                <li><strong>Date & Time:</strong> Saturday, February 15th, 2026 | 10:00 AM - 6:00 PM</li>
                <li><strong>Location:</strong> Abama Resort, Costa Adeje, Tenerife, Spain</li>
                <li><strong>What to Expect:</strong> Guided tours, exclusive tastings, and private consultations</li>
              </ul>
              
              <p style="margin-top: 30px;">Our team will review your request and contact you within 48 hours to confirm your attendance and provide additional details.</p>
              
              <p>If you have any questions in the meantime, please don't hesitate to reach out to us:</p>
              <p>
                <strong>Email:</strong> info@abamaresort.com<br>
                <strong>Phone:</strong> +34 922 960 200<br>
                <strong>Location:</strong> Costa Adeje, Tenerife, Spain
              </p>
            </div>
            
            <div class="footer">
              <p>&copy; 2026 Abama Resort. All rights reserved.</p>
              <p>This is an automated response. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlMessage
    });
    
  } catch (error) {
    Logger.log('Error sending email: ' + error.toString());
    // Don't throw error - form submission should succeed even if email fails
  }
}

/**
 * Optional: Function to test the script locally
 * Run this from the Apps Script editor to verify everything works
 */
function testFormSubmission() {
  const testData = {
    timestamp: new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }),
    name: 'Test User',
    email: 'test@example.com',
    phone: '+34 666 777 888',
    gdpr: 'Yes'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log('Test result: ' + result.getContent());
}