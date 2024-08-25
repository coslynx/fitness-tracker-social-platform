<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
fitness-tracker-social-platform
</h1>
<h4 align="center">A fitness tracking platform promoting user engagement and social sharing.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-React-blue" alt="React Framework">
  <img src="https://img.shields.io/badge/Frontend-Typescript,_Html,_Css-red" alt="Frontend Technologies">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Node.js Backend">
  <img src="https://img.shields.io/badge/Database-MongoDB-green" alt="MongoDB Database">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/fitness-tracker-social-platform?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/fitness-tracker-social-platform?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/fitness-tracker-social-platform?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository contains the Minimum Viable Product (MVP) called "fitness-tracker-social-platform" that provides a comprehensive solution for fitness enthusiasts to manage their goals and engage socially, utilizing a tech stack including React, Node.js, and MongoDB.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **User Authentication**   | Allows users to register and log in securely using email or social media accounts.                     |
| 📈 | **Goal Setting**        | Users can define and save specific fitness goals tailored to their personal health requirements.            |
| 📉 | **Progress Tracking**    | Real-time updates of user activities and visual representations of progress through charts.                |
| 🔗 | **Social Sharing**      | Users can share achievements on social media, fostering community engagement and support.                     |
| 📊 | **Dashboard Overview**  | Centralized interface showing user’s goals, progress statistics, and insights for better management.         |
| 🔍 | **API Documentation**   | Clear API endpoints and integration documentation for third-party developers and collaborators.                  |

## 📂 Structure
```text
fitness-tracker-social-platform
├─ package.json
├─ tsconfig.json
├─ next.config.js
├─ .env.local
├─ README.md
├─ /components
│  ├── Button.tsx
│  ├── Header.tsx
│  ├── Layout.tsx
│  ├── GoalInput.tsx
│  ├── ProgressChart.tsx
│  ├── SocialShareButton.tsx
├─ /pages
│  ├── api
│  │  ├── auth.ts
│  │  ├── goals.ts
│  │  ├── progress.ts
│  ├── _app.tsx
│  ├── index.tsx
│  ├── dashboard.tsx
│  ├── login.tsx
├─ /styles
│  ├── global.css
├─ /utils
│  ├── helpers.ts
│  ├── api.ts
│  ├── auth.ts
│  ├── validation.ts
├─ /config
│  ├── next-auth.config.ts
├─ /middleware
│  ├── authentication.ts
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js
- npm

### 🚀 Setup Instructions
1. Clone the repository:
   - `git clone https://github.com/coslynx/fitness-tracker-social-platform.git`
2. Navigate to the project directory:
   - `cd fitness-tracker-social-platform`
3. Install dependencies:
   - `npm install`

## 🏗️ Usage
### 🏃‍♂️ Running the Minimum Viable Product (MVP)
1. Start the development server:
   - `npm run dev`
2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### ⚙️ Configuration
Adjust configuration settings in `.env.local`.

### 📚 Examples
- 📝 **Example 1**: Set a weight loss goal through the dashboard.
- 📝 **Example 2**: Track your daily calories burned.
- 📝 **Example 3**: Share your progress on social media.

## 🌐 Hosting
### 🚀 Deployment Instructions
This application can be hosted on various services such as:
- Vercel
- Heroku
- AWS
- Google Cloud

#### Heroku Deployment Steps:
1. Install the Heroku CLI:
   - `npm install -g heroku`
2. Login to Heroku:
   - `heroku login`
3. Create a new Heroku app:
   - `heroku create`
4. Deploy the code:
   - `git push heroku main`

### 🔑 Environment Variables
- `DB_HOST`: Database host 
- `DB_USER`: Database user 
- `DB_PASS`: Database password 

## 📜 API Documentation
### 🔍 Endpoints
- **GET /api/goals**: Retrieves a list of fitness goals.
- **POST /api/goals**: Creates a new fitness goal.
- **GET /api/progress**: Retrieves user's progress data.

### 🔒 Authentication
Use JWT tokens for user authentication.

### 📝 Examples
- `curl -X GET http://localhost:3000/api/goals`

## 📜 License
This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/).

## 👥 Authors
- **Author Name** - [Spectra.codes](https://coslynx.com)
- **Creator Name** - [DRIX10](https://github.com/Drix10)

<p align="center">
  <h1 align="center">🌐 Spectra.Codes</h1>
</p>
<p align="center">
  <em>Why only generate Code? When you can generate the whole Repository!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developer-Drix10-red" alt="">
  <img src="https://img.shields.io/badge/Website-Spectra.codes-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
</div>