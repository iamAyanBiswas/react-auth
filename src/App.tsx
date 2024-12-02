import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { AdminPanel } from './components/AdminPanel';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css'

function App() {
useEffect(()=>{
  console.log("App rederd")
},[])
  return (
    <>
    <AuthProvider>
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/admin">Admin Panel</Link></li>
            </ul>
          </nav>

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<h2>Unauthorized</h2>} />
            <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
    </>
  )
}

export default App
