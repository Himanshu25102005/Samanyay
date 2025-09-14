### ✅ Frontend Requirements

- A simple, functional UI is implemented for the app. [ ]
- Users can register with an email and password via a form. [✅ ]
- Users can log in with their credentials via a form. [✅ ]
- Protected routes/pages are accessible only after login. [ ]
- A personal dashboard is displayed after login. [ ]
- Users can create a new case with: [ ]
    Case Title input [ ]
    Case Description input [ ]
- The dashboard lists all cases created by the logged-in user. [ ]
- Users cannot view other users’ cases. [ ]
- Users can upload files (e.g., PDF documents) for each case. [ ]
- A file upload form is present and functional. [ ]
- A profile or dashboard page includes an “Upgrade to Pro” button. [ ]
- Clicking the button redirects users to a payment page. [ ]
- After successful payment, the UI reflects the upgraded “Pro” status. [ ]
- The interface is easily navigable from login → dashboard → case details → payment. [ ]

### ✅ Backend Requirements

Users can register for a new account using email and password. [ ]
Passwords are securely hashed before storing in the database. [ ]
Users can log in with their credentials. [ ]
A secure session management system (e.g., JWT) is implemented. [ ]
Protected routes/pages are accessible only to logged-in users. [ ]
A personal dashboard is available after login. [ ]
Users can create a new case with title and description. [ ]
Cases are stored and associated with the correct user in the database. [ ]
The dashboard lists only the cases created by the logged-in user. [ ]
Users cannot access or see cases of other users. [ ]
Users can upload files (e.g., PDFs) for each case. [ ]
File uploads are handled securely and associated with the correct case. [ ]
A payment system is integrated using Stripe or Razorpay. [ ]
An "Upgrade to Pro" option is available on the dashboard/profile. [ ]
Users are redirected to the payment gateway page to complete transactions. [ ]
Upon successful payment, the user's account is updated (e.g., `isPro = true`). [ ]
Database schemas for users and cases are designed and implemented. [ ]
Environment variables (e.g., DB connection, API keys) are used securely. [ ]
API endpoints are documented clearly if frontend and backend are separated. [ ]




