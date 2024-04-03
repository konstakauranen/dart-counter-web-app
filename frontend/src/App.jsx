import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import MatchPage from './pages/MatchPage'
import HomePage from './pages/HomePage'

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage user={user}/> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <SignUpPage />}
          />
            <Route
            path="/match"
            element={user ? <MatchPage user={user}/> : <Navigate to="/login" />}
          />
        </Routes>
      </>
    </Router>
  )
}
