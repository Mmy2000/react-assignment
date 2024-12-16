# React TypeScript CRUD Application using Ant Design

## Overview
This project is a React-based web application designed to manage posts using TypeScript and Ant Design. The application allows users to fetch data from a public API (JSONPlaceholder), add, edit, delete posts, and handle form submission with type-safe validation using TypeScript.

## Features
- **Fetch and Display Posts:** Retrieve posts from the JSONPlaceholder API and display them in a table using Ant Design's `Table` component.
- **Add New Post:** Form to add a new post with title and body fields.
- **Edit Post:** Edit existing posts by opening a form with pre-filled values.
- **Delete Post:** Delete posts via a confirmation dialog.
- **TypeScript Support:** Strongly-typed components, interfaces, and form validation.
- **Error Handling:** Graceful handling of API errors and user-friendly notifications using Ant Design components.
- **Responsive UI:** Built with Ant Design to provide a clean and responsive UI.

## Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mmy2000/react-assignment
   cd react-assignment

## Code Structure

```bash
react-crud-app/
├── src/
│   ├── components/
│   │   ├── ReusableModal.tsx       # Reusable modal component for add/edit/delete forms
│   │   ├── PostTable.tsx            # Table displaying posts
│   │   └── PostForm.tsx             # Form for adding/editing posts
│   ├── api/                         # API service for fetching and managing posts
│   └── App.tsx                      # Main entry point
├── .env                            # Environment variables file
├── package.json
└── README.md

