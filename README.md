# RecruitX - Intelligent Recruitment Platform

A modern recruitment platform similar to LinkedIn, powered by AI-driven resume screening. The platform connects recruiters with candidates while providing intelligent application screening using LangChain and GROQ API for ATS (Applicant Tracking System) scoring.

## Features

- **Multi-Role System:**
  - Admin: Full access to manage all jobs, users, and platform settings
  - Recruiter: Create, edit, and manage their job postings
  - Candidate: Browse and apply for jobs, track application status
  
- **Job Management:**
  - Recruiters can post, edit, and delete their job listings
  - Rich job description editor with template support
  - Admin has override access to all job postings
  
- **Smart Application Processing:**
  - Automated ATS scoring using LangChain & GROQ API
  - Resume-to-Job Description matching
  - Minimum 80% match score required for application acceptance
  
- **Recruiter Dashboard:**
  - View all applications for posted jobs
  - Candidate details and resume access
  - Application status management (Shortlist/Reject)
  - ATS score visualization
  
- **Candidate Dashboard:**
  - Track application status (Pending/Shortlisted/Rejected)
  - View ATS scores for applications
  - Application history management
  
- **AI-Powered Features:**
  - Automated resume parsing
  - Job description matching
  - Real-time ATS scoring feedback

## Application Flow

1. **For Recruiters:**
   - Post new job listings with detailed descriptions
   - Review incoming applications with ATS scores
   - Shortlist or reject candidates based on qualifications
   - Manage recruitment pipeline through dashboard

2. **For Candidates:**
   - Create profile and upload resume
   - Browse and apply for suitable positions
   - Receive immediate ATS feedback on application
   - Track application status in personal dashboard

3. **For Admins:**
   - Platform-wide access and management
   - Override capabilities for all features
   - System monitoring and user management

## Technical Features

- **ATS Integration:**
  ```javascript
  // Resume processing workflow
  1. Extract text from resume (PDF/DOC)
  2. Parse job description requirements
  3. Use LangChain for text processing
  4. Calculate match score via GROQ API
  5. Auto-accept/reject based on 80% threshold
  ```

## Screenshots

![Home Screenshot](https://github.com/Rishabh-Dhami/RecruitX/blob/main/screenshorts/Home.png)
![Job Post Screenshot](https://github.com/Rishabh-Dhami/RecruitX/blob/main/screenshorts/01-post-a-job.png)
![Rcruiter Dashboard Screenshot](https://github.com/Rishabh-Dhami/RecruitX/blob/main/screenshorts/dashboard-recruiter.png)
![All Jobs Screenshot](https://github.com/Rishabh-Dhami/RecruitX/blob/main/screenshorts/all-job-candidate.png)

## Installation & Setup

1. **Clone Repository**
```bash
git clone https://github.com/Rishabh-Dhami/RecruitX.git
cd RecruitX
```

2. **Install Dependencies**
```bash
# Backend setup
cd Backend
npm install

# Frontend setup
cd ../Frontend
npm install
```

3. **Environment Configuration**

Frontend `.env`:
```env
VITE_BASE_URL=http://localhost:4000/api/v1
VITE_FILESTACK_API_KEY=your_filestack_key
```

Backend `.env`:
```env
MONGO_URI=your_mongodb_connection_string
PORT=4000
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
FILESTACK_API_KEY=your_filestack_key
CORS_ORIGIN=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GROQ_API_KEY=your_groq_api_key
```

4. **Start Application**
```bash
# Start backend (http://localhost:4000)
cd Backend
npm run dev

# Start frontend (http://localhost:5173)
cd Frontend
npm run dev
```

## Usage Guide

### Candidate Flow
1. Register/Login as candidate
2. Browse available jobs
3. Upload resume & apply for positions
4. Track application status & ATS scores
5. View shortlisting/rejection notifications

### Recruiter Flow
1. Post new job openings
2. Review applications with ATS scores
3. Access candidate details & resumes
4. Shortlist/reject candidates
5. Manage recruitment pipeline

### Admin Flow
1. Manage all platform users
2. Override job postings/applications
3. Access system analytics
4. Configure platform settings

## Tech Stack

Frontend:
- React 18
- Redux Toolkit
- TailwindCSS
- JavaScript

Backend:
- Node.js & Express
- MongoDB & Mongoose
- LangChain
- GROQ API

## Security & Performance
- JWT Authentication
- Role-based access control
- Request rate limiting
- Input validation
- Error handling
- Data encryption

## Authors

- [@Rishabh-Dhami](https://github.com/Rishabh-Dhami) - Project Lead & Full Stack Developer
