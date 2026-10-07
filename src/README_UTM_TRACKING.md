# UTM Tracking & Tracker Codes Implementation

## Overview
This document describes the UTM tracking and tracker code implementation for the Beyond Acres website.

## Features Implemented

### 1. **7 Tracker Codes**
All 7 tracker codes have been added to the site:
- AA68a807180b46a
- AA6a43b8494f4a2
- AA6a43b865acf8c
- AA6a43b87cd6cf3
- AA6a43b895c4a60
- AA6a43b8cd3cd68
- AA6a43b8fdafd79

**Location**: `/src/lib/tracker-init.ts`
**Initialization**: Automatically initialized on page load via HomePage

### 2. **UTM Parameter Capture**
The site now captures the following UTM parameters from the URL:
- `utm_source` - Source of the traffic
- `utm_medium` - Medium of the traffic
- `utm_campaign` - Campaign name
- `utm_content` - Content identifier
- `utm_term` - Search term
- `trackCode` - Custom track code (custom parameter)
- `campaignLabel` - Campaign label (custom parameter)

**Location**: `/src/lib/utm-tracker.ts`

### 3. **Form Data Submission to CMS**
All forms on the site now submit captured UTM parameters to the CMS:

#### Forms Updated:
1. **EnquiryPopup** - Popup form for brochure download
2. **ContactSection** - Main contact form
3. **HomePage** - Handles form submissions from all sections

#### CMS Collection: `inquiries`
New fields added to store UTM data:
- `utmSource` - TEXT
- `utmMedium` - TEXT
- `utmCampaign` - TEXT
- `utmContent` - TEXT
- `utmTerm` - TEXT
- `gclid` - TEXT (Google Click ID from paid search ads)
- `trackCode` - TEXT
- `campaignLabel` - TEXT

### 4. **How It Works**

#### URL Example:
```
https://beyondacres.in/?utm_source=google&utm_medium=cpc&utm_campaign=search_ba_2&utm_term=test&gclid=test123
```

UTM values are read **only** from `window.location.search`. Any unrelated query parameters present in the URL are ignored. Custom routing parameters (e.g. `page=home`) are never used.

#### Flow:
1. User visits site with UTM parameters in URL
2. `initializeUTMTracking()` is called on page load
3. UTM parameters are extracted and stored in sessionStorage
4. When user submits a form, UTM parameters are automatically included
5. Form data + UTM parameters are sent to the CMS `inquiries` collection

#### Persistence:
- UTM parameters are stored in sessionStorage
- They persist across page navigation within the same session
- New URL parameters override stored values

### 5. **Usage**

#### For Marketing Teams:
Create tracking URLs with UTM parameters:
```
https://www.beyondacres.in?utm_source=facebook&utm_medium=social&utm_campaign=launch&trackCode=AA68a807180b46a&campaignLabel=Facebook_Launch
```

#### In CMS:
All form submissions will include the UTM data, allowing you to:
- Track which campaigns generate inquiries
- Analyze source effectiveness
- Segment leads by traffic source
- Monitor campaign performance

### 6. **Files Modified/Created**

**Created:**
- `/src/lib/utm-tracker.ts` - UTM parameter capture and storage
- `/src/lib/tracker-init.ts` - Tracker code initialization
- `/src/README_UTM_TRACKING.md` - This documentation

**Modified:**
- `/src/components/pages/HomePage.tsx` - Added UTM initialization
- `/src/components/EnquiryPopup.tsx` - Added UTM parameter capture
- `/src/components/sections/ContactSection.tsx` - Added UTM parameter capture
- `/src/components/Head.tsx` - Added tracker codes as meta tags

**CMS:**
- `inquiries` collection - Added 7 new fields for UTM data

### 7. **Testing**

#### Test URL:
```
https://beyondacres.in/?utm_source=google&utm_medium=cpc&utm_campaign=search_ba_2&utm_term=test&gclid=test123
```

#### Steps:
1. Visit the test URL
2. Fill out any form (popup or contact form)
3. Submit the form
4. Check the CMS `inquiries` collection
5. Verify that UTM parameters are stored in the new fields

### 8. **Tracker Codes Reference**

The tracker codes are available in multiple ways:

**In Code:**
```typescript
import { getTrackerCodes } from '@/lib/tracker-init';
const codes = getTrackerCodes(); // Returns array of all 7 codes
```

**In HTML Meta Tags:**
```html
<meta name="tracker-0" content="AA68a807180b46a" />
<meta name="tracker-1" content="AA6a43b8494f4a2" />
<!-- ... etc -->
```

**In Window Object:**
```javascript
window.__TRACKER_CODES__ // Array of all 7 codes
```

### 9. **Notes**

- UTM parameters are case-sensitive
- Parameters are stored in sessionStorage (cleared when browser closes)
- If no UTM parameters are in URL, previously stored values are used
- All form submissions automatically include current UTM parameters
- Tracker codes are injected into page head on load
