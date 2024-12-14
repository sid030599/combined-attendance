import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <NavLink to="/dashboard" style={styles.navLink} activeStyle={styles.activeNavLink}>
            Dashboard
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink to="/attendance-records" style={styles.navLink} activeStyle={styles.activeNavLink}>
            Attendance Records
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink to="/attendance" style={styles.navLink} activeStyle={styles.activeNavLink}>
            Attendance
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink to="/weekly-offs" style={styles.navLink} activeStyle={styles.activeNavLink}>
            Weekly Offs
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink to="/shifts" style={styles.navLink} activeStyle={styles.activeNavLink}>
            Shifts
          </NavLink>
        </li>
      </ul>
      <button onClick={onLogout} style={styles.logoutButton}>
        Logout
      </button>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#333',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
  },
  activeNavLink: {
    fontWeight: 'bold',
    borderBottom: '2px solid #fff',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 15px',
    cursor: 'pointer',
  },
};

export default Navbar;
