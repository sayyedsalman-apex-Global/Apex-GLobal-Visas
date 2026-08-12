# Walkthrough - UI Updates, Contact Info Integration, Mobile Optimization, FAQ Section, and Modal Linking

We have completed all UI adjustments, contact info integrations, mobile responsiveness enhancements, added the interactive FAQ section, and linked the Hero button to the Scheduler:

---

## 1. Updated Contact Info
- **[Footer.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/Footer.jsx)**:
  - Replaced the temporary Bangalore address with: `800/2, Gurunanak Nagar, Gaibanshah Dargah Road, LBS Marg, Next to Madhuban Toyota Showroom, Ghatkopar West, Mumbai - 400086`.
  - Replaced the toll-free number with: `+91 70453 62942 / +91 91365 20802`.
  - Replaced the email address with: `sayyedsalman@apexglobalvisas.com`.
- **[ContactForm.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/ContactForm.jsx)**:
  - Replaced the phone number desk details with: `+91 70453 62942 / +91 91365 20802`.
  - Replaced the email info with: `sayyedsalman@apexglobalvisas.com`.
  - Added `to_email: 'sayyedsalman@apexglobalvisas.com'` explicitly to the template variables in the form submit handler.
- **[DocumentChecklist.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/DocumentChecklist.jsx)**:
  - Updated the downloaded report footer email pointer to: `sayyedsalman@apexglobalvisas.com`.

## 2. Integrated Official Instagram & QR Code Card
- **[ContactForm.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/ContactForm.jsx)**:
  - Added a premium **"Official Socials"** card in the info column displaying:
    - **SCAN THIS FOR SOCIALS** button linking to the Instagram profile, opening in a new tab (`target="_blank"`).
    - An **Instagram QR code image** (`/instagram-qr.png`) which is fully clickable and opens the Instagram profile in a new tab (`target="_blank"`).
- **QR Code Asset**:
  - Generated a clean, high-resolution QR code image using `generate_image` and saved it to the public assets directory (`public/instagram-qr.png`) for seamless frontend asset resolution.

## 3. Social Icons Integration
- **[Navbar.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/Navbar.jsx)** & **[Footer.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/Footer.jsx)**:
  - Added clickable **Instagram social icons** pointing to their profile link.
  - Rendered utilizing cross-browser compatible custom inline SVG structures to avoid dependency errors.
  - Removed the Instagram icon button next to the desktop "Login" button per request, keeping the mobile menu layout intact.

## 4. Verified Forms & Routing
- **Navbar Triggers**:
  - Verified the **"Book Advisory"** button correctly blocks unauthenticated requests and triggers the login prompt, while authenticated sessions automatically scroll the view to the `#contact` segment.
  - Checked the **"Schedule Consultation"** links (desktop dropdown and mobile list) which safely check auth before opening the interactive scheduling modal.
- **Booking Scheduler Modal**:
  - Refactored **[BookingScheduler.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/BookingScheduler.jsx)** to collect all required fields including **Phone Number** and **Target Destination** (rendered with dropdown options matching the countries list).
  - Integrated **EmailJS** notifications directly inside the scheduler submission handler. On booking confirmation, a template payload (including name, email, phone, target country, date, slot, and notes) is dispatched to `sayyedsalman@apexglobalvisas.com`.
  - Replaced render state side-effects with a lazy state initializer to maintain strict React-hooks lint compliance.

