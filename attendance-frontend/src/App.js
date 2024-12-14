import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import AttendanceRecords from './pages/AttendanceRecords';
import WeeklyOffs from './pages/WeeklyOffs';
import Shifts from './pages/Shifts';
import Navbar from './components/Navbar';

const App = () => {

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <Router>
      <div>
        <Layout onLogout={handleLogout} />
        <div style={{ padding: '20px' }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/attendance-records" element={<AttendanceRecords />} />
        <Route path="/weekly-offs" element={<WeeklyOffs />} />
        <Route path="/shifts" element={<Shifts />} />
      </Routes>
      </div>
      </div>
    </Router>
  );
};

const Layout = ({ onLogout, children }) => {
  const location = useLocation();
  const noNavbarRoutes = ['/'];

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar onLogout={onLogout} />}
      {children}
    </>
  );
};


export default App;
