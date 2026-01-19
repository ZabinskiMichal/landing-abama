# Customization Guide - Abama Resort Landing Page

## 🎯 Quick Customization Checklist

- [ ] Update event date/time
- [ ] Replace Unsplash image URLs with your photos
- [ ] Update resort contact information
- [ ] Configure Google Apps Script deployment
- [ ] Test form submission
- [ ] Review email template
- [ ] Test on mobile devices
- [ ] Update color scheme if needed
- [ ] Customize copy text
- [ ] Deploy to web hosting

## 📝 Text Customizations

### Hero Section
**Location in HTML**: Lines ~105-115

Current:
```html
<h1 class="text-5xl sm:text-7xl font-bold text-dark-gray tracking-tight mb-4">
    ABAMA RESORT
</h1>
<h2 class="text-2xl sm:text-4xl text-sand font-light tracking-wide mb-2">
    TENERIFE
</h2>
```

Update resort name and location as needed.

### Event Details Section
**Location in HTML**: Lines ~240-280

Update these key fields:
- **Date**: "Saturday, February 15th, 2026"
- **Time**: "10:00 AM - 6:00 PM"
- **Location**: "Costa Adeje, Tenerife, Spain"
- **Guest Limit**: "Limited to 150 guests"

### Footer Contact Information
**Location in HTML**: Lines ~420-450

Update these contact details:
- Email: `info@abamaresort.com`
- Phone: `+34 922 960 200`
- Address: `Costa Adeje, Tenerife`

## 🖼️ Image Replacements

All images currently use Unsplash placeholders. Replace with your resort photos.

### Hero Background Image
**Location in HTML**: Line ~80

```html
<div class="video-placeholder"></div>
```

Current CSS (line ~48-55):
```css
.video-placeholder {
    background: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=900&fit=crop') center/cover;
}
```

Replace with:
- Your resort aerial/hero photo
- Or set up a video element instead:
```html
<video autoplay muted loop>
    <source src="your-video.mp4" type="video/mp4">
</video>
```

### Experience Cards Images
**Location in HTML**: Lines ~160-205

Three images to replace:
1. **Infinity Pool** (line ~165): 
   ```html
   <img src="https://images.unsplash.com/photo-1576610616656-570f080db881?w=500&h=400&fit=crop" alt="Infinity Pool">
   ```

2. **Golf Course** (line ~182):
   ```html
   <img src="https://images.unsplash.com/photo-1587174486073-ae5e5471d9d7?w=500&h=400&fit=crop" alt="Golf Course">
   ```

3. **Luxury Interiors** (line ~199):
   ```html
   <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=400&fit=crop" alt="Luxury Interiors">
   ```

Replace each URL with your own high-quality images.

## 🎨 Color Scheme Customization

All colors are defined in the `<style>` section (lines 15-107).

### Main Colors
```css
.accent-gold { color: #d4af37; }           /* Primary accent */
.bg-accent-gold { background-color: #d4af37; }

.text-sand { color: #a89968; }             /* Secondary accent */
.text-dark-gray { color: #2a2a2a; }        /* Primary text */

body { background-color: #fafaf8; }        /* Light background */
```

### To Change Color Scheme:
1. Replace `#d4af37` with your accent color
2. Replace `#a89968` with your secondary color
3. Replace `#2a2a2a` with your text color
4. Replace `#fafaf8` with your background color
5. Update `#f5f1ed` and similar shades for gradients

## 📧 Email Template Customization

The confirmation email is in the Google Apps Script file.

**Location**: `google-apps-script.gs`, function `sendConfirmationEmail()`

Current template includes:
- Greeting with guest name
- Confirmation message
- Event details
- Contact information
- Footer

To customize:
1. Update the email subject line
2. Modify the HTML message template
3. Change contact details
4. Add/remove event information as needed

Example changes:
```javascript
const subject = 'Abama Resort - Your Open Day Invitation Request Received';
// Change subject to match your brand

const htmlMessage = `
  <!-- Update HTML here -->
  <h1>Abama Resort</h1>
  <p>Dear ${name},</p>
  <!-- ... rest of template ... -->
