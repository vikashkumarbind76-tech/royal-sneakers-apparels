# Royal Sneakers Deployment Checklist

## Issues to Fix Before Deployment

### 1. Missing supabase.js File
- **Location**: Referenced in index.html and products.html
- **Problem**: File does not exist
- **Solution**: Either:
  - Create a basic supabase.js file with Supabase initialization
  - Remove the script tag if Supabase functionality is not needed

### 2. Missing Models Directory
- **Location**: Referenced in product data (script.js lines 23, 33, 44, etc.)
- **Problem**: models/ directory does not exist
- **Solution**: Either:
  - Create models/ directory and add the referenced .glb files
  - Update product data to use the REMOTE_MODEL_FALLBACK_URL
  - Update product data to use FALLBACK_IMAGES for 3D models

### 3. EmailJS Template ID Inconsistency
- **Locations**:
  - email.js: template_4mxdytl
  - config.json: template_l5669k5
- **Problem**: Different template IDs configured
- **Solution**: Use the same template ID in all locations

### 4. Missing Constants in admin.js
- **Location**: admin.js references EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY
- **Problem**: These constants are not defined in admin.js
- **Solution**: Either:
  - Import these from email.js
  - Define them directly in admin.js
  - Load email.js before admin.js and access via window.EMAILJS_CONFIG

## Files That Exist and Appear Correct

- index.html - Main homepage
- products.html - Products page
- admin.html - Admin interface
- style.css - Main stylesheet
- admin.css - Admin stylesheet
- script.js - Main application logic
- email.js - EmailJS integration
- config.json - Site configuration
- admin.js - Admin interface logic

## Deployment Steps

1. Fix the issues listed above
2. Host on a static web server (Netlify, Vercel, GitHub Pages, etc.)
3. Test localStorage functionality (add to cart, persist data)
4. Test email functionality with EmailJS
5. Test admin interface login (admin/Vikash09)
6. Verify responsive design on mobile devices

## Local Testing Notes

Due to browser security restrictions, localStorage may not work properly when opening files directly via file:// protocol. For proper testing, use a local development server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve -l 8000

# Then visit http://localhost:8000
```