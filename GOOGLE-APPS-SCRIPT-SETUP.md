# Google Apps Script Setup - Step-by-Step Guide

## 🎯 Complete Setup Instructions

### Phase 1: Create Google Sheet

1. **Go to Google Sheets**
   - Open [sheets.google.com](https://sheets.google.com)
   - Click **+ New** (create new spreadsheet)

2. **Name your spreadsheet** (optional)
   - Click "Untitled spreadsheet" at the top
   - Name it, e.g. `Abama Resort - Leads`
   - Press Enter

---

### Phase 2: Set Up Google Apps Script

1. **Open Apps Script Editor**
   - In your spreadsheet, click **Extensions** → **Apps Script**

2. **Clear default code**
   - Select all default code (Ctrl+A)
   - Delete it

3. **Paste the Google Apps Script code**
   - Copy the entire contents from `google-apps-script.gs`
   - Paste it into the editor
   - You should see the functions: `doOptions()`, `doPost()`, `getOrCreateSheet()`, etc.

4. **Save the project**
   - Click **File** → **Save** (or Ctrl+S)
   - Name it: `Abama Form Handler`

---

### Phase 3: Deploy as Web App

1. **Create deployment**
   - Click the **Deploy** button (top right)
   - Click **New deployment**

2. **Configure deployment settings**
   - **Select type**: **Web app**
   - **Execute as**: your Google account
   - **Who has access**: **Anyone**

3. **Deploy**
   - Click **Deploy**
   - Grant the required permissions

4. **Copy the deployment URL**
   - It will look like:
     `https://script.google.com/macros/s/AKfycbxxxxxxx/exec`
   - Copy the full URL

---

### Phase 4: Update HTML with Deployment URL

1. **Open index.html**
2. **Find the Google Apps Script URL line**
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
   ```
3. **Replace with your actual URL**
4. **Save the file**

---

### Phase 5: Test the Form

1. **Open the HTML in browser**
2. **Fill out the form**
   - Name (required)
   - Email (required)
   - Phone (optional)
3. **Submit**
4. **Verify**
   - A success message should appear
   - Open Google Sheets and confirm a new row in the `Leads` tab

---

## 📊 Managing Submissions

- The script will create a sheet named **Leads** if it doesn't exist.
- The header order is:
  1. `timestamp`
  2. `name`
  3. `email`
  4. `phone`
  5. `company`
  6. `message`
  7. `consent`
  8. `utm_source`
  9. `utm_medium`
  10. `utm_campaign`
  11. `utm_content`
  12. `utm_term`

---

## 🔍 Troubleshooting

### Problem: Form not submitting
- Verify the Apps Script URL is correct
- Ensure the deployment is set to **Anyone**
- Check browser console for errors

### Problem: Data not appearing in Google Sheet
- Refresh the sheet
- Confirm the Apps Script project is bound to the correct spreadsheet
- Check Apps Script execution logs

### Problem: "Too many submissions" error
- The script blocks repeated submissions from the same email within 60 seconds
- Wait a minute and retry

---

## 🔐 Security Notes

- The script uses a honeypot field (`website`) and basic rate limiting.
- Keep the sheet private and do not share the deployment URL publicly.
