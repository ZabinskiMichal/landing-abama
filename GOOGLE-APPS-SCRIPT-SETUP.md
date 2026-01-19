# Google Apps Script Setup - Step-by-Step Guide

## 🎯 Complete Setup Instructions

### Phase 1: Create Google Sheet

1. **Go to Google Sheets**
   - Open [sheets.google.com](https://sheets.google.com)
   - Click **+ New** (create new spreadsheet)

2. **Name your spreadsheet**
   - Click "Untitled spreadsheet" at the top
   - Name it: `Abama Resort - Open Day Submissions`
   - Press Enter

3. **Note your spreadsheet URL**
   - The URL will contain your Spreadsheet ID (between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/`**`1A2b3C4d5E6f7G8h9I0j`**`/edit`
   - Keep this ID handy for later

---

### Phase 2: Set Up Google Apps Script

1. **Open Apps Script Editor**
   - In your spreadsheet, click **Extensions** (top menu)
   - Select **Apps Script**
   - A new tab will open with the Apps Script editor

2. **Clear default code**
   - Select all default code (Ctrl+A)
   - Delete it

3. **Paste the Google Apps Script code**
   - Copy the entire contents from `google-apps-script.gs`
   - Paste it into the editor
   - You should see the functions: `doPost()`, `getOrCreateSheet()`, `addHeaders()`, etc.

4. **Save the project**
   - Click **File** → **Save** (or Ctrl+S)
   - Name it: `Abama Form Handler`
   - Click **OK**

---

### Phase 3: Deploy as Web App

1. **Create deployment**
   - Click the **Deploy** button (top right, blue button)
   - A dropdown appears, click **New deployment**

2. **Configure deployment settings**
   - **Select type**: Click the dropdown and choose **Web app**
   - **Execute as**: Select your Google account (the one owning the sheet)
   - **Who has access**: Select **Anyone** (important for form submissions)

3. **Deploy**
   - Click **Deploy** button
   - A dialog will appear asking for permissions
   - Grant the required permissions (Apps Script needs to access your sheets and send emails)
   - Click **Allow**

4. **Copy the deployment URL**
   - A new dialog shows your deployment URL
   - Example: `https://script.google.com/macros/d/AKfycbz_1A2B3C4D5E6F7G8H9I0J/userweb?v=1`
   - **Copy this entire URL** - you'll need it for the HTML

5. **Close the dialog**
   - Click the X to close
   - You can always find your deployment URL again by clicking **Deploy** → **Manage deployments**

---

### Phase 4: Update HTML with Deployment URL

1. **Open index.html**
   - Open the file in a text editor

2. **Find the Google Apps Script URL line**
   - Search for (around line 370):
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/userweb?v=1';
   ```

3. **Replace with your actual URL**
   - Delete `YOUR_DEPLOYMENT_ID` section
   - Paste your full deployment URL from step 4 above
   - Example result:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/AKfycbz_1A2B3C4D5E6F7G8H9I0J/userweb?v=1';
   ```

4. **Save the HTML file**
   - Save your changes

---

### Phase 5: Test the Form

1. **Open the HTML in browser**
   - Open `index.html` in your web browser
   - You should see the landing page

2. **Fill out the form**
   - Scroll down to "Secure Your Invitation" section
   - Fill in all fields:
     - Name: `Test User`
     - Email: Your actual email
     - Country Code: `+34`
     - Phone: `123 456 7890`
     - Check GDPR consent box
   - Click "Confirm Attendance"

3. **Verify submission**
   - You should see a success message in green
   - Check your email (including spam folder) for confirmation email
   - Go back to Google Sheets and refresh
   - You should see a new row with your test data

4. **Check confirmation email**
   - The email should be from your Google account
   - It should include event details and contact information
   - Subject: "Abama Resort - Your Open Day Invitation Request Received"

---

## 🔍 Troubleshooting

### Problem: Form not submitting
**Solution:**
1. Check browser console (F12 → Console tab)
2. Look for error messages
3. Verify Google Apps Script URL is correct
4. Make sure deployment is set to "Anyone" access
5. Test with a simpler form field first

### Problem: No error message but nothing happens
**Solution:**
1. Verify CORS is not blocked (deployment should handle this)
2. Check that Google Apps Script is deployed correctly
3. Try the test function in Google Apps Script:
   - Open Google Apps Script editor
   - Click **Run** next to `testFormSubmission()` function
   - Check the execution logs

### Problem: Email not received
**Solution:**
1. Check spam/promotions folder
2. First deployment requires Google permission - accept it
3. Verify email address in form is correct
4. Check Google Apps Script logs for errors:
   - In editor, click **Execution log** at bottom
   - Look for error messages

### Problem: Data not appearing in Google Sheet
**Solution:**
1. Refresh your Google Sheet (F5)
2. Check that correct sheet name is being used
3. Verify the Google Apps Script is deployed to the right spreadsheet
4. Check execution logs in Google Apps Script editor for errors

### Problem: GDPR Consent error
**Solution:**
1. Make sure checkbox is actually checked when submitting
2. The checkbox field ID must be "gdpr"
3. It's required to submit the form

---

## 📊 Managing Submissions

### View Responses
1. **Open your Google Sheet**
2. **First row** contains headers: Timestamp, Full Name, Email, Phone, GDPR Consent
3. **Each row below** is a new submission
4. Data is automatically formatted

### Export Data
1. **Select all data** (Ctrl+A)
2. **Copy** (Ctrl+C)
3. **Paste in Excel** if needed, or
4. **Download as CSV**: File → Download → CSV

### Add Filters
1. **Click first row** (headers)
2. **Data menu** → **Create a filter**
3. Now you can filter by date, name, GDPR consent, etc.

### Share Access
1. **Click Share** (top right of Google Sheet)
2. Add email addresses of team members
3. Give them "Viewer" or "Editor" access as needed

---

## 🔐 Security Considerations

### Protect Your Sheet
1. **Don't share the deployment URL publicly** (only in your HTML)
2. **Keep Google Sheet private** (don't share link in public)
3. **Review submissions regularly** for spam
4. **Enable two-factor authentication** on your Google account

### Data Privacy
- Data stays in your Google Sheet (you control it)
- Automatic emails are sent from your Google account
- No third-party services receive the data
- GDPR compliant (you collect consent)

---

## 🆘 Advanced: Manual Deployment Update

If you need to update the script later:

1. **Open Google Apps Script editor**
   - Go to your Google Sheet
   - Extensions → Apps Script

2. **Make your changes**
   - Edit the script code

3. **Save** (Ctrl+S)

4. **Create new deployment**
   - Click Deploy → New deployment
   - This creates a new version
   - Copy the new URL

5. **Update HTML**
   - Replace the old URL with the new one in index.html

---

## 📋 Deployment Checklist

- [ ] Google Sheet created and named
- [ ] Google Apps Script code pasted into editor
- [ ] Project saved as "Abama Form Handler"
- [ ] Deployed as Web app
- [ ] Execute as: Your Google account
- [ ] Who has access: Anyone
- [ ] Deployment URL copied
- [ ] HTML updated with correct URL
- [ ] Test form submission successful
- [ ] Confirmation email received
- [ ] Data appears in Google Sheet
- [ ] Ready for production!

---

## 💡 Pro Tips

1. **Monitor Submissions**: Set Google Sheets notification to alert you of changes
2. **Auto-reply**: Customize the confirmation email template
3. **Data Backup**: Download CSV weekly for backup
4. **Spam Filter**: Add email validation on frontend and backend
5. **Rate Limiting**: Consider adding submission limits to prevent spam

---

## 📞 Need Help?

If deployment fails:
1. Check Google Apps Script execution log (bottom of editor)
2. Grant necessary permissions when prompted
3. Verify all URLs are complete and correct
4. Test with the `testFormSubmission()` function in Apps Script
5. Check browser console for JavaScript errors

---

**Congratulations!** Your Abama Resort Open Day form is now live! 🎉