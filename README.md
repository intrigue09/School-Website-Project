# Summer Academy School Website

This project is a responsive school website created for a college web development assignment using HTML, CSS, JavaScript, and a simple Node.js backend.

The website includes a modern frontend for a school and a backend system that stores contact form submissions in a local JSON file.

## Features

- Responsive school website layout
- Header with navigation menu
- Home, About, Courses, Admissions, Events, Gallery, Location, and Contact sections
- Contact form with client-side validation
- Backend API for storing form submissions
- Submitted form data saved in `submissions.json`

## Files Included

- `School.html` - Main frontend website file
- `school-server.js` - Node.js backend server
- `submissions.json` - Stores contact form submissions

## How to Run the Project

1. Make sure Node.js is installed on the computer.

2. Open a terminal or PowerShell window in the project folder.

3. Run the backend server:

```bash
node school-server.js
```

4. Open the website in a browser:

```text
http://127.0.0.1:3000/School.html
```

## Backend Details

The backend uses Node.js and saves contact form data to `submissions.json`.

When a user submits the contact form, the following details are stored:

- Name
- Phone number
- Email address
- Subject
- Message
- Submission date and time

## Project Purpose

This website was created as a college project to demonstrate:

- Basic frontend development
- Responsive web design
- JavaScript form validation
- Backend integration
- Storing form data locally

## Submission Note

To test the backend, run `school-server.js` and submit the contact form from the website. The submitted details will appear in `submissions.json`.
