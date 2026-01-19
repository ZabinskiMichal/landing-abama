# Abama Resort Tenerife - Exclusive Open Day Landing Page

## 📋 Project Overview

A luxury, minimalist landing page for an exclusive "Open Day" event at Abama Resort in Tenerife. Built with single HTML file, Tailwind CSS, and Google Apps Script backend for lead capture.

## ✨ Features

- **Responsive Design**: Perfectly optimized for mobile, tablet, and desktop
- **Luxury Aesthetic**: Quiet luxury design with gold accents, premium typography (Playfair Display & Lato)
- **Hero Section**: Full-screen hero with video placeholder
- **Experience Showcase**: 3-column grid showing Infinity Pool, Golf Course, and Interiors
- **Event Details**: Clear presentation of date, time, location, and expectations
- **Lead Capture Form**: Elegant form with name, email, phone (with country code), and GDPR checkbox
- **Google Apps Script Integration**: Direct integration with Google Sheets for data collection
- **Confirmation Emails**: Automatic email responses to applicants
- **Mobile-First**: Built with Tailwind CSS for perfect mobile responsiveness

## 📁 Files Included

- `index.html` - Complete single-file landing page
- `google-apps-script.gs` - Google Apps Script backend code
- `README.md` - This file

## 🚀 Quick Start

### 1. **Deploy the HTML Landing Page**

1. Open `index.html` in your browser or deploy it to a web hosting service:
   - GitHub Pages
   - Netlify
   - Vercel
   - Any static hosting service

### 2. **Set Up Google Apps Script Backend**

**Step-by-step instructions:**

1. **Create/Open Google Sheets:**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new spreadsheet named "Abama Resort - Open Day Submissions"

2. **Access Apps Script:**
   - In the spreadsheet, click **Extensions** → **Apps Script**
   - A new tab will open with the Apps Script editor

3. **Paste the Script:**
   - Copy all content from `google-apps-script.gs`
   - Paste it into the Apps Script editor (replacing any default code)
   - Click **Save** (or Ctrl+S)
   - Name the project "Abama Form Handler"

4. **Deploy the Web App:**
   - Click the **Deploy** button (top right)
   - Select **New deployment**
   - Choose type: **Web app**
   - Set "Execute as": Your Google account
   - Set "Who has access": **Anyone**
   - Click **Deploy**

5. **Copy the Deployment URL:**
   - A modal will show your deployment URL (starts with `https://script.google.com/macros/d/...`)
   - Copy this URL

6. **Update the HTML:**
   - Open `index.html`
   - Find this line (around line 370):
     ```javascript
     const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/userweb?v=1';
     ```
   - Replace `YOUR_DEPLOYMENT_ID` with your actual deployment ID
   - Save the file

## 🎨 Design Details

### Color Palette
- **Primary Gold (Accent)**: #d4af37
- **Dark Text**: #2a2a2a
- **Sand/Beige**: #a89968
- **Background**: #fafaf8
- **White**: #ffffff

### Typography
- **Headings**: Playfair Display (serif, elegant)
- **Body Text**: Lato (clean, modern)
- **Font Sizes**: Responsive scaling for mobile/desktop

### Image Placeholders
- All images use Unsplash source URLs
- Replace with actual resort photos before launch
- Mark locations in HTML with `[REPLACE WITH YOUR IMAGE]` comments

## 📝 Form Fields

The form captures:
- **Full Name** (required)
- **Email Address** (required, validated)
- **Phone Number** (required, with country code input)
- **GDPR Consent Checkbox** (required)

Data is automatically sent to Google Sheets and confirmation email is sent to the applicant.

## 🔧 Customization

### Update Resort Details
In the HTML, find and update:
- Event date/time (currently Feb 15, 2026)
- Location details
- Contact email and phone
- Description text

### Update Images
Replace Unsplash image URLs with your own:
- Hero section background
- Experience cards (Pool, Golf, Interiors)
- Any other images

### Modify Colors
Search and replace color codes:
- `#d4af37` - Gold accent color
- `#a89968` - Sand color
- `#2a2a2a` - Dark text
- `#fafaf8` - Light background

### Customize Text Copy
All text is clearly labeled in the HTML. Update:
- Headlines
- Descriptions
- Button text
- Footer content

## 📧 Email Configuration

The Google Apps Script sends automatic confirmation emails. To customize:

1. Open the Google Apps Script editor
2. Find the `sendConfirmationEmail()` function
3. Modify the email subject and HTML template as needed
4. The email includes event details and contact information

## 🔐 Privacy & GDPR

- GDPR checkbox is required for form submission
- All data is stored in your private Google Sheet
- No third-party integrations capture data
- Compliance-ready design

## 📊 Data Storage

All form submissions are automatically stored in your Google Sheet with:
- Timestamp (Spain timezone)
- Full Name
- Email Address
- Phone Number (with country code)
- GDPR Consent status

You can access this data anytime via your Google Sheet.

## 🌐 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support (responsive design)

## 📱 Mobile Optimization

- Touch-friendly buttons and inputs
- Responsive grid layouts
- Optimized images for mobile
- Mobile-first design approach

## 🚨 Troubleshooting

### Form not submitting?
1. Check that Google Apps Script URL is correctly pasted
2. Verify the deployment is set to "Anyone" access
3. Check browser console (F12) for errors

### No emails received?
1. Check that MailApp has permission (Apps Script will ask on first run)
2. Verify the email is sent to a valid email address
3. Check spam folder

### Images not loading?
1. Unsplash URLs are public and should work automatically
2. If needed, download and host images yourself

## 💡 Tips for Success

1. **Test the form** before going live:
   - Fill out the form and verify data appears in Google Sheet
   - Check that confirmation email arrives

2. **Customize with real images**:
   - Replace Unsplash placeholders with actual resort photos
   - Use high-quality, professional images

3. **Test on mobile**:
   - Use browser DevTools to test responsiveness
   - Test on actual mobile devices before launch

4. **Monitor submissions**:
   - Check Google Sheet regularly for new submissions
   - Respond to applicants within 48 hours as promised

5. **Track analytics**:
   - Add Google Analytics if needed
   - Monitor conversion rates and user engagement

## 📞 Support

For issues or questions:
- Review Google Apps Script logs for errors
- Check that all URLs are correctly configured
- Verify Google Sheets permissions

---

**Created for Abama Resort - Luxury Real Estate Open Day Event**
*Exclusive. Minimalist. Sophisticated.*