`;
```

## 🔤 Typography Customization

### Font Changes
**Location**: Lines 11-12 in HTML `<head>`

Current fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;500&display=swap" rel="stylesheet">
```

To change fonts:
1. Visit [Google Fonts](https://fonts.google.com)
2. Select your preferred fonts
3. Copy the import link
4. Replace the entire link element
5. Update CSS font-family declarations

**CSS Updates needed**:
```css
body {
    font-family: 'YOUR-BODY-FONT', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'YOUR-HEADING-FONT', serif;
}
```

## 🔧 Form Field Customization

### Add New Fields
To add fields (e.g., number of guests, property interest):

1. **Add HTML input** (around line 310-325):
```html
<div>
    <label for="guests" class="block text-dark-gray font-semibold mb-3 text-sm tracking-wide uppercase">Number of Guests</label>
    <input 
        type="number" 
        id="guests" 
        name="guests" 
        class="form-input w-full px-5 py-4 rounded-sm text-dark-gray"
        placeholder="1"
    >
</div>
```

2. **Update JavaScript** (around line 376-385):
```javascript
const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('countryCode') + ' ' + formData.get('phone'),
    guests: formData.get('guests'),  // Add this line
    gdpr: formData.get('gdpr') ? 'Yes' : 'No',
    timestamp: new Date().toLocaleString()
};
```

3. **Update Google Apps Script** (in the GS file):
   - Modify `addHeaders()` to include new column
   - Update `doPost()` to include new field in data

## 🚀 Google Apps Script Customization

### Change Sheet Name
**Location**: `google-apps-script.gs`, line 13

```javascript
let SHEET_NAME = "Form Submissions";  // Change name here
```

### Add Google Analytics
To track form submissions in Google Analytics:

```javascript
// In doPost() function, after successful submission:
logToGoogleAnalytics(postData.email, postData.name);

function logToGoogleAnalytics(email, name) {
  // Your Google Analytics tracking code here
}
```

### Extend Email Features
**Add admin notification email**:

```javascript
// In doPost(), after sendConfirmationEmail():
sendAdminNotification(postData);

function sendAdminNotification(data) {
  MailApp.sendEmail({
    to: 'admin@abamaresort.com',
    subject: 'New Open Day Submission: ' + data.name,
    htmlBody: '<p>Name: ' + data.name + '</p><p>Email: ' + data.email + '</p>'
  });
}
```

## 📱 Responsive Design Adjustments

The page uses Tailwind CSS breakpoints:
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)

To adjust breakpoints, find relevant classes:
- Hero text sizes: `text-5xl sm:text-7xl`
- Grid layouts: `grid md:grid-cols-3`
- Spacing: `px-4 sm:px-8`

## ✅ Testing Checklist

Before launching:

1. **Desktop Testing**
   - [ ] Hero section displays correctly
   - [ ] All images load properly
   - [ ] Form submits successfully
   - [ ] Confirmation email arrives

2. **Mobile Testing**
   - [ ] Navigation works on small screens
   - [ ] Form is easy to fill on mobile
   - [ ] Images scale appropriately
   - [ ] No horizontal scrolling

3. **Form Testing**
   - [ ] All required fields validate
   - [ ] GDPR checkbox is required
   - [ ] Email confirmation arrives
   - [ ] Data appears in Google Sheet
   - [ ] Phone number formats correctly

4. **Email Testing**
   - [ ] Subject line is correct
   - [ ] Email HTML renders properly
   - [ ] Links work
   - [ ] No typos or formatting issues

5. **Browser Compatibility**
   - [ ] Chrome/Edge works
   - [ ] Firefox works
   - [ ] Safari works
   - [ ] Mobile browsers work

## 💡 Pro Tips

1. **Use high-quality images**: Compression is important for page speed
2. **Test email spam filters**: Check Gmail/Outlook spam folders
3. **Monitor Google Sheets**: Set up notifications for new submissions
4. **A/B test copy**: Try different headlines and CTAs
5. **Track metrics**: Monitor conversion rate, bounce rate, etc.

---

**Remember**: Test all changes in a development environment before deploying to production!