## 5. Mobile Responsiveness & Fit
- **Global Layout Constraints**:
  - Added `overflow-x: hidden` and `max-width: 100vw` properties to both `html` and `body` in **[index.css](file:///c:/Users/Harsh%20Pandey/Apex/src/index.css)** to eliminate horizontal scrollbars on mobile.
- **Navigation & Mobile Drawer**:
  - Switched the Hamburger Menu breakpoint in **[Navbar.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/Navbar.jsx)** from `lg` (1024px) to `md` (768px), ensuring it targets smaller devices correctly.
  - Added a `max-h-[85vh]` and `overflow-y-auto` scroll container container to the mobile dropdown menu panel so long menus scroll comfortably on short screen viewports.
- **Interactive Modals & Popups**:
  - Added scroll limits (`max-h-[95vh]`) and `overflow-y-auto` parameters to **[AuthModal.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/AuthModal.jsx)** to prevent login/signup forms clipping.
  - Optimized margins and padding size (e.g. `p-5` on mobile instead of `p-6.5`/`p-8`) across **[AuthModal.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/AuthModal.jsx)**, **[BookingScheduler.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/BookingScheduler.jsx)**, **[DocumentChecklist.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/DocumentChecklist.jsx)**, and the news article overlay in **[NewsSection.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/NewsSection.jsx)**.
- **Typography Scaling**:
  - Tuned layout section spacing (e.g., standardizing margins/padding to `py-16 sm:py-24`) and downscaled headings (e.g., changing hero font sizes from `text-4xl sm:text-6xl lg:text-7.5xl` to `text-3xl sm:text-5xl lg:text-7xl`) in **[Hero.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/Hero.jsx)**, **[Services.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/Services.jsx)**, **[Process.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/Process.jsx)**, **[Testimonials.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/Testimonials.jsx)**, **[NewsSection.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/NewsSection.jsx)**, and **[ContactForm.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/ContactForm.jsx)**.

## 6. Interactive FAQ Section
- **New FAQ Accordion Component**:
  - Created **[FAQ.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/FAQ.jsx)** to house the accordion layout.
  - Features a clean, smooth expand/collapse transition utilizing Tailwind variables and a rotating chevron icon.
  - Imported and rendered right before the **Contact Form** section inside the core application layout in **[App.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/App.jsx)**.

## 7. Consult Specialist Button Linking
- **[Hero.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/Hero.jsx)**:
  - Added `useAuth` integration and updated the `onClick` event handler of the main **"Consult Specialist"** hero action button.
  - Verified click behavior: Unauthenticated requests block navigation and present the client login panel, while authenticated users trigger the interactive **1-on-1 Consultation Booking Scheduler** modal.
- **[App.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/App.jsx)**:
  - Passed the `onOpenScheduler` state setter prop to `<Hero />` to correctly wire layout events.

---

## 8. Verification & Build
- Ran `npm run build` to verify error-free production-ready builds.
- Checked ESLint parameters (`npm run lint`), fixing multiple unused React and lucide icon warnings across all modified components.

## 9. Footer Contact Section Updates
- **[Footer.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/Footer.jsx)**:
  - Updated the Instagram block: wrapped both the SVG icon and the new text "@APEXGLOBALVISAS" in a flex row within a single `<a>` tag pointing to `https://www.instagram.com/apexglobalvisas` with `target="_blank"` and `rel="noopener noreferrer"`.
  - Added clean styling and a hover effect using the parent's `group` tag for `group-hover:border-slate-750` on the icon box, and `hover:text-white` on the entire link.
  - Wrapped the email `sayyedsalman@apexglobalvisas.com` in a clickable `<a>` mailto link (`href="mailto:sayyedsalman@apexglobalvisas.com"`) with a clean `hover:text-white` hover effect.
  - Confirmed the build compiled successfully without error.

## 10. Official Socials Card Updates
- **[ContactForm.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/ContactForm.jsx)**:
  - Removed the white Instagram QR code container and link completely from the right side of the card, creating a cleaner single-column content stack.
  - Updated the description text to: *"Follow us on Instagram for daily visa updates and success stories."*
  - Replaced the generic "SCAN THIS FOR SOCIALS" button with a highly stylized Instagram-branded gradient button (`from-pink-600 to-rose-500`) containing the Instagram SVG icon and the text `@APEXGLOBALVISAS`.
  - Configured the button to link to `https://www.instagram.com/apexglobalvisas` and open in a new tab (`target="_blank"`).
  - Verified compilation build succeeded.

## 11. Review Submission Flow & Admin Approval Updates
- **[Testimonials.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/Testimonials.jsx)**:
  - **Removed Sections**: Completely removed the public "Need references..." banner card and the "Open Moderator Dashboard" button from the bottom of the page.
  - **Hidden Admin Mode**: Configured `useEffect` to enable `isAdminMode` only when the query parameter `?admin=true` is present in the URL (e.g., `http://localhost:5173/?admin=true`), restoring the dashboard for admin auditing purposes while keeping it hidden from standard clients.
  - **Review Submission Flow**: Updated new reviews to initialize with `approved: false` so they are not instantly published.
  - **Email Notification**: Integrated EmailJS parameters to dispatch notifications directly to `sayyedsalman@apexglobalvisas.com` with Client Name, Rating, and Review Message.
  - **Action Links**: Included direct URL action links in the notification email for one-click action from the admin:
    - **Approve**: `?approve_review=<id>` (automatically publishes the review from the pending queue to the live testimonials block).
    - **Discard**: `?reject_review=<id>` (removes the review from the queue).
  - **Success Message**: Updated the confirmation modal copy to: *"Thank you! Your review has been submitted for verification and will appear on the site once approved."*
  - **Compilation Check**: Verified the code compiles successfully.

## 12. Testimonials Section Headline Update
- **[Testimonials.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/Testimonials.jsx)**:
  - Changed the section headline text from `"Loved By Over 15,050 Clients"` to `"Trusted By Over 15,000 Clients"`.

## 13. Global Destinations Card Update
- **[content.js](file:///c:/Users/Harsh%20Pandey/Apex/src/data/content.js)**:
  - Updated the `"Many More Countries"` (id: `global`) card with the new description containing Turkey instead of UK.
  - Replaced the categories with:
    - `Turkey & Europe: eVisa, Tourist & Business Permits`
    - `UAE / Dubai: Express Tourist & Golden Visas`
    - `Asia-Pacific: Japan, Singapore & South Korea eVisas`
    - `Custom Guidance: Personalised Application Structuring`
- **[Services.jsx](file:///c:/Users/Harsh%20Pandey/Apex/src/components/Services.jsx)**:
  - Updated the button label to exactly `"Apply Other Destination ↗"` for the global card.
  - Prevented double rendering of the arrow icon by conditionally hiding the Lucide `ArrowUpRight` icon for the global card since the label text already contains the arrow symbol.
- **Verification**:
  - Ran `npm run build` to confirm compilation is clean with zero warnings or errors.


