# JobTrack — Job Application Tracker

JobTrack is a full-stack job application tracking web application built with Angular and Firebase.

It helps users organize job applications, monitor application progress, manage deadlines, and keep their job-search information in one place.

## 🚀 Live Demo

https://jobtrack-alpha-one.vercel.app

## ✨ Features

### 🔐 Authentication
- User registration with email and password
- User login and logout
- Firebase Authentication
- Protected application routes using an Angular authentication guard

### 📋 Application Management
- Add job applications
- View all applications
- View individual application details
- Edit applications
- Delete applications
- Track application status
- Track job type
- Record company and job title
- Store location and job URL
- Add notes
- Set application deadlines
- Set application priority

### 📊 Dashboard
The dashboard provides an overview of the job search, including:

- Total applications
- Interview count
- Offer count
- Rejected applications
- Upcoming deadlines
- Overdue applications
- High-priority applications
- Recent applications

### 🔎 Search & Filtering
Applications can be filtered by:

- Company
- Job title
- Application status
- Job type

### 🤖 AI Analyzer
JobTrack includes an AI Analyzer interface that evaluates job-related information using rule-based analysis and provides suggestions.

> Note: The current version does not use an external generative AI API. The analyzer is implemented using application logic.

### ⚙️ Settings
The settings page includes:

- Profile information
- Job-search preferences
- Application defaults
- Compact mode
- Local data export
- Local data clearing

### 🔥 Firebase / Firestore
Application data is stored in Cloud Firestore and associated with the authenticated user's Firebase UID.

Firestore security rules restrict users to their own application data.

## 🛠️ Tech Stack

- Angular 20
- TypeScript
- HTML5
- CSS3
- Firebase Authentication
- Cloud Firestore
- AngularFire
- Git
- GitHub
- Vercel

## 🏗️ Architecture

The application follows a component-based Angular structure.

```text
src/
└── app/
    ├── guards/
    ├── models/
    ├── pages/
    │   ├── add-application/
    │   ├── ai-analyzer/
    │   ├── application-details/
    │   ├── applications/
    │   ├── dashboard/
    │   ├── login/
    │   ├── settings/
    │   └── signup/
    └── services/
        ├── auth.ts
        └── firestore.ts