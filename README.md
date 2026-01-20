# Quiz Application

A full-stack quiz application built with React (Vite) frontend and Node.js/MongoDB backend. Create, manage, and take quizzes with multiple question types including multiple-choice, true/false, and short-answer questions.

## Features

- ✅ **Quiz Management**: Create, edit, and delete quizzes
- ✅ **Question Types**:
  - Multiple Choice (with radio button selection and dropdown correct answer)
  - True/False
  - Short Answer
- ✅ **Interactive UI**: Modern, responsive interface built with React
- ✅ **Database Storage**: MongoDB for persistent data storage
- ✅ **RESTful API**: Express.js backend with comprehensive API endpoints
- ✅ **Real-time Updates**: Instant feedback and validation

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **JavaScript/JSX** - Programming language

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM (Object Data Modeling)

## Project Structure

```
quiz/
├── src/                          # React frontend source
│   ├── component/               # React components
│   │   ├── QuestionForm.jsx     # Form for creating/editing questions
│   │   ├── Quiz.jsx             # Quiz component
│   │   ├── QuizForm.jsx         # Form for creating/editing quizzes
│   │   └── QuizTable.jsx        # Display quizzes in table format
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   ├── index.css                # Global styles
│   └── assets/                  # Images and assets
│
├── server/                       # Node.js backend
│   ├── models/                  # Database models
│   │   ├── Quiz.js              # Quiz schema
│   │   └── Question.js          # Question schema
│   ├── routes/                  # API routes
│   │   └── quizRoutes.js        # Quiz endpoints
│   ├── server.js                # Express server setup
│   ├── seed.js                  # Database seeding script
│   ├── package.json             # Backend dependencies
│   └── .env                     # Environment variables
│
├── public/                       # Static files
├── index.html                   # HTML entry point
├── vite.config.js               # Vite configuration
├── eslint.config.js             # ESLint configuration
├── package.json                 # Frontend dependencies
└── start.bat                    # Batch file to start application
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/sarathkumar-V/quiz.git
   cd quiz
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure environment variables**
   - Edit `server/.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/quiz
   PORT=5000
   ```
### Creating a Quiz

1. Open the application
2. Navigate to the Quiz creation section
3. Click "Add New Quiz"
4. Enter quiz title and description
5. Click "Add Questions"
6. For each question:
   - Enter question text
   - Select question type:
     - **Multiple Choice**: Add options, select correct answer using radio button or dropdown
     - **True/False**: Select True or False as correct answer
     - **Short Answer**: Enter the correct answer text
   - Click "Add Question" or "Update Question"
7. Save the quiz


## API Endpoints

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get specific quiz
- `POST /api/quizzes` - Create new quiz
- `PUT /api/quizzes/:id` - Update quiz
- `DELETE /api/quizzes/:id` - Delete quiz

### Frontend Not Connecting to Backend
- Verify backend is running on correct port
- Check API endpoint URLs in components
- Check browser console for errors

**Happy Quizzing!** 🎓
