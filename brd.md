# **Business Requirements Document (BRD)**

## **Survey Panel — Survey-Based Rewards Platform**

---

| Field          | Details                         |
| -------------- | ------------------------------- |
| Document Title | Business Requirements Document  |
| Platform Name  | Survey Panel                    |
| Prepared by    | Pronttera                       |
| Contact        | info@pronttera.com              |
| Prepared for   | Beacon Martech Private Limited  |
| Version        | 2.0                             |
| Date           | May 2026                        |
| Status         | Draft — Pending Client Sign-off |

---

## **Table of Contents**

1. [Project Overview](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#1-project-overview)
2. [Business Model](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#2-business-model)
3. [Tech Stack](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#3-tech-stack)
4. [Applications Overview](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#4-applications-overview)
5. [Application 1 — Admin Portal](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#5-application-1--admin-portal)
   - 5.1 Authentication
   - 5.2 Role Hierarchy
   - 5.3 Super Admin — Admin Management
   - 5.4 Super Admin — Department Management
   - 5.5 Reward Units
   - 5.6 Survey Management
   - 5.7 User Management
   - 5.8 Analytics Dashboard
   - 5.9 Wallet & Payments
   - 5.10 Support Tickets
   - 5.11 Profile & Organisation Settings
6. [Application 2 — User App](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#6-application-2--user-app)
   - 6.1 VPN Detection
   - 6.2 Registration
   - 6.3 User Onboarding
   - 6.4 Survey Feed
   - 6.5 Survey Flow
   - 6.6 Wallet
   - 6.7 Analytics
   - 6.8 Profile & Preferences
   - 6.9 Support Tickets
7. [Application 3 — Server Application](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#7-application-3--server-application)
   - 7.1 External Survey API
   - 7.2 Token Flow
   - 7.3 Manual Payout (Withdrawal) Flow
8. [Third-Party Integrations](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#8-third-party-integrations)
9. [Security Requirements](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#9-security-requirements)
10. [Scope of Work](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#10-scope-of-work)
11. [Budget & Payment Terms](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#11-budget--payment-terms)
12. [What's Included & Excluded](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#12-whats-included--excluded)

---

## **1\. Project Overview**

Survey Panel is a two-sided, survey-based rewards platform that connects organisations who need real insights with people who are willing to share them. Organisations (referred to as Admins) create and manage surveys through an Admin Portal. Users sign up independently, complete surveys relevant to their department, and earn reward points that they can withdraw to their bank accounts on demand.

The platform is built around three distinct roles — Super Admin, Admin, and User — each with a dedicated interface and clearly defined permissions. A single backend server application powers both the Admin Portal and the User App.

The platform does not build or host survey forms. Survey forms are managed by an external platform. Survey Panel provides the infrastructure to publish surveys, target them to the right users, track completion status via secure API callbacks, manage rewards, and handle automated payouts.

---

## **2\. Business Model**

Pronttera operates and maintains Survey Panel on behalf of Beacon Martech. The platform earns revenue by onboarding organisations (Admins) who pay to run surveys on the platform. These payments are handled offline between Pronttera and the organisations — no in-app billing or subscription management is required.

Once an organisation is onboarded as an Admin by the Super Admin, they fund their survey rewards through their own Razorpay account. Users earn points by completing surveys and **withdraw their balance on demand** — paid from the respective Admin's Razorpay account, with the payout gateway's commission fee deducted from the amount.

Users are shared across the entire platform. A user is not locked to any specific Admin. When a user selects their department(s) during onboarding, they automatically see surveys from all Admins targeting those departments. This model maximises survey reach for Admins and maximises earning opportunities for users — consistent with how established platforms such as Toluna and Swagbucks operate.

---

## **3\. Tech Stack**

### **Admin Portal & User App**

| Layer      | Technology    |
| ---------- | ------------- |
| Framework  | React \+ Vite |
| UI Library | Ant Design    |
| Styling    | Tailwind CSS  |

### **Server Application**

| Layer          | Technology                    |
| -------------- | ----------------------------- |
| Framework      | NestJS                        |
| Database       | PostgreSQL                    |
| Authentication | JWT (JSON Web Tokens)         |
| Email          | NodeMailer                    |
| Payments       | Razorpay                      |
| Scheduled Jobs | Cron (NestJS Schedule Module) |
| Location       | Google Maps API               |
| OAuth          | Google OAuth 2.0              |

---

## **4\. Applications Overview**

The platform consists of three separate applications:

| \#  | Application        | Accessed By         | Type                                              |
| --- | ------------------ | ------------------- | ------------------------------------------------- |
| 1   | Admin Portal       | Super Admin, Admin  | Web application (React \+ Vite)                   |
| 2   | User App           | Users               | Web application (React \+ Vite) — mobile-friendly |
| 3   | Server Application | All roles (via API) | NestJS REST API                                   |

The Admin Portal serves both Super Admin and Admin roles within a single application. The UI adapts based on the logged-in role — Super Admin sees platform-wide management features that are not visible to Admin.

---

## **5\. Application 1 — Admin Portal**

### **5.1 Authentication**

Both Super Admin and Admin log in through the same Admin Portal login screen.

**Login method:** Email and password only. No social login.

**Super Admin account:** There is always exactly one Super Admin. The Super Admin account is seeded during platform setup. There is no public registration flow for Super Admin.

**Admin account:** Admin accounts are created by the Super Admin. Admins do not self-register.

**Forgot password:** Available on the login screen for both Super Admin and Admin. A password reset link is sent via NodeMailer to the registered email address. The email includes a note advising the user to check their spam/junk folder.

**First login for Admin:** After their account is created by Super Admin, the Admin receives an email with their credentials. On first login, the Admin is taken to their dashboard. They must reset their password from their Profile section before fully using the platform.

**Password reset behaviour:** When an Admin or Super Admin resets their password from the Profile section, they are immediately logged out upon saving the new password. They must log in again with the new password.

**Suspended Admin:** If a Super Admin suspends an Admin account, the Admin will see an error screen upon login that reads: "Your account has been suspended. Please contact the Super Admin." The suspended Admin cannot access any feature of the portal.

**Session:** No automatic session timeout.

**Profile picture:** Not supported. No image storage is used anywhere in this platform.

---

### **5.2 Role Hierarchy**

The following table summarises the capabilities of each role in the Admin Portal:

| Feature                        | Super Admin                | Admin                                  |
| ------------------------------ | -------------------------- | -------------------------------------- |
| Create and manage Admins       | Yes                        | No                                     |
| Create and manage Departments  | Yes (create/deactivate)    | View only                              |
| Create and manage Reward Units | Yes                        | View and select only                   |
| Create and manage Surveys      | Yes (platform-wide)        | Yes (own surveys only)                 |
| View and manage Users          | Yes (all users)            | No                                     |
| View Analytics                 | Yes (platform-wide)        | Yes (own data only)                    |
| Manage Wallet & Payouts        | Yes (own Razorpay account) | Yes (own Razorpay account)             |
| View Support Tickets           | Yes (all tickets)          | Yes (from own survey respondents only) |
| Export Survey Data (CSV)       | Yes (all surveys)          | Yes (own surveys only)                 |

---

### **5.3 Super Admin — Admin Management**

The Super Admin is responsible for onboarding and managing all Admins on the platform.

#### **Admin Onboarding**

Admin onboarding is a two-step process completed by the Super Admin:

**Step 1 — Personal Information:**

- Full name
- Email address
- Phone number
- Auto-generated password (sent to Admin via email)

**Step 2 — Organisation Details:**

- Organisation name
- Organisation address
- LinkedIn profile URL
- Any other relevant organisation details

Once created, the Admin receives an automated email from the platform (via NodeMailer) containing:

- Their registered email address
- Their temporary auto-generated password
- A prompt to reset their password upon first login
- A note to check their spam/junk folder

#### **Admin Status Management**

- Super Admin can **suspend** an Admin account at any time.
- Super Admin can **reactivate** a suspended Admin account at any time.
- Super Admin **cannot delete** an Admin account.
- When an Admin is suspended, all their surveys and data remain intact in the database. Nothing is deleted or archived as a result of suspension.
- A suspended Admin sees only an error screen upon login and cannot perform any action on the platform.

#### **Admin Profile Editing**

Admins can edit their own personal details (name, phone) and organisation details from their Profile section. Email addresses cannot be changed once set.

---

### **5.4 Super Admin — Department Management**

Departments are the core targeting mechanism of the platform. Surveys are assigned to a department when created. Users select their departments during onboarding and see only surveys from their selected departments.

#### **Department Creation**

Only the Super Admin can create departments. Departments are a platform-wide master list. All Admins and Users pick freely from this list — there are no restrictions or assignments. A department has the following fields:

- Department name
- Active/inactive status

#### **Department Deactivation**

Departments are never deleted from the platform. They can only be deactivated by the Super Admin. When a department is deactivated:

- No new surveys can be created under that department.
- Existing active surveys under that department continue to run until their own expiry or quota is reached.
- All historical data related to that department is preserved in the database.

---

### **5.5 Reward Units**

Reward units are the currency of the platform. They define the value of rewards given to users upon survey completion.

#### **Management**

Reward units are managed exclusively by the Super Admin. They are platform-wide — the same units are available to all Admins when creating surveys.

The Super Admin can:

- Create new reward units (e.g. Silver Coin \= ₹2, Gold Coin \= ₹10, Diamond \= ₹50)
- Edit the name and ₹ value of existing reward units
- Deactivate a reward unit (it will no longer appear as an option when creating new surveys)

Default reward units are seeded into the platform during initial setup by the Super Admin.

Admins can only **select** from the existing active reward units when creating a survey. They cannot create, edit, or deactivate reward units.

#### **How Reward Units Work in Surveys**

When creating a survey, the Admin selects a reward unit and a quantity. The total reward value is calculated automatically.

Example: If the Admin selects "Silver Coin" (₹2) and sets a quantity of 10, the user who completes the survey earns ₹20 (stored as 10 Silver Coins in their wallet).

---

### **5.6 Survey Management**

Survey management is available to both Super Admin and Admin. The Super Admin can manage all surveys platform-wide. An Admin can only manage their own surveys.

#### **Survey Creation Fields**

When creating a survey, the following fields are required:

| Field                | Description                                                         |
| -------------------- | ------------------------------------------------------------------- |
| Title                | Survey title — required                                             |
| Description          | Survey description — required                                       |
| External survey link | URL to the survey form on the external platform — required          |
| Department           | One department selected from the platform-wide department list      |
| Expiry               | Date picker or quick options: 1 week, 2 weeks, or custom date range |
| Quota                | Maximum number of users who can complete this survey                |
| Reward unit          | Selected from active platform-wide reward units                     |
| Reward quantity      | Number of reward units — total ₹ value shown automatically          |

#### **Survey Stages**

A survey has two stages:

**Draft:** The survey is saved but not visible to users. All fields are editable in draft mode. An Admin can save a survey as a draft and return to edit it at any time before publishing.

**Published (Active):** The survey is visible to users in the survey feed. Once published, only the following fields can be edited:

- Title
- Description
- Status (Admin can manually close a survey)

The external link, reward, quota, expiry date, and department are locked after publishing.

#### **Survey Auto-closure**

A survey is automatically closed when either of the following conditions is met:

- The response quota is reached (current_responses \>= quota)
- The expiry date has passed

Expired surveys are not shown in the user feed at all.

#### **Survey Export**

Both Super Admin and Admin can export survey response data as a CSV file. Super Admin can export data from any survey. Admin can only export data from their own surveys.

---

### **5.7 User Management**

User management in the Admin Portal is a Super Admin-only feature.

The Super Admin can:

- View a list of all users registered on the platform
- Filter users by department, by status (active/deactivated), and by name
- View the full profile of any user
- View any user's complete survey history (all surveys attempted, with status and reward)
- View any user's wallet balance and full transaction history
- Deactivate a user directly — a deactivated user cannot log in to the User App
- Reactivate a deactivated user at any time

Admins do not have a user management section. An Admin can only see users who have responded to their surveys — this is visible within their survey analytics and leaderboard only.

---

### **5.8 Analytics Dashboard**

The analytics dashboard is available to both Super Admin and Admin. Super Admin sees platform-wide data. Admin sees data scoped to their own surveys and respondents only.

All charts and metrics support a **date range filter** with the following options: Last 7 days, Last 30 days, Last 3 months, and Custom date range. Data is real-time.

#### **Super Admin Analytics**

**KPI Summary Cards:**

| Card                      | Description                                                              |
| ------------------------- | ------------------------------------------------------------------------ |
| Total Users               | Total registered users across the platform                               |
| Total Admins              | Count of active and suspended Admins                                     |
| Total Surveys             | Count of active, completed, and archived surveys platform-wide           |
| Total Rewards Distributed | Sum of all reward amounts paid out to all users across all Admins (in ₹) |

**Charts:**

| Chart                         | Type                     | Description                                                                  |
| ----------------------------- | ------------------------ | ---------------------------------------------------------------------------- |
| Region-wise users             | GeoChart (Google Charts) | World map showing user density by country. Hover shows user count per region |
| User registrations over time  | Line chart               | Daily/weekly trend of new user sign-ups                                      |
| Surveys created over time     | Line chart               | Daily/weekly trend of survey creation                                        |
| Users per Admin               | Bar chart                | Number of users who responded to each Admin's surveys                        |
| Surveys per Admin             | Bar chart                | Number of surveys created by each Admin                                      |
| Users by department           | Donut chart              | Breakdown of users across departments                                        |
| Surveys by department         | Donut chart              | Breakdown of surveys across departments                                      |
| Survey completion breakdown   | Stacked bar chart        | Per survey: completed vs disqualified vs abandoned responses                 |
| Top 5 most completed surveys  | Column chart             | Surveys with the highest number of completions platform-wide                 |
| Rewards distributed over time | Line chart               | Daily/weekly wallet burn rate — total rewards paid out over time             |
| Per-Admin financial overview  | Bar chart                | Each Admin's total rewards paid out vs current estimated wallet activity     |

#### **Admin Analytics**

**KPI Summary Cards:**

| Card                   | Description                                    |
| ---------------------- | ---------------------------------------------- |
| Total Surveys          | Count of own surveys (active, closed, draft)   |
| Total Responses        | Total survey responses across own surveys      |
| Active Surveys         | Count of currently active own surveys          |
| Total Rewards Paid Out | Sum of rewards paid out for own surveys (in ₹) |

**Charts:**

| Chart                         | Type              | Description                                                                                               |
| ----------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------- |
| Region-wise respondents       | GeoChart          | Map showing where respondents of own surveys are located                                                  |
| Surveys created over time     | Line chart        | Trend of own survey creation                                                                              |
| Users by department           | Donut chart       | Departments of users who responded to own surveys                                                         |
| Surveys by department         | Donut chart       | Own surveys broken down by department                                                                     |
| Survey completion breakdown   | Stacked bar chart | Per own survey: completed vs disqualified vs abandoned                                                    |
| Top 5 most completed surveys  | Column chart      | Own surveys with highest completions                                                                      |
| Rewards distributed over time | Line chart        | Own wallet burn rate over time                                                                            |
| User leaderboard              | Leaderboard table | Top users by completions on own surveys — shows name, department, surveys completed, total rewards earned |

---

### **5.9 Wallet & Payments**

Both Super Admin and Admin have their own wallet and payment configuration. They operate independently — each Admin's payouts come from their own Razorpay account, and the Super Admin's payouts come from their own Razorpay account.

#### **Razorpay Configuration**

Each Admin and Super Admin connects their own Razorpay account by entering their Razorpay API credentials (Key ID and Key Secret) in their panel settings. These credentials are stored securely and encrypted in the database.

When saving Razorpay credentials, the platform displays the following warning: _"Incorrect credentials will affect your users' payouts. Please double-check your Razorpay Key ID and Key Secret before saving."_

The platform attempts to validate the credentials against the Razorpay API at the time of saving. If the credentials are invalid, the save is blocked and an error is displayed.

#### **Payout Rules**

- Payouts are **requested manually by the user** from their wallet — they are no longer processed automatically on a schedule.
- A user's reward balance is held **per Admin**. If a user completed surveys from Admin A and Admin B, they hold two separate balances and withdraw each one separately from the respective Admin's Razorpay account.
- A withdrawal is allowed only if the requested amount is **equal to or greater than the minimum payout threshold** for that Admin's balance.
- The minimum payout threshold is **₹100 by default** and is configurable per Admin/Super Admin from their panel settings.
- A **payout commission fee** (the payout gateway's fee, e.g. RazorpayX's per-transfer charge plus GST) is deducted from the requested amount. The user receives the remainder in their bank account. Example: a ₹100 withdrawal with a ₹3 fee credits **₹97** to the bank. The fee is shown to the user before they confirm.

#### **Failed Payouts**

If a payout fails when requested (e.g. due to incorrect bank details, Razorpay gateway error, or network issue):

- The transaction is logged with status \= failed and an error comment describing the reason.
- The reserved wallet amount is **refunded** so the user can try again.
- The user is shown the failure reason and may retry the withdrawal.

#### **Payment Logs Screen**

Both Super Admin and Admin have a Payment Logs screen where they can view all payout transactions. The log can be filtered by status (Success, Failed, Pending).

Each log entry shows: date, user name, survey name, reward amount, payout status, and error comment (if failed).

---

### **5.10 Support Tickets**

The platform has a built-in support ticket system.

#### **Who Raises Tickets**

- Users raise tickets — these go to the Super Admin only.
- Admins raise tickets — these also go to the Super Admin only.

#### **Who Receives Tickets**

- Super Admin receives all tickets from both Admins and Users. Super Admin can filter tickets by: All tickets, Tickets from Admins, Tickets from Users, or Mine.
- Admin receives tickets from users who have responded to their surveys — related to survey issues only.

#### **Ticket Fields**

- Category: Payment Issue, Survey Issue, Account Issue, Technical Issue, Other
- Content: Text only — no file or image attachments
- Status: Open → In Progress → Resolved → Closed

Auto-close rule: A ticket is automatically closed after 7 days with no response from either party.

#### **Ticket Conversation**

Both the ticket raiser and the recipient can reply within the platform. The full conversation thread is visible to both parties. Users and Admins check their Tickets screen directly to see status updates and replies — there are no email or push notifications for ticket activity.

Both users and Admins can view their full ticket history including all past conversations.

---

### **5.11 Profile & Organisation Settings**

Both Super Admin and Admin can manage their own profile and organisation settings.

#### **Editable Fields**

| Field                    | Editable | Notes                             |
| ------------------------ | -------- | --------------------------------- |
| Full name                | Yes      |                                   |
| Phone number             | Yes      |                                   |
| Email address            | No       | Fixed permanently                 |
| Organisation name        | Yes      |                                   |
| Organisation address     | Yes      |                                   |
| LinkedIn profile URL     | Yes      |                                   |
| Password                 | Yes      | Triggers immediate logout on save |
| Razorpay credentials     | Yes      | Warning shown — validated on save |
| Minimum payout threshold | Yes      | Per user setting                  |

No profile pictures are supported on this platform.

---

## **6\. Application 2 — User App**

The User App is a separate web application built for end users. It is fully responsive and optimised for mobile use. Users can sign up independently, complete their onboarding, browse and fill surveys, track their earnings, and manage their profile.

---

### **6.1 VPN Detection**

VPN detection is enforced at the platform level before any screen is shown — including the login and registration screens. If a user is detected to be using a VPN:

- They are immediately shown a full-screen error message informing them that VPN usage is not permitted on the platform.
- They cannot proceed to any screen or feature of the platform.
- This applies to both new and returning users at every login or page load.

---

### **6.2 Registration**

Users create their account using one of the following methods:

**Method 1 — Email and Password:**

- Full name
- Email address
- Phone number
- Password

**Method 2 — Google OAuth:**

- User signs in with their Google account.
- If the email does not already exist in the system, a new account is created automatically.
- The user proceeds to onboarding after account creation.

**Email verification:** After registration via email/password, the user must verify their email address before proceeding to the onboarding steps.

---

### **6.3 User Onboarding**

Onboarding is a mandatory multi-step process. A user cannot access any part of the platform until all onboarding steps are fully completed. The user's onboarding progress is saved in the database at each step. If a user closes the app or refreshes the page mid-onboarding, they are taken back to the exact step they left off — they do not start from the beginning.

A progress indicator is shown in the UI so the user can see which step they are on and how many remain.

There are **5 mandatory steps:**

---

#### **Step 1 — User Details**

| Field         | Notes    |
| ------------- | -------- |
| Full name     | Required |
| Date of birth | Required |
| Gender        | Required |
| City          | Required |
| LinkedIn URL  | Optional |

---

#### **Step 2 — Departments**

The user selects one or more departments that represent their professional background or industry (e.g. IT, Manufacturing, Healthcare, Finance). The user can select multiple departments from the platform-wide department list created by the Super Admin.

The department selection determines which surveys the user sees in their feed. Users can update their department preferences at any time after onboarding from the Preferences section of their profile.

---

#### **Step 3 — Location & Device**

The user selects their country and city using the Google Maps API location picker. The platform captures and stores the user's IP address at this step.

Note: MAC address capture is not supported in web browsers. IP address is used as the device identifier.

---

#### **Step 4 — Company Details**

| Field                   | Notes          |
| ----------------------- | -------------- |
| Company name            | Required       |
| Designation / job title | Required       |
| Organisation email      | Optional field |

**Organisation email verification rule:** The organisation email field is optional — the user can leave it blank and continue. However, if the user enters an organisation email address, the Continue button is immediately disabled and a Verify Email button appears. The user must verify their organisation email via OTP (sent via NodeMailer) before the Continue button is re-enabled.

OTP behaviour:

- OTP is sent to the entered organisation email address.
- The user enters the OTP in the app to verify.
- The user can resend the OTP after every 2 minutes.
- Once OTP is verified, the Continue button is enabled and the user can proceed to Step 5\.

---

#### **Step 5 — Bank Details**

| Field          | Notes                                                   |
| -------------- | ------------------------------------------------------- |
| Account number | Required                                                |
| IFSC code      | Required                                                |
| Bank name      | Required                                                |
| PAN number     | Required — format validation only (pattern: ABCDE1234F) |

No third-party PAN verification API is used. The platform validates only that the PAN follows the correct format.

A warning is displayed on this screen: _"Please make sure your bank details are correct. Incorrect details will result in failed payments and you will not receive your rewards."_

---

### **6.4 Survey Feed**

The Survey Feed is the home screen of the User App. It displays a list of active surveys that match the user's selected departments.

#### **Feed Rules**

- Only surveys with status \= active are shown.
- Expired surveys (past expiry date) are not shown in the feed at all.
- Surveys where the quota has been fully reached are shown with a "Full" badge and are not clickable.
- The feed is an infinite scroll list.
- On every page load, the feed checks `survey_audits` for the logged-in user and displays the correct status for each survey card.

#### **Survey Card**

Each survey card in the feed displays:

- Survey title
- Description (truncated)
- Reward amount (e.g. 10 Silver Coins \= ₹20)
- Expiry date

#### **Survey Card States**

| Status                 | Description                                   | Clickable | Chevron |
| ---------------------- | --------------------------------------------- | --------- | ------- |
| Available              | Survey is open and user has not attempted it  | Yes       | Yes     |
| Work in Progress (WIP) | User clicked and was redirected to the survey | No        | No      |
| Leaved                 | User exited the survey before completing      | No        | No      |
| Disqualified           | User failed the profiling questions (SRF)     | No        | No      |
| Completed              | User successfully completed the survey        | No        | No      |
| Full                   | Survey quota has been reached                 | No        | No      |

#### **Filters**

The user can filter and sort the survey feed using the following options:

- Filter by department (from the user's selected departments)
- Filter by Admin's organisation name
- Sort by reward amount (high to low / low to high)
- Sort by expiry date (soonest first)

---

### **6.5 Survey Flow**

#### **Starting a Survey**

When a user taps a survey card:

1. The app calls the check-availability API to verify in real time whether the quota has been reached.
2. While the check is running, a loader is shown with the text "Checking availability...".
3. If the survey is full: the card updates to show the Full badge and an inline message informs the user that the survey is no longer available.
4. If the survey is available: a record is created in `survey_audits` with status \= wip. The survey card becomes disabled with a WIP badge.
5. The user is redirected to the external survey link with a signed JWT token appended as a query parameter (see Section 7.2).

#### **External Survey Flow**

The external survey platform hosts the actual survey form, which consists of two parts:

- **Survey Requirement Form (SRF):** Profiling questions to determine if the user qualifies for the survey.
- **Questions Form:** The actual survey questions.

If the user's SRF responses do not meet the survey's targeting requirements, they are immediately disqualified and do not proceed to the Questions Form.

The external platform calls our API to report the outcome:

| Outcome      | Description                                                            |
| ------------ | ---------------------------------------------------------------------- |
| Completed    | User completed both SRF and Questions Form — reward credited to wallet |
| Disqualified | User failed SRF targeting — no reward                                  |
| Leaved       | User closed the browser window before completing — no reward           |

#### **Result Screen**

After the external platform calls our API with the outcome, a child window opens within the User App showing the result:

- **Completed:** Success screen displaying the reward amount earned.
- **Disqualified:** Disqualified screen.
- **Leaved:** Leaved screen.

The child window auto-closes after 6 seconds. The survey feed then updates to reflect the new status on the card.

#### **One Attempt Rule**

A user can only attempt a survey once. Once a record exists in `survey_audits` for a given user and survey combination — regardless of the status — the user cannot initiate that survey again. The card remains disabled permanently.

#### **Reward on Completion**

If the outcome is Completed, the reward is immediately credited to the user's wallet balance for the Admin who owns the survey, available to withdraw on demand.

---

### **6.6 Wallet**

The Wallet screen shows the user's reward balance, lets them withdraw it to their bank, and shows their payout history.

#### **Wallet Screen Contents**

| Section                 | Description                                                            |
| ----------------------- | --------------------------------------------------------------------- |
| Current balance         | Total wallet balance in ₹ across all organizations                    |
| Withdraw balance        | Per-organization balances, each with a **Get Money** button           |
| Total earned (all time) | Cumulative total of all rewards ever earned                           |
| Transaction history     | Full list of all past withdrawal transactions                         |

#### **Requesting a Withdrawal**

1. The user opens the Wallet and sees their balance for each organization.
2. They tap **Get Money** on a balance and choose to withdraw the full amount or a custom amount (≥ the minimum threshold).
3. A confirmation popup shows the **amount**, the **commission fee**, and the **total** they will receive (amount − fee).
4. On confirm, the money is sent to their registered bank account and a transaction is recorded.

#### **Transaction History**

Each transaction entry shows:

- Date
- Organization name
- Amount withdrawn, the commission fee, and the net amount sent to the bank
- Payout status: Success, Failed, or Pending
- Error comment (shown only for failed transactions)

#### **Payout Rules for Users**

- Withdrawals are **requested manually** — there is no automatic/scheduled payout.
- A withdrawal is allowed only if the requested amount is **≥ ₹100** (or the threshold set by the relevant Admin) for that organization's balance.
- Balances earned from different Admins are withdrawn separately, each from that Admin's Razorpay account.
- A **commission fee** (the payout gateway's charge) is deducted from the requested amount; the user receives the remainder.

#### **Failed Payout**

If a payout fails:

- The transaction is logged with status \= failed and an error comment.
- The reserved wallet amount is **refunded** so the user can retry.
- The user can see the failed status and error comment in their transaction history.

#### **Bank Details**

Withdrawals are sent to the user's registered bank account. A user must add bank details before they can withdraw.

---

### **6.7 Analytics**

The Analytics section shows the user's own performance data on the platform.

| Metric / Chart          | Description                                                          |
| ----------------------- | -------------------------------------------------------------------- |
| Total surveys completed | Count of surveys with status \= completed                            |
| Total earned (all time) | Total ₹ earned across all completed surveys                          |
| Total disqualified      | Count of surveys where user was disqualified                         |
| Total leaved            | Count of surveys user exited without completing                      |
| Completion rate         | Completed ÷ total attempted (expressed as a percentage)              |
| Earnings over time      | Line chart showing earnings — toggle between weekly and monthly view |

---

### **6.8 Profile & Preferences**

The user can manage their personal details, preferences, and payment settings from the Profile section.

#### **Editable Fields**

| Field               | Notes                                                                       |
| ------------------- | --------------------------------------------------------------------------- |
| Full name           | Editable                                                                    |
| Date of birth       | Editable                                                                    |
| Gender              | Editable                                                                    |
| City                | Editable                                                                    |
| LinkedIn URL        | Editable                                                                    |
| Departments         | Editable from Preferences section — takes effect immediately on survey feed |
| Company name        | Editable                                                                    |
| Designation         | Editable                                                                    |
| Organisation email  | Editable — re-verification required if changed                              |
| Bank account number | Editable — with warning message                                             |
| IFSC code           | Editable — with warning message                                             |
| Bank name           | Editable — with warning message                                             |
| PAN number          | Editable — format validation only                                           |
| Password            | Editable — logs user out on change                                          |
| Email address       | Not editable — fixed permanently                                            |

Bank detail changes take effect immediately and are used for the user's next withdrawal request.

#### **Survey History**

Users can view a complete history of all surveys they have attempted, including:

- Survey title
- Date attempted
- Status (completed / disqualified / leaved / wip)
- Reward earned (for completed surveys only)

---

### **6.9 Support Tickets**

Users can raise support tickets directly from the User App. All user tickets go to the Super Admin only.

- User can create a new ticket by selecting a category and writing a text message.
- User can view all their past tickets and their current statuses.
- User can view the full conversation thread for each ticket and reply to responses from the Super Admin.
- There are no email or push notifications for ticket activity — users check their Tickets screen for updates.

---

## **7\. Application 3 — Server Application**

The Server Application is a NestJS REST API that serves both the Admin Portal and the User App. It handles all business logic, database operations, scheduled jobs, and third-party integrations.

---

### **7.1 External Survey API**

Survey Panel does not build or host survey forms. The survey forms are managed by an external platform. When a user completes, is disqualified from, or leaves a survey on the external platform, the external platform calls our API to report the outcome.

The following endpoints are exposed for the external platform:

| Endpoint                           | Method | Description                                   |
| ---------------------------------- | ------ | --------------------------------------------- |
| /api/survey/completed              | POST   | User completed both SRF and Questions Form    |
| /api/survey/disqualified           | POST   | User failed SRF targeting — disqualified      |
| /api/survey/leaved                 | POST   | User closed browser window before completing  |
| /api/survey/check-availability/:id | GET    | Real-time quota check before redirecting user |

All endpoints accept a signed JWT token as the identifier. The full security model for these APIs will be detailed in the PRD.

---

### **7.2 Token Flow**

When a user clicks "Start Survey" in the User App, the following flow occurs:

1. Our backend generates a signed JWT token encoding: `user_id`, `survey_id`, and an expiry timestamp.
2. The token is single-use — once the external platform uses it to call any of our API endpoints, the token is marked as used and cannot be used again.
3. The user is redirected to the external survey URL with the token appended as a query parameter: `https://external-survey-platform.com/survey?token=<JWT>`
4. The external platform reads the token from the URL and stores it.
5. When the outcome is determined, the external platform calls our API with the token in the request body.
6. Our server decodes the token, extracts `user_id` and `survey_id`, validates the token (not expired, not already used), and updates `survey_audits` accordingly.
7. If the status is completed, the reward is immediately credited to the user's wallet.

This approach ensures:

- The external platform does not need to know our internal user IDs directly.
- Tokens cannot be replayed after first use.
- Expired tokens are rejected automatically.

---

### **7.3 Manual Payout (Withdrawal) Flow**

Payouts are processed **on demand** when a user requests a withdrawal — there is no scheduled cron job. Reward crediting is unchanged: when a survey is completed, the reward is credited immediately to the user's wallet for the Admin who owns that survey.

**Withdrawal request flow:**

Step 1: The user picks an organization balance and an amount to withdraw  
 (full balance or a custom amount).

Step 2: The server computes the **commission fee** for that amount  
 (the payout gateway's per-transfer fee plus GST) and returns a quote:  
 amount, commission_fee, net_amount (= amount − fee). This is shown in the  
 confirmation popup.

Step 3: On confirm, validate:  
 \- requested amount ≥ the Admin's min_payout_threshold  
 \- requested amount ≤ the user's balance for that Admin  
 \- user has bank details and the Admin has Razorpay credentials

Step 4: Reserve (decrement) the requested amount from user_wallet to prevent  
 double-spending on concurrent requests.

Step 5: Trigger the Razorpay payout for **net_amount** using the Admin's  
 Razorpay credentials, sent to the user's bank details.

Step 6: Log result in daily_transaction_log:  
 \- On success: status \= success, razorpay_reference_id stored,  
 amount / commission_fee / net_amount recorded  
 \- On failure: status \= failed, failure_comment \= error reason, and the  
 reserved amount is **refunded** to the wallet

---

## **8\. Third-Party Integrations**

| Service                  | Purpose                                                                               | Cost                              |
| ------------------------ | ------------------------------------------------------------------------------------- | --------------------------------- |
| Razorpay                 | User payout processing — each Admin and SA has their own independent Razorpay account | Per transaction — borne by client |
| Google OAuth 2.0         | User registration and login via Google account                                        | Free                              |
| Google Maps API          | Location picker in user onboarding (country \+ city selection)                        | Usage-based — borne by client     |
| Google Charts (GeoChart) | Region-wise analytics visualisation on dashboards                                     | Free                              |
| NodeMailer               | Transactional emails — password reset, Admin invite, OTP for org email verification   | SMTP costs — borne by client      |

All third-party service charges, including payment gateway fees, SMTP fees, Google Maps API usage costs, and hosting/domain costs, are **excluded from the project cost of ₹70,000** and are the sole responsibility of the Client.

---

## **9\. Security Requirements**

| Requirement                  | Details                                                                                                                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Authentication               | JWT-based authentication for all API endpoints. Role-based access control (Super Admin / Admin / User) enforced server-side |
| VPN detection                | Enforced at all entry points — users cannot access any screen including login and registration while on a VPN               |
| Survey token security        | Signed JWT tokens for external survey redirect — single-use, time-limited, invalidated after first use                      |
| Razorpay credential storage  | Razorpay Key ID and Key Secret encrypted in the database                                                                    |
| PAN validation               | Format validation only (pattern: ABCDE1234F) — no third-party API                                                           |
| External survey API security | Full security model to be detailed in the PRD after BRD sign-off                                                            |
| Data validation              | All user inputs validated and sanitized server-side before processing or storage                                            |
| Password storage             | Passwords hashed using bcrypt — never stored in plain text                                                                  |
| HTTPS                        | All communication between client apps and server over HTTPS                                                                 |

Edge cases, error handling, and detailed validations are documented in the PRD — to be prepared after BRD sign-off.

---

## **10\. Scope of Work**

| Deliverable             | Details                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Admin Portal            | Full frontend (React \+ Vite \+ Ant Design \+ Tailwind) \+ backend integration for Super Admin and Admin roles                        |
| User App                | Full frontend (React \+ Vite \+ Ant Design \+ Tailwind) \+ backend integration — mobile responsive                                    |
| Server Application      | NestJS REST API — all endpoints, business logic, database, cron jobs, third-party integrations                                        |
| Authentication System   | Role-based access control (Super Admin / Admin / User), Google OAuth, JWT, VPN detection                                              |
| User Onboarding Flow    | Complete 5-step onboarding with progress persistence, OTP verification, Google Maps integration                                       |
| Survey Engine           | External link-based surveys, two-form structure (SRF \+ Questions), disqualification logic, quota management, expiry, token-based API |
| Wallet & Payment System | Points-based per-Admin wallet, on-demand user withdrawals with commission fee, Razorpay integration per Admin, failure handling and refunds          |
| Analytics Dashboard     | Real-time analytics for Super Admin and Admin including GeoChart and all charts listed in Section 5.8                                 |
| Support Ticket System   | Full ticket lifecycle — creation, replies, status management, filtering                                                               |
| Database                | PostgreSQL — 15 tables, 7 ENUMs                                                                                                       |
| Deployment              | Production-ready hosted build                                                                                                         |

---

## **12\. What's Included & Excluded**

### **Included**

- Complete source code for all three applications
- Full technical documentation
- 3 months of post-launch support (bug fixes and minor optimisations)
- Admin and Super Admin onboarding walkthrough

### **Excluded**

- Third-party payment gateway charges (Razorpay transaction fees)
- Hosting and domain costs
- Google Maps API usage charges
- SMTP / email service charges
- Any features outside the scope defined in this document

---

## **Next Steps**

1. Client reviews this BRD and confirms scope
2. Upon confirmation, Pronttera prepares the **BRD sign-off document**
3. After sign-off, Pronttera prepares the **Product Requirements Document (PRD)** covering detailed user flows, edge cases, validations, and API contracts
4. PRD sign-off and project kickoff

---

\*For questions or to proceed, contact Pronttera at: **info@pronttera.com***

---

_Survey Panel BRD v2.0 — Prepared by Pronttera for Beacon Martech Private Limited — May 2026_
