# Diabetes Prediction Project

This project aims to predict diabetes using a machine learning model. The backend is developed using Django with Pipenv for dependency management, while the frontend is built with React using Vite for a fast and modern user experience.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Predict diabetes based on user inputs.
- Interactive user interface for easy input.
- Responsive design for various devices.

## Technologies

- **Backend**: Python, Django
- **Frontend**: React
- **Database**: MariaDB

## Installation

To get started, ensure you have the following installed on your machine:

- Python 3.7+
- Node.js (for the React frontend)
- Pipenv

### Clone the Repository

```
git clone https://github.com/Shobik-maharjan/diabetes-prediction.git
```

## Backend Setup

### Navigate to backend directory and install dependencies using pipenv

### To activate virtual environment:

```
pipenv shell
```

Create a new database `diabetes` inside phpMyAdmin

### Run migrations:

```
python manage.py migrate
```

### Start the Django server

```
python manage.py runserver
```

## Frontend Setup

### Navigate to the frontend directory and Install dependencies:

```
cd frontend
npm install
```

### Start the React app

```
npm run dev
```

# Usage

After setting up both the backend and frontend, navigate to http://localhost:5173 (or the port specified for your React app) to access the application. You can input health parameters to predict diabetes risk